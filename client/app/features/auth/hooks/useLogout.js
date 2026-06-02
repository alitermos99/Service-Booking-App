'use client'

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/app/services/authService";
import { toast } from "react-toastify";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["user"] });
            router.push("/login");
        },

        onError: (err) => {
			const message = err?.response?.data?.message ?? "Logout failed. Please try again.";
            toast.error(message);
        },
    });
};