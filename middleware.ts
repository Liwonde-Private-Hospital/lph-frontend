import { NextRequest, NextResponse } from 'next/server';

// Define protected paths and roles
const protectedPaths: Record<string, string> = {
  '/departments/admin': 'admin',
  '/departments/Backstore': 'Backstore',
  '/departments/Dental': 'Dental',
  '/departments/Finance': 'Finance',
  '/departments/Lab': 'Lab',
  '/departments/Maternity': 'Maternity',
  '/departments/OPD': 'OPD',
  '/departments/Pharmacy': 'pharmacist',
  '/departments/Reception': 'Reception',
  '/departments/Vitals': 'Vitals',
  '/departments/X-Ray': 'X-Ray',
};

export function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = cookieHeader.split(';').reduce((acc: Record<string, string>, cookie) => {
    const [key, value] = cookie.split('=').map(part => part.trim());
    if (key && value) acc[key] = value;
    return acc;
  }, {});

  const authCookie = Object.keys(cookies).find(key => key.startsWith('isAuthenticated-'));
  const isAuthenticated = Boolean(authCookie);
  const userDepartment = authCookie ? authCookie.split('-')[1] : null;

  const requestPath = request.nextUrl.pathname;
  const basePath = Object.keys(protectedPaths).find(path => requestPath.startsWith(path));

  if (basePath) {
    const requiredRole = protectedPaths[basePath];

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (userDepartment !== requiredRole) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/departments/:path*'],
};
