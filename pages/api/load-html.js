// pages/api/load-html.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Spécifiez le chemin du fichier HTML
  const filePath = path.join(process.cwd(), 'pages', 'board.html'); // Assurez-vous que le fichier existe

  // Lire le contenu du fichier
  fs.readFile(filePath, 'utf-8', (err, htmlContent) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier HTML:", err);
      return res.status(500).json({ error: 'Erreur de lecture du fichier HTML' });
    }

    // Envoyer le contenu HTML dans la réponse
    res.status(200).send(htmlContent);
  });
}
