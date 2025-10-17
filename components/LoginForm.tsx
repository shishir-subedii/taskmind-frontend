'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        toast('Login attempt', {
            description: 'This is a static demo. Login not implemented.',
        });
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg animate-in fade-in duration-700">
            <h1 className="text-3xl font-bold text-center text-slate-900">TaskMind</h1>
            <p className="text-center text-slate-600">Sign in to manage your projects</p>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="transition-all duration-300 focus:ring-2 focus:ring-slate-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="transition-all duration-300 focus:ring-2 focus:ring-slate-500"
                    />
                </div>
                <Button
                    onClick={handleSubmit}
                    className="w-full cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                </Button>
            </div>
        </div>
    );
}