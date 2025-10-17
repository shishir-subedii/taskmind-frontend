import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const role = request.cookies.get('role')?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/member')) {
        if (!token || role !== 'MEMBER') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (pathname.startsWith('/superadmin')) {
        if (!token || role !== 'SUPERADMIN') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (pathname.startsWith('/manager')) {
        if (!token || role !== 'MANAGER') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/member/:path*', '/superadmin/:path*', '/manager/:path*'],
};
