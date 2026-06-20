'use client'

import { getAppointment } from "@/app/services/appointmentService";
import { useQuery } from "@tanstack/react-query";

export const useGetAppointment = (id) => {
	return useQuery({
		queryKey: ["appointment", id],
		queryFn: () => getAppointment(id),
		throwOnError: false,
	})
}