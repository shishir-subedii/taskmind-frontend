'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { memberRepo } from '@/lib/repo/memberRepo';

interface Notification {
    id: string;
    message: string;
    createdAt: string;
    isRead: boolean;
}

export default function MemberNotificationManagement() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotifications = async () => {
        memberRepo.getMyNotifications({
            onSuccess: (data) => {
                console.log('Fetched notifications:', data); // Debug log
                const notificationArray = Array.isArray(data) ? data : data.notifications || [];
                if (notificationArray.length === 0) {
                    toast.info('No notifications available');
                } else {
                    toast.success('Notifications fetched successfully');
                }
                setNotifications(notificationArray);
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    const handleMarkAsRead = (notificationId: string) => {
        memberRepo.markNotificationAsRead({
            notificationId,
            onSuccess: (message) => {
                toast.success(message || 'Notification marked as read');
                fetchNotifications();
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-900">My Notifications</h2>
            {notifications.length === 0 ? (
                <p className="text-sm text-slate-600">No notifications available.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {notifications.map((notification) => (
                        <Card
                            key={notification.id}
                            className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300"
                        >
                            <CardHeader>
                                <CardTitle className="text-slate-900">
                                    {notification.isRead ? 'Read' : 'Unread'} Notification
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600">{notification.message}</p>
                                <p className="text-sm text-slate-600">
                                    Created: {new Date(notification.createdAt).toLocaleDateString()}
                                </p>
                                {!notification.isRead && (
                                    <Button
                                        className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300 mt-4"
                                        onClick={() => handleMarkAsRead(notification.id)}
                                    >
                                        Mark as Read
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}