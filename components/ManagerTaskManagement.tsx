'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Bot, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { managerRepo, TaskPriority, TaskStatus } from '@/lib/repo/managerRepo';
import TaskModal from '@/components/TaskModal';
import { userRepo } from '@/lib/repo/userRepo';

interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface Task {
    id: string;
    priority: TaskPriority;
    title: string;
    description: string;
    projectId: string;
    assignedToId: string;
    assets: string[];
    deadline: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
    assignedTo?: User;
}

interface ManagerTaskManagementProps {
    projectId: string;
}

export default function ManagerTaskManagement({ projectId }: ManagerTaskManagementProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);

    const fetchTasks = async () => {
        if (!projectId) {
            toast.error('Project ID is required');
            return;
        }
        managerRepo.fetchProjectTasks({
            projectId,
            onSuccess: (data) => {
                console.log('Fetched tasks:', data); // Debug log
                const taskArray = Array.isArray(data) ? data : data.tasks || [];
                if (taskArray.length === 0) {
                    toast.info('No tasks found for this project');
                } else {
                    toast.success('Tasks fetched successfully');
                }
                setTasks(taskArray);
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    const fetchUsers = async () => {
        userRepo.getAllUsers({
            onSuccess: (data) => {
                console.log('Fetched users:', data); // Debug log
                setUsers(Array.isArray(data) ? data : data.users || []);
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    const handleChangeStatus = (taskId: string, status: TaskStatus) => {
        managerRepo.changeTaskStatus({
            taskId,
            status,
            onSuccess: (message) => {
                toast.success(message);
                fetchTasks();
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    const handleDeleteTask = (taskId: string) => {
        managerRepo.deleteTask({
            taskId,
            onSuccess: (message) => {
                toast.success(message);
                fetchTasks();
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    useEffect(() => {
        if (projectId) {
            fetchTasks();
            fetchUsers();
        } else {
            toast.error('Invalid project ID');
        }
    }, [projectId]);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Task Management</h2>
                <div className="flex space-x-2">
                    <Button
                        className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Task
                    </Button>
                    <Button
                        className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                        onClick={() => setIsAIModalOpen(true)}
                    >
                        <Bot className="w-4 h-4 mr-2" />
                        Generate Tasks with AI
                    </Button>
                </div>
            </div>
            {tasks.length === 0 ? (
                <p className="text-sm text-slate-600">No tasks available for this project.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <Card
                            key={task.id}
                            className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300"
                        >
                            <CardHeader>
                                <CardTitle className="text-slate-900">{task.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600">Description: {task.description}</p>
                                <p className="text-sm text-slate-600">Priority: {task.priority}</p>
                                <p className="text-sm text-slate-600">Status: {task.status}</p>
                                <p className="text-sm text-slate-600">
                                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-slate-600">
                                    Assigned To: {task.assignedTo?.name || 'Unknown'}
                                </p>
                                <p className="text-sm text-slate-600">
                                    Assets: {task.assets?.length ? task.assets.join(', ') : 'None'}
                                </p>
                                <div className="flex space-x-2 mt-4">
                                    <select
                                        value={task.status}
                                        onChange={(e) => handleChangeStatus(task.id, e.target.value as TaskStatus)}
                                        className="text-sm text-slate-600 border rounded p-1 cursor-pointer"
                                    >
                                        {Object.values(TaskStatus).map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            <TaskModal
                isOpen={isModalOpen || isAIModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setIsAIModalOpen(false);
                }}
                projectId={projectId}
                users={users}
                onSubmit={(payload) => {
                    managerRepo.createNewTask({
                        ...payload,
                        projectId,
                        onSuccess: (message) => {
                            toast.success(message);
                            fetchTasks();
                            setIsModalOpen(false);
                        },
                        onError: (message) => {
                            toast.error(message);
                        },
                    });
                }}
                onGenerateAI={(text) => {
                    managerRepo.generateTasksWithAI({
                        projectId,
                        text,
                        onSuccess: (message) => {
                            toast.success(message);
                            fetchTasks();
                            setIsAIModalOpen(false);
                        },
                        onError: (message) => {
                            toast.error(message);
                        },
                    });
                }}
                isAIModal={isAIModalOpen}
            />
        </div>
    );
}