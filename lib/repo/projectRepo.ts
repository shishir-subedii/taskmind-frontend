import apiClient from "../api/apiClient";
import { handleApiError } from "@/utils/ErrorHandler";

export type ProjectPayload = {
    name: string;
    description: string;
    deadline: string;
    managerEmail?: string;
    teamMemberIds?: string[];
    assets?: string[];
};

class ProjectRepo {
    constructor() { }

    async createProject({
        payload,
        onSuccess,
        onError
    }: {
        payload: ProjectPayload;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.post('/projects', payload);
            if (success) {
                onSuccess(message);
            } else {
                onError(message || "Project creation failed");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }


    async getProjects({
        onSuccess, onError
    }: {
        onSuccess: (data: any) => void;
        onError: (message: string) => void
    }) {
        try {
            const { success, data, message } = await apiClient.get('/projects');
            console.log(data);
            if (success) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch projects");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async getProjectById({
        projectId,
        onSuccess,
        onError
    }: {
        projectId: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, data, message } = await apiClient.get(`/projects/${projectId}`);
            if (success) {
                onSuccess(data);
            } else {
                onError(message || "Failed to fetch project");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async updateProject({
        projectId,
        payload,
        onSuccess,
        onError
    }: {
        projectId: string;
        payload: Partial<ProjectPayload>;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.put(`/projects/${projectId}`, payload);
            if (success) {
                onSuccess(message);
            } else {
                onError(message || "Project update failed");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async deleteProject({
        projectId,
        onSuccess,
        onError
    }: {
        projectId: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.delete(`/projects/${projectId}`);
            if (success) {
                onSuccess(message);
            } else {
                onError(message || "Project deletion failed");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async assignManagerToProject({
        projectId,
        managerEmail,
        onSuccess,
        onError
    }: {
        projectId: string;
        managerEmail: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.patch(`/projects/${projectId}/assign-manager/${managerEmail}`);
            if (success) {
                onSuccess(message);
            }
            else {
                onError(message || "Failed to assign manager");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async addTeamMemberToProject({
        projectId,
        memberEmail,
        onSuccess,
        onError
    }: {
        projectId: string;
        memberEmail: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.patch(`/projects/${projectId}/add-member/${memberEmail}`);
            if (success) {
                onSuccess(message);
            }
            else {
                onError(message || "Failed to add team member");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }

    async removeTeamMemberFromProject({
        projectId,
        memberId,
        onSuccess,
        onError
    }: {
        projectId: string;
        memberId: string;
        onSuccess: (data: any) => void;
        onError: (message: string) => void;
    }) {
        try {
            const { success, message } = await apiClient.patch(`/projects/${projectId}/remove-member/${memberId}`);
            if (success) {
                onSuccess(message);
            }
            else {
                onError(message || "Failed to remove team member");
            }
        } catch (error: string | any) {
            let errorMsg = handleApiError(error);
            onError(errorMsg);
        }
    }
}
export const projectRepo = new ProjectRepo();