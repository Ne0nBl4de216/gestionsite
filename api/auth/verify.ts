import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { kv } from '@vercel/kv';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      // Generate verification token
      const verificationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
      
      // Store token in KV store
      await kv.set(`verify_${email}`, verificationToken, { ex: 3600 }); // expires in 1 hour

      // Create verification URL
      const verificationUrl = `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/auth/confirm?token=${verificationToken}`;

      // Send verification email
      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: 'Verify your email',
        html: `
          <h1>Email Verification</h1>
          <p>Click the link below to verify your email:</p>
          <a href="${verificationUrl}">Verify Email</a>
        `
      });

      return res.status(200).json({
        success: true,
        message: 'Verification email sent'
      });
    } catch (error) {
      console.error('Verification error:', error);
      return res.status(500).json({
        error: 'Failed to send verification email'
      });
    }
  } else if (req.method === 'GET') {
    const { email } = req.query;
    
    try {
      const isVerified = await kv.get(`verified_${email}`);
      return res.status(200).json({ verified: !!isVerified });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to check verification status' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}