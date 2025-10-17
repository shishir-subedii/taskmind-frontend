import MemberSidebar from '@/components/MemberSidebar';
import MemberHeader from '@/components/MemberHeader';

export default function MemberLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <div className="hidden md:block">
                <MemberSidebar />
            </div>
            <div className="flex-1 flex flex-col">
                <MemberHeader />
                <main className="flex-1 p-6 bg-slate-100">{children}</main>
            </div>
        </div>
    );
}