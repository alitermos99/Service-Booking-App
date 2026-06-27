'use client'

import { useQuery } from "@tanstack/react-query";
import { getPendingReviews } from "@/app/services/reviewService";

export const useGetPendingReviews = () => {
	return useQuery({
		queryKey: ["pending-reviews"],
		queryFn: () => getPendingReviews(),
		meta: {
            onError: (err) => {
                const message = err?.response?.data?.message ?? "Failed to load pending reviews";
                toast.error(message);
            }
        }
	});
}