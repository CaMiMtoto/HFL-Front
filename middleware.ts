import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

// Define paths where authentication is required or not allowed
const protectedRoutes = ['/dashboard', '/profile'];
const authRoutes = ['/login', '/register'];

export function middleware(req: NextRequest) {
    const token = req.cookies.get('authToken')?.value;

    // Check if the user is trying to access a protected route
    if (protectedRoutes.some(path => req.nextUrl.pathname.startsWith(path))) {
        if (!token) {
            // Redirect to login if the user is not authenticated
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // If the user is authenticated and tries to access login-related pages, redirect to dashboard
    if (authRoutes.some(path => req.nextUrl.pathname.startsWith(path))) {
        if (token) {
            return NextResponse.redirect(new URL('/client/dashboard', req.url));
        }
    }

    // Continue with the request if no conditions are met
    return NextResponse.next();
}

// Define which routes should run this middleware
export const config = {
    matcher: ['/client/:path*', '/login', '/register'],
};
