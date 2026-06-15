'use client'

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "@/app/services/appointmentService";

export const useUpdateAppointment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateAppointment,

		onSuccess: (data) => {
    		queryClient.invalidateQueries({ queryKey: ['appointments'] });
			toast.success(data?.message);
		},

		onError: (err) => {
			const message = err.response?.data?.message ?? 'Update failed. Please try again.'
			toast.error(message);
		},
	});
}