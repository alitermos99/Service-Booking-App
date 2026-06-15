'use client'

import { useQuery } from "@tanstack/react-query";
import { getPastAppointments } from "@/app/services/appointmentService";
import { useDebounce } from "@/app/hooks/useDebounce";

export const useGetPastAppointments = (search, status, sortField = 'createdAt', sortOrder = 'desc', cursor = null) => {
    const debouncedSearch = useDebounce(search, 500);

	return useQuery({
		queryKey: ["past-appointments", sortField, sortOrder, cursor, debouncedSearch, status],
		queryFn: () => getPastAppointments({
            cursor,
            limit: 10,
            sortField,
            sortOrder,
            search: debouncedSearch,
            status
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