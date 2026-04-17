import OpenAI from 'openai';
import { REFINEMENT_PROMPT } from '../src/app/constants';

// Vercel Serverless Function
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { draft, plannerLogic } = req.body;

  if (!draft || !plannerLogic) {
    return res.status(400).json({ error: 'Draft and planner logic are required' });
  }

  // OpenAI API 키 확인
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const openai = new OpenAI({ apiKey });

  try {
    const prompt = `${REFINEMENT_PROMPT}\n\n## [Draft]\n${draft}\n\n## [Planner_Logic]\n${plannerLogic}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2500,
      temperature: 0.3
    });

    const content = response.choices[0].message.content || '';

    return res.status(200).json({
      content
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({
      error: 'Failed to generate final version',
      message: error.message
    });
  }
}
