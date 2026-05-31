'use client'

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/app/services/authService";
import { toast } from "react-toastify";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: login,

        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.user);
            router.push("/");
        },

        onError: (err) => {
			const message = err?.response?.data?.message ?? "Login failed. Please try again.";
            toast.error(message);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    });
};