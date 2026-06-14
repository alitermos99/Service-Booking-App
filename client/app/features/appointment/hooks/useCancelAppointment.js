'use client'

import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment } from "@/app/services/appointmentService";

export const useCancelAppointment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: cancelAppointment,

		onSuccess: (data) => {
    		queryClient.invalidateQueries({ queryKey: ['appointments'] });
			queryClient.invalidateQueries({ queryKey: ['appointments-info'] });
			toast.success(data?.message);
		},

		onError: (err) => {
			const message = err.response?.data?.message ?? 'Cancel failed. Please try again.'
			toast.error(message);
		},
	});
}