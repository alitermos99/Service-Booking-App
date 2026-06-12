import Service from '../models/Service.js';
import ApiError from '../errors/ApiError.js';
import { getServiceByIdOrThrow } from '../utils/serviceUtils.js'
import { assertOwnership } from '../utils/authUtils.js';
import Review from '../models/Review.js';

export const createAService = async (serviceData, adminId) => {
	const { title, description, price, duration, tags } = serviceData;

	if(!title || !description || !price || !duration) {
		throw new ApiError('All fields are required', 400);
	}

	if(price <= 0) {
		throw new ApiError('Price must be greater than 0', 400);
	}

	if(duration < 5) {
		throw new ApiError('Duration must be at least 5 minutes', 400);
	}

	const service = new Service({
		title,
		description,
		price,
		duration,
		tags,
		admin_id: adminId
	});

	await service.save();
	return service;
};

export const updateAService = async (serviceId, updateData, adminId) => {
	const service = await getServiceByIdOrThrow(serviceId);
	const { title, description, price, duration, tags } = updateData;
	assertOwnership(service, "admin_id", adminId, 'Not authorized to update this service');

	Object.assign(service, { title: title || service.title, description: description 
		|| service.description, price: price || service.price, duration: duration || service.duration ,
		tags
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
	assertOwnership(service, "admin_id", adminId, 'Not authorized to see this service');

	return service;
}

export const getAllServicesAdmin = async (adminId) => {
	const services = await Service.find({ admin_id: adminId }).sort({ createdAt: -1 });
	return services;
}

export const getAllServices = async (filter) => {
	const query = filter
		? {
			$or: [
				{ title: { $regex: filter, $options: 'i' } },
				{ short: { $regex: filter, $options: 'i' } },
				{ description: { $regex: filter, $options: 'i' } }
			]
		}
		: {};

	const services = await Service.find(query).sort({ createdAt: -1 }).lean();
	const ids = services.map(service => {
		return service._id
	});
	const ratings = await _getAverageServicesRatingsAndReviews(ids);
	_assignAverageRating(ratings, services);

	return services;
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