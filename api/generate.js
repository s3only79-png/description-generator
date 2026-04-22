export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // 핵심 수정
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: req.body.messages
      })
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
