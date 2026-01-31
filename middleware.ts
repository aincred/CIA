import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key-32-chars-long');

export async function middleware(req: NextRequest) {
  // 1. Check if the user is trying to access admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Get the token from cookies
    const token = req.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // 3. Verify the token signature
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      // Token is fake or expired
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// Apply this middleware only to admin routes
export const config = {
  matcher: '/admin/:path*',
};