import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { kv } from '@vercel/kv';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET) as { email: string };
    const storedToken = await kv.get(`verify_${decoded.email}`);

    if (storedToken !== token) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Mark email as verified
    await kv.set(`verified_${decoded.email}`, true);
    await kv.del(`verify_${decoded.email}`);

    // Redirect to the frontend with success message
    res.redirect('/login?verified=true');
  } catch (error) {
    res.redirect('/login?verified=false');
  }
}