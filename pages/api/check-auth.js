import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const secret = 'votre_secret';

export default function handler(req, res) {
  const { auth } = parse(req.headers.cookie || '');

  if (!auth) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    jwt.verify(auth, secret);
    return res.status(200).json({ authenticated: true });
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
}