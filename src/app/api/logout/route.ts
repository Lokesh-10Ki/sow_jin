import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
	try {

		const cookieHeader = serialize("token", '', {
			httpOnly: true,
			maxAge: -1,
			path: "/",
		});

		const response = NextResponse.json({ success: true }, {status: 200});
		response.headers.set("Set-Cookie", cookieHeader);

		return response;
	} catch (error) {
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}
}