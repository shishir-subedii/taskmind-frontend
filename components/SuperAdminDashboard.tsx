'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SuperAdminDashboard() {
    const stats = [
        { title: 'Total Projects', value: '12', change: '+2 this month' },
        { title: 'Active Tasks', value: '45', change: '+5 today' },
        { title: 'Users', value: '8', change: '+1 this week' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-900">SuperAdmin Dashboard</h2>
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