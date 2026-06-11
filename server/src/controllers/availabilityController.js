import asyncHandler from "express-async-handler";
import { createASlot, deleteASlot, updateASlot } from "../services/AvailabilityService.js";

export const createSlot = asyncHandler(async (req, res) => {
	const { dayOfWeek, startTime, endTime } = req.body;
	const slot = await createASlot({ dayOfWeek, startTime, endTime }, req.user.id);

	return res.status(201).json({
		message: "Slot created successfully",
		slot: slot
	});
});

export const updateSlot = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { dayOfWeek, startTime, endTime } = req.body;
	const slot = await updateASlot({ dayOfWeek, startTime, endTime }, id, req.user.id);

	return res.status(200).json({
		message: "Slot updated successfully",
		slot: slot
	});
});

export const deleteSlot = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await deleteASlot(id, req.user.id);

	return res.status(200).json({
		message: "Slot deleted successfully"
	});
});