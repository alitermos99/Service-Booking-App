import api from "../lib/api"

export const getAppointments = async () => {
	const response = await api.get(
		'/api/v1/appointments'
	);

	return response.data;
}

export const getPastAppointments = async ({ cursor, limit = 10, sortField = 'createdAt', sortOrder = 'desc' } = {}) => {
	const params = new URLSearchParams({
        limit,
        sortField,
        sortOrder,
        ...(cursor && { cursor }),
    });

	const response = await api.get(
		`/api/v1/appointments/past-appointments?${params}`
	);

	return response.data;
}