// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/jwt';
import cookie from 'cookie';

export async function GET(request: NextRequest) {
	const cookies = cookie.parse(request.headers.get('cookie') || '');
	const token = cookies.token;
	if (!token || !verifyToken(token)) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	return NextResponse.json({ message: 'Protected data' });
}
