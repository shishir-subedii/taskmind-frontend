import apiClient from "../api/apiClient";
import { handleApiError } from "@/utils/ErrorHandler";

class ManagerRepo {
    constructor() { }
    async register({
        name,
        role,
        email,
        password,
        confirmPassword,
        onSuccess,
        onError
    }: {
        name: string;
        role: string;
        email: string;
        password: string;
        confirmPassword: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.post('/auth/register', {
                name,
                role,
                email,
                password,
                confirmPassword
            });
            if (success && data !== null) {
                onSuccess(message || "Registration successful");
            } else {
                onError(message || "Registration failed");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
}

export const managerRepo = new ManagerRepo();