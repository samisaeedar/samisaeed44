
import React from 'react';

const Footer: React.FC<{ onAdminClick?: () => void, logoUrl?: string }> = ({ onAdminClick, logoUrl }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white dark:bg-[#020617] pt-12 md:pt-20 pb-8 md:pb-10 overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-500" dir="rtl">
      {/* Background Engineering Mesh */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px' 
        }} 
      />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-16 items-start mb-12 md:mb-16">
          
          {/* Section 1: Brand & Contact */}
          <div className="lg:col-span-6 space-y-8 md:space-y-10">
            <div className="flex items-center gap-4 md:gap-6 group cursor-default">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-500 shrink-0 overflow-hidden border border-slate-100 dark:border-white/10">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-slate-950 font-black text-2xl md:text-3xl">⚡</span>
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">العريقي</h2>
                {/* تكبير النص الوصفي */}
                <span className="text-yellow-600 dark:text-yellow-500 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] opacity-80 mt-1 md:mt-2">للخدمات الصناعية والهندسية</span>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <span className="text-[10px] md:text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-2 hidden xs:block">تابعنا:</span>
              
              <a 
                href="https://www.facebook.com/engaliareeki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg md:rounded-xl flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all shadow-xl group/social"
              >
                <svg className="w-5 h-5 md:w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>

              <a 
                href="https://wa.me/967777403614" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg md:rounded-xl flex items-center justify-center text-slate-400 hover:bg-[#25D366] hover:text-white transition-all shadow-xl group/social"
              >
                <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>

            <div className="relative group max-w-lg">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-yellow-500/10 to-emerald-500/10 rounded-[2rem] md:rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              
              <div className="relative bg-slate-50 dark:bg-slate-900/60 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="bg-slate-900/[0.03] dark:bg-white/[0.03] px-6 md:px-8 py-4 md:py-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-5">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-yellow-500 rounded-xl md:rounded-2xl flex items-center justify-center text-slate-950 shadow-lg">
                      <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-black text-base md:text-lg leading-none mb-1">م/ علي العريقي</h4>
                      <p className="text-[10px] md:text-[11px] text-yellow-600 dark:text-yellow-500 font-black">إدارة العمليات الهندسية</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 md:px-8 py-6 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-right">
                    <span className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.3em] mb-1 md:mb-2 block">دعم فني وصيانة طارئة</span>
                    <a href="tel:+967777403614" className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white hover:text-yellow-600 transition-colors tracking-tighter" dir="ltr">777 403 614</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Links */}
          <div className="lg:col-span-3">
             <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 h-full shadow-inner">
               <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
                 <div className="w-1 h-5 md:h-6 bg-yellow-500 rounded-full"></div>
                 <h4 className="text-slate-900 dark:text-white font-black text-[11px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em]">خريطة الوصول</h4>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-1 gap-y-4 md:gap-y-5">
                  {[
                    { label: 'المشاريع الهندسية', link: '#portfolio' },
                    { label: 'تخصصات الصيانة', link: '#services' },
                    { label: 'الأدوات الرقمية', link: '#tools' },
                    { label: 'سجل الخبرات', link: '#about' },
                    { label: 'الأسئلة الشائعة', link: '#faq' },
                    { label: 'فتح تذكرة دعم', link: '#contact' }
                  ].map((item) => (
                    <a key={item.label} href={item.link} className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all text-xs md:text-[13px] font-bold flex items-center gap-3 md:gap-4 group">
                       <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-slate-200 dark:bg-slate-800 group-hover:bg-yellow-500 rounded-full transition-all"></span>
                       {item.label}
                    </a>
                  ))}
               </div>
             </div>
          </div>

          {/* Section 3: Admin & Meta */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6">
             <button 
              onClick={onAdminClick}
              className="w-full group flex items-center justify-between bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl hover:border-yellow-500/30 transition-all duration-300"
             >
               <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-9 h-9 md:w-10 md:h-10 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-yellow-600 transition-colors border border-slate-100 dark:border-white/5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"/></svg>
                  </div>
                  <span className="font-black text-[10px] md:text-[10px] text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-widest">محطة الإدارة</span>
               </div>
             </button>

             <div className="p-6 md:p-8 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] text-center space-y-4 shadow-inner">
                <span className="text-[9px] md:text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] block">Technical Integrity</span>
                <div className="flex justify-center gap-3 md:gap-4 opacity-40">
                  <div className="px-2 md:px-3 py-1 border border-slate-300 dark:border-slate-800 rounded-lg text-[9px] md:text-[10px] font-black text-slate-500 dark:text-slate-400">ISO 9001</div>
                  <div className="px-2 md:px-3 py-1 border border-slate-300 dark:border-slate-800 rounded-lg text-[9px] md:text-[10px] font-black text-slate-500 dark:text-slate-400">CE MARK</div>
                </div>
                <p className="text-[10px] md:text-[11px] text-slate-500 dark:text-slate-700 font-bold leading-relaxed">نلتزم بأعلى معايير السلامة المهنية والمواصفات الهندسية العالمية.</p>
             </div>
          </div>
        </div>

        {/* Global Footer Credits */}
        <div className="pt-8 md:pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
          <div className="text-center md:text-right">
            <p className="text-slate-500 dark:text-slate-600 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1">
               © {currentYear} Al-Areiqi Group for Industrial & Engineering Services
            </p>
            <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-700 font-bold uppercase tracking-widest">Republic of Yemen - Mastering Power Engineering</p>
          </div>
          
          <div className="flex items-center gap-4 p-3 md:p-4 px-6 md:px-10 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-full group">
             <div className="text-left">
                <p className="text-[8px] md:text-[9px] font-black text-yellow-600 dark:text-yellow-500/40 uppercase tracking-[0.5em] mb-0.5">Architecture By</p>
                <p className="text-slate-900 dark:text-white font-black text-base md:text-lg tracking-tighter">Sami <span className="text-yellow-500">Al-Areiqi</span></p>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
