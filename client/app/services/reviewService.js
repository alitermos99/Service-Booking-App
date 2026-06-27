import api from "../lib/api"

export const getReviewsInfo = async () => {
	const response = await api.get(
		'/api/v1/reviews/reviews-info'
	);

	return response.data;
}