'use client'

import { useQuery } from "@tanstack/react-query";
import { getPastAppointments } from "@/app/services/appointmentService";

export const useGetPastAppointments = (sortField = 'createdAt', sortOrder = 'desc', cursor = null) => {
	return useQuery({
		queryKey: ["past-appointments", sortField, sortOrder, cursor],
		queryFn: () => getPastAppointments({
            cursor,
            limit: 10,
            sortField,
            sortOrder
        }),
		throwOnError: false,
        meta: {
            onError: (err) => {
                const message = err?.response?.data?.message ?? "Failed to load past appointments";
                toast.error(message);
            }
        }
	})
}