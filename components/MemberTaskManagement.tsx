'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { memberRepo, TaskPriority, TaskStatus } from '@/lib/repo/memberRepo';
import TaskDetailsModal from '@/components/TaskDetailsModal';

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
}

export default function MemberTaskManagement() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const fetchTasks = async () => {
        memberRepo.getMyTasks({
            onSuccess: (data) => {
                console.log('Fetched tasks:', data); // Debug log
                const taskArray = Array.isArray(data) ? data : data.tasks || [];
                if (taskArray.length === 0) {
                    toast.info('No tasks assigned to you');
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

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-900">My Tasks</h2>
            {tasks.length === 0 ? (
                <p className="text-sm text-slate-600">No tasks assigned to you.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                        <Card
                            key={task.id}
                            className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300 cursor-pointer"
                            onClick={() => setSelectedTask(task)}
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
                                    Assets: {task.assets?.length ? task.assets.join(', ') : 'None'}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
            {selectedTask && (
                <TaskDetailsModal
                    isOpen={!!selectedTask}
                    onClose={() => setSelectedTask(null)}
                    task={selectedTask}
                    onClockIn={() => {
                        memberRepo.clockInTask({
                            taskId: selectedTask.id,
                            onSuccess: (message) => {
                                toast.success(message);
                                fetchTasks();
                            },
                            onError: (message) => {
                                toast.error(message);
                            },
                        });
                    }}
                    onClockOut={() => {
                        memberRepo.clockOutTask({
                            taskId: selectedTask.id,
                            onSuccess: (message) => {
                                toast.success(message);
                                fetchTasks();
                            },
                            onError: (message) => {
                                toast.error(message);
                            },
                        });
                    }}
                />
            )}
        </div>
    );
}