import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Ici, vous implémenteriez la logique d'envoi d'email
    // Pour l'exemple, nous simulons un succès
    return res.status(200).json({
      success: true,
      message: 'Verification email sent'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to send verification email'
    });
  }
}