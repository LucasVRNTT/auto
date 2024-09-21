import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
const filePath = path.resolve(process.cwd(), 'data/secret-value.txt');
const storedValue = fs.readFileSync(filePath, 'utf-8').trim();
export default function handler(req, res) {
  const { auth } = parse(req.headers.cookie || '');

  if (!auth) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    jwt.verify(auth, storedValue);
    return res.status(200).json({ authenticated: true });
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
}