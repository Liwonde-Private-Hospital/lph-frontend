import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from "iron-session";
import { sessionOptions } from "./lib";
import { CustomIronSession } from './types';

// Define the matcher to apply middleware to all routes starting with '/departments/'
export const config = {
    matcher: '/departments/:path*',
};

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const response = NextResponse.next();
    // Extract the department from the URL
    const department = url.pathname.split('/')[2];

    // Get session data
    const session = await getIronSession(request, response, sessionOptions(department)) as CustomIronSession;


    const { isLoggedIn, role } = session as { isLoggedIn: boolean, role?: string };


    // If user is not logged in, redirect to login
    if (!isLoggedIn) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    
    // If user is logged in but not authorized, redirect to access denied
    if (role !== department) {
        url.pathname = '/access-denied';
        return NextResponse.redirect(url);
    }

    // Allow the request to proceed if the user is authenticated and authorized
    return response;
}
