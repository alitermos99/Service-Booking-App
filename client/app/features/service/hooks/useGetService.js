'use client'

import { useQuery } from "@tanstack/react-query"; 
import { getService } from "@/app/services/serviceService";

export const useGetService = (id) =>{
	return useQuery({
		queryKey: ["service", id],
		queryFn: () => getService(id),
		retry: false,
        throwOnError: false,
        meta: {
            onError: (err) => {
                const message = err?.response?.data?.message ?? "Failed to load service";
                toast.error(message);
            }
        }
	});
}