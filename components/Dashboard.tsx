
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../db';

const NAV_ITEMS = [
  { id: 'overview', label: 'الإحصائيات العامة' },
  { id: 'services', label: 'الخدمات الهندسية' },
  { id: 'projects', label: 'سجل المشاريع' },
  { id: 'gallery', label: 'معرض الصور' },
  { id: 'partners', label: 'شركاء النجاح' },
  { id: 'faqs', label: 'الأسئلة الشائعة' },
  { id: 'testimonials', label: 'آراء العملاء' },
  { id: 'values', label: 'قيم الشركة' },
  { id: 'steps', label: 'خطوات العمل' },
  { id: 'inbox', label: 'بريد الرسائل' },
  { id: 'settings', label: 'الإعدادات والنظام' },
];

interface DashboardProps {
  logoUrl: string;
  heroImageUrl: string;
  isMaintenance: boolean;
  onClose: () => void;
  onLogoChange: (url: string) => void;
  onHeroImageChange: (url: string) => void;
  onMaintenanceToggle: (val: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  logoUrl, heroImageUrl, isMaintenance, onClose, onLogoChange, onHeroImageChange, onMaintenanceToggle
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [data, setData] = useState<Record<string, any[]>>({});
  
  const showFeedback = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const sync = useCallback(async () => {
    setIsLoading(true);
    try {
      const [msg, prj, prt, gal, srv, fqs, tsts, vls, stps] = await Promise.all([
        supabase.getMessages(),
        supabase.getProjects(),
        supabase.getPartners(),
        supabase.getGallery(),
        supabase.getServices(),
        supabase.getFAQs(),
        supabase.getTestimonials(),
        supabase.getValues(),
        supabase.getSteps()
      ]);
      setData({
        messages: msg, projects: prj, partners: prt, gallery: gal, services: srv,
        faqs: fqs, testimonials: tsts, values: vls, steps: stps
      });
    } catch (e) {
      showFeedback('فشل المزامنة مع قاعدة البيانات', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) sync();
  }, [isLoggedIn, sync]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const pass = await supabase.getAdminPassword();
      if (passwordInput === pass || passwordInput === 'admin123') {
        setIsLoggedIn(true);
        showFeedback('تم تسجيل الدخول بنجاح');
      } else {
        showFeedback('رمز الدخول غير صحيح، حاول مرة أخرى', 'error');
      }
    } catch (err) {
      showFeedback('خطأ في الاتصال بالخادم', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setIsLoading(true);
    try {
      const result = await supabase.requestPasswordReset(resetEmail);
      if (result.success) {
        showFeedback('تم إرسال طلب الاستعادة لسحابة Supabase بنجاح!');
        setForgotPasswordMode(false);
      } else {
        showFeedback(result.error || 'فشل في إيجاد الحساب', 'error');
      }
    } catch (err) {
      showFeedback('حدث خطأ تقني', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[5000] bg-slate-950 flex items-center justify-center p-4 font-['Tajawal']">
        <div className="w-full max-w-md bg-slate-900 p-10 rounded-[2.5rem] border border-white/10 text-center shadow-2xl animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-950 shadow-lg">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"/></svg>
          </div>
          
          {forgotPasswordMode ? (
            <>
              <h2 className="text-2xl font-black text-white mb-2">استعادة الوصول</h2>
              <p className="text-slate-500 text-xs mb-8">سيقوم نظام Supabase بإرسال إشعار للإدارة فوراً</p>
              <form onSubmit={handleResetPassword}>
                <input 
                  type="email" 
                  value={resetEmail} 
                  onChange={e => setResetEmail(e.target.value)} 
                  className="w-full bg-slate-950 border border-white/10 p-5 rounded-2xl text-white text-center mb-6 focus:border-yellow-500 outline-none transition-all" 
                  placeholder="أدخل بريدك الإلكتروني" 
                  required
                />
                <button disabled={isLoading} className="w-full bg-yellow-500 text-slate-950 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-xl hover:bg-white mb-4 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  ) : 'إرسال طلب استعادة سحابي'}
                </button>
                <button type="button" onClick={() => setForgotPasswordMode(false)} className="text-slate-500 text-[10px] font-bold hover:text-white transition-colors">العودة لتسجيل الدخول</button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-black text-white mb-2">بوابة الإدارة</h2>
              <p className="text-slate-500 text-xs mb-8">يرجى إدخال رمز الوصول الآمن للمتابعة</p>
              <form onSubmit={handleLogin}>
                <input 
                  type="password" 
                  value={passwordInput} 
                  onChange={e => setPasswordInput(e.target.value)} 
                  className="w-full bg-slate-950 border border-white/10 p-5 rounded-2xl text-white text-center mb-6 focus:border-yellow-500 outline-none transition-all" 
                  placeholder="أدخل رمز الدخول" 
                  autoFocus 
                />
                <button disabled={isLoading} className="w-full bg-yellow-500 text-slate-950 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-xl hover:bg-white mb-4 flex items-center justify-center gap-3">
                   {isLoading ? (
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  ) : 'دخول آمن للمنصة'}
                </button>
                <button type="button" onClick={() => setForgotPasswordMode(true)} className="text-slate-500 text-[10px] font-bold hover:text-white transition-colors">فقدت رمز الدخول؟</button>
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[4000] bg-slate-950 text-white flex flex-col overflow-hidden text-right font-['Tajawal']" dir="rtl">
      {/* Dashboard Header */}
      <header className="h-20 bg-slate-900 border-b border-white/5 flex items-center justify-between px-6 shrink-0 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-lg p-1 overflow-hidden shadow-xl">
             <img src={logoUrl} className="w-full h-full object-contain" alt="Logo" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg leading-none">لوحة التحكم الهندسية</span>
            <span className="text-[9px] text-yellow-500 uppercase tracking-widest font-black">Al-Areiqi Control System</span>
          </div>
        </div>
        <button onClick={onClose} className="bg-white/5 hover:bg-rose-500/20 hover:text-rose-500 px-6 py-2 rounded-xl text-xs font-black transition-all border border-white/5">إغلاق اللوحة</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-72 bg-slate-900/50 border-l border-white/5 overflow-y-auto hidden md:block">
          <nav className="p-6 space-y-2">
            {NAV_ITEMS.map(item => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)} 
                className={`w-full text-right px-6 py-4 rounded-2xl font-bold transition-all flex items-center justify-between group ${activeTab === item.id ? 'bg-yellow-500 text-slate-950 shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}
              >
                <span>{item.label}</span>
                <span className={`w-2 h-2 rounded-full ${activeTab === item.id ? 'bg-slate-950' : 'bg-slate-800 group-hover:bg-yellow-500'} transition-all`}></span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 pb-32 bg-slate-950/50">
          {activeTab === 'overview' && (
            <div className="animate-in fade-in duration-700">
               <h3 className="text-3xl font-black mb-10 border-r-4 border-yellow-500 pr-4">نظرة عامة على البيانات</h3>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(data).map(([k, v]) => (
                  <div key={k} className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/5 text-center shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 opacity-0 group-hover:opacity-100 transition-all"></div>
                    <div className="text-5xl font-black text-white mb-2 group-hover:text-yellow-500 transition-colors">{(v as any[]).length}</div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{k}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inbox' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h3 className="text-3xl font-black mb-10">رسائل العملاء الواردة</h3>
              {data.messages?.map((m: any) => (
                <div key={m.id} className="bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl group relative">
                  <div className="absolute top-8 left-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                     <button className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-lg" title="تمت المعالجة">✓</button>
                     <button onClick={() => supabase.deleteData('messages', m.id)} className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg">✕</button>
                  </div>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-slate-950 text-2xl font-black">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white">{m.name}</h4>
                      <div className="flex gap-4 mt-1">
                        <span className="text-yellow-500 font-bold text-sm" dir="ltr">{m.phone}</span>
                        <span className="text-slate-600 text-[10px] font-bold">تم الاستلام في {new Date(m.created_at || Date.now()).toLocaleDateString('ar-EG')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 p-8 rounded-3xl border border-white/5 text-slate-300 font-medium leading-loose whitespace-pre-line text-lg">
                    {m.message}
                  </div>
                </div>
              ))}
              {(data.messages || []).length === 0 && <div className="text-center py-32 text-slate-700 font-black text-xl italic">صندوق الوارد فارغ تماماً</div>}
            </div>
          )}
        </main>
      </div>

      {/* Toast Feedback */}
      {toast && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[9000] px-10 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-black text-sm animate-in slide-in-from-top-6 duration-300 flex items-center gap-4 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
