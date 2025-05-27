// functions/parsePdf.ts
import express from 'express';
import cors from 'cors';
import { onRequest } from 'firebase-functions/v2/https';
import type { Request, Response } from 'express';
import pdfParse from 'pdf-parse';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '10mb' }));

app.post('/', async (req: Request, res: Response) => {
  const { fileBase64 } = req.body;

  if (!fileBase64) {
    return res
      .status(400)
      .json({ error: 'Missing fileBase64 in request body' });
  }

  try {
    const buffer = Buffer.from(fileBase64, 'base64');
    const parsed = await pdfParse(buffer);
    return res.status(200).json({ text: parsed.text });
  } catch (err) {
    console.error('PDF parsing failed:', err);
    return res.status(500).json({ error: 'PDF parsing failed' });
  }
});

export const parsePdf = onRequest(app);
