// pages/api/check-value.js
import fs from 'fs';
import path from 'path';
import CryptoJS from 'crypto-js';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { value } = req.body;

    // Lire le fichier du serveur contenant la valeur de comparaison
    const filePath = path.resolve(process.cwd(), 'data/secret-value.txt');
    const storedValue = fs.readFileSync(filePath, 'utf-8').trim();
    const hashedValue = CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
    // Comparer l'entrée utilisateur avec la valeur stockée
    if (hashedValue === storedValue) {
      res.status(200).json({ message: 'Valeur correcte !'+hashedValue});
    } else {
      res.status(200).json({ message: 'Valeur incorrecte.'+hashedValue});
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée.' });
  }
}
