import OpenAI from 'openai';
import { EXPERT_REVIEW_PROMPT } from '../src/app/constants';

// Vercel Serverless Function
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { draft } = req.body;

  if (!draft) {
    return res.status(400).json({ error: 'Draft is required' });
  }

  // OpenAI API 키 확인
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const openai = new OpenAI({ apiKey });

  try {
    const prompt = `${EXPERT_REVIEW_PROMPT}\n\n# 검토할 초안\n\n${draft}`;

    const messages = [
      {
        role: 'user',
        content: prompt
      }
    ];

    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 2000,
      temperature: 0.4
    });

    const content = response.choices[0].message.content || '';

    return res.status(200).json({
      content
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({
      error: 'Failed to generate expert review',
      message: error.message
    });
  }
}
