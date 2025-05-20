// /pages/api/chat.js

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    const response = chatCompletion.choices[0]?.message?.content || 'No response';
    res.status(200).json({ reply: response });
  } catch (error) {
    console.error('Error in OpenAI request:', error);
    res.status(500).json({ error: 'Something went wrong with OpenAI' });
  }
}
