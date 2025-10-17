'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function TaskAssignment() {
    const tasks = [
        { id: 1, title: 'Design Homepage', project: 'Website Redesign', assignedTo: 'John Doe', status: 'In Progress' },
        { id: 2, title: 'API Integration', project: 'Mobile App', assignedTo: 'Unassigned', status: 'Pending' },
    ];

    const handleAssignTask = (taskId: number) => {
        toast.success(`Task ${taskId} assignment attempt`, {
            description: 'This is a static demo. Task assignment not implemented.',
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Task Assignment</h2>
                <Button className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                    <Card key={task.id} className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300">
                        <CardHeader>
                            <CardTitle className="text-slate-900">{task.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">Project: {task.project}</p>
                            <p className="text-sm text-slate-600">Assigned To: {task.assignedTo}</p>
                            <p className="text-sm text-slate-600">Status: {task.status}</p>
                            {task.assignedTo === 'Unassigned' && (
                                <Button
                                    variant="outline"
                                    className="mt-4 cursor-pointer transition-colors duration-300"
                                    onClick={() => handleAssignTask(task.id)}
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Assign Task
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}