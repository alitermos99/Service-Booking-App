'use client'

import { register } from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useRegister = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: register,

		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data.user);
			router.push('/');
		},

		onError: (err) => {
			const message = err.response?.data?.message ?? 'Registration failed. Please try again.'
			toast.error(message);
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		}
	});
}