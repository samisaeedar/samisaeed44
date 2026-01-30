
import React, { useState, useMemo } from 'react';
import { optimizeImageUrl } from '../db';

interface Project {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface PortfolioProps {
  projects: Project[];
  onViewAll?: () => void;
  onProjectClick?: (project: Project) => void;
}

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  return (
    <div 
      className="group relative h-[350px] sm:h-[450px] md:h-[500px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 transition-all duration-500 shadow-sm hover:shadow-xl cursor-pointer"
      dir="rtl"
      onClick={onClick}
    >
      <img 
        src={optimizeImageUrl(project.image, 800, 70)} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 flex flex-col items-start gap-3">
        <div className="w-full">
          <span className="text-yellow-500 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1 block">
            {project.category}
          </span>
          <h3 className="text-lg md:text-3xl font-black text-white leading-tight mb-4">
            {project.title}
          </h3>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 md:px-8 md:py-3.5 bg-yellow-500 text-slate-950 rounded-xl md:rounded-2xl font-black text-[11px] md:text-sm transition-all hover:bg-white active:scale-95 shadow-lg">
            <span>تفاصيل المشروع</span>
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC<PortfolioProps> = ({ projects, onViewAll, onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filteredProjects = useMemo(() => {
    let list = projects || [];
    if (activeCategory !== "الكل") {
      list = list.filter(p => p.category && p.category.includes(activeCategory));
    }
    return list.slice(0, 4);
  }, [projects, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 font-['Tajawal']" dir="rtl">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-8">
        <div className="text-right">
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 dark:text-white mb-2 leading-none">
            سجل <span className="text-yellow-500">المشاريع</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-xl font-medium">
            توثيق ميداني لأبرز الحلول الهندسية التي قدمناها.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => onProjectClick?.(project)} />
        ))}
      </div>
      <div className="mt-12 md:mt-20 text-center">
         <button onClick={onViewAll} className="w-full md:w-auto px-10 py-4 md:px-14 md:py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl md:rounded-3xl font-black text-sm md:text-lg transition-all hover:bg-yellow-500 hover:text-slate-950 shadow-xl">
           عرض كافة المشاريع
         </button>
      </div>
    </div>
  );
};

export default Portfolio;
