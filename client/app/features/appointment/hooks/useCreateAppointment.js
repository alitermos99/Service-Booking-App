'use client'

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "@/app/services/appointmentService";

export const useCreateAppointment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createAppointment,

		onSuccess: (data) => {
    		queryClient.invalidateQueries({ queryKey: ['appointments'] });
			toast.success(data?.message);
			return data;
		},

		onError: (err) => {
			const message = err.response?.data?.message ?? 'Creation failed. Please try again.'
			toast.error(message);
		},
	});
}