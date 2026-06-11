import asyncHandler from "express-async-handler";
import { createPaymentIntentForAppointment } from "../services/stripeService.js";

export const createPaymentIntent = asyncHandler(async (req, res) => {
	const { appointmentId } = req.params;

	const result = await createPaymentIntentForAppointment(
		appointmentId,
		req.user.id
	);

	return res.status(201).json(result);
});