'use client'

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/app/services/authService";

export const useUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: getProfile,
		staleTime: Infinity, // keep user in cache until logout/invalidation
		retry: false // don't retry if user is not authenticated
	});
}