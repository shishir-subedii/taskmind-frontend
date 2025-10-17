import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <div className="hidden md:block">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 bg-slate-100">{children}</main>
            </div>
        </div>
    );
}