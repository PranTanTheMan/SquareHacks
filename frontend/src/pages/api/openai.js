// pages/api/openai.js
import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const { message } = req.body;
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-3.5-turbo',
      });

      const botMessage = chatCompletion.choices[0].message.content;
      res.status(200).json({ botMessage });
    } catch (error) {
      console.error('OpenAI API error:', error);
      res.status(500).json({ message: 'Failed to fetch response from OpenAI' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}