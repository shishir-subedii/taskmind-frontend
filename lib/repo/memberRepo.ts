import apiClient from "../api/apiClient";
import { handleApiError } from "@/utils/ErrorHandler";
export enum TaskPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT"
}


export enum TaskStatus {
    ASSIGNED = 'ASSIGNED',
    IN_PROGRESS = 'IN_PROGRESS',
    SUBMITTED = 'SUBMITTED',
    REVIEW = 'REVIEW',
    ON_HOLD = 'ON_HOLD',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}


class MemberRepo {
    constructor() { }

    //get my tasks
    async getMyTasks({
        onSuccess,
        onError
    }: {
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get('/tasks/tasks/my-tasks');
            if (success && data !== null) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch tasks");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
    async getMyNotifications({
        onSuccess,
        onError 
    }: {
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get('/notifications');
            if (success && data !== null) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch notifications");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async markNotificationAsRead({
        notificationId,
        onSuccess,
        onError
    }: {
        notificationId: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.post(`/notifications/${notificationId}/read`);
            if (success && data !== null) {
                onSuccess(data);
            }
            else {
                onError(message || "Failed to mark notification as read");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    //clock in /tasks/id/clock-in
    async clockInTask({
        taskId,
        onSuccess,
        onError
    }: {
        taskId: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.post(`/tasks/${taskId}/clock-in`);
            if (success) {
                onSuccess(message);
            }
            else {
                onError(message || "Failed to clock in");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    //clock out /tasks/id/clock-out
    async clockOutTask({
        taskId,
        onSuccess,
        onError
    }: {
        taskId: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.post(`/tasks/${taskId}/clock-out`);
            if (success) {
                onSuccess(message);
            }
            else {
                onError(message || "Failed to clock out");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
}

export const memberRepo = new MemberRepo();