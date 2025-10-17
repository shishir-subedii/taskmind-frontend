'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, Settings, LogOut, Menu } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import ManagerSidebar from '@/components/ManagerSidebar';
import { useLogout } from '@/lib/helper/auth';

export default function ManagerHeader() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logOut } = useLogout();

    const handleLogout = async () => {
        await logOut();
        return;
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden cursor-pointer"
                        onClick={toggleSidebar}
                    >
                        <Menu className="w-6 h-6" />
                    </Button>
                    <h1 className="text-xl font-semibold text-slate-900">Manager Panel</h1>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="cursor-pointer">
                            <Avatar>
                                <AvatarFallback>MA</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="animate-in fade-in duration-300">
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="w-4 h-4 mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <div
                className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleSidebar}
            />
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <ManagerSidebar />
            </div>
        </>
    );
}