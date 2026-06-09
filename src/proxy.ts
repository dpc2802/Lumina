import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  // If the user is trying to access the admin area
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('lumina_admin_session');

    // If the cookie is not present or invalid, redirect to login
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If the user is trying to access the login page but is already logged in, redirect to admin
  if (request.nextUrl.pathname === '/login') {
    const authCookie = request.cookies.get('lumina_admin_session');
    if (authCookie && authCookie.value === 'authenticated') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/login'],
};
