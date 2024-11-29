import {NextResponse} from 'next/server';

export async function GET() {
    // Create a new response
    const response = NextResponse.json({message: 'Logout successful'});

    // Clear the cookie by setting its expiration to a past date
    response.cookies.set('token', '', {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie immediately
        path: '/',
    });

    return response;
}
