
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ValueSlide {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

interface ValueSliderProps {
  values: ValueSlide[];
}

const ValueSlider: React.FC<ValueSliderProps> = ({ values }) => {
  const [current, setCurrent] = useState(0);
  const dragStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    if (values.length === 0) return;
    setCurrent((prev) => (prev + 1) % values.length);
  }, [values.length]);

  const prevSlide = useCallback(() => {
    if (values.length === 0) return;
    setCurrent((prev) => (prev - 1 + values.length) % values.length);
  }, [values.length]);

  useEffect(() => {
    if (values.length <= 1) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, values.length]);

  const handleDragEnd = (e: any) => {
    if (dragStartX.current === null) return;
    const endX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
    const diff = dragStartX.current - endX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    dragStartX.current = null;
  };

  if (!values || values.length === 0) return null;

  return (
    <section className="py-12 px-6 bg-white dark:bg-slate-950 transition-colors duration-500 select-none" dir="rtl">
      <div 
        className="max-w-7xl mx-auto relative h-[400px] md:h-[550px] rounded-[3.5rem] overflow-hidden shadow-2xl group cursor-grab active:cursor-grabbing"
        onMouseDown={e => dragStartX.current = e.clientX}
        onMouseUp={handleDragEnd}
        onTouchStart={e => dragStartX.current = e.touches[0].clientX}
        onTouchEnd={handleDragEnd}
      >
        {values.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <div className="absolute inset-0 bg-slate-950">
              <img src={slide.image} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[10s] ease-linear" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            </div>
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6 md:px-20 z-10 pointer-events-none">
              <span className="inline-block px-4 py-1.5 bg-yellow-500 text-slate-950 text-[10px] font-black rounded-full mb-6 uppercase tracking-[0.3em]">
                {slide.tag}
              </span>
              <h2 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">
                {slide.title}
              </h2>
              <p className="text-slate-300 text-lg md:text-2xl max-w-3xl leading-relaxed font-medium">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {values.map((_, index) => (
            <button key={index} onClick={() => setCurrent(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === current ? 'w-12 bg-yellow-500' : 'w-4 bg-white/20 hover:bg-white/40'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSlider;
