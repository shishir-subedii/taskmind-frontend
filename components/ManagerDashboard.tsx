'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ManagerDashboard() {
    const stats = [
        { title: 'Team Projects', value: '5', change: '+1 this month' },
        { title: 'Assigned Tasks', value: '20', change: '+3 today' },
        { title: 'Team Members', value: '10', change: '+2 this week' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-900">Manager Dashboard</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index} className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300">
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