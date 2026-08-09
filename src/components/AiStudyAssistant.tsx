import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, KitabPoint } from '../types';
import { Sparkles, Send, Bot, User, Copy, Check, RefreshCw, BookOpen } from 'lucide-react';

interface AiStudyAssistantProps {
  initialPoint?: KitabPoint | null;
  onClearInitialPoint?: () => void;
}

export const AiStudyAssistant: React.FC<AiStudyAssistantProps> = ({
  initialPoint,
  onClearInitialPoint,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Assalamu\'alaikum wa Rahmatullah. Saya Asisten AI Pembimbing Kajian Syarah Tijan ad-Darari. Ada pertanyaan seputar Aqidah Tauhid, Tanzih, Sifat 20, atau penjelasan kitab yang ingin Anda pelajari lebih lanjut?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Jelaskan konsep Mukhalafatu lil Hawadits secara mendalam',
    'Apa perbedaan Ar-Rahman dan Ar-Rahim menurut Al-Bajuri?',
    'Bagaimana penerapan konsep Iftiqar (ketergantungan) dalam kehidupan?',
    'Siapakah Syekh Ibrahim Al-Bajuri dan Syekh Nawawi Banten?',
    'Jelaskan maksud Tanzih dari Al-Huduts, Al-Alwan, dan Al-Kaifiyyat',
  ];

  // If initialPoint passed from document card, trigger prompt
  useEffect(() => {
    if (initialPoint) {
      const pText = `Mohon berikan penjelasan dan hikmah mendalam tentang "${initialPoint.title}" dengan teks Arab "${initialPoint.arabicText}" dan terjemahan "${initialPoint.translation}".`;
      handleSendMessage(pText);
      if (onClearInitialPoint) onClearInitialPoint();
    }
  }, [initialPoint]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          context: 'Kitab Tijan ad-Darari fi Syarh Risalah Al-Bajuri fi Ilmit Tauhid',
          conversationHistory: messages.slice(-6),
        }),
      });

      const data = await response.json();
      const answerText = data.answer || data.fallbackAnswer || 'Terjadi kendala dalam memproses pertanyaan.';

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Mohon maaf, koneksi ke layanan AI Tauhid terputus. Anda tetap dapat membaca seluruh kitab Tijan ad-Darari secara manual.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 space-y-4">
      {/* Header Banner */}
      <div className="bg-[#5A5A40] text-[#fdfcf8] p-6 rounded-[28px] card-shadow border border-[#5A5A40]/20 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#fdfcf8]/15 border border-[#fdfcf8]/30 flex items-center justify-center text-[#f1d08e] shadow-xs">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="serif-title text-lg sm:text-xl font-bold text-[#fdfcf8] flex items-center gap-2">
              <span>Asisten AI Tauhid & Syarah Tijan</span>
              <span className="text-[10px] bg-[#f1d08e] text-[#222d1f] font-sans font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Gemini 2.5
              </span>
            </h2>
            <p className="text-xs text-[#e6e6da] italic mt-0.5">
              Tanyakan ilmu Tauhid, tafsiran matan, dalil Al-Qur&apos;an, Hadis, serta faedah spiritual.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Suggested Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold olive-accent shrink-0 flex items-center gap-1 serif-title">
          <BookOpen className="w-3.5 h-3.5" />
          Saran Pertanyaan:
        </span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="text-xs bg-paper hover:bg-[#edebe1] text-[#2d3a29] font-medium px-3.5 py-1.5 rounded-xl border border-[#5A5A40]/20 transition card-shadow whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Chat Box */}
      <div className="bg-paper border border-[#5A5A40]/15 rounded-[28px] card-shadow h-[480px] flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-[#fdfcf8] text-xs font-bold shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-[#5A5A40]'
                    : 'bg-[#8c734b]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#5A5A40] text-[#fdfcf8] rounded-tr-none'
                    : 'bg-[#f5f5f0] border border-[#5A5A40]/20 text-[#1e293b] rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                <div
                  className={`mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t ${
                    msg.sender === 'user'
                      ? 'border-[#8a8a68]/40 text-[#e6e6da]'
                      : 'border-[#5A5A40]/20 text-[#5A5A40]'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-[#1e293b] flex items-center gap-1 font-medium"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 olive-accent" />
                          <span className="olive-accent font-bold">Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-[#5A5A40] text-xs font-medium bg-[#f5f2e6] p-3.5 rounded-xl border border-[#5A5A40]/20 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin olive-accent" />
              <span>Memproses penjelasan dari rujukan Syarah Tijan ad-Darari...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
        <div className="p-3.5 border-t border-[#5A5A40]/15 bg-[#f5f5f0] flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ketik pertanyaan seputar Aqidah Tauhid / Kitab Tijan ad-Darari..."
            disabled={loading}
            className="flex-1 text-xs sm:text-sm bg-paper border border-[#5A5A40]/25 rounded-xl px-4 py-2.5 text-[#1e293b] placeholder-[#8a8a68] focus:outline-none focus:ring-2 focus:ring-[#5A5A40] disabled:opacity-50"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputPrompt.trim() || loading}
            className="bg-[#5A5A40] hover:bg-[#4a553f] text-[#fdfcf8] font-bold p-2.5 sm:px-5 sm:py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Kirim</span>
          </button>
        </div>
      </div>
    </div>
  );
};
