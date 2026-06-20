import Service from '../models/Service.js';
import ApiError from '../errors/ApiError.js';
import { getServiceByIdOrThrow } from '../utils/serviceUtils.js'
import { assertOwnership } from '../utils/authUtils.js';
import Review from '../models/Review.js';
import paginate from '../utils/pagination.js';

export const createAService = async (serviceData, adminId) => {
	const { icon, iconBg, title, description, price, duration, short, tags } = serviceData;

	if(!title || !description || !price || !duration || !short) {
		throw new ApiError('All fields are required', 400);
	}

	if(price <= 0) {
		throw new ApiError('Price must be greater than 0', 400);
	}

	if(duration < 5) {
		throw new ApiError('Duration must be at least 5 minutes', 400);
	}

	const service = new Service({
		icon,
		iconBg,
		title,
		description,
		price,
		duration,
		tags,
		short,
		admin_id: adminId
	});

	await service.save();
	return service;
};

export const updateAService = async (serviceId, updateData, adminId) => {
	const service = await getServiceByIdOrThrow(serviceId);
	const { icon, iconBg, title, description, price, duration, short, tags } = updateData;
	assertOwnership(service, "admin_id", adminId, 'Not authorized to update this service');

	Object.assign(service, { title: title || service.title, description: description 
		|| service.description, price: price || service.price, duration: duration || service.duration ,
		tags, icon: icon || service.icon, short: short || service.short, iconBg: iconBg || service.iconBg
	});
	
	await service.save();
	return service;
};

export const deleteAService = async (serviceId, adminId) => {
	const service = await getServiceByIdOrThrow(serviceId);
	assertOwnership(service, "admin_id", adminId, 'Not authorized to delete this service');

	await service.deleteOne();
	return service;
};

export const getAService = async (serviceId) => {
	const service = await getServiceByIdOrThrow(serviceId);
	return service;
}

export const getAllServicesAdmin = async (adminId) => {
	const services = await Service.find({ admin_id: adminId }).sort({ createdAt: -1 });
	return services;
}

export const getAllServices = async ({ cursor, limit, sortField, sortOrder, filter }) => {
	const query = filter
		? {
			$or: [
				{ title: { $regex: filter, $options: 'i' } },
				{ short: { $regex: filter, $options: 'i' } },
				{ description: { $regex: filter, $options: 'i' } },
				{ tags: { $regex: filter, $options: 'i' } }
			]
		}
		: {};
	const { results, nextCursor, prevCursor, 
		hasNextPage, hasPrevPage } = await _handlePagination(cursor, limit, sortField, sortOrder, query);

	const ids = results.map(service => {
		return service._id
	});
	const ratings = await _getAverageServicesRatingsAndReviews(ids);
	_assignAverageRating(ratings, results);

	return {
        results,
        nextCursor: nextCursor  ? Buffer.from(JSON.stringify(nextCursor)).toString('base64')  : null,
        prevCursor: prevCursor  ? Buffer.from(JSON.stringify(prevCursor)).toString('base64')  : null,
        hasNextPage,
        hasPrevPage
    };
}

async function _getAverageServicesRatingsAndReviews(serviceIds) {
	const ratings = await Review.aggregate([
		{ $match: { service_id: { $in: serviceIds }} },
		{
			$group: {
				_id: "$service_id",
				avgRating: { $avg: "$rating" },
				totalReviews: { $sum: 1 }
			}
		}
	]);

	return ratings;
}

function _assignAverageRating(ratings, services) {
	ratings.forEach(rating => {
		const service = services.find(ser => ser._id.toString() === rating._id.toString());

		if (service) {
            service.averageRating = rating.avgRating;
            service.totalReviews = rating.totalReviews;
        }
	});
}

async function _handlePagination(cursor, limit, sortField, sortOrder, query) {
	const parsedCursor = cursor
        ? JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'))
        : null;

    const { results, nextCursor, prevCursor, hasNextPage, hasPrevPage } = await paginate(Service, {
        cursor: parsedCursor,
        limit,
        sort: { field: sortField, order: sortOrder },
        filter: query
    });

	return { results, nextCursor, prevCursor, hasNextPage, hasPrevPage };
}