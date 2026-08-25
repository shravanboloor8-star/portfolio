import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Category icon helper
const CATEGORY_ICONS = {
  react: '⚛️',
  server: '🖥️',
  database: '🗄️',
  'toggle-left': '🚫',
  tool: '🔧',
  Frontend: '⚛️',
  Backend: '🖥️',
  Database: '🗄️',
  'No-Code': '🚫',
  Tools: '🔧',
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

const PREFERRED_CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'No-Code', 'Tools'];

export default function TechWall({ skills: dynamicSkills }) {
  // Build skill data structure from dynamic Supabase skills or fallback to static SKILLS
  const skillData = React.useMemo(() => {
    if (dynamicSkills && Array.isArray(dynamicSkills) && dynamicSkills.length > 0) {
      const formatted = {};
      dynamicSkills.forEach((item) => {
        const cat = item.category || 'Other';
        if (!formatted[cat]) {
          formatted[cat] = {
            icon: item.category_icon || 'tool',
            items: [],
            itemObjects: []
          };
        }
        formatted[cat].items.push(item.name);
        formatted[cat].itemObjects.push(item);
      });
      return formatted;
    }
    return {};
  }, [dynamicSkills]);

  // Sort categories by preferred order
  const categories = React.useMemo(() => {
    const keys = Object.keys(skillData);
    return keys.sort((a, b) => {
      const indexA = PREFERRED_CATEGORY_ORDER.indexOf(a);
      const indexB = PREFERRED_CATEGORY_ORDER.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [skillData]);

  const [selectedCategory, setSelectedCategory] = useState('Frontend');

  // Sync selectedCategory when categories update
  React.useEffect(() => {
    if (categories.length > 0 && !categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const currentCategoryData = skillData[selectedCategory] || { items: [], itemObjects: [] };
  const currentSkills = currentCategoryData.itemObjects || [];

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
          const icon = CATEGORY_ICONS[category] || '🔧';
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
          {currentSkills.map((skillObj) => {
            const name = skillObj.name;
            const logo = skillObj.logo_url;
            const fallback = skillObj.fallback_emoji || '⚙️';

            const nameLower = (name || '').toLowerCase();
            const isSmallLogo = nameLower.includes('figma') || nameLower.includes('razorpay');

            return (
              <motion.div
                key={name}
                className="group p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-900/50 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative"
                variants={itemVariants}
                whileHover={{
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.15)",
                }}
              >
                {/* Logo and Text */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                    {logo ? (
                      <img
                        src={logo}
                        alt={name}
                        className={`w-full h-full object-contain ${isSmallLogo ? 'scale-150 transform' : 'p-0.5'}`}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallbackEl = e.currentTarget.nextElementSibling;
                          if (fallbackEl) fallbackEl.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <span
                      className={`text-2xl ${logo ? 'hidden' : ''}`}
                    >
                      {fallback}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {name}
                    </h4>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
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
                {skillData[cat]?.items?.length || skillData[cat]?.itemObjects?.length || 0}
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
