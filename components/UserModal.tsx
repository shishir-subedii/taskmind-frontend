'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { userRepo } from '@/lib/repo/userRepo';

interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: { name: string; role: string; email: string; password: string; confirmPassword: string }) => void;
    user: User | null;
}

export default function UserModal({ isOpen, onClose, onSubmit, user }: UserModalProps) {
    const [name, setName] = useState(user?.name || '');
    const [role, setRole] = useState('MEMBER');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () => {
        if (!user && (!name || !role || !email || !password || !confirmPassword)) {
            toast.error('All fields are required for creating a user');
            return;
        }
        if (!user && password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        onSubmit({ name, role, email, password, confirmPassword });
    };

    const handleDeleteUser = () => {
        if (!user) return;
        userRepo.deleteUserBySuperAdmin({
            email: user.email,
            onSuccess: (message) => {
                toast.success(message);
                onClose();
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{user ? user.name : 'Create User'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-4">
                        <h3 className="text-lg font-semibold text-slate-900">User Details</h3>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                placeholder="Enter user name"
                                disabled={!!user}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">Role</Label>
                            <Input
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="col-span-3"
                                placeholder="Enter role (e.g., MEMBER, MANAGER)"
                                disabled={!!user}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-3"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="col-span-3"
                                placeholder={user ? 'Enter new password (optional)' : 'Enter password'}
                            />
                        </div>
                        {!user && (
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="confirmPassword" className="text-right">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Confirm password"
                                />
                            </div>
                        )}
                    </div>
                    {user && (
                        <div className="grid gap-4">
                            <h3 className="text-lg font-semibold text-slate-900">Metadata</h3>
                            <p className="text-sm text-slate-600">Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                            <p className="text-sm text-slate-600">Updated: {new Date(user.updatedAt).toLocaleDateString()}</p>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>
                    {user && (
                        <Button
                            variant="destructive"
                            className="cursor-pointer transition-colors duration-300"
                            onClick={handleDeleteUser}
                        >
                            <Trash className="w-4 h-4 mr-2" />
                            Delete User
                        </Button>
                    )}
                    <Button
                        onClick={handleSubmit}
                        className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                    >
                        {user ? 'Update User' : 'Create User'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}