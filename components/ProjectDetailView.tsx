
import React, { useEffect, useState } from 'react';
import { optimizeImageUrl } from '../db';

interface Project {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
  location?: string;
  year?: string;
  technologies?: string[];
}

interface ProjectDetailViewProps {
  project: Project | null;
  onBack: () => void;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, onBack }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setImgLoaded(false);
  }, [project]);

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const technicalData = [
    { label: 'كود التوثيق', value: `#AREIQI-${String(project.id).slice(0,6)}`, icon: '🆔' },
    { label: 'سنة الإنجاز', value: project.year || '2023 - 2024', icon: '📅' },
    { label: 'الموقع الميداني', value: project.location || 'صنعاء، اليمن', icon: '📍' },
    { label: 'نوع النظام', value: project.category || 'هندسة كهربائية', icon: '⚡' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] font-['Tajawal'] pb-40 animate-in fade-in duration-700" dir="rtl">
      <div className="sticky top-[72px] md:top-[80px] z-[100] pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <button 
            onClick={onBack}
            className="pointer-events-auto group flex items-center justify-center w-10 h-10 text-slate-400 hover:text-yellow-500 transition-all active:scale-90"
            aria-label="رجوع"
          >
            <svg className="w-8 h-8 rtl:rotate-180 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-2">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-8 space-y-10">
            {/* استعادة الجودة العالية (85%) لضمان وضوح التفاصيل الدقيقة */}
            <div className={`relative h-[300px] md:h-[650px] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-white/5 transition-all duration-500 ${!imgLoaded ? 'shimmer-bg animate-shimmer' : 'bg-slate-100 dark:bg-slate-900'}`}>
               <img 
                 src={optimizeImageUrl(project.image, 1600, 85)} 
                 alt={project.title} 
                 onLoad={() => setImgLoaded(true)}
                 className={`w-full h-full object-cover transition-all duration-1000 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
               />
               {!imgLoaded && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin"></div>
                 </div>
               )}
            </div>

            <div className="space-y-8">
               <div className="space-y-3">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_8px_#eab308]"></span>
                    <span className="text-yellow-600 dark:text-yellow-500 font-black text-[10px] md:text-xs uppercase tracking-widest">{project.category}</span>
                 </div>
                 <h1 className="text-3xl md:text-5xl font-[1000] text-slate-900 dark:text-white leading-tight tracking-tight">
                    {project.title}
                 </h1>
               </div>

               <div className="bg-slate-50 dark:bg-slate-900/40 p-10 md:p-14 rounded-[3.5rem] border border-slate-100 dark:border-white/5 shadow-inner">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">تفاصيل التنفيذ</h2>
                  </div>
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-bold">
                    {project.description}
                  </p>
               </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
               <h3 className="text-sm font-black text-white mb-10 uppercase tracking-widest opacity-60">بيانات الأرشفة</h3>
               <div className="space-y-8">
                  {technicalData.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-xl border border-white/5 transition-colors">
                            {spec.icon}
                          </div>
                          <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{spec.label}</span>
                       </div>
                       <span className="text-white font-black text-xs md:text-sm">{spec.value}</span>
                    </div>
                  ))}
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailView;
