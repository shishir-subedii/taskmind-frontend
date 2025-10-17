'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface UserCardProps {
    user: User;
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <Card className="transition-transform duration-300 hover:scale-105">
            <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-slate-900">
                    <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-slate-600">Email: {user.email}</p>
                <p className="text-sm text-slate-600">Role: {user.role}</p>
                <div className="flex space-x-2 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer transition-colors duration-300"
                        onClick={() => { }}
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer transition-colors duration-300"
                        onClick={() => { }}
                    >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}