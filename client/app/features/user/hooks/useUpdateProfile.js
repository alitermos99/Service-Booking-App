'use client'

import { updateProfile } from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProfile,

		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data);
			toast.success(data?.message);
		},

		onError: (err) => {
			const message = err.response?.data?.message ?? 'Update failed. Please try again.'
			toast.error(message);
		},
	});
}