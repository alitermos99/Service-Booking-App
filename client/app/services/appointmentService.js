import api from "../lib/api"

export const getAppointments = async () => {
	const response = await api.get(
		'/api/v1/appointments'
	);

	return response.data;
}