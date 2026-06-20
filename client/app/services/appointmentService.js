import api from "../lib/api"

export const getAppointment = async (id) => {
	const response = await api.get(
		`/api/v1/appointments/${id}`
	);

	return response.data;
}

export const getAppointments = async () => {
	const response = await api.get(
		'/api/v1/appointments'
	);

	return response.data;
}

export const getPastAppointments = async ({ search, status, cursor, limit = 10, sortField = 'createdAt', sortOrder = 'desc' } = {}) => {
	const params = new URLSearchParams({
        limit,
        sortField,
        sortOrder,
		search,
		status,
        ...(cursor && { cursor }),
    });

	const response = await api.get(
		`/api/v1/appointments/past-appointments?${params}`
	);

	return response.data;
}

export const getAppointmentsInfo = async () => {
	const response = await api.get(
		'/api/v1/appointments/appointments-info'
	);

	return response.data;
}

export const createAppointment = async (body) => {
	const response = await api.post(
		'/api/v1/appointments',
		body
	);
	
	return response.data;
}

export const updateAppointment = async ({ id, body }) => {
	const response = await api.put(
		`/api/v1/appointments/${id}`,
		body
	);

	return response.data;
}

export const cancelAppointment = async (id) => {
	const response = await api.post(
		`/api/v1/appointments/cancel/${id}`
	);

	return response.data;
}