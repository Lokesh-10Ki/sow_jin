// lib/jwt.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export function generateToken(userId: string) {
  	return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
	try {
		return jwt.verify(token, SECRET_KEY);
	} catch (err) {
		return null;
	}
}
