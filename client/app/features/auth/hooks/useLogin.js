'use client'

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/app/services/authService";

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
            // Optional: global side-effects like toast notifications go here
            console.error("Login failed:", err);
        },

        onSettled: () => {
            // Invalidate so any query depending on ["user"] re-fetches fresh
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    });
};