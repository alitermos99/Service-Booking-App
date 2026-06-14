'use client'

import { useQuery } from "@tanstack/react-query";
import { getAvailableSlots } from "@/app/services/availabilityService";

export const useGetAvailableSlots = (adminId, serviceId, date, tzOffset) => {
	return useQuery({
        queryKey: ["available-slots", adminId, serviceId, date],
        queryFn: () => getAvailableSlots(adminId, serviceId, date, tzOffset),
        enabled: !!adminId && !!serviceId && !!date,
        retry: false,
        throwOnError: false,
        meta: {
            onError: (err) => {
                const message = err?.response?.data?.message ?? "Failed to load available slots";
                toast.error(message);
            }
        }
    });
}