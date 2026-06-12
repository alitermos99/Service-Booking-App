import ApiError from "../errors/ApiError.js";
import Availability from "../models/Availability.js";

export const getSlotOrThrow = async (slotId) => {
	const slot = await Availability.findById(slotId);

	if (!slot) {
		throw new ApiError("Slot not found", 404);
	}

	return slot;
};

export function timeToMinutes(time) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
}

export function minutesToTime(minutes) {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = (minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
}