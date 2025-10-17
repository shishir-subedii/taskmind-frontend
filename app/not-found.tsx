import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="text-center space-y-6 animate-in fade-in duration-500">
                <h1 className="text-5xl font-bold text-slate-900">404</h1>
                <p className="text-xl text-slate-600">Page Not Found</p>
                <p className="text-slate-500">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                <Link href="/login">
                    <Button className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Login
                    </Button>
                </Link>
            </div>
        </main>
    );
}