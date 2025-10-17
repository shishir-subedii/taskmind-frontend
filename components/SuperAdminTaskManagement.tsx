'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function SuperAdminTaskManagement() {
    const tasks = [
        { id: 1, title: 'Design Homepage', project: 'Website Redesign', status: 'In Progress' },
        { id: 2, title: 'API Integration', project: 'Mobile App', status: 'Pending' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Task Management</h2>
                <Button className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                    <Card key={task.id} className="transition-transform duration-300 hover:scale-105">
                        <CardHeader>
                            <CardTitle className="text-slate-900">{task.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">Project: {task.project}</p>
                            <p className="text-sm text-slate-600">Status: {task.status}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}