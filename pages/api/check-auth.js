import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { parse } from 'cookie';

const filePath = path.resolve(process.cwd(), 'data/secret-value.txt');
const storedValue = fs.readFileSync(filePath, 'utf-8').trim();

export default function handler(req, res) {
  const { auth } = parse(req.headers.cookie || '');

  if (!auth) {
    return res.status(401).json({ authenticated: false, message: auth+" pas de cookie! ->"+storedValue });
  }

  try {
    jwt.verify(auth, storedValue);
    return res.status(200).json({ authenticated: true, message: auth+"=="+storedValue });
  } catch (err) {
    return res.status(401).json({ authenticated: false, message: auth+"!="+storedValue  });
  }
}