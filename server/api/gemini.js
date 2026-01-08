import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const entries = req.body.entries || [];
  console.log(`/api/gemini called - entries: ${Array.isArray(entries) ? entries.length : 'invalid'}`);
  const contextText = entries.slice(0, 3).map(e => e.text).join('. ');
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // No API key configured — return a friendly fallback prompt so the frontend
    // can still show something useful during development.
    const fallback = "Write about one small thing that went well today.";
    console.warn('GEMINI_API_KEY not configured; returning fallback prompt');
    return res.json({ prompt: fallback, warning: 'GEMINI_API_KEY not configured on server' });
  }

  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  const body = {
    contents: [{
      parts: [{
        text: `Based on these recent gratitude journal entries: "${contextText}"

Generate ONE short, warm, personalized reflection prompt (max 15 words) that:
- References their specific themes
- Encourages deeper reflection
- Feels supportive and human

Respond with ONLY the prompt, nothing else.`
      }]
    }]
  };

  try {
    const response = await fetch(geminiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error('Gemini API returned non-OK:', response.status, text);
      // fallback
      const fallback = "Write about one small thing that went well today.";
      return res.json({ prompt: fallback, warning: `Gemini API error ${response.status}` });
    }

    const data = await response.json().catch(() => null);
    const prompt = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!prompt || String(prompt).trim().length < 3) {
      // Choose a deterministic fallback based on entries
      const templates = [
        "What moment today made you smile?",
        "Name someone you're thankful for and why.",
        "Recall a challenge you overcame recently.",
        "What small joy brightened your day?",
        "Describe something you learned this week.",
      ];
      const idx = (Array.isArray(entries) ? entries.length : 0) % templates.length;
      const fallback = templates[idx];
      console.warn('Gemini returned empty prompt; using fallback:', fallback);
      return res.json({ prompt: fallback, warning: 'Gemini returned empty' });
    }

    return res.json({ prompt });
  } catch (err) {
    console.error('Error calling Gemini API:', err);
    // Provide a friendly fallback so the frontend can proceed during demos.
    const fallback = "Write about one small thing that went well today.";
    res.status(200).json({ prompt: fallback, error: (err && err.message) || String(err) });
  }
});

export default router;
