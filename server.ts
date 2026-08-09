import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI lazily/safely
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    return new GoogleGenAI({ apiKey });
  };

  // Health check API
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Ask AI Study Assistant Route
  app.post('/api/ai/ask', async (req, res) => {
    try {
      const { prompt, context, conversationHistory } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt required' });
      }

      const ai = getAi();
      const systemInstruction = `Anda adalah Asisten Pembimbing Kajian Aqidah Tauhid & Kitab Tijan ad-Darari (Syarah Risalah Al-Bajuri).
Tugas Anda adalah memberikan jawaban yang santun, ilmiah, berdalil, dan berdasar pada Akidah Ahlussunnah wal Jama'ah (Asy'ariyah dan Maturidiyah).
Selalu sertakan:
1. Istilah Arab/Tauhid yang relevan jika ada (dengan harakat bila perlu).
2. Terjemahan & penjelasan hikmah/lathifah spiritual.
3. Rujukan ayat Al-Qur'an, Hadis, atau Kitab (seperti Tijan ad-Darari, Ummu al-Barahin, Aqidah Awam, Ihya' Ulumuddin).
4. Bahasa yang ramah, hangat, dan penuh penghormatan ("Saudaraku", "InsyaAllah").`;

      let fullPrompt = `Konteks Kajian Saat Ini:\n${context || 'Tijan ad-Darari - Syarah Aqidah Tauhid'}\n\n`;
      if (conversationHistory && Array.isArray(conversationHistory)) {
        fullPrompt += `Riwayat Percakapan:\n${conversationHistory.map((m: any) => `${m.sender}: ${m.text}`).join('\n')}\n\n`;
      }
      fullPrompt += `Pertanyaan Jama'ah/Santri: ${prompt}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ answer: response.text || 'Maaf, jawaban tidak dapat diproses saat ini.' });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({
        error: err.message || 'Gagal terhubung dengan layanan AI Tauhid.',
        fallbackAnswer: 'Sistem AI saat ini memerlukan GEMINI_API_KEY yang valid. Namun, Anda tetap dapat membaca, memelajari, dan mengutip seluruh isi Tijan ad-Darari secara lengkap!',
      });
    }
  });

  // Explain Term API
  app.post('/api/ai/explain', async (req, res) => {
    try {
      const { term } = req.body;
      if (!term) return res.status(400).json({ error: 'Term required' });

      const ai = getAi();
      const prompt = `Berikan penjelasan ringkas dan mendalam untuk istilah Tauhid berikut berdasarkan Syarah Tijan ad-Darari / Aqidah Asy'ariyah: "${term}".
Format dengan:
- Arti Bahasa & Istilah
- Implikasi/Aplikasi Spiritual
- Rujukan Kitab/Dalil`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({ explanation: response.text });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite Middleware in Dev vs Static in Production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Kajian Tijan ad-Darari running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
