// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;

	if (token) {
		try {
			// Verify the JWT token
			await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
			return NextResponse.next();
		} catch (error) {
			console.error('Token verification failed:', error);
		}
	}

	// Redirect to login if verification fails or token is missing
	return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/protected/:path*'], // Update with the routes you want to protect
};
