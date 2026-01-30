
import React, { useState } from 'react';
import { supabase } from '../db';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });
  const [inquiryType, setInquiryType] = useState('عام');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    engineType: 'Perkins',
    hours: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, msg: '' });

    const finalMessage = {
      name: formData.name,
      phone: formData.phone,
      message: `
        نوع الطلب: ${inquiryType}
        ${(inquiryType === 'فحص' || inquiryType === 'صيانة') ? `المحرك: ${formData.engineType} | الساعات: ${formData.hours}` : ''}
        الرسالة: ${formData.message}
      `.trim()
    };

    try {
      const result = await supabase.sendMessage(finalMessage);
      
      if (result.success) {
        setStatus({ type: 'success', msg: 'تم إرسال طلبك بنجاح عبر نظامنا السحابي! ستصلك رسالة تأكيد قريباً.' });
        setFormData({ name: '', phone: '', engineType: 'Perkins', hours: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: `فشل الإرسال: ${result.error || 'يرجى التحقق من اتصال الإنترنت'}` });
      }
    } catch (err: any) {
      setStatus({ type: 'error', msg: 'حدث خطأ غير متوقع في النظام.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden" dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-5 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-6">
             <span className="text-yellow-600 dark:text-yellow-500 font-black text-[10px] uppercase tracking-[0.4em]">نظام مراسلة سحابي آمن</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">تواصل معنا <span className="text-yellow-500">مباشرة</span></h2>
          <p className="text-slate-500 dark:text-slate-400 mt-6 max-w-2xl mx-auto text-lg font-medium italic">سيقوم نظامنا بمعالجة طلبك وإخطار الفريق الهندسي فوراً.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-900/40 p-8 md:p-14 rounded-[4rem] shadow-2xl space-y-10 border border-slate-100 dark:border-white/5 relative z-10 backdrop-blur-2xl max-w-3xl mx-auto overflow-hidden">
          {/* Form Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-500/10 blur-[100px] pointer-events-none"></div>

          {status.type && (
            <div className={`p-6 rounded-2xl font-bold flex items-center gap-4 animate-in slide-in-from-top-4 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
              <div className="w-10 h-10 rounded-xl bg-current/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d={status.type === 'success' ? "M9 12l2 2 4-4" : "M12 8v4M12 16h.01"}/></svg>
              </div>
              <span className="text-sm">{status.msg}</span>
            </div>
          )}

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 pe-4 uppercase tracking-[0.3em] block">تصنيف الطلب الهندسي</label>
            <div className="grid grid-cols-3 gap-3">
              {['عام', 'فحص', 'صيانة'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInquiryType(type)}
                  className={`group relative py-4 rounded-2xl font-black text-xs transition-all border overflow-hidden ${
                    inquiryType === type 
                    ? 'bg-yellow-500 border-yellow-500 text-slate-950 shadow-[0_10px_30px_rgba(234,179,8,0.3)]' 
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-white/5 text-slate-500 hover:border-yellow-500/50'
                  }`}
                >
                  <span className="relative z-10">{type === 'عام' ? 'استفسار عام' : type === 'فحص' ? 'طلب فحص' : 'طلب صيانة'}</span>
                  {inquiryType === type && <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 pe-4 uppercase">الاسم الكامل</label>
              <input required placeholder="الاسم الرباعي" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-white/10 outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 font-bold transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 pe-4 uppercase">رقم التواصل</label>
              <input required type="tel" placeholder="777XXXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-white/10 outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 font-bold text-start transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 pe-4 uppercase">رسالتك الهندسية</label>
            <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="صف طلبك أو المشكلة الفنية بوضوح..." className="w-full bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200 dark:border-white/10 outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 font-bold resize-none transition-all"></textarea>
          </div>
          
          <button 
            disabled={isSubmitting} 
            className="group relative w-full bg-slate-950 dark:bg-yellow-500 text-white dark:text-slate-950 font-black py-7 rounded-[2rem] transition-all active:scale-[0.98] disabled:opacity-50 overflow-hidden shadow-2xl"
          >
            {/* Shimmer on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10 flex items-center justify-center gap-5">
              {isSubmitting ? (
                <div className="w-7 h-7 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="text-xl md:text-2xl">إرسال الطلب للفريق الهندسي</span>
                  <div className="w-10 h-10 bg-white/10 dark:bg-slate-950/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <svg className="w-6 h-6 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path d="M11 19l-7-7 7-7"/></svg>
                  </div>
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
