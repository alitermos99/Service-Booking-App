'use client'

import { useQuery } from "@tanstack/react-query";
import { getAppointmentsInfo } from "@/app/services/appointmentService";

export const useGetAppointmentsInfo = () => {
	return useQuery({
		queryKey: ["appointments-info"],
		queryFn: () => getAppointmentsInfo(),
		throwOnError: false,
        meta: {
            onError: (err) => {
                const message = err?.response?.data?.message ?? "Failed to load appointments info";
                toast.error(message);
            }
        }
	})
}