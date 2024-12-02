import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import prisma from "@/src/lib/prisma"

const JWT_SECRET = process.env.JWT_SECRET ?? ""
const TOKEN_URL = `https://login.microsoftonline.com/${process.env.AZURE_AUTH_TENANT_ID}/oauth2/v2.0/token`
const CLIENT_ID = process.env.AZURE_AUTH_CLIENT_ID as string
const CLIENT_SECRET = process.env.AZURE_AUTH_SECRET_KEY as string

export async function POST(request: NextRequest) {
	try {
		
		const { code, redirectUri } = await request.json()

		if (!code || !redirectUri) {
			return NextResponse.json(
				{ error: "Missing code or redirectUri" },
				{ status: 400 }
			)
		}

		const tokenResponse = await fetch(TOKEN_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code: code,
				redirect_uri: redirectUri,
				grant_type: "authorization_code",
				scope: "openid profile user.read email",
			}).toString(),
		})

		if (!tokenResponse.ok) {
			const errorData = await tokenResponse.json()
			return NextResponse.json(
				{ error: errorData.error_description || "An error occurred" },
				{ status: tokenResponse.status }
			)
		}

		const responses = await tokenResponse.json()
		const access_token = responses?.access_token

		const userResponse = await fetch(
			"https://graph.microsoft.com/v1.0/me",
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		)

		const headshotResponse = await fetch(
			"https://graph.microsoft.com/v1.0/me/photo/$value",
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		)

		const headshotBuffer = await headshotResponse.arrayBuffer()
		const headshotBase64 = Buffer.from(headshotBuffer).toString("base64")

		if (!userResponse.ok) {
			const errorData = await userResponse.json()
			return NextResponse.json(
				{
					error:
						errorData.error.message ||
						"Failed to fetch user details",
				},
				{ status: userResponse.status }
			)
		}

		const dataAuth = await userResponse.json()

		if (dataAuth?.error) {
			return NextResponse.json(
				{ success: false, message: "Not authenticated" },
				{ status: 401 }
			)
		}

		const { id, mail, displayName, jobTitle } = dataAuth

		let user = await prisma.user.findUnique({
			where: { email: mail },
		})

		if (!user) {
			user = await prisma.user.create({
				data: {
					
					name: displayName,
					email: mail
				},
			})
		}

		const payload = {
			
			email: user?.email,
			name: user?.name,
			
		}

		const jwtToken = jwt.sign(payload, JWT_SECRET!, { expiresIn: "3d", algorithm: "HS256" })

		dataAuth.headshot = headshotBase64

		const response = NextResponse.json(
			{ success: true, dataAuth, token: jwtToken },
			{ status: 200 }
		)
		cookies().set("token", jwtToken)

		return response
	} catch (error) {
		console.log(error)
		return NextResponse.json(
			{ success: false, error, message: "Internal server error" },
			{ status: 500 }
		)
	}
}
