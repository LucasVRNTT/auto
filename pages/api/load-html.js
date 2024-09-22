// pages/api/load-html.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve(process.cwd(), 'pages/board.html');
  const htmlContent = fs.readFileSync(filePath, 'utf-8');
  
  res.status(200).send(htmlContent);
}