// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtVerify } from 'jose';

// const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key-32-chars-long');

// export async function middleware(req: NextRequest) {
//   // 1. Check if the user is trying to access admin routes
//   if (req.nextUrl.pathname.startsWith('/admin')) {
    
//     // 2. Get the token from cookies
//     const token = req.cookies.get('admin_token')?.value;

//     if (!token) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     try {
//       // 3. Verify the token signature
//       await jwtVerify(token, JWT_SECRET);
//       return NextResponse.next();
//     } catch (err) {
//       // Token is fake or expired
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   return NextResponse.next();
// }

// // Apply this middleware only to admin routes
// export const config = {
//   matcher: '/admin/:path*',
// };


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Use the same secret as your route.ts
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key-32-chars-long');

export async function middleware(request: NextRequest) {
  // 1. Check if the user is trying to access an admin path
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Get the token from the cookie
    const token = request.cookies.get('admin_token')?.value;

    // 3. If no token exists, kick them to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // 4. Verify the token signature
      // If the token is fake or expired, this will throw an error
      await jwtVerify(token, JWT_SECRET);
      
      // Token is valid, let them pass
      return NextResponse.next();

    } catch (error) {
      // 5. Token is invalid/expired -> Kick to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Allow all other requests (like /api, static files, etc.)
  return NextResponse.next();
}

// Configure which paths this middleware applies to
export const config = {
  matcher: ['/admin/:path*'], // Protects /admin, /admin/dashboard, /admin/settings, etc.
};