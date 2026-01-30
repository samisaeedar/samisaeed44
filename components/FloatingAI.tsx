
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import React, { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const BotIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const SUGGESTIONS = [
  "كيف أحصل على عرض سعر؟",
  "طلب صيانة مولد طارئة",
  "برمجة لوحات PLC",
  "استشارة في الطاقة الشمسية"
];

const FloatingAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('areiqi_gemini_chat_v1');
    return saved ? JSON.parse(saved) : [
      { role: 'model', text: 'مرحباً. أنا مساعدك الهندسي الذكي في شركة العريقي، كيف يمكنني مساعدتك اليوم؟' }
    ];
  });

  // تم إزالة التفعيل التلقائي (setTimeout) بناءً على رغبة المستخدم

  useEffect(() => {
    localStorage.setItem('areiqi_gemini_chat_v1', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    setInput('');
    const userMessage: Message = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: textToSend,
        config: {
          systemInstruction: "أنت مساعد مهندس خبير في شركة العريقي للخدمات الهندسية باليمن. ردودك مهنية، تقنية دقيقة، ومختصرة جداً. وجه العميل دائماً للاتصال بالرقم 777403614 في حال رغب في حجز موعد. استخدم العربية اليمنية المهذبة.",
          temperature: 0.3,
        },
      });

      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      let fullText = "";
      for await (const chunk of responseStream) {
        const chunkContent = chunk as GenerateContentResponse;
        const textChunk = chunkContent.text;
        if (textChunk) {
          fullText += textChunk;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', text: fullText };
            return newMessages;
          });
        }
      }

    } catch (error) {
      const errorMessage = "عذراً، واجهت مشكلة تقنية. يمكنك التواصل معنا مباشرة على 777403614.";
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 start-6 z-[200] font-['Tajawal']" dir="rtl">
      {isOpen && (
        <div className="mb-4 w-[320px] h-[500px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6">
          <div className="p-5 bg-slate-950 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-950">
                <BotIcon className="w-5 h-5" />
              </div>
              <p className="font-black text-[12px]">مساعد العريقي الرقمي</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white">✕</button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`p-3.5 rounded-2xl max-w-[85%] text-[11px] font-bold ${
                  m.role === 'user' ? 'bg-yellow-500 text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 flex gap-2 border-t border-slate-100 dark:border-white/5">
            <input 
              className="flex-1 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl outline-none text-[12px] font-bold dark:text-white" 
              placeholder="كيف يمكنني مساعدتك؟"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={() => handleSend()} className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-slate-900"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95`}
      >
        <BotIcon className="w-8 h-8 text-slate-900" />
      </button>
    </div>
  );
};

export default FloatingAI;
