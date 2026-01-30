
import React, { useState, useMemo } from 'react';

interface Project {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface AllProjectsProps {
  projects: Project[];
  onBack: () => void;
  onProjectClick?: (project: Project) => void;
}

// أيقونات مخصصة للفئات لضمان مظهر احترافي موحد
const CategoryIcons: Record<string, React.ReactNode> = {
  "الكل": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h7" /></svg>,
  "طاقة": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  "أتمتة": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
  "صيانة": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  "لوحة": <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>
};

const CATEGORIES = [
  { id: "الكل", label: "كافة القطاعات" },
  { id: "طاقة", label: "الطاقة والتوليد" },
  { id: "أتمتة", label: "الأتمتة والتحكم" },
  { id: "صيانة", label: "حلول الصيانة" },
  { id: "لوحة", label: "تصنيع اللوحات" }
];

const AllProjects: React.FC<AllProjectsProps> = ({ projects, onBack, onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return (projects || []).filter(p => {
      const matchCat = activeCategory === "الكل" || (p.category && p.category.includes(activeCategory));
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] font-['Tajawal'] pb-40 relative" dir="rtl">
      
      {/* 1. Industrial Header */}
      <div className="relative pt-24 md:pt-32 pb-16 overflow-hidden bg-white dark:bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={onBack} 
            className="group flex items-center gap-4 text-slate-400 hover:text-yellow-500 transition-all font-black text-xs md:text-sm mb-12"
          >
            <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-slate-950 transition-all duration-300">
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </div>
            <span>الرجوع إلى المركز الرئيسي</span>
          </button>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308]"></span>
                  <span className="text-yellow-600 dark:text-yellow-500 font-black text-[10px] md:text-xs uppercase tracking-[0.4em]">Asset Archive v4.2</span>
               </div>
               <h1 className="text-6xl md:text-9xl font-[1000] text-slate-900 dark:text-white leading-[0.8] tracking-tighter">
                  أرشيف <br /> <span className="text-yellow-500 italic">المشاريع</span>
               </h1>
            </div>
          </div>
        </div>
        
        {/* Background Grid Accent */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
      </div>

      {/* 2. THE STICKY CONTROL BAR */}
      <div className="sticky top-[72px] md:top-[80px] z-[100] bg-white/95 dark:bg-[#020617]/95 backdrop-blur-2xl border-y border-slate-200 dark:border-white/5 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col lg:flex-row gap-6 items-center">
          
          {/* Search Engine Interface */}
          <div className="w-full lg:flex-1 relative group">
             <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-yellow-500 transition-colors">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
             </div>
             <input 
               type="text" 
               placeholder="ابحث عن مشروع، تقنية، أو مدينة..." 
               className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 pr-12 text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500/50 transition-all font-bold text-sm"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>

          {/* Technical Categories Selector - Improved Spacing & Icons */}
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto scroll-smooth">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3.5 rounded-2xl text-[11px] font-black transition-all border whitespace-nowrap flex items-center gap-3 active:scale-95 ${
                  activeCategory === cat.id 
                  ? 'bg-yellow-500 border-yellow-500 text-slate-950 shadow-xl shadow-yellow-500/20' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-yellow-500/40'
                }`}
              >
                <div className={`${activeCategory === cat.id ? 'text-slate-950' : 'text-yellow-500'} transition-colors`}>
                  {CategoryIcons[cat.id]}
                </div>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Immersive Project Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
          {filtered.map((project) => (
            <div 
              key={project.id} 
              className="group relative h-[450px] md:h-[650px] rounded-[3.5rem] md:rounded-[4.5rem] overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-md hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] transition-all duration-700"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent opacity-90"></div>

              <div className="absolute bottom-0 inset-x-0 p-10 md:p-14 flex flex-col items-start gap-4 transform transition-all duration-700 group-hover:translate-y-[-10px]">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-[0_0_10px_#eab308]"></div>
                   <span className="text-yellow-500 font-black text-[10px] uppercase tracking-[0.4em]">{project.category}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-[1000] text-white leading-[1.1] mb-8 group-hover:text-yellow-500 transition-colors">
                  {project.title}
                </h3>
                
                <button 
                  onClick={() => onProjectClick?.(project)}
                  className="inline-flex items-center gap-5 px-10 py-5 bg-white text-slate-950 rounded-[1.5rem] md:rounded-[2rem] font-[1000] text-xs transition-all hover:bg-yellow-500 hover:scale-105 active:scale-95 shadow-2xl"
                >
                  <span>استعراض المواصفات الهندسية</span>
                  <div className="w-6 h-6 bg-slate-950/5 rounded-lg flex items-center justify-center text-slate-950">
                    <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-60 text-center animate-in fade-in zoom-in duration-700">
             <div className="w-32 h-32 bg-white dark:bg-slate-900 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-2xl border border-slate-200 dark:border-white/10">
                <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
             </div>
             <p className="text-slate-400 font-black text-3xl md:text-4xl tracking-tight mb-6">لا يوجد سجلات تطابق طلبك حالياً</p>
             <button 
              onClick={() => {setActiveCategory("الكل"); setSearchQuery("");}}
              className="text-yellow-500 font-black text-sm md:text-lg hover:underline underline-offset-[12px] decoration-2"
             >
               إعادة تعيين مصفوفة البحث
             </button>
          </div>
        )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AllProjects;
