'use client'

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "@/app/services/reviewService";

export const useCreateReview = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createReview,

		onSuccess: (data) => {
    		queryClient.invalidateQueries({ queryKey: ['reviews-info'] });
    		queryClient.invalidateQueries({ queryKey: ['pending-reviews'] });
			toast.success(data?.message);
		},

		onError: (err) => {
			const message = err.response?.data?.message ?? 'Creation failed. Please try again.'
			toast.error(message);
		},
	});
}