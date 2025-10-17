'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function MemberTasks() {
    const tasks = [
        { id: 1, title: 'Design Homepage', project: 'Website Redesign', status: 'In Progress', clockedIn: true },
        { id: 2, title: 'API Integration', project: 'Mobile App', status: 'Pending', clockedIn: false },
    ];

    const handleClockInOut = (taskId: number, clockedIn: boolean) => {
        toast(`${clockedIn ? 'Clocked out from' : 'Clocked into'} task ${taskId}`, {
            description: 'This is a static demo. Clock-in/out not implemented.',
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-900">Tasks</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                    <Card key={task.id} className="transition-transform duration-300 hover:scale-105">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-slate-900">
                                {task.title}
                                <Badge variant={task.clockedIn ? 'default' : 'secondary'}>
                                    {task.clockedIn ? 'Clocked In' : 'Clocked Out'}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">Project: {task.project}</p>
                            <p className="text-sm text-slate-600">Status: {task.status}</p>
                            <Button
                                variant={task.clockedIn ? 'outline' : 'default'}
                                className="mt-4 cursor-pointer transition-colors duration-300"
                                onClick={() => handleClockInOut(task.id, task.clockedIn)}
                            >
                                {task.clockedIn ? (
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                ) : (
                                    <Clock className="w-4 h-4 mr-2" />
                                )}
                                {task.clockedIn ? 'Clock Out' : 'Clock In'}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}