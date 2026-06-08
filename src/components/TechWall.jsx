import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../lib/constants';

// Category icon helper
const CATEGORY_ICONS = {
  react: '⚛️',
  server: '🖥️',
  database: '🗄️',
  'toggle-left': '🚫', 
  tool: '🔧',
};

// Tech logos mapping - Real logos from public folder with emoji fallbacks
const TECH_LOGOS = {
  // Frontend Frameworks & Libraries
  'React.js': { logo: '/React.png', fallback: '⚛️' },
  'Next.js': { logo: '/nextJS.svg', fallback: '▲' },
  'Astro': { logo: '/astro.jpg', fallback: '🚀' },
  'Tailwind CSS': { logo: '/Tailwind.png', fallback: '🎨' },
  'TanStack': { logo: '/tanstack.png', fallback: '🔄' },
  'shadcn/ui': { logo: '/shadcn.png', fallback: '🎭' },
  // Backend
  'Django': { logo: null, fallback: '🐍' },
  'REST APIs': { logo: '/restAPI.jpg', fallback: '🔌' },
  'Stripe': { logo: '/stripe.svg', fallback: '💳' },
  'Authentication': { logo: 'authentication.png', fallback: '🔐' },
  'Webhooks': { logo: '/webhook.webp', fallback: '⚡' },

  // Database
  'Supabase': { logo: '/supabase.webp', fallback: '🟢' },
  'Supabase CLI': { logo: '/supabase.webp', fallback: '🟢' },
  'PostgreSQL': { logo: '/Postgresql.png', fallback: '🐘' },
  'Airtable': { logo: '/airtable.png', fallback: ' ' },
  'Firebase': {logo:'firebase.png',fallback:' '},

  // No-Code Platforms
  'Bubble.io': { logo: '/Bubble.png', fallback: '🫧' },
  'Bubble Development': { logo: '/Bubble.png', fallback: '🫧' },
  'Xano': { logo: '/xano.jpeg', fallback: '⚡' },
  'Webflow': { logo: '/webflow.webp', fallback: '🌐' },
  'Framer': { logo: '/framer.svg', fallback: '📐' },
  'Make': { logo: '/make.png', fallback: '🔗' },

  // Development Tools & Platforms
  'Vercel': { logo: null, fallback: '▲' },
  'GitHub': { logo: '/github.png', fallback: '🐙' },
  'VS Code': { logo: '/vs code.png', fallback: '💻' },
  'Figma': { logo: '/figma.png', fallback: '🎨' },
  'Docker': { logo: null, fallback: '🐳' },
  'RazorPay': { logo: '/Razorpay.png', fallback: '📦' },
  'ShipRocket': { logo: '/shiprocket.jpeg', fallback: '📦' },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export default function TechWall() {
  const categories = Object.keys(SKILLS);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const currentSkills = SKILLS[selectedCategory]?.items || [];

  return (
    <div className="w-full space-y-12">
      {/* Category Filter Tabs */}
      <motion.div
        className="flex flex-wrap gap-3 justify-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {categories.map((category) => {
          const iconKey = SKILLS[category]?.icon;
          const icon = CATEGORY_ICONS[iconKey] || '🔧';
          const isActive = selectedCategory === category;

          return (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-xl font-semibold cursor-pointer! transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/60'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg">{icon}</span>
              {category}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Technology Items Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentSkills.map((skill) => (
            <motion.div
              key={skill}
              className="group p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-900/50 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative"
              variants={itemVariants}
              whileHover={{
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.15)",
              }}
            >
              {/* Logo and Text */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {TECH_LOGOS[skill]?.logo ? (
                    <img
                      src={TECH_LOGOS[skill].logo}
                      alt={skill}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span
                    className={`text-2xl ${TECH_LOGOS[skill]?.logo ? 'hidden' : ''}`}
                  >
                    {TECH_LOGOS[skill]?.fallback || '⚙️'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {skill}
                  </h4>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Stats Footer */}
      <motion.div
        className="pt-6 border-t border-slate-200 dark:border-slate-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <div key={cat} className="text-center p-3 rounded-lg bg-slate-50/50 dark:bg-slate-900/20">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {SKILLS[cat]?.items?.length || 0}
              </div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mt-1">
                {cat}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
