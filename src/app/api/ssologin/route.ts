import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const { JWT_SECRET_KEY } = process.env;

export async function GET(request: NextRequest) {
	try {
		// Extract session from the request
		const token = await getToken({ req: request });

		if (!token) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		const accessToken = token.accessToken;

		// Fetch user details from Microsoft Graph API
		const responseAuth = await fetch("https://graph.microsoft.com/v1.0/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!responseAuth.ok) {
			throw new Error('Failed to fetch user details');
		}

		const dataAuth = await responseAuth.json();

		// Generate JWT
		const payload = {
			id: dataAuth.id,
			name: dataAuth.displayName,
			email: dataAuth.mail,
			jobTitle: dataAuth.jobTitle,
			mobilePhone: dataAuth.mobilePhone,
		};

		if (!JWT_SECRET_KEY) {
			throw new Error('JWT secret key is not defined');
		}

		const jwt_token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

		// Create response and set cookie
		const response = NextResponse.json({ dataAuth });
		const cookieHeader = cookie.serialize('token', jwt_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24,
			path: '/',
		});
		response.headers.append('Set-Cookie', cookieHeader);

		return response;
	} catch (error) {
		console.error('Authentication failed:', error);
		return NextResponse.json({ error: error || 'Authentication failed' }, { status: 500 });
	}
}
