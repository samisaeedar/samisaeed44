
import React, { useState, useEffect, useCallback, memo } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Specializations from '@/components/Specializations';
import WhyUs from '@/components/WhyUs';
import EngineeringGallery from '@/components/EngineeringGallery';
import Portfolio from '@/components/Portfolio';
import AllProjects from '@/components/AllProjects';
import ProjectDetailView from '@/components/ProjectDetailView';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import ContactInfo from '@/components/ContactInfo';
import Footer from '@/components/Footer';
import FloatingAI from '@/components/FloatingAI';
import ScrollToTop from '@/components/ScrollToTop';
import Dashboard from '@/components/Dashboard';
import MaintenanceROICalculator from '@/components/MaintenanceROICalculator';
import PowerTools from '@/components/PowerTools';
import GeneratorScheduleCalculator from '@/components/GeneratorScheduleCalculator';
import EngineeringProcess from '@/components/EngineeringProcess';
import ValueSlider from '@/components/ValueSlider';
import { supabase, DEFAULT_DATA } from './db';

const SectionWrapper = memo(({ children, id, className = "", label }: { children: React.ReactNode, id?: string, className?: string, label?: string }) => {
  return (
    <section 
      id={id} 
      className={`relative py-12 md:py-20 lg:py-24 overflow-hidden border-b border-slate-100 dark:border-white/[0.02] ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none z-30 opacity-40">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent animate-laser-top"></div>
        <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-yellow-500 to-transparent animate-laser-right"></div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent animate-laser-bottom"></div>
        <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent via-yellow-500 to-transparent animate-laser-left"></div>
      </div>
      <div className="absolute top-4 left-6 hidden xl:block select-none pointer-events-none">
        <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.6em] flex items-center gap-2">
          <span className="w-1 h-1 bg-yellow-500 rounded-full"></span>
          {label || 'AL_AREIQI_UNIT_CORE'}
        </span>
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
});

const EnergyDivider = () => (
  <div className="h-px w-full bg-slate-200 dark:bg-white/5 relative overflow-hidden">
    <div className="absolute inset-0 bg-yellow-500 w-1/4 blur-sm animate-flow-fast"></div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'tools' | 'all-projects' | 'project-details' | '404'>('home');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [prevPage, setPrevPage] = useState<'home' | 'all-projects'>('home');
  const [showDashboard, setShowDashboard] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [logoUrl, setLogoUrl] = useState('https://engaliareeki.github.io/web/assets/images/logo.png');
  const [heroImageUrl, setHeroImageUrl] = useState('https://engaliareeki.github.io/web/assets/images/event-01.jpg');
  
  const [projects, setProjects] = useState<any[]>(DEFAULT_DATA.projects);
  const [gallery, setGallery] = useState<any[]>(DEFAULT_DATA.gallery);
  const [faqs, setFaqs] = useState<any[]>(DEFAULT_DATA.faqs);
  const [values, setValues] = useState<any[]>(DEFAULT_DATA.values);
  const [steps, setSteps] = useState<any[]>(DEFAULT_DATA.steps);
  const [features, setFeatures] = useState<any[]>(DEFAULT_DATA.features);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPage]);

  const syncAllData = useCallback(async () => {
    try {
      const [settings, prjs, gals, fqs, vls, stps, ftrs] = await Promise.all([
        supabase.getSettings(),
        supabase.getProjects(),
        supabase.getGallery(),
        supabase.getFAQs(),
        supabase.getValues(),
        supabase.getSteps(),
        supabase.getFeatures()
      ]);

      if (settings?.logo) setLogoUrl(settings.logo);
      if (settings?.hero_image) setHeroImageUrl(settings.hero_image);
      if (settings?.maintenance) setIsMaintenance(settings.maintenance === 'true');
      
      setProjects(prjs);
      setGallery(gals);
      setFaqs(fqs);
      setValues(vls);
      setSteps(stps);
      setFeatures(ftrs);
    } catch (e) {
      console.error("Background sync failed");
    }
  }, []);

  useEffect(() => {
    syncAllData();
    const unsubscribe = supabase.onChange(() => syncAllData());
    return () => unsubscribe();
  }, [syncAllData]);

  const openProjectDetails = (project: any, source: 'home' | 'all-projects') => {
    setSelectedProject(project);
    setPrevPage(source);
    setCurrentPage('project-details');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-white dark:bg-slate-950">
      <Header onLogoClick={() => setShowDashboard(true)} logoUrl={logoUrl} onPageChange={(p: any) => setCurrentPage(p)} currentPage={currentPage} />
      
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero heroImageUrl={heroImageUrl} />
            <EnergyDivider />
            <SectionWrapper id="specializations" label="ENGINEERING_SCOPE">
              <Specializations />
            </SectionWrapper>
            
            {/* تعديل الهامش: زيادته قليلاً ليكون مريحاً للعين */}
            <SectionWrapper id="why-us" label="RELIABILITY_DATA" className="bg-slate-50/50 dark:bg-slate-900/10 !pb-12 md:!pb-16">
               <WhyUs features={features} />
            </SectionWrapper>
            
            {/* تعديل الهامش: زيادته قليلاً ليكون متوازناً */}
            <SectionWrapper id="steps" label="WORKFLOW_PROTOCOL" className="!pt-12 md:!pt-16">
              <EngineeringProcess steps={steps} />
            </SectionWrapper>

            <SectionWrapper id="portfolio" label="ASSET_PORTFOLIO" className="bg-slate-50/50 dark:bg-slate-900/10">
              <Portfolio projects={projects} onViewAll={() => setCurrentPage('all-projects')} onProjectClick={(p) => openProjectDetails(p, 'home')} />
            </SectionWrapper>
            <SectionWrapper id="values" label="CORE_VALUES">
              <ValueSlider values={values} />
            </SectionWrapper>
            <SectionWrapper id="gallery" label="SITE_RECORDS" className="bg-slate-50/50 dark:bg-slate-900/10 py-0 md:py-0 lg:py-0">
              <EngineeringGallery galleryItems={gallery} logoUrl={logoUrl} />
            </SectionWrapper>
            <SectionWrapper id="faq" label="DOCUMENTATION">
              <FAQ faqs={faqs} />
            </SectionWrapper>
            <SectionWrapper id="contact-hub" label="GATEWAY" className="bg-slate-50/50 dark:bg-slate-900/20">
              <Contact />
              <ContactInfo />
            </SectionWrapper>
          </>
        ) : currentPage === 'all-projects' ? (
          <AllProjects projects={projects} onBack={() => setCurrentPage('home')} onProjectClick={(p) => openProjectDetails(p, 'all-projects')} />
        ) : currentPage === 'project-details' ? (
          <ProjectDetailView project={selectedProject} onBack={() => setCurrentPage(prevPage)} />
        ) : (
          <div className="pt-24 bg-white dark:bg-slate-950 px-4 md:px-8 lg:px-12 space-y-12 pb-24">
            <PowerTools />
            <GeneratorScheduleCalculator />
            <MaintenanceROICalculator />
          </div>
        )}
      </main>

      <Footer onAdminClick={() => setShowDashboard(true)} logoUrl={logoUrl} />
      <FloatingAI />
      <ScrollToTop />

      {showDashboard && (
        <Dashboard 
          logoUrl={logoUrl}
          heroImageUrl={heroImageUrl}
          isMaintenance={isMaintenance}
          onClose={() => setShowDashboard(false)} 
          onLogoChange={async (u) => await supabase.updateSetting('logo', u)}
          onHeroImageChange={async (u) => await supabase.updateSetting('hero_image', u)}
          onMaintenanceToggle={async (v) => await supabase.updateSetting('maintenance', v ? 'true' : 'false')}
        />
      )}
    </div>
  );
};

export default App;
