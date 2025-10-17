'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TaskPriority, TaskStatus } from '@/lib/repo/memberRepo';

interface Task {
    id: string;
    priority: TaskPriority;
    title: string;
    description: string;
    projectId: string;
    assignedToId: string;
    assets: string[];
    deadline: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
}

interface TaskDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
    onClockIn: () => void;
    onClockOut: () => void;
}

export default function TaskDetailsModal({ isOpen, onClose, task, onClockIn, onClockOut }: TaskDetailsModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-4">
                        <h3 className="text-lg font-semibold text-slate-900">Task Details</h3>
                        <p className="text-sm text-slate-600">Description: {task.description}</p>
                        <p className="text-sm text-slate-600">Priority: {task.priority}</p>
                        <p className="text-sm text-slate-600">Status: {task.status}</p>
                        <p className="text-sm text-slate-600">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                        <p className="text-sm text-slate-600">
                            Assets: {task.assets?.length ? task.assets.join(', ') : 'None'}
                        </p>
                        <p className="text-sm text-slate-600">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                        <p className="text-sm text-slate-600">Updated: {new Date(task.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        Close
                    </Button>
                    <Button
                        className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                        onClick={onClockIn}
                        disabled={task.status !== TaskStatus.ASSIGNED}
                    >
                        Clock In
                    </Button>
                    <Button
                        className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                        onClick={onClockOut}
                        disabled={task.status !== TaskStatus.IN_PROGRESS}
                    >
                        Clock Out
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}