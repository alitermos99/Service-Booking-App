'use client'

import { getAppointment } from "@/app/services/appointmentService";
import { useQuery } from "@tanstack/react-query";

export const useGetAppointment = (id) => {
	return useQuery({
		queryKey: ["appointment"],
		queryFn: () => getAppointment(id),
		throwOnError: false,
	})
}