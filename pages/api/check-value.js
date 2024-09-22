// pages/api/check-value.js
import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { value } = req.body;

    // Lire le fichier du serveur contenant la valeur de comparaison
    const filePath = path.resolve(process.cwd(), 'data/secret-value.txt');
    const storedValue = fs.readFileSync(filePath, 'utf-8').trim();
    const hashedValue = CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
    // Comparer l'entrée utilisateur avec la valeur stockée
    if (hashedValue === storedValue) {
      const token = jwt.sign({ user: 'authenticated' }, hashedValue, { expiresIn: '7d' });
      res.setHeader('Set-Cookie', serialize('auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        sameSite: 'strict',
        path: '/'
      }));
      res.status(200).json({ message: 'Valeur correcte ! <a href="protected">Accéder à l\'interface</a>'});
    } else {
      res.status(200).json({ message: 'Valeur incorrecte.'});
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée.' });
  }
}
