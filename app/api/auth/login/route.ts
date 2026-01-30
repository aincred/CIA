import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

// SECRET KEY: In production, store this in your .env file!
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key-32-chars-long');

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Validate Credentials (Replace with Database call)
    if (email !== "admin@ciacademy.in" || password !== "admin123") {
      return NextResponse.json(
        { message: "Invalid credentials or unauthorized uplink." },
        { status: 401 }
      );
    }

    // 2. Create JWT Token
    const token = await new SignJWT({ role: 'admin', email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h') // Token expires in 2 hours
      .sign(JWT_SECRET);

    // 3. Set HttpOnly Cookie (The "Breach-Proof" part)
    // This cookie cannot be accessed by JavaScript on the client
    (await cookies()).set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS
      sameSite: 'strict', // Prevents CSRF attacks
      maxAge: 60 * 60 * 2, // 2 hours in seconds
      path: '/',
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}