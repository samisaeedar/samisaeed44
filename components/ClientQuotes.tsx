
import React, { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  id: number;
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface ClientQuotesProps {
  testimonials: Testimonial[];
}

const ClientQuotes: React.FC<ClientQuotesProps> = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isAuto || testimonials.length <= 1) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next, isAuto, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-slate-950 overflow-hidden relative transition-colors duration-500" dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-yellow-500 font-black tracking-[0.3em] uppercase text-[9px] mb-2 block">Voice of Experience</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight italic">ثقة <span className="text-yellow-500">شركائنا</span></h2>
        </div>

        <div className="relative min-h-[400px]" onMouseEnter={() => setIsAuto(false)} onMouseLeave={() => setIsAuto(true)}>
          <div className="relative h-full">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col items-center text-center ${
                  index === current ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10 pointer-events-none'
                }`}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(Number(t.rating) || 5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <blockquote className="text-xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-10 leading-relaxed max-w-3xl italic">
                  "{t.content}"
                </blockquote>
                <div className="flex flex-col items-center mt-auto">
                  <div className="w-16 h-16 bg-slate-900 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-xl">
                    {t.avatar || '🏢'}
                  </div>
                  <h4 className="text-xl font-black text-slate-950 dark:text-white mb-0.5">{t.name}</h4>
                  <p className="text-yellow-600 dark:text-yellow-500 font-bold text-xs">{t.position} - {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientQuotes;
