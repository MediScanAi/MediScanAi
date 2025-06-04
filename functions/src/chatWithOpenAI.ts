import express from 'express';
import cors from 'cors';
import { onRequest } from 'firebase-functions/v2/https';
import axios from 'axios';
import * as dotenv from 'dotenv';
import type { Request, Response } from 'express';

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post('/', async (req: Request, res: Response) => {
  const userMessages = req.body.messages;

  if (!userMessages || !Array.isArray(userMessages)) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  const systemMessage = {
    role: 'system',
    content:
      'You are a helpful AI medical assistant. You are allowed to analyze lab results and suggest likely causes or conditions, but you always mention that it is not a substitute for a medical consultation.',
  };

  const messages = [systemMessage, ...userMessages];

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    return res.status(200).json(response.data);
  } catch (err) {
    console.error('OpenAI request failed:', err);
    return res.status(500).json({ error: 'OpenAI request failed' });
  }
});
export const chatWithOpenAI = onRequest(app);

