import dayjs from "dayjs";
import ApiError from '../errors/ApiError.js';
import Appointment from '../models/Appointment.js'
import { getServiceByIdOrThrow } from "../utils/serviceUtils.js";
import { assertOwnership } from '../utils/authUtils.js';
import { 
	getAppointmentOrThrow, 
	getAppointmentWithParentServiceObject,
	calculateAndValidateTimeRange 
} from '../utils/appointmentUtils.js';
import paginate from "../utils/pagination.js";
import mongoose from "mongoose";

export const createAnAppointment = async ({ service_id, startTime, notes }, userId) => {
	if(!startTime) {
		throw new ApiError('StartTime is required', 400);
	}

	const service = await getServiceByIdOrThrow(service_id);
	const { start, end } = await calculateAndValidateTimeRange(
		startTime,
		service.duration
	);

	const appointment = await Appointment.create({
		service_id,
		startTime: start,
		notes,
		endTime: end,
		user_id: userId,
		admin_id: service.admin_id,
		amount: service.price
	})

	return appointment;
}

export const getAUserAppointmentsData = async (userId) => {
	const [stats] = await Appointment.aggregate([
		{
			$match: {
				user_id: new mongoose.Types.ObjectId(userId)
			}
		},
		{
			$group: {
				_id: null,
				totalBookings: { $sum: 1 },

				upcomingBookings: {
					$sum: {
						$cond: [
							{ $in: ["$status", ["pending", "confirmed"]] },
							1,
							0
						]
					}
				},
				completedBookings: {
					$sum: {
						$cond: [
							{ $in: ["$status", ["completed"]] },
							1,
							0
						]
					}
				},
				totalAmount: {
					$sum: {
						$cond: [
							{ $in: ["$status", ["confirmed", "completed"]] },
							"$amount",
							0
						]
					}
				}
			}
		}
	]);

	return {
		totalBookings: stats?.totalBookings || 0,
		upcomingBookings: stats?.upcomingBookings || 0,
		completedBookings: stats?.completedBookings || 0,
		totalAmount: stats?.totalAmount || 0
	};
}

export const getAUserAppointment = async (appointmentId, userId) => {
	const appointment = await getAppointmentOrThrow(appointmentId);
	assertOwnership(appointment, "user_id", userId, 'Not authorized to see this appointment');

	return appointment;
}

export const getAUserAppointments = async ({ cursor, limit, sortField, sortOrder }, userId) => {
	const query = {
		user_id: userId,
		startTime: { $gte: new Date() }
	};

	const queryModifier = q =>
			q.populate("service_id", "name price duration")
			.populate("admin_id", "name")

	const { results, nextCursor, prevCursor, 
		hasNextPage, hasPrevPage } = await _handlePagination(cursor, limit, sortField, sortOrder, query, queryModifier);

	return {
        results,
        nextCursor: nextCursor  ? Buffer.from(JSON.stringify(nextCursor)).toString('base64')  : null,
        prevCursor: prevCursor  ? Buffer.from(JSON.stringify(prevCursor)).toString('base64')  : null,
        hasNextPage,
        hasPrevPage
    };
}

export const getAUserPastAppointments = async ({ cursor, limit, sortField, sortOrder }, userId) => {
	const query = {
		user_id: userId,
		startTime: { $lt: new Date() }
	};

	const queryModifier = q =>
			q.populate("service_id", "title price duration")
			.populate("admin_id", "name")

	const { results, nextCursor, prevCursor, 
		hasNextPage, hasPrevPage, totalRecords } = await _handlePagination(cursor, limit, sortField, sortOrder, query, queryModifier);

	return {
        results,
        nextCursor: nextCursor  ? Buffer.from(JSON.stringify(nextCursor)).toString('base64')  : null,
        prevCursor: prevCursor  ? Buffer.from(JSON.stringify(prevCursor)).toString('base64')  : null,
        hasNextPage,
        hasPrevPage,
		totalRecords
    };
}

export const updateAnAppointment = async ({ startTime, notes }, appointmentId, userId) => {
	const appointment = await getAppointmentWithParentServiceObject(appointmentId);
	assertOwnership(appointment, "user_id", userId, 'Not authorized to update this appointment');

	if (startTime && dayjs(startTime).valueOf() !== dayjs(appointment.startTime).valueOf()) {
		const { start, end } = await calculateAndValidateTimeRange(
			startTime,
			appointment.service_id.duration
		);

		appointment.startTime = start;
		appointment.endTime = end;
	}

	appointment.notes = notes || appointment.notes;

	await appointment.save();
	return appointment;
};

export const cancelAnAppointment = async (appointmentId, userId) => {
	const appointment = await getAppointmentOrThrow(appointmentId);
	assertOwnership(appointment, "user_id", userId, 'Not authorized to cancel this appointment');

	appointment.status = 'cancelled';
	await appointment.save();
}

async function _handlePagination(cursor, limit, sortField, sortOrder, query, queryModifier) {
	const parsedCursor = cursor
		? JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'))
		: null;

	const { results, nextCursor, prevCursor, hasNextPage, hasPrevPage, totalRecords } = await paginate(Appointment, {
		cursor: parsedCursor,
		limit,
		sort: { field: sortField, order: sortOrder },
		filter: query,
		queryModifier
	});

	return { results, nextCursor, prevCursor, hasNextPage, hasPrevPage, totalRecords };
}