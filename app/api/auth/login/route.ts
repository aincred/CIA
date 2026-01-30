// import { NextResponse } from 'next/server';
// import { SignJWT } from 'jose';
// import { cookies } from 'next/headers';

// // SECRET KEY: In production, store this in your .env file!
// const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key-32-chars-long');

// export async function POST(request: Request) {
//   try {
//     const { email, password } = await request.json();

//     // 1. Validate Credentials (Replace with Database call)
//     if (email !== "admin@ciacademy.in" || password !== "admin123") {
//       return NextResponse.json(
//         { message: "Invalid credentials or unauthorized uplink." },
//         { status: 401 }
//       );
//     }

//     // 2. Create JWT Token
//     const token = await new SignJWT({ role: 'admin', email })
//       .setProtectedHeader({ alg: 'HS256' })
//       .setIssuedAt()
//       .setExpirationTime('2h') // Token expires in 2 hours
//       .sign(JWT_SECRET);

//     // 3. Set HttpOnly Cookie (The "Breach-Proof" part)
//     // This cookie cannot be accessed by JavaScript on the client
//     (await cookies()).set('admin_token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Only send over HTTPS
//       sameSite: 'strict', // Prevents CSRF attacks
//       maxAge: 60 * 60 * 2, // 2 hours in seconds
//       path: '/',
//     });

//     return NextResponse.json({ success: true });

//   } catch (error) {
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { db } from '@/lib/db'; // IMPORT YOUR DB CONNECTION HERE
import { admins } from '@/lib/schema'; // Import your schema
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key-32-chars-long');

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Fetch admin from Database
    const existingAdmin = await db
      .select()
      .from(admins)
      .where(eq(admins.email, email))
      .limit(1);

    // If no admin found with that email
    if (existingAdmin.length === 0) {
      return NextResponse.json(
        { message: "Access Denied: Invalid credentials." },
        { status: 401 }
      );
    }

    const admin = existingAdmin[0];

    // 2. Compare the provided password with the stored Hash
    const passwordIsValid = await bcrypt.compare(password, admin.passwordHash);

    if (!passwordIsValid) {
      return NextResponse.json(
        { message: "Access Denied: Invalid credentials." },
        { status: 401 }
      );
    }

    // 3. Create JWT Token
    const token = await new SignJWT({ 
        role: 'admin', 
        id: admin.id, 
        email: admin.email 
      })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(JWT_SECRET);

    // 4. Set HttpOnly Cookie
    (await cookies()).set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}