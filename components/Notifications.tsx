'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';

export default function Notifications() {
    const notifications = [
        { id: 1, message: 'New task assigned: Design Homepage', date: '2025-10-16', read: false },
        { id: 2, message: 'Project Mobile App updated', date: '2025-10-15', read: true },
    ];

    const handleMarkAsRead = (id: number) => {
        toast.success('Marked as read', {
            description: `Notification ${id} marked as read. This is a static demo.`,
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
            <div className="space-y-4">
                {notifications.map((notification) => (
                    <Card
                        key={notification.id}
                        className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300"
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-slate-900">
                                <span>{notification.message}</span>
                                {!notification.read && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => handleMarkAsRead(notification.id)}
                                    >
                                        <Bell className="w-4 h-4" />
                                    </Button>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">Date: {notification.date}</p>
                            <p className="text-sm text-slate-600">
                                Status: {notification.read ? 'Read' : 'Unread'}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}