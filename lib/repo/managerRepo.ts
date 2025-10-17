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


class ManagerRepo {
    constructor() { }
    async createNewTask({
        priority,
        title,
        description,
        projectId,
        assignedToId,
        assets,
        deadline,
        onSuccess,
        onError
    }: {
        priority: TaskPriority;
        title: string;
        description: string;
        projectId: string;
        assignedToId: string;
        assets?: string[];
        deadline: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.post('/tasks', {
                priority,
                title,
                description,
                projectId,
                assignedToId,
                assets,
                deadline                
            });
            if (success) {
                onSuccess(message || "Task created successfully");
            } else {
                onError(message || "Task creation failed");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async fetchProjectTasks({
        projectId,
        onSuccess,
        onError
    }
    : {
        projectId: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/tasks/project/${projectId}`);
            if (success) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch project tasks");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async deleteTask({
        taskId,
        onSuccess,
        onError
    }: {
        taskId: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.delete(`/tasks/${taskId}`);
            if (success) {
                onSuccess(message || "Task deleted successfully");
            } else {
                onError(message || "Task deletion failed");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    //generate multiple tasks with a text. and backend will use ai to generate tasks.
    async generateTasksWithAI({
        projectId,
        text,
        onSuccess,
        onError
    }: {
        projectId: string;
        text: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.post(`/tasks/create/${projectId}/with-ai`, {
                text
            });
            if (success) {
                onSuccess(message || "Tasks generated successfully");
            } else {
                onError(message || "Failed to generate tasks");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async changeTaskStatus({
        taskId,
        status,
        onSuccess,
        onError
    }: {
        taskId: string;
        status: TaskStatus;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.patch(`/tasks/${taskId}/status`, {
                status
            });
            if (success) {
                onSuccess(message || "Task status changed successfully");
            } else {
                onError(message || "Failed to change task status");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
}

export const managerRepo = new ManagerRepo();