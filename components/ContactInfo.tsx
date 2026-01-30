
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const ContactInfo: React.FC = () => {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:العريقي للخدمات الصناعية والهندسية
ORG:العريقي للخدمات الصناعية والهندسية
TEL:+967777403614
EMAIL:734650245tv@gmail.com
ADR:;;صنعاء - الدائري - جوار شركة سويد للتجارة;;;;
URL:https://engaliareeki.github.io/web/
END:VCARD`;

  return (
    <section className="relative py-12 md:py-20 bg-white dark:bg-slate-950 overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-500" dir="rtl">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none dark:opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/10 via-blue-500/10 to-yellow-500/10 rounded-[2rem] md:rounded-[3rem] blur-2xl opacity-70 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
            
            <div className="bg-slate-900/[0.03] dark:bg-white/[0.03] px-6 md:px-8 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                {/* تكبير النص هنا */}
                <span className="text-[10px] md:text-xs text-slate-500 font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Contact Hub v4.0</span>
              </div>
              <div className="flex gap-1">
                <div className="w-6 md:w-8 h-1 bg-slate-200 dark:bg-white/10 rounded-full"></div>
                <div className="w-3 md:w-4 h-1 bg-yellow-500/40 rounded-full"></div>
              </div>
            </div>

            <div className="p-6 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                
                <div className="space-y-6 md:space-y-8 text-right">
                  <div className="group/item">
                    {/* تكبير العنوان الفرعي */}
                    <span className="text-yellow-600 dark:text-yellow-500 font-black text-[11px] md:text-xs uppercase tracking-widest mb-2 md:mb-3 block opacity-60">مقرنا الرئيسي</span>
                    <div className="flex items-start gap-4 md:gap-5">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white shrink-0 group-hover/item:bg-yellow-500 group-hover/item:text-slate-950 transition-all duration-500 shadow-sm">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <p className="text-lg md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                        صنعاء – الدائري – جوار شركة سويد للتجارة
                      </p>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gradient-to-l from-slate-200 dark:from-white/10 to-transparent"></div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <a href="tel:+967777403614" className="group/link block">
                      <span className="text-yellow-600 dark:text-yellow-500 font-black text-[11px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 block opacity-60">الخط الساخن</span>
                      <div className="flex items-center gap-3 md:gap-4 text-slate-900 dark:text-white group-hover/link:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                        <svg className="w-4 h-4 md:w-5 md:h-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M3 5.25a.75.75 0 01.75-.75H8.1a.75.75 0 01.704.493l1.1 3.3a.75.75 0 01-.19.824l-1.92 1.92a15.42 15.42 0 006.52 6.52l1.92-1.92a.75.75 0 01.824-.19l3.3 1.1a.75.75 0 01.493.704v4.35a.75.75 0 01-.75.75h-1.35C9.76 22.5 1.5 14.24 1.5 4.11V5.25z" /></svg>
                        <span className="text-lg md:text-xl font-black tracking-tighter" dir="ltr">777 403 614</span>
                      </div>
                    </a>

                    <a href="mailto:734650245tv@gmail.com" className="group/link block">
                      <span className="text-yellow-600 dark:text-yellow-500 font-black text-[11px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 block opacity-60">البريد الهندسي</span>
                      <div className="flex items-center gap-3 md:gap-4 text-slate-900 dark:text-white group-hover/link:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                        <svg className="w-4 h-4 md:w-5 md:h-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        <span className="text-sm font-black truncate max-w-[140px] md:max-w-[200px]">734650245tv@gmail.com</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-slate-900/[0.02] dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group/cta">
                  <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 animate-[scan_4s_linear_infinite] opacity-20"></div>
                  
                  <div className="relative mb-6 md:mb-8 p-3 md:p-4 bg-white rounded-2xl md:rounded-3xl shadow-xl group-hover/cta:scale-105 transition-transform duration-500">
                    <QRCodeSVG 
                      value={vCardData}
                      size={120}
                      level={"H"}
                      includeMargin={false}
                      className="rounded-lg"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-950 px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black whitespace-nowrap shadow-lg">
                      بطاقة الأعمال الرقمية
                    </div>
                  </div>
                  
                  <h3 className="text-slate-900 dark:text-white font-black text-xl md:text-2xl mb-2 md:mb-4 text-center">جاهزون لخدمتكم</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-bold text-center mb-6 md:mb-8 leading-relaxed max-w-[240px]">
                    امسح الكود لحفظ بيانات التواصل أو اتصل بنا مباشرة للاستجابة الفورية.
                  </p>
                  
                  <a href="tel:+967777403614" className="w-full py-4 bg-yellow-500 hover:bg-slate-900 dark:hover:bg-white text-slate-950 dark:hover:text-slate-900 hover:text-white rounded-xl md:rounded-2xl font-black text-center transition-all shadow-xl shadow-yellow-500/10 active:scale-95 flex items-center justify-center gap-3">
                    <span className="text-sm md:text-base">بدء اتصال فوري</span>
                    <svg className="w-5 h-5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </a>
                </div>

              </div>
            </div>

            <div className="bg-slate-900/[0.02] dark:bg-white/[0.02] px-6 md:px-8 py-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[9px] md:text-[10px] text-slate-400 dark:text-slate-700 font-mono font-bold">
               <span>SYSTEM STATUS: OPERATIONAL</span>
               <span className="hidden xs:inline">REF_ID: AREIQI_HQ_2025</span>
               <span className="hidden sm:inline">SECURITY PROTOCOL: ACTIVE</span>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
      `}</style>
    </section>
  );
};

export default ContactInfo;
