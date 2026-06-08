import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingProfile() {
  const badges = [
    { text: 'React', className: 'top-[18%] left-[-20px] md:left-[-40px] text-sky-700 bg-sky-50/90 border-sky-200/60 dark:text-sky-400 dark:bg-sky-500/10 dark:border-sky-500/20 shadow-md', delay: 0 },
    { text: 'Supabase', className: 'top-[12%] right-[-20px] md:right-[-40px] text-blue-700 bg-blue-50/90 border-blue-200/60 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20 shadow-md', delay: 0.6 },
    { text: 'TanStack', className: 'top-[48%] left-[-35px] md:left-[-60px] text-amber-700 bg-amber-50/90 border-amber-200/60 dark:text-amber-500 dark:bg-amber-500/10 dark:border-amber-500/20 shadow-md', delay: 1.2 },
    { text: 'Bubble', className: 'top-[42%] right-[-35px] md:right-[-60px] text-indigo-700 bg-indigo-50/90 border-indigo-200/60 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/20 shadow-md', delay: 1.8 },
    { text: 'AI-Driven', className: 'bottom-[18%] left-[-20px] md:left-[-40px] text-emerald-700 bg-emerald-50/90 border-emerald-200/60 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20 shadow-md', delay: 2.4 },
    { text: 'FinTech', className: 'bottom-[12%] right-[-20px] md:right-[-40px] text-purple-700 bg-purple-50/90 border-purple-200/60 dark:text-purple-400 dark:bg-purple-500/10 dark:border-purple-500/20 shadow-md', delay: 3.0 },
    { text: 'Product Builder', className: 'top-[-25px] left-[20%] text-pink-700 bg-pink-50/90 border-pink-200/60 dark:text-pink-400 dark:bg-pink-500/10 dark:border-pink-500/20 shadow-md', delay: 3.6 },
  ];

  return (
    <div className="relative w-full max-w-[380px] h-[380px] flex items-center justify-center mx-auto mt-16 lg:mt-0 select-none">
      
      {/* Floating Badges wrapper */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {badges.map((badge, idx) => (
          <motion.span
            key={idx}
            className={`absolute px-3.5 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md ${badge.className}`}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              delay: badge.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {badge.text}
          </motion.span>
        ))}
      </div>

      {/* Profile Card Container with Glow */}
      <motion.div
        className="relative w-56 h-[290px] rounded-2xl border border-slate-200 dark:border-slate-200/5 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-6 flex flex-col items-center justify-center text-center shadow-xl dark:shadow-2xl group overflow-hidden z-10"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Hover Ambient Glow */}
        <div className="absolute -inset-px bg-gradient-to-r from-primary-500/5 via-secondary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-sm" />

        {/* Profile Image with subtle scale on card hover */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-primary-500 via-secondary-500 to-accent-500 p-[2px] mb-5 shadow-lg shadow-primary-500/10 group-hover:shadow-primary-500/25 transition-all duration-500">
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-955 overflow-hidden flex items-center justify-center">
            <img 
              src="/shravan_profile.png"
              alt="Shravan Boloor Profile"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Info */}
        <h3 className="font-display font-extrabold text-base text-slate-800 dark:text-slate-100 mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-450 transition-colors duration-300">
          Shravan Boloor
        </h3>
        
        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase mb-4">
          Software Engineer
        </p>

        {/* Mini Badges */}
        <div className="flex gap-1.5">
          <span className="text-[9px] bg-slate-100 dark:bg-slate-950 text-slate-655 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 font-semibold select-none">
            Product Builder
          </span>
        </div>
      </motion.div>
    </div>
  );
}
