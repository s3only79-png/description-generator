import OpenAI from 'openai';
import { VISION_PROMPT, MANUAL_CONVERSION_PROMPT } from '../src/app/constants';

// Vercel Serverless Function
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mode, image, manualInputs } = req.body;

  // OpenAI API 키 확인
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  const openai = new OpenAI({ apiKey });

  try {
    let prompt = '';
    let messages: any[] = [];

    if (mode === 'image' && image) {
      // Vision 모드: 이미지 분석
      messages = [
        {
          role: 'user',
          content: [
            { type: 'text', text: VISION_PROMPT },
            {
              type: 'image_url',
              image_url: {
                url: image // base64 이미지
              }
            }
          ]
        }
      ];
    } else if (mode === 'manual' && manualInputs) {
      // 수동 입력 모드: 테이블 데이터를 디스크립션으로 변환
      const inputsText = manualInputs
        .map((input: any, index: number) => {
          return `### 요소 ${index + 1}
- 기능명: ${input.functionName}
- 타입: ${input.type}
- 기능 설명: ${input.description}`;
        })
        .join('\n\n');

      prompt = `${MANUAL_CONVERSION_PROMPT}\n\n# 입력 데이터\n\n${inputsText}`;

      messages = [
        {
          role: 'user',
          content: prompt
        }
      ];
    } else {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: mode === 'image' ? 'gpt-4o-mini' : 'gpt-4o-mini',
      messages,
      max_tokens: 2000,
      temperature: 0.3
    });

    const content = response.choices[0].message.content || '';

    // [보완 필요] 항목 추출
    const gaps = content.match(/\[보완 필요:([^\]]+)\]/g)?.map(match =>
      match.replace('[보완 필요:', '').replace(']', '').trim()
    ) || [];

    return res.status(200).json({
      content,
      gaps
    });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({
      error: 'Failed to generate draft',
      message: error.message
    });
  }
}
