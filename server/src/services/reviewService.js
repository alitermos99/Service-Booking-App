import Review from "../models/Review.js";
import ApiError from '../errors/ApiError.js';
import { assertOwnership } from '../utils/authUtils.js';
import { getReviewByIdOrThrow, getExistingReviewByParentIds } from '../utils/reviewUtils.js'
import mongoose from "mongoose";
import Appointment from "../models/Appointment.js";
import { getAppointmentOrThrow } from './../utils/appointmentUtils.js';

export const createAReview = async ({ rating, comment, serviceId, appointmentId }, userId) => {
	if(!rating || !appointmentId || !serviceId) {
		throw new ApiError("All fields are required", 400);
	}

	if(rating < 1 || rating > 5) {
		throw new ApiError("Rating must be between 1 and 5", 400);
	}

	await getExistingReviewByParentIds(appointmentId, serviceId, userId);
	const appointment = await getAppointmentOrThrow(appointmentId);

	const review = await Review.create({
		rating,
		comment,
		user_id: userId,
		service_id: serviceId,
		appointment_id: appointmentId,
		admin_id: appointment.admin_id
	});

	return review;
}

export const updateAReview = async ({ rating, comment }, reviewId, userId) => {
	if(rating < 1 || rating > 5) {
		throw new ApiError("Rating must be between 1 and 5", 400);
	}

	const review = await getReviewByIdOrThrow(reviewId);
	assertOwnership(review, "user_id", userId, 'Not authorized to update this review');

	review.rating = rating || review.rating;
	review.comment = comment || review.comment;

	await review.save();
	return review;
}

export const deleteAReview = async (reviewId, userId) => {
	const review = await getReviewByIdOrThrow(reviewId);
	assertOwnership(review, "user_id", userId, 'Not authorized to delete this review');

	await review.deleteOne();
}

export const replyToAUserReview = async (reply, reviewId, userId) => {
	const review = await getReviewByIdOrThrow(reviewId);
	assertOwnership(review, "admin_id", userId, 'Not authorized to reply to this review');

	review.reply = {
        text: reply,
        repliedAt: new Date()
    };

    await review.save();
	return review;
}

export const deleteAReplyToAUserReview = async (reviewId, userId) => {
	const review = await getReviewByIdOrThrow(reviewId);
	assertOwnership(review, "admin_id", userId, 'Not authorized to delete this reply');

	review.reply = { 
		text: null, 
		repliedAt: null 
	};

    await review.save();
	return review;
}

export const getAUserReviewsStats = async (userId) => {
    const objectId = new mongoose.Types.ObjectId(userId);

    const [reviewStats, reviewedAppointmentIds, totalCompleted] = await Promise.all([
        Review.aggregate([
            { $match: { user_id: objectId } },
            {
                $group: {
                    _id: null,
                    totalReviews: { $sum: 1 },
                    avgRating: { $avg: "$rating" }
                }
            }
        ]),
        Review.distinct('appointment_id', { user_id: objectId }),
        Appointment.countDocuments({ user_id: objectId, status: 'completed' })
    ]);

    const [stats] = reviewStats;

    return {
        totalReviews: stats?.totalReviews ?? 0,
        avgRating: stats?.avgRating ?? 0,
        pendingReviews: totalCompleted - reviewedAppointmentIds.length
    };
};

export const getAUserPendingReviews = async (userId) => {
	const objectId = new mongoose.Types.ObjectId(userId);
	const reviewedIds = await Review.distinct("appointment_id", { user_id: objectId });

	const appointments = await Appointment.find({
		user_id: objectId,
		status: "completed",
		_id: { $nin: reviewedIds }
	})
	.populate('service_id', 'title icon iconBg price duration')
    .populate('admin_id', 'name');

	return appointments;
}