
import React from 'react';
import { IndustrialIcons } from './Icons';

const Specializations: React.FC = () => {
  const specs = [
    { 
      t: "أتمتة وتحكم رقمي", 
      d: "برمجة نظم PLC و SCADA المتطورة لرفع كفاءة المصانع بأعلى المعايير.", 
      i: "PLC",
      unit: "TECH_A-1",
      status: "ACTIVE_CORE"
    },
    { 
      t: "مجموعات التوليد", 
      d: "صيانة ميكانيكية وكهربائية شاملة للمحركات الضخمة ومولدات الطاقة.", 
      i: "Generator",
      unit: "PWR_B-2",
      status: "OPTIMIZED"
    },
    { 
      t: "الطاقة الهجينة", 
      d: "دمج الطاقة المتجددة مع الأنظمة التقليدية لتقليل الهدر وتوفير التكاليف.", 
      i: "Electricity",
      unit: "SOL_C-3",
      status: "HYBRID_LINK"
    },
    { 
      t: "الصيانة الوقائية", 
      d: "عقود ذكية تضمن استمرارية العمل ومنع الأعطال المفاجئة لمنشأتكم.", 
      i: "Settings",
      unit: "MNT_D-4",
      status: "PROTO_SEC"
    }
  ];

  return (
    <div className="container mx-auto px-2 md:px-6 relative z-10 font-['Tajawal']" dir="rtl">
      
      <div className="absolute -top-24 -right-24 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-yellow-500/5 blur-[100px] md:blur-[150px] pointer-events-none rounded-full"></div>

      {/* Header Section */}
      <div className="mb-12 md:mb-20 lg:mb-24 text-right space-y-4 md:space-y-6">
         <div className="flex items-center gap-3 md:gap-4">
            <span className="h-[2px] w-8 md:w-12 bg-yellow-500"></span>
            <span className="text-[10px] md:text-[12px] font-black text-yellow-600 dark:text-yellow-500 uppercase tracking-[0.4em] md:tracking-[0.6em]">Engineering Divisions</span>
         </div>
         <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-[1000] text-slate-900 dark:text-white tracking-tighter leading-[1.1] md:leading-[0.9]">
           قطاعات <br className="sm:hidden" /> <span className="text-yellow-500 italic">هندسية</span> دقيقة
         </h2>
         <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg md:text-xl lg:text-2xl font-bold max-w-2xl leading-relaxed">
           حلول تشغيلية مصممة بمعايير صناعية صارمة لضمان أعلى مستويات الأداء الميداني.
         </p>
      </div>

      {/* Grid Optimization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        {specs.map((item, idx) => (
          <div 
            key={idx} 
            className="group relative flex flex-row lg:flex-col items-center lg:items-start p-6 sm:p-8 md:p-10 lg:p-12 lg:aspect-[1/1.1] bg-slate-50/50 dark:bg-slate-900/40 border-2 border-slate-100 dark:border-white/5 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden transition-all duration-700 hover:border-yellow-500/50 hover:shadow-[0_40px_80px_rgba(234,179,8,0.15)]"
          >
            {/* HUD Technical Overlay */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-yellow-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-full bg-yellow-500 w-1/3 animate-hud-line-wide shadow-[0_0_15px_#eab308]"></div>
            </div>
            
            {/* Icon Container */}
            <div className="relative shrink-0 ml-4 sm:ml-6 lg:ml-0 lg:mb-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] flex items-center justify-center text-yellow-500 transition-all duration-700 group-hover:bg-yellow-500 group-hover:text-slate-950 group-hover:scale-110 shadow-2xl">
                    {IndustrialIcons[item.i] ? React.createElement(IndustrialIcons[item.i], { className: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16" }) : <span>⚙️</span>}
                </div>
                <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-yellow-500 rounded-full border-[3px] md:border-[6px] border-white dark:border-slate-900 animate-pulse"></div>
            </div>

            <div className="flex-1 lg:w-full text-right">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                {/* تكبير الكود التقني */}
                <span className="text-[11px] md:text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{item.unit}</span>
                <span className="hidden lg:inline-block text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">{item.status}</span>
              </div>
              
              <h3 className="text-lg md:text-xl lg:text-3xl xl:text-4xl font-black text-slate-900 dark:text-white mb-2 md:mb-4 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors leading-tight">
                {item.t}
              </h3>
              
              {/* تكبير الوصف */}
              <p className="text-[12px] sm:text-xs md:text-sm lg:text-lg text-slate-500 dark:text-slate-400 font-bold leading-relaxed opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-700 lg:translate-y-6 lg:group-hover:translate-y-0">
                {item.d}
              </p>
            </div>

            <div className="hidden lg:block absolute bottom-10 left-10 opacity-0 group-hover:opacity-40 transition-opacity">
                <div className="flex gap-2">
                    <div className="w-2 h-2 bg-yellow-500"></div>
                    <div className="w-8 h-2 bg-yellow-500"></div>
                </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes hudLineWide {
          0% { transform: translateX(300%); }
          100% { transform: translateX(-400%); }
        }
        .animate-hud-line-wide { animation: hudLineWide 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default Specializations;
