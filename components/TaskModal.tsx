'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useState } from 'react';
import { TaskPriority } from '@/lib/repo/managerRepo';

interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    users: User[];
    onSubmit: (payload: { priority: TaskPriority; title: string; description: string; assignedToId: string; assets: string[]; deadline: string }) => void;
    onGenerateAI: (text: string) => void;
    isAIModal: boolean;
}

export default function TaskModal({ isOpen, onClose, projectId, users, onSubmit, onGenerateAI, isAIModal }: TaskModalProps) {
    const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedToId, setAssignedToId] = useState('');
    const [assets, setAssets] = useState('');
    const [deadline, setDeadline] = useState('');
    const [aiText, setAIText] = useState('');

    const handleSubmit = () => {
        if (!isAIModal) {
            if (!title || !description || !assignedToId || !deadline) {
                toast.error('Title, description, assigned user, and deadline are required');
                return;
            }
            onSubmit({
                priority,
                title,
                description,
                assignedToId,
                assets: assets ? assets.split(',').map((a) => a.trim()) : [],
                deadline,
            });
        } else {
            if (!aiText) {
                toast.error('Text input is required for AI task generation');
                return;
            }
            onGenerateAI(aiText);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isAIModal ? 'Generate Tasks with AI' : 'Create Task'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    {isAIModal ? (
                        <div className="grid gap-4">
                            <h3 className="text-lg font-semibold text-slate-900">AI Task Generation</h3>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="aiText" className="text-right">Task Description</Label>
                                <Textarea
                                    id="aiText"
                                    value={aiText}
                                    onChange={(e) => setAIText(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Enter a description for AI to generate tasks (e.g., 'Create a website with login, dashboard, and profile pages')"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            <h3 className="text-lg font-semibold text-slate-900">Task Details</h3>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">Title</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Enter task title"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Enter task description"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="priority" className="text-right">Priority</Label>
                                <Select value={priority} onValueChange={(value) => setPriority(value as TaskPriority)}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(TaskPriority).map((p) => (
                                            <SelectItem key={p} value={p}>
                                                {p}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="assignedToId" className="text-right">Assigned To</Label>
                                <Select value={assignedToId} onValueChange={setAssignedToId}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select user" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.name} ({user.email})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="assets" className="text-right">Assets</Label>
                                <Input
                                    id="assets"
                                    value={assets}
                                    onChange={(e) => setAssets(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Enter asset URLs (comma-separated)"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="deadline" className="text-right">Deadline</Label>
                                <Input
                                    id="deadline"
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    className="col-span-3"
                                    placeholder="Select deadline"
                                />
                            </div>
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
                    <Button
                        onClick={handleSubmit}
                        className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                    >
                        {isAIModal ? 'Generate Tasks' : 'Create Task'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}