'use client'

import { deactivateUser } from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useDeactivateUser = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: deactivateUser,

		onSuccess: (data) => {
			queryClient.removeQueries({ queryKey: ["user"] });
			router.push("/login");
			toast.success(data?.message);
		},

		onError: (err) => {
			const message = err.response?.data?.message ?? 'Deactivation failed. Please try again.'
			toast.error(message);
		},
	});
}