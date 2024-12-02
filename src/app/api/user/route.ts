import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request: NextRequest) {
	try {
		const users = await prisma.user.findMany();
		return NextResponse.json(users);
	} catch (error) {
		console.error('Error fetching users:', error);
		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const { email, name } = await request.json();

		if (!email || !name) {
			return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
		}

		const user = await prisma.user.create({
			data: {
				email,
				name,
			},
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
	}
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: { Allow: 'GET, POST' } });
}
