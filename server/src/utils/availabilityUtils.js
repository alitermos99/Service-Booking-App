import ApiError from "../errors/ApiError.js";
import Availability from "../models/Availability.js";

export const getSlotOrThrow = async (slotId) => {
	const slot = await Availability.findById(slotId);

	if (!slot) {
		throw new ApiError("Slot not found", 404);
	}

	return slot;
};