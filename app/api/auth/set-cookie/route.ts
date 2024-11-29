import { NextRequest, NextResponse } from 'next/server';
// import { setCookie } from 'cookies-next';

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    if (!token) {
        return NextResponse.json({ message: 'Token is missing' }, { status: 400 });
    }

    // Set the cookie with secure options
    const response = NextResponse.json({ message: 'Cookie set successfully' });

    // Set cookie directly on the response (in app router you manipulate headers directly)
    response.cookies.set('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        secure: process.env.NODE_ENV === 'production',  // Only send cookie over HTTPS in production
        sameSite: 'strict', // Protects against CSRF attacks
    });

    return response;
}
