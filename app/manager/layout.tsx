import ManagerSidebar from '@/components/ManagerSidebar';
import ManagerHeader from '@/components/ManagerHeader';

export default function ManagerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <div className="hidden md:block">
                <ManagerSidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <ManagerHeader />
                <main className="flex-1 p-6 bg-slate-100">{children}</main>
            </div>
        </div>
    );
}