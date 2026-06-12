import api from './../lib/api';

export const getServices = async (filter) => {
	const response = await api.get(
		`/api/v1/services/all-services?filter=${filter}`
	);

	return response.data;
}
