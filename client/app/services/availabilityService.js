import api from "../lib/api"

export const getAvailableSlots = async (adminId, serviceId, date, tzOffset) => {
	const response = await api.get(
		`/api/v1/slots/available-slots?adminId=${adminId}&serviceId=${serviceId}&date=${date}&tzOffset=${tzOffset}`
	);

	return response.data;
}