'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { userRepo } from '@/lib/repo/userRepo';
import UserModal from '@/components/UserModal';

interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export default function SuperAdminUserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUsers = async () => {
        userRepo.getAllUsers({
            onSuccess: (data) => {
                setUsers(data);
                toast.success('Users fetched successfully');
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    const handleCreateUser = (payload: {
        name: string;
        role: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => {
        userRepo.register({
            ...payload,
            onSuccess: (message) => {
                toast.success(message);
                fetchUsers();
                setIsModalOpen(false);
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
                <Button
                    className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                    onClick={() => {
                        setSelectedUser(null);
                        setIsModalOpen(true);
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create User
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300 cursor-pointer"
                        onClick={() => {
                            setSelectedUser(user);
                            setIsModalOpen(true);
                        }}
                    >
                        <CardHeader>
                            <CardTitle className="text-slate-900">{user.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">Email: {user.email}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <UserModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedUser(null);
                }}
                user={selectedUser}
                onSubmit={(payload) => {
                    if (selectedUser) {
                        // Update email or password
                        if (payload.email && payload.email !== selectedUser.email) {
                            userRepo.changeEmailBySuperAdmin({
                                oldEmail: selectedUser.email,
                                newEmail: payload.email,
                                onSuccess: (message) => {
                                    toast.success(message);
                                    fetchUsers();
                                    setIsModalOpen(false);
                                    setSelectedUser(null);
                                },
                                onError: (message) => {
                                    toast.error(message);
                                },
                            });
                        }
                        if (payload.password) {
                            userRepo.changePasswordBySuperAdmin({
                                email: selectedUser.email,
                                newPassword: payload.password,
                                onSuccess: (message) => {
                                    toast.success(message);
                                    fetchUsers();
                                    setIsModalOpen(false);
                                    setSelectedUser(null);
                                },
                                onError: (message) => {
                                    toast.error(message);
                                },
                            });
                        }
                    } else {
                        handleCreateUser(payload);
                    }
                }}
            />
        </div>
    );
}