
import React, { useEffect, useRef } from 'react';
import { optimizeImageUrl } from '../db';

interface HeroProps {
  heroImageUrl?: string;
}

const Hero: React.FC<HeroProps> = ({ heroImageUrl }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 1024) return;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        document.documentElement.style.setProperty('--mx', `${x}px`);
        document.documentElement.style.setProperty('--my', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#020617] font-['Tajawal'] transition-colors duration-500" dir="rtl">
      
      {heroImageUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img 
            src={optimizeImageUrl(heroImageUrl, 1600, 80)} 
            alt="" 
            className="w-full h-full object-cover opacity-[0.05] dark:opacity-20 scale-105 animate-[slowZoom_30s_linear_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white dark:from-[#020617] dark:via-[#020617]/50 dark:to-[#020617]" />
        </div>
      )}

      <div className="absolute inset-0 z-[1] opacity-[0.03] dark:opacity-[0.07] pointer-events-none hidden lg:block" 
        style={{ 
          backgroundImage: `radial-gradient(circle, currentColor 1.5px, transparent 1.5px)`,
          backgroundSize: '50px 50px',
          transform: `translate3d(var(--mx), var(--my), 0)`,
          willChange: 'transform'
        }} 
      />
      
      {/* زيادة البادينج العمودي هنا بشكل بسيط */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center py-32 md:py-56">
        
        {/* Badge */}
        <div className="mb-8 md:mb-12 opacity-0 animate-[fadeUp_0.8s_ease-out_forwards]">
          <div className="px-4 py-1.5 md:px-7 md:py-2.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-950/10 dark:border-white/10 flex items-center gap-2 md:gap-3 shadow-2xl backdrop-blur-sm">
            <span className="text-yellow-600 dark:text-yellow-500 text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-black tracking-widest uppercase">
              الريادة في الهندسة الميكاترونية والكهربائية
            </span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full animate-pulse"></span>
          </div>
        </div>

        {/* Massive Typography - Fluid Scaling */}
        <div className="flex flex-col items-center mb-10 md:mb-16 select-none w-full max-w-[100vw]">
          <h1 className="flex flex-col items-center font-[900] leading-[1.1] tracking-tighter uppercase w-full">
            <div className="overflow-hidden mb-1 md:mb-2 w-full">
              <span className="opacity-0 translate-y-full inline-block text-[11vw] sm:text-[9vw] md:text-[9.5rem] lg:text-[11.5rem] animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards] will-change-transform whitespace-nowrap">
                <span className="text-slate-900 dark:text-white">نصنع</span> <span className="text-[#eab308]">القوة</span>
              </span>
            </div>
            <div className="overflow-hidden mb-1 md:mb-2 w-full">
              <span className="opacity-0 translate-y-full inline-block text-[13vw] sm:text-[11vw] md:text-[13rem] lg:text-[15.5rem] text-slate-900 dark:text-white animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.4s_forwards] will-change-transform drop-shadow-2xl whitespace-nowrap">
                نهندس
              </span>
            </div>
            <div className="overflow-hidden w-full">
              <span className="opacity-0 translate-y-full inline-block text-[11vw] sm:text-[9vw] md:text-[10rem] lg:text-[13rem] outline-text italic animate-[reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_0.6s_forwards] will-change-transform whitespace-nowrap">
                المستقبل
              </span>
            </div>
          </h1>
        </div>

        {/* Subtext */}
        <div className="max-w-4xl mb-12 md:mb-20 opacity-0 animate-[fadeUp_1s_ease-out_0.8s_forwards] px-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-lg md:text-xl lg:text-3xl font-bold leading-relaxed">
            حلول هندسية متكاملة تبدأ من لوحات الـ <span className="text-slate-900 dark:text-white">PLC</span> وتصل لأضخم محطات التوليد. 
            <br className="hidden sm:block" />
            <span className="text-slate-950 dark:text-white font-black block mt-2 text-base md:text-2xl">العريقي.. حيث تلتقي الخبرة الميدانية بالابتكار.</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full max-w-[280px] sm:max-w-none justify-center opacity-0 animate-[fadeUp_0.8s_ease-out_1s_forwards]">
          <a href="#contact" className="group bg-[#eab308] text-slate-950 h-14 md:h-20 px-8 md:px-14 rounded-2xl font-[900] text-sm md:text-xl lg:text-2xl flex items-center justify-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto">
             <span>اطلب استشارة فنية</span>
             <svg className="w-5 h-5 md:w-7 md:h-7 transition-transform group-hover:translate-x-[-5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M11 19l-7-7 7-7"/></svg>
          </a>
          <a href="#specializations" className="group bg-slate-900/5 dark:bg-white/5 border border-slate-950/10 dark:border-white/10 text-slate-900 dark:text-white h-14 md:h-20 px-8 md:px-14 rounded-2xl font-[900] text-sm md:text-xl lg:text-2xl flex items-center justify-center gap-3 hover:bg-slate-950/10 dark:hover:bg-white/10 transition-all w-full sm:w-auto">
            <span>استكشف خدماتنا</span>
            <svg className="w-5 h-5 md:w-7 md:h-7 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M19 9l-7 7-7-7" /></svg>
          </a>
        </div>
      </div>

      <style>{`
        .outline-text { 
          -webkit-text-stroke: 1px currentColor; 
          color: transparent;
        }
        @media (min-width: 768px) { 
          .outline-text { -webkit-text-stroke: 2px currentColor; } 
        }
        .dark .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.6);
        }
        .light .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(15, 23, 42, 0.4);
        }
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes reveal {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
