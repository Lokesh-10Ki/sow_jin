import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "../../../lib/jwt";
import cookie from "cookie";

export async function POST(request: NextRequest) {
	const { email, password } = await request.json();

	// Perform authentication logic here
	if (email !== "user@jmangroup.com" || password !== "12345678") {
		return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
	}

	const token = generateToken(email); // Replace 'user-id' with the actual user ID

	// Create the `Set-Cookie` header using `cookie.serialize`
	const cookieHeader = cookie.serialize("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production", // Ensure secure flag for production
		maxAge: 60 * 60 * 24, // 1 day
		path: "/", // Path should be set to '/' to make the cookie available throughout the site
	});

	// Create the response with the cookie header
	const response = NextResponse.json({
		name: "User Name",
		designation: "User Designation",
		email,
		phone: "123-456-7890",
	});

	// Append the Set-Cookie header
	response.headers.append("Set-Cookie", cookieHeader);

	return response;
}
