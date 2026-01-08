// Vercel Serverless function that proxies requests to Google's Generative Language API.
// This is adapted from server/api/gemini.js but written for a serverless environment.

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      return res.status(200).json({ ok: true, message: 'API route ready' })
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ error: 'Method Not Allowed' })
    }

    const body = req.body || {}
    const { entries } = body

    // Minimal prompt engineering: give the AI the recent entries and ask for a short journaling prompt
    const promptText = `You are a friendly journaling assistant. Given the user's recent gratitude journal entries, suggest one concise prompt (1-2 sentences) that encourages reflection and growth. Return only the prompt text.\n\nEntries:\n${(entries || [])
      .slice(-10)
      .map((e) => `- ${e.date}: ${e.text}`)
      .join('\n')}`

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      // Deterministic fallback when no key is set
      return res.status(200).json({ prompt: 'Write about one small thing that went well today.' , warning: 'No GEMINI_API_KEY configured.'})
    }

    const url = `https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateText?key=${apiKey}`

    const reqBody = {
      temperature: 0.3,
      maxOutputTokens: 256,
      candidateCount: 1,
      prompt: {
        text: promptText
      }
    }

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })

    if (!resp.ok) {
      const text = await resp.text().catch(() => '')
      return res.status(502).json({ prompt: 'Write about one small thing that went well today.', warning: `Generative API error ${resp.status}: ${text}` })
    }

    const data = await resp.json().catch(() => null)
    const output = (data?.candidates && data.candidates[0]?.output?.[0]?.content?.[0]?.text) || data?.candidates?.[0]?.content?.text || null

    if (!output) {
      return res.status(200).json({ prompt: 'Write about one small thing that went well today.', warning: 'Empty response from Generative API.' })
    }

    // Return the prompt text to the frontend
    return res.status(200).json({ prompt: output })
  } catch (err) {
    console.error('api/gemini error', err)
    return res.status(500).json({ prompt: 'Write about one small thing that went well today.', warning: 'Server error' })
  }
}
