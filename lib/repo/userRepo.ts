import apiClient from "../api/apiClient";
import { handleApiError } from "@/utils/ErrorHandler";

class UserRepo {
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

    async getAllUsers({
        onSuccess,
        onError
    }: {
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get('/user/all');
            if (success && data !== null) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch users");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async changePasswordBySuperAdmin({
        email,
        newPassword,
        onSuccess,
        onError
    }: {
        email: string;
        newPassword: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.patch('/auth/change-password-by-superadmin', {
                email,
                newPassword
            });
            if (success) {
                onSuccess(message || "Password changed successfully");
            }
            else {
                onError(message || "Failed to change password");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async changeEmailBySuperAdmin({
        oldEmail,
        newEmail,
        onSuccess,
        onError
    }: {
        oldEmail: string;
        newEmail: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.patch('/auth/change-email-by-superadmin', {
                oldEmail,
                newEmail
            });
            if (success) {
                onSuccess(message || "Email changed successfully");
            }
            else {
                onError(message || "Failed to change email");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async deleteUserBySuperAdmin({
        email,
        onSuccess,
        onError
    }: {
        email: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.delete('/auth/delete-user-by-superadmin', {
                data: { email }
            });
            if (success) {
                onSuccess(message || "User deleted successfully");
            }
            else {
                onError(message || "Failed to delete user");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

}

export const userRepo = new UserRepo();