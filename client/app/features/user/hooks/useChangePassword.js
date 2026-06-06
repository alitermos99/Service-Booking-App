'use client'

import { changePassword } from "@/app/services/authService";
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";

export const useChangePassword = () => {

	return useMutation({
		mutationFn: changePassword,

		onSuccess: (data) => {
			console.log('@@@@data ', data);
			toast.success(data?.message);
		},

		onError: (err) => {
			const message = err.response?.data?.message ?? 'Update failed. Please try again.'
			toast.error(message);
		},
	});
}