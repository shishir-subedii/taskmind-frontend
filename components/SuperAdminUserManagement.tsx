'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import UserCard from './UserCard';

export default function SuperAdminUserManagement() {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
                <Button className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}