'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MemberProjects() {
    const projects = [
        { id: 1, name: 'Website Redesign', status: 'Active', role: 'Developer' },
        { id: 2, name: 'Mobile App', status: 'In Progress', role: 'Designer' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id} className="transition-transform duration-300 hover:scale-105">
                        <CardHeader>
                            <CardTitle className="text-slate-900">{project.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">Status: {project.status}</p>
                            <p className="text-sm text-slate-600">Role: {project.role}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}