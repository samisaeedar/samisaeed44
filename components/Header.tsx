
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onLogoClick?: () => void;
  logoUrl?: string;
  onPageChange?: (page: 'home' | 'tools' | 'all-projects') => void;
  currentPage?: 'home' | 'tools' | 'all-projects' | 'project-details' | '404';
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, logoUrl, onPageChange, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    
    setIsDark(initialTheme);
    if (initialTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { label: 'الرئيسية', id: 'home', page: 'home' as const },
    { label: 'المشاريع', id: 'portfolio', page: 'home' as const },
    { label: 'الخدمات', id: 'specializations', page: 'home' as const },
    { label: 'الأدوات', id: 'tools', page: 'tools' as const },
  ];

  const handleLinkClick = (item: typeof navLinks[0]) => {
    setIsOpen(false);
    if (item.page === 'tools') {
      onPageChange?.('tools');
    } else {
      if (currentPage !== 'home') {
        onPageChange?.('home');
        setTimeout(() => {
          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'py-2 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm' : 'py-4 bg-transparent'}`} dir="rtl">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex items-center justify-between">
          
          <div 
            className="flex items-center gap-2 md:gap-3 cursor-pointer group shrink-0"
            onClick={() => { onPageChange?.('home'); window.scrollTo({top:0, behavior:'smooth'}); }}
          >
            <div className={`transition-all duration-300 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-2 border border-slate-100 dark:border-transparent ${scrolled ? 'w-9 h-9 md:w-11 md:h-11 p-1' : 'w-11 h-11 md:w-14 md:h-14 p-1.5'}`}>
              <img src={logoUrl || 'https://engaliareeki.github.io/web/assets/images/logo.png'} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col text-right">
              <h1 className={`font-black text-slate-900 dark:text-white leading-none transition-all ${scrolled ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'}`}>العريقي</h1>
              {!scrolled && <span className="text-yellow-600 dark:text-yellow-500 text-[8px] md:text-[9px] font-black uppercase tracking-wider mt-1 opacity-80">للخدمات الصناعية والهندسية</span>}
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/5">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item)}
                className={`px-4 py-2 rounded-lg text-[11px] font-black transition-all ${
                  (item.page === 'tools' && currentPage === 'tools') || (item.page === 'home' && currentPage === 'home' && item.id === 'home')
                  ? 'bg-yellow-500 text-slate-950 shadow-md'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 md:gap-3">
            <button 
              onClick={toggleTheme}
              className="w-9 h-9 md:w-10 md:h-10 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-500 hover:bg-yellow-500 hover:text-slate-950 transition-all shadow-sm"
              title="تغيير المظهر"
            >
              {!isDark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
              )}
            </button>

            <a 
              href="tel:+967777403614" 
              className="flex items-center gap-2 bg-emerald-500 hover:bg-slate-900 dark:hover:bg-white text-white dark:hover:text-slate-950 px-3 md:px-5 py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs font-black transition-all shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M3 5.25a.75.75 0 01.75-.75H8.1a.75.75 0 01.704.493l1.1 3.3a.75.75 0 01-.19.824l-1.92 1.92a15.42 15.42 0 006.52 6.52l1.92-1.92a.75.75 0 01.824-.19l3.3 1.1a.75.75 0 01.493.704v4.35a.75.75 0 01-.75.75h-1.35C9.76 22.5 1.5 14.24 1.5 4.11V5.25z" /></svg>
              <span className="hidden xs:inline">اتصل الآن</span>
            </a>

            <button 
              onClick={() => setIsOpen(true)}
              className="lg:hidden w-9 h-9 bg-yellow-500 rounded-lg flex flex-col items-center justify-center gap-1 shadow-md border border-yellow-400"
            >
              <div className="w-4 h-0.5 bg-slate-950 rounded-full"></div>
              <div className="w-4 h-0.5 bg-slate-950 rounded-full"></div>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[2000] lg:hidden transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-[280px] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-white/10 transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <span className="text-slate-900 dark:text-white font-black text-lg">الملاحة</span>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 bg-slate-100 dark:bg-white/5 rounded-lg text-slate-500 dark:text-white">✕</button>
            </div>

            <div className="flex flex-col gap-1 mb-8">
              {navLinks.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => handleLinkClick(item)}
                  className={`text-right py-4 px-4 rounded-xl font-black transition-all flex items-center justify-between group ${
                    (item.page === 'tools' && currentPage === 'tools') || (item.page === 'home' && currentPage === 'home' && item.id === 'home')
                    ? 'bg-yellow-500 text-slate-950'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10'
                  }`}
                >
                  {item.label}
                  <svg className="w-4 h-4 opacity-30 group-hover:translate-x-[-4px] transition-transform rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                </button>
              ))}
            </div>

            <div className="h-px w-full bg-slate-200 dark:bg-white/5 my-4"></div>

            <button 
              onClick={() => { setIsOpen(false); onLogoClick?.(); }}
              className="w-full flex items-center justify-between py-4 px-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-500 hover:border-yellow-500/30 transition-all font-black"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"/></svg>
                <span>دخول لوحة التحكم</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
