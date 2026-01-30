
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const DEFAULT_URL = 'https://hgrsjmcgfympbsrumbrd.supabase.co'; 
export const DEFAULT_KEY = 'sb_publishable_tD7GQJWNZFJiz954i2IXzQ_l8HXxuqD'; 

const DEFAULT_LOGO_URL = 'https://cdn-icons-png.flaticon.com/512/2991/2991166.png';

/**
 * وظيفة تحسين الصور المتوازنة (High Quality Optimization):
 * توازن بين سرعة التحميل وجمالية الصورة الاحترافية.
 */
export const optimizeImageUrl = (url: string, width: number = 1200, quality: number = 75) => {
  if (!url) return '';
  if (url.includes('wsrv.nl')) return url;
  
  // نستخدم جودة 75% وصيغة WebP لضمان صور حادة جداً مع حجم ملف صغير
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=${quality}&output=webp&il`;
};

let client: SupabaseClient | null = null;
let _listeners: (() => void)[] = [];

const initClient = () => {
  const storedUrl = localStorage.getItem('sb_url') || DEFAULT_URL;
  const storedKey = localStorage.getItem('sb_key') || DEFAULT_KEY;
  
  if (storedUrl && storedKey && storedUrl.startsWith('http')) {
    try {
      client = createClient(storedUrl, storedKey, {
        auth: { persistSession: false },
        db: { schema: 'public' }
      });

      client.channel('db-changes')
        .on('postgres_changes', { event: '*', schema: 'public' }, () => {
          supabase._notify();
        })
        .subscribe();
    } catch (e) {
      console.error("Supabase Initialization Failed:", e);
      client = null;
    }
  }
};

initClient();

export const DEFAULT_DATA: Record<string, any[]> = {
  projects: [],
  services: [],
  gallery: [],
  partners: [],
  faqs: [
    {
      question: "ما هي المجالات الهندسية التي تغطيها الشركة؟",
      answer: "نغطي مجالات الهندسة الكهربائية (الضغط العالي والمنخفض)، الميكانيكية (صيانة المولدات والمحركات)، وأنظمة التحكم الصناعي (PLC & SCADA) والطاقة المتجددة."
    },
    {
      question: "هل تقدمون عقود صيانة سنوية للمصانع؟",
      answer: "نعم، نقدم عقود صيانة دورية ووقائية شاملة للمنشآت الصناعية والمستشفيات والبنوك لضمان استمرارية العمل وتقليل التوقفات المفاجئة."
    },
    {
      question: "كيف يمكنني طلب عرض سعر لمشروع؟",
      answer: "يمكنك التواصل معنا مباشرة عبر الرقم 777403614 أو ملء نموذج التواصل في الموقع وسيتم الرد عليك خلال 24 ساعة."
    },
    {
      question: "هل تتوفر لديكم قطع غيار أصلية؟",
      answer: "نحن نوفر قطع غيار أصلية ومعتمدة لمختلف أنواع المولدات وأنظمة التحكم، مع ضمان التركيب والجودة."
    }
  ],
  testimonials: [],
  values: [
    {
      title: "الجودة المطلقة",
      subtitle: "نلتزم بأعلى معايير الجودة العالمية في كل مشروع ننفذه.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
      tag: "QUALITY"
    },
    {
      title: "الابتكار الهندسي",
      subtitle: "نستخدم أحدث التقنيات لتقديم حلول ذكية ومبتكرة.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80",
      tag: "INNOVATION"
    },
    {
      title: "السلامة المهنية",
      subtitle: "سلامة طواقمنا وعملائنا هي أولويتنا القصوى في الميدان.",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80",
      tag: "SAFETY"
    }
  ],
  features: [
    {
      title: "استجابة فورية",
      desc: "نحن ندرك أهمية الوقت في القطاع الصناعي، لذا نوفر فرق صيانة جاهزة للتحرك فوراً عند الطوارئ.",
      icon: "⚡"
    },
    {
      title: "دقة هندسية",
      desc: "نطبق أدق المعايير العالمية في التصميم والبرمجة لضمان عمل الأنظمة بكفاءة تشغيلية مطلقة.",
      icon: "⚙️"
    },
    {
      title: "حلول متكاملة",
      desc: "من توريد قطع الغيار الأصلية إلى البرمجة والصيانة، نغطي كافة احتياجات منشأتكم الهندسية.",
      icon: "🛠️"
    }
  ],
  steps: [
    {
      n: "01",
      t: "تحليل الاحتياجات",
      d: "دراسة ميدانية دقيقة لتحديد المتطلبات الفنية.",
      icon: "📋"
    },
    {
      n: "02",
      t: "التصميم الهندسي",
      d: "إعداد المخططات والحلول المقترحة بأحدث البرامج.",
      icon: "📐"
    },
    {
      n: "03",
      t: "التنفيذ والتركيب",
      d: "تركيب الأنظمة بواسطة نخبة من المهندسين الخبراء.",
      icon: "🏗️"
    },
    {
      n: "04",
      t: "الاختبار والتشغيل",
      d: "فحص شامل لضمان كفاءة الأداء قبل التسليم النهائي.",
      icon: "✅"
    }
  ]
};

const getCachedData = (key: string) => {
  try {
    const cached = localStorage.getItem(`cache_${key}`);
    return cached ? JSON.parse(cached) : null;
  } catch (e) { 
    console.warn(`Cache retrieval failed for ${key}:`, e);
    return null; 
  }
};

const setCachedData = (key: string, data: any) => {
  try {
    localStorage.setItem(`cache_${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn(`Cache storage failed for ${key}:`, e);
  }
};

export const supabase = {
  onChange(cb: () => void) {
    _listeners.push(cb);
    return () => { _listeners = _listeners.filter(l => l !== cb); };
  },
  _notify() { 
    _listeners.forEach(l => l()); 
  },

  async fetchData(table: string) {
    const cached = getCachedData(table);
    if (!client) return cached || DEFAULT_DATA[table] || [];
    try {
      const { data, error } = await client.from(table).select('*').order('created_at', { ascending: false });
      
      if (error) {
        if (error.code === 'PGRST205' || error.code === '42P01') {
          console.warn(`Table ${table} is missing in DB. Using fallback data.`);
          return cached || DEFAULT_DATA[table] || [];
        }
        throw error;
      }
      
      if (data) {
        setCachedData(table, data);
        return data;
      }
    } catch (e) {
      console.error(`Error fetching ${table}:`, e);
    }
    return cached || DEFAULT_DATA[table] || [];
  },

  async getMessages() { return this.fetchData('messages'); },
  async getProjects() { return this.fetchData('projects'); },
  async getServices() { return this.fetchData('services'); },
  async getGallery() { return this.fetchData('gallery'); },
  async getPartners() { return this.fetchData('partners'); },
  async getFAQs() { return this.fetchData('faqs'); },
  async getTestimonials() { return this.fetchData('testimonials'); },
  async getValues() { return this.fetchData('values'); },
  async getFeatures() { return this.fetchData('features'); },
  async getSteps() { return this.fetchData('steps'); },

  async getSettings() {
    const cached = getCachedData('settings');
    const fallback = cached || { logo: DEFAULT_LOGO_URL, maintenance: 'false', password: 'admin123', admin_email: '734650245tv@gmail.com' };
    if (!client) return fallback;
    try {
      const { data, error } = await client.from('settings').select('*').limit(1).single();
      if (error) throw error;
      if (data) {
        setCachedData('settings', data);
        return data;
      }
    } catch (e) {
      console.error("Error fetching settings:", e);
    }
    return fallback;
  },

  async updateSetting(key: string, value: string) {
    if (!client) return false;
    try {
      const { error } = await client.from('settings').upsert({ id: 1, [key]: value });
      if (error) throw error;
      this._notify();
      return true;
    } catch (e) {
      console.error(`Failed to update setting ${key}:`, e);
      return false;
    }
  },

  async getAdminPassword() {
    const settings = await this.getSettings();
    return settings.password || "admin123";
  },

  async triggerEmail(type: 'reset' | 'contact', payload: any) {
    if (!client) return { success: false, error: 'لا يوجد اتصال بـ Supabase' };
    try {
      const { data, error } = await client.functions.invoke('send-email', {
        body: { type, ...payload }
      });
      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      console.error("Supabase Edge Function Error:", err);
      return { success: false, error: 'الوظيفة السحابية غير مفعلة بعد أو تعذر الوصول إليها.' };
    }
  },

  async requestPasswordReset(email: string) {
    const settings = await this.getSettings();
    if (email === settings.admin_email || email === '734650245tv@gmail.com') {
      return await this.triggerEmail('reset', { email });
    }
    return { success: false, error: 'البريد الإلكتروني غير مسجل كمسؤول' };
  },

  async sendMessage(msg: any) {
    const insertResult = await this.insertData('messages', msg);
    if (insertResult.success) {
      await this.triggerEmail('contact', msg);
    }
    return insertResult;
  },

  async insertData(table: string, data: any) {
    if (!client) return { success: false, error: 'No database client connected' };
    try {
      const { error } = await client.from(table).insert(data);
      if (error) throw error;
      this._notify();
      return { success: true };
    } catch (e: any) {
      console.error(`Insert failed in ${table}:`, e);
      return { success: false, error: e.message };
    }
  },

  async updateData(table: string, id: any, data: any) {
    if (!client) return { success: false };
    try {
      const { error } = await client.from(table).update(data).eq('id', id);
      if (error) throw error;
      this._notify();
      return { success: true };
    } catch (e) {
      console.error(`Update failed in ${table}:`, e);
      return { success: false };
    }
  },

  async deleteData(table: string, id: any) {
    if (!client) return { success: false };
    try {
      const { error } = await client.from(table).delete().eq('id', id);
      if (error) throw error;
      this._notify();
      return { success: true };
    } catch (e) {
      console.error(`Delete failed in ${table}:`, e);
      return { success: false };
    }
  }
};
