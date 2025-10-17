'use client';

import { useAuthStore } from "@/stores/AuthStore";
import { authRepo } from "../repo/authRepo";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogout() {
    const router = useRouter();
    const clearTokens = useAuthStore((state) => state.clearTokens);

    const logOut = async () => {
        await authRepo.logOut({
            onSuccess: (message: string) => {
                console.log(message);
            },
            onError: (message: string) => {
                console.error(message);
            },
        });

        toast.success('Logged out successfully');
        // Clear cookies + store
        Cookies.remove('accessToken');
        Cookies.remove('role');
        clearTokens();

        router.push('/login');
    };

    return { logOut };
}
