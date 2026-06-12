'use client'

import { useQuery } from "@tanstack/react-query"; 
import { useDebounce } from '@/app/hooks/useDebounce';
import { getServices } from "@/app/services/serviceService";

export const useGetServices = (filter, sortField = 'createdAt', sortOrder = 'desc', cursor = null) =>{
	const debouncedSearch = useDebounce(filter, 500);

	return useQuery({
		queryKey: ["services", debouncedSearch, sortField, sortOrder, cursor],
		queryFn: () => getServices({
            cursor,
            limit: 10,
            sortField,
            sortOrder,
            filter: debouncedSearch
        }),
		retry: false,
        throwOnError: false,
        meta: {
            onError: (err) => {
                const message = err?.response?.data?.message ?? "Failed to load the services";
                toast.error(message);
            }
        }
	});
}