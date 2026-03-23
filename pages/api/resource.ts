import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file } = req.query;

  if (!file || typeof file !== 'string') {
    return res.status(400).json({ error: 'Parameter "file" is required.' });
  }

  try {
    // Intentional path traversal vulnerability
    const basePath = path.join(process.cwd(), 'assets', 'docs');
    const filePath = path.join(basePath, file);

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'text/plain');
      return res.send(content);
    } else {
      return res.status(404).json({ error: 'Resource not found.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal system failure.' });
  }
}
