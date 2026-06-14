'use client'

import { getAppointments } from "@/app/services/appointmentService";
import { useQuery } from "@tanstack/react-query";

export const useGetAppointments = () => {
	return useQuery({
		queryKey: ["appointments"],
		queryFn: () => getAppointments(),
		throwOnError: false,
        meta: {
            onError: (err) => {
                const message = err?.response?.data?.message ?? "Failed to load appointments";
                toast.error(message);
            }
        }
	})
}