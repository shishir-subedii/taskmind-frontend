'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function TeamManagement() {
    const teamMembers = [
        { id: 1, name: 'John Doe', role: 'Developer', tasksAssigned: 5 },
        { id: 2, name: 'Jane Smith', role: 'Designer', tasksAssigned: 3 },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-900">Team Management</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                    <Card key={member.id} className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-3 text-slate-900">
                                <Avatar>
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{member.name}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">Role: {member.role}</p>
                            <p className="text-sm text-slate-600">Tasks Assigned: {member.tasksAssigned}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}