import ApiError from "../errors/ApiError.js";
import Availability from "../models/Availability.js";
import { assertOwnership } from "../utils/authUtils.js";
import { getSlotOrThrow } from "../utils/availabilityUtils.js";

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