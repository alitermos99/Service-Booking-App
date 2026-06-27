'use client'

import { useQuery } from "@tanstack/react-query";
import { getReviewsInfo } from "@/app/services/reviewService";

export const useGetReviewsInfo = () => {
	return useQuery({
		queryKey: ["reviews-info"],
		queryFn: () => getReviewsInfo(),
		meta: {
            onError: (err) => {
                const message = err?.response?.data?.message ?? "Failed to load reviews info";
                toast.error(message);
            }
        }
	});
}