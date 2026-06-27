import api from "../lib/api"

export const getReviewsInfo = async () => {
	const response = await api.get(
		'/api/v1/reviews/reviews-info'
	);

	return response.data;
}

export const getPendingReviews = async () => {
	const response = await api.get(
		'/api/v1/reviews/pending-reviews'
	);

	return response.data;
}