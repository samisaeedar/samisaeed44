
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { optimizeImageUrl } from '../db';

interface GalleryItem {
  id: string | number;
  image?: string;
  img?: string;
}

interface EngineeringGalleryProps {
  galleryItems: GalleryItem[];
  logoUrl: string;
}

const EngineeringGallery: React.FC<EngineeringGalleryProps> = ({ galleryItems, logoUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef<number | null>(null);

  const items = useMemo(() => {
    return galleryItems.map((item) => ({
      ...item,
      // رفع الجودة إلى 75% لضمان وضوح الصور الميدانية
      displayImage: optimizeImageUrl(item.img || item.image || '', 1200, 75) || 'https://placehold.co/1200x800/020617/eab308?text=الصورة+غير+موجودة',
      title: `توثيق هندسي ميداني #${String(item.id).slice(-4)}`
    }));
  }, [galleryItems]);

  const next = useCallback(() => {
    if (items.length <= 1) return;
    setCurrentIndex(prev => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    if (items.length <= 1) return;
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused, items.length]);

  if (items.length === 0) return null;

  return (
    <section id="gallery" className="py-16 md:py-48 bg-white dark:bg-slate-950 overflow-hidden text-right" dir="rtl">
      <div className="max-w-[1900px] mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-32 gap-8">
          <div>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-yellow-500 text-slate-950 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl">سجل العمليات المباشرة</div>
            <h2 className="text-4xl sm:text-6xl md:text-[11rem] font-black text-slate-900 dark:text-white leading-[1] md:leading-[0.8] tracking-tighter">توثيق <br /> <span className="text-yellow-500 italic">الإنجازات</span></h2>
          </div>
          <div className="flex gap-4 self-end md:self-auto" dir="ltr">
             <button onClick={prev} className="w-12 h-12 md:w-24 md:h-24 rounded-2xl md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-yellow-500 transition-all"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M15 19l-7-7 7-7"/></svg></button>
             <button onClick={next} className="w-12 h-12 md:w-24 md:h-24 rounded-2xl md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-yellow-500 transition-all"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M9 5l7 7-7 7"/></svg></button>
          </div>
        </div>

        <div className="relative h-[450px] sm:h-[600px] md:h-[900px] rounded-[3rem] md:rounded-[8rem] overflow-hidden shadow-2xl group">
          {items.map((item, idx) => (
            <div 
              key={item.id} 
              className={`absolute inset-0 transition-opacity duration-700 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`} 
            >
              <img 
                src={item.displayImage} 
                alt="" 
                loading={idx === 0 ? "eager" : "lazy"}
                decoding={idx === currentIndex ? "sync" : "async"}
                className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-[15s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-12 right-10 left-10 md:bottom-24 md:right-24 md:left-24 z-20">
                <span className="text-yellow-500 font-black text-[9px] md:text-sm uppercase tracking-[0.4em] bg-black/60 px-4 py-2 rounded-xl mb-4 md:mb-10 inline-block backdrop-blur-xl border border-white/5">وثيقة مرئية معتمدة</span>
                <h3 className="text-3xl sm:text-5xl md:text-[8rem] font-black text-white leading-tight md:leading-[0.85] tracking-tighter drop-shadow-2xl">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringGallery;
