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
import mongoose from "mongoose";
import aggregatePagination from "../utils/aggregatePagination.js";

export const createAnAppointment = async ({ serviceId, startTime, notes }, userId) => {
	if (!startTime || startTime === 'null' || isNaN(new Date(startTime).getTime())) {
		throw new ApiError('StartTime must be a valid date', 400);
	}

	if (new Date(startTime) < new Date()) {
		throw new ApiError('StartTime cannot be in the past', 400);
	}

	const service = await getServiceByIdOrThrow(serviceId);
	const { start, end } = await calculateAndValidateTimeRange(
		startTime,
		service.duration
	);

	const appointment = await Appointment.create({
		service_id: serviceId,
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

export const getAUserAppointments = async (userId) => {
	const appointments = await Appointment.find({ user_id: userId, startTime: { $gte: new Date() } })
		.populate("admin_id", "name")
		.populate("service_id", "title duration price icon iconBg");

	return appointments;
}

export const getAUserPastAppointments = async ({ search, status, cursor, limit, sortField, sortOrder }, userId) => {
	const matchStage = {
        user_id:   new mongoose.Types.ObjectId(userId),
        startTime: { $lt: new Date() },
        ...(status && status !== 'all' && { status })
    };

    const pipeline = [
        { $match: matchStage },
        {
            $lookup: {
                from:         'services',
                localField:   'service_id',
                foreignField: '_id',
                as:           'service_id'
            }
        },
        { $unwind: '$service_id' },
        {
            $lookup: {
                from:         'users',
                localField:   'admin_id',
                foreignField: '_id',
                as:           'admin_id'
            }
        },
        { $unwind: '$admin_id' },

        {
            $project: {
                startTime: 1,
                endTime: 1,
                status: 1,
                paymentStatus: 1,
                paymentIntentId: 1,
                notes: 1,
                price: 1,
                createdAt: 1,
                'service_id._id': 1,
                'service_id.icon': 1,
                'service_id.title': 1,
                'service_id.iconBg': 1,
                'service_id.price': 1,
                'service_id.duration': 1,
                'admin_id._id': 1,
                'admin_id.name': 1,
            }
        },
    ];

    if (search) {
        pipeline.push({
            $match: {
                $or: [
                    { 'service_id.title': { $regex: search, $options: 'i' } },
                    { 'admin_id.name':    { $regex: search, $options: 'i' } }
                ]
            }
        });
    }

    return aggregatePagination(Appointment, pipeline, {
        cursor,
        limit,
        sortField: sortField || 'createdAt',
        sortOrder: sortOrder || 'desc'
    });
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
	else {
		throw new ApiError("Appointment already scheduled at this time", 400);
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