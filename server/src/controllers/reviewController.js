import asyncHandler from "express-async-handler";
import { 
	createAReview,
	updateAReview,
	deleteAReview,
	getAUserReviewsStats,
	getAUserPendingReviews
} from "../services/reviewService.js";
import { sanitizeAppointment } from "../utils/appointmentUtils.js";

// Create a review
export const createReview = asyncHandler(async (req, res) => {
	const { rating, comment, serviceId, appointmentId } = req.body;
	const review = await createAReview({ rating, comment, serviceId, appointmentId }, req.user.id);

	return res.status(201).json({
		message: "Review created successfully",
		review
	});
});

// Update a review
export const updateReview = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { rating, comment } = req.body;
	const review = await updateAReview({ rating, comment }, id, req.user.id);

	return res.status(200).json({
		review
	});
});

// Delete a review
export const deleteReview = asyncHandler(async (req, res) => {
	const { id } = req.params;
	await deleteAReview(id, req.user.id);

	return res.status(200).json({
		message: "Review deleted successfully"
	});
});

// Get reviews info
export const getUserReviewsStats = asyncHandler(async (req, res) => {
	const reviewsInfo = await getAUserReviewsStats(req.user.id);
	return res.status(200).json(reviewsInfo);
});

export const getUserPendingReviews = asyncHandler(async (req, res) => {
	const pedningAppointmentsReviews = await getAUserPendingReviews(req.user.id);

	const sanitizedReviews = pedningAppointmentsReviews?.map(appointment => {
		return sanitizeAppointment(appointment);
	});

	return res.status(200).json(sanitizedReviews);
});