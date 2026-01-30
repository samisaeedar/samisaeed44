
import React from 'react';

const CLIENT_LOGOS = [
  { name: 'Al-Hada Hospital', url: 'https://placehold.co/400x150/020617/eab308?text=HADA+HOSPITAL' },
  { name: 'Central Bank', url: 'https://placehold.co/400x150/020617/eab308?text=CENTRAL+BANK' },
  { name: 'Yemen Steel', url: 'https://placehold.co/400x150/020617/eab308?text=YEMEN+STEEL' },
  { name: 'Saba Fond', url: 'https://placehold.co/400x150/020617/eab308?text=SABA+FOND' },
  { name: 'Aden Port', url: 'https://placehold.co/400x150/020617/eab308?text=ADEN+PORT' },
  { name: 'Yemen Mobile', url: 'https://placehold.co/400x150/020617/eab308?text=YEMEN+MOBILE' },
  { name: 'Blue Sea Co', url: 'https://placehold.co/400x150/020617/eab308?text=BLUE+SEA' },
  { name: 'Golden Factory', url: 'https://placehold.co/400x150/020617/eab308?text=GOLDEN+FAC' },
  { name: 'Al-Amal Bank', url: 'https://placehold.co/400x150/020617/eab308?text=AL-AMAL+BANK' },
  { name: 'Sky Power', url: 'https://placehold.co/400x150/020617/eab308?text=SKY+POWER' },
];

const Partners: React.FC = () => {
  return (
    <section className="py-24 bg-[#020617] overflow-hidden border-t border-white/5 font-['Tajawal']" dir="rtl">
      <div className="container mx-auto px-6 mb-16 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
           <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
           <span className="text-yellow-500 font-black tracking-[0.3em] text-[9px] uppercase">ثقة متجددة</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
          فخورون <span className="text-yellow-500 italic">بعملائنا</span>
        </h2>
        <p className="text-slate-500 mt-6 text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          نخدم كبرى المؤسسات البنكية، الصناعية، والخدمية في الجمهورية اليمنية بأعلى معايير الجودة.
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center py-4">
        {/* Shadow Overlays for smooth entry/exit - Stronger for better blending */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-80 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 md:w-80 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-20 pointer-events-none"></div>

        {/* The Scrolling Content - Infinite Seamless Loop */}
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee-continuous whitespace-nowrap items-center py-6">
            {/* Array doubled for seamless transition */}
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
              <div key={idx} className="mx-10 md:mx-20 flex-shrink-0 group">
                <div className="relative transition-all duration-500 group-hover:scale-110">
                  <div className="h-12 md:h-20 flex items-center justify-center">
                      <img 
                        src={logo.url} 
                        alt={logo.name} 
                        className="h-full w-auto grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 object-contain"
                      />
                  </div>
                  {/* Hover visual feedback */}
                  <div className="absolute -inset-6 bg-yellow-500/0 group-hover:bg-yellow-500/5 blur-[40px] rounded-full transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-continuous {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        /* For RTL support, we use a negative translate that works with the duplicated content */
        .animate-marquee-continuous {
          animation: marquee-continuous 45s linear infinite;
          display: flex;
          width: fit-content;
        }

        /* Support for user hover to pause for reading */
        .animate-marquee-continuous:hover {
          animation-play-state: paused;
        }

        /* Ensure smooth movement on mobile browsers */
        @media (max-width: 768px) {
          .animate-marquee-continuous {
            animation-duration: 30s;
          }
        }
      `}</style>
    </section>
  );
};

export default Partners;
