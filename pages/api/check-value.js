// pages/api/check-value.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { value } = req.body;

    // Lire le fichier du serveur contenant la valeur de comparaison
    const filePath = path.resolve(process.cwd(), 'data/secret-value.txt');
    const storedValue = fs.readFileSync(filePath, 'utf-8').trim();

    // Comparer l'entrée utilisateur avec la valeur stockée
    if (value === storedValue) {
      res.status(200).json({ message: 'Valeur correcte !' });
    } else {
      res.status(200).json({ message: 'Valeur incorrecte.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée.' });
  }
}
