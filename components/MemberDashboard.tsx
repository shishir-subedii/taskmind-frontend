'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MemberDashboard() {
    const stats = [
        { title: 'Assigned Projects', value: '3', change: '+1 this month' },
        { title: 'Active Tasks', value: '8', change: '+2 today' },
        { title: 'Notifications', value: '5', change: '2 unread' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-900">Member Dashboard</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index} className="transition-transform duration-300 hover:scale-105">
                        <CardHeader>
                            <CardTitle className="text-slate-900">{stat.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                            <p className="text-sm text-slate-600">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}