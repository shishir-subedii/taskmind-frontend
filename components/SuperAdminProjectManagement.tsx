'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function SuperAdminProjectManagement() {
    const projects = [
        { id: 1, name: 'Website Redesign', status: 'Active', tasks: 10 },
        { id: 2, name: 'Mobile App', status: 'In Progress', tasks: 8 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Project Management</h2>
                <Button className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id} className="transition-transform duration-300 hover:scale-105">
                        <CardHeader>
                            <CardTitle className="text-slate-900">{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">Status: {project.status}</p>
                            <p className="text-sm text-slate-600">Tasks: {project.tasks}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}