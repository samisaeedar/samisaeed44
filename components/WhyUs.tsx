
import React, { useState, useEffect, useRef } from 'react';

interface Feature {
  title: string;
  desc: string;
  icon: string;
}

interface WhyUsProps {
  features: Feature[];
}

const Counter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); 
      setCount(Math.floor(easedProgress * target));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const WhyUs: React.FC<WhyUsProps> = ({ features }) => {
  const stats = [
    { label: "منشأة مخدومة", value: 200, suffix: "+" },
    { label: "مشروع منجز", value: 500, suffix: "+" },
    { label: "اعتمادية", value: 99, suffix: "%" }
  ];

  const statIcons = [
    // 1. منشأة مخدومة - Factory/Building Icon
    <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>,
    // 2. مشروع منجز - Project/Checklist Icon
    <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // 3. اعتمادية - Shield/Security Icon
    <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-7-9.131l1.626 1.626a28.95 28.95 0 012.153-.444c1.94-.342 3.89.07 5.606 1.185.34.22.45.69.24 1.03l-1.07 1.706c-.21.34-.68.45-1.02.24a25.04 25.04 0 00-2.4-.73c-.56-.11-1.12-.11-1.68.01a18.23 18.23 0 00-1.28.31l-1.13-1.13a1 1 0 00-1.41 0l-1.13 1.13c-.39.39-.39 1.02 0 1.41l1.13 1.13a18.26 18.26 0 00.31 1.28c.12.56.12 1.12.01 1.68-.13.82-.37 1.62-.73 2.4-.21.34-.1.81.24 1.02l1.7 1.07c.34.21.8.1 1.03-.24 1.11-1.71 1.53-3.66 1.19-5.61a29 29 0 01-.44-2.15l1.62-1.63a1 1 0 000-1.41l-1.41-1.41a1 1 0 00-1.41 0z" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v19.5" opacity="0.2"/>
    </svg>
  ];

  if (!features || features.length === 0) return null;

  const professionalIcons = [
    // 1. الاستجابة الفورية (ساعة توقيت + برق)
    <svg key="1" className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" className="text-yellow-600 dark:text-yellow-400" strokeWidth="2" />
    </svg>,

    // 2. الدقة الهندسية (هدف + فرجار قياس)
    <svg key="2" className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" opacity="0.3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4M6 12H2M12 6V2M12 22v-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" className="text-yellow-600 dark:text-yellow-400" strokeWidth="2" />
    </svg>,

    // 3. حلول متكاملة (ترس + مفتاح صيانة)
    <svg key="3" className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" opacity="0.3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3" className="text-yellow-600 dark:text-yellow-400" strokeWidth="2" />
    </svg>
  ];

  return (
    <div className="font-['Tajawal']" dir="rtl">
      <div className="mb-8 md:mb-16 text-right">
        <div className="flex items-center gap-3 mb-2 md:mb-4 opacity-60">
          <span className="h-[2px] w-8 md:w-14 bg-yellow-500"></span>
          <span className="text-[10px] md:text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em] md:tracking-[0.6em]">
            Performance Indicators
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-[1000] text-slate-900 dark:text-white tracking-tighter leading-tight">
          لماذا تختار <span className="text-yellow-500 italic">العريقي</span>؟
        </h2>
      </div>

      {/* Hero Stats Row - Mobile Fluid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-12 lg:mb-20">
        {stats.map((s, i) => (
          <div key={i} className="relative group text-center p-6 sm:p-8 md:p-12 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-[2.5rem] md:rounded-[4rem] transition-all hover:bg-slate-50 dark:hover:bg-slate-900 shadow-sm hover:shadow-2xl overflow-hidden">
            
            {/* Background Icon Decoration */}
            <div className="absolute -right-8 -top-8 text-slate-100 dark:text-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              {React.cloneElement(statIcons[i], { className: "w-40 h-40" })}
            </div>

            <div className="flex justify-center mb-6">
               <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-600 dark:text-yellow-500 group-hover:bg-yellow-500 group-hover:text-slate-950 transition-all duration-500 shadow-sm">
                  {statIcons[i]}
               </div>
            </div>

            <div className="relative z-10">
              <div className="text-4xl xs:text-5xl md:text-6xl lg:text-[5rem] font-[1000] text-slate-900 dark:text-white leading-none tracking-tighter transition-all group-hover:text-yellow-500">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-4 md:mt-6 text-[11px] md:text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] md:tracking-[0.5em] group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {features.map((f, i) => (
          <div 
            key={i} 
            className="group relative p-6 bg-white dark:bg-slate-900/30 border border-slate-100 dark:border-white/5 rounded-[2rem] md:rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 bg-yellow-500/10 dark:bg-yellow-500/5 rounded-[1.2rem] flex items-center justify-center text-yellow-600 dark:text-yellow-500 group-hover:bg-yellow-500 group-hover:text-slate-950 transition-all shadow-sm border border-yellow-500/10">
                {professionalIcons[i] || professionalIcons[0]}
              </div>
              <div className="flex-1">
                <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white mb-1 group-hover:text-yellow-600 dark:group-hover:text-yellow-500">
                  {f.title}
                </h3>
                {/* تكبير الوصف */}
                <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 font-bold leading-tight opacity-80">
                  {f.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
