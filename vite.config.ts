import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// محاكاة __dirname في بيئة ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // تحميل متغيرات البيئة بناءً على الوضع الحالي (development/production)
  // السلسلة الفارغة '' تعني تحميل جميع المتغيرات الموجودة في النظام
  // Fix: Cast process to any to resolve TypeScript error 'Property cwd does not exist on type Process'
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    // تعريف المتغيرات العامة التي سيتم استبدالها أثناء البناء
    define: {
      // نمرر فقط المتغيرات التي نحتاجها لتجنب تسريب أسرار النظام أو حدوث أخطاء
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY || ''),
      // تعريف كائن فارغ لـ process.env لتجنب حدوث انهيار في المكتبات التي تتوقعه
      'process.env': {}
    },
    server: {
      port: 3000
    },
    build: {
      outDir: 'dist',
      sourcemap: false, // تعطيل خرائط المصدر في الإنتاج لتقليل الحجم
      chunkSizeWarningLimit: 1600,
    }
  };
});