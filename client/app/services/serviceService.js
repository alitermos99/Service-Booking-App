import api from './../lib/api';

export const getServices = async () => {
	const response = await api.get(
		'/api/v1/services/all-services'
	);

	return response.data;
}
