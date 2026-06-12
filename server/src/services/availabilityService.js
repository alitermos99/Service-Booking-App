import ApiError from "../errors/ApiError.js";
import Appointment from "../models/Appointment.js";
import Availability from "../models/Availability.js";
import AvailabilityOverride from "../models/AvailabilityOverride.js";
import BlockedDate from "../models/BlockedDate.js";
import { assertOwnership } from "../utils/authUtils.js";
import { getSlotOrThrow, minutesToTime, timeToMinutes } from "../utils/availabilityUtils.js";
import { getServiceByIdOrThrow } from './../utils/serviceUtils.js';

export const createASlot = async ({ dayOfWeek, startTime, endTime }, adminId) => {
	if(!dayOfWeek || !startTime || !endTime || !adminId) {
		throw new ApiError("All fields are required", 400);
	}

	const slot = await Availability.create({
		dayOfWeek,
		startTime,
		endTime,
		admin_id: adminId
	});

	return slot;
}

export const updateASlot = async ({ dayOfWeek, startTime, endTime, isActive }, slotId, userId) => {
	const slot = await getSlotOrThrow(slotId);
	assertOwnership(slot, "admin_id", userId, 'Not authorized to update this slot');

	slot.dayOfWeek = dayOfWeek ?? slot.dayOfWeek;
	slot.startTime = startTime ?? slot.startTime;
	slot.endTime = endTime ?? slot.endTime;
	slot.isActive = isActive ?? slot.isActive;

	await slot.save();
	return slot;
}

export const deleteASlot = async (slotId, userId) => {
	const slot = await getSlotOrThrow(slotId);
	assertOwnership(slot, "admin_id", userId, 'Not authorized to delete this slot');

	await slot.deleteOne();
}

export const getAllAvailableSlots = async (adminId, serviceId, date, tzOffset) => {
    if (!adminId || !serviceId || !date || !tzOffset) {
        throw new ApiError("All fields are required", 400);
    }

    const tzOffsetMinutes = parseInt(tzOffset) || 0;
    const dayOfWeek = new Date(date).getDay();

    const [weeklyRule, override, blocked, service] = await Promise.all([
        Availability.findOne({ admin_id: adminId, dayOfWeek, isActive: true }),
        AvailabilityOverride.findOne({ admin_id: adminId, date }),
        BlockedDate.findOne({ admin_id: adminId, date }),
        getServiceByIdOrThrow(serviceId)
    ]);

    if (blocked) {
		return [];
	}

    const rule = override || weeklyRule;

    if (!rule) {
		return [];
	}

    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay   = new Date(`${date}T23:59:59.999Z`);

    const bookedAppointments = await Appointment.find({
        admin_id: adminId,
        startTime: { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ["pending", "confirmed"] }
    }).select("startTime endTime");

    const booked = bookedAppointments.map(b => ({
        start: timeToMinutes(b.startTime.toISOString().split('T')[1].slice(0, 5)),
        end: timeToMinutes(b.endTime.toISOString().split('T')[1].slice(0, 5))
    }));

    return _generateSlots(rule.startTime, rule.endTime, service.duration, booked, date, tzOffsetMinutes);
};

function _generateSlots(start, end, duration, booked, date, tzOffset) {
    const slots = [];
    let current = timeToMinutes(start);
    const endMin = timeToMinutes(end);

    const nowUTC = new Date();
	const localNowMinutes = nowUTC.getUTCHours() * 60 + nowUTC.getUTCMinutes() - tzOffset;
    const localNow = new Date(nowUTC.getTime() - tzOffset * 60 * 1000);
	const localToday = localNow.toISOString().split('T')[0];
	const isToday = date === localToday;
	const bufferMinutes = 60;

    if (date < localToday) {
        throw new ApiError("Cannot get slots for a past date", 400);
    }

    while (current + duration <= endMin) {
        const slotStart = minutesToTime(current);
        const slotEnd   = minutesToTime(current + duration);

        const isTaken = booked.some(b =>
            b.start < current + duration && b.end > current
        );

        const isPast = isToday && current <= localNowMinutes + bufferMinutes;

        slots.push({
            startTime: slotStart,
            endTime: slotEnd,
            available: !isTaken && !isPast
        });

        current += duration;
    }

    return slots;
}