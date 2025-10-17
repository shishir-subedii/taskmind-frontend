'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { projectRepo } from '@/lib/repo/projectRepo';
import ProjectModal from '@/components/ProjectModal';

interface Manager {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface TeamMember {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface Task {
    id: string;
    sNo: number;
    priority: string;
    title: string;
    description: string | null;
    assets: string[];
    status: string;
    clockIn: string | null;
    clockOut: string | null;
    assignedAt: string | null;
    deadline: string | null;
    createdAt: string;
    updatedAt: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    deadline: string;
    status: string;
    assets: string[];
    createdAt: string;
    updatedAt: string;
    tasks: Task[];
    manager: Manager | null;
    teamMembers: TeamMember[];
}

export default function SuperAdminProjectManagement() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const fetchProjects = async () => {
        projectRepo.getProjects({
            onSuccess: (data) => {
                setProjects(data);
                toast.success('Projects fetched successfully');
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    const handleCreateProject = (payload: {
        name: string;
        description: string;
        deadline: string;
    }) => {
        projectRepo.createProject({
            payload,
            onSuccess: (message) => {
                toast.success(message);
                fetchProjects();
                setIsModalOpen(false);
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Project Management</h2>
                <Button
                    className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                    onClick={() => {
                        setSelectedProject(null);
                        setIsModalOpen(true);
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card
                        key={project.id}
                        className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300 cursor-pointer"
                        onClick={() => {
                            setSelectedProject(project);
                            setIsModalOpen(true);
                        }}
                    >
                        <CardHeader>
                            <CardTitle className="text-slate-900">{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">Description: {project.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedProject(null);
                }}
                project={selectedProject}
                onSubmit={(payload) => {
                    if (selectedProject) {
                        projectRepo.updateProject({
                            projectId: selectedProject.id,
                            payload,
                            onSuccess: (message) => {
                                toast.success(message);
                                fetchProjects();
                                setIsModalOpen(false);
                                setSelectedProject(null);
                            },
                            onError: (message) => {
                                toast.error(message);
                            },
                        });
                    } else {
                        handleCreateProject(payload);
                    }
                }}
            />
        </div>
    );
}