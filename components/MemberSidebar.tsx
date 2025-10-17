'use client';

import { Button } from '@/components/ui/button';
import { LayoutDashboard, FolderKanban, ListTodo, Bell, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useLogout } from '@/lib/helper/auth';

export default function MemberSidebar() {
    const pathname = usePathname();
    const navItems = [
        { href: '/member/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/member/projects', label: 'Projects', icon: FolderKanban },
        { href: '/member/tasks', label: 'Tasks', icon: ListTodo },
        { href: '/member/notifications', label: 'Notifications', icon: Bell },
    ];

    const { logOut } = useLogout();

    const handleLogout = async () => {
        await logOut();
        return;
    };


    return (
        <aside className="w-64 h-full bg-white shadow-lg p-6 space-y-6 animate-in slide-in-from-left duration-500">
            <h2 className="text-2xl font-bold text-slate-900">TaskMind</h2>
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button
                            variant={pathname === item.href ? 'secondary' : 'ghost'}
                            className={cn('w-full justify-start cursor-pointer transition-colors duration-300', {
                                'bg-slate-200': pathname === item.href,
                            })}
                        >
                            <item.icon className="w-5 h-5 mr-2" />
                            {item.label}
                        </Button>
                    </Link>
                ))}
                <Button
                    variant="ghost"
                    className="w-full justify-start cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-300"
                    onClick={handleLogout}
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                </Button>
            </nav>
        </aside>
    );
}