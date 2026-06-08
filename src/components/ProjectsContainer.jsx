import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { value: 'Client', label: 'Client Work', icon: '💼' },
  { value: 'Personal', label: 'Personal Projects', icon: '🚀' },
  { value: 'Archive', label: 'Archived', icon: '📦' },
];

export default function ProjectsContainer({ projects, children }) {
  const [selectedCategory, setSelectedCategory] = useState('Client');

  // Group by category for count display
  const projectsByCategory = {
    Client: projects.filter((p) => p.Type === 'Client'),
    Personal: projects.filter((p) => p.Type === 'Personal'),
    Archive: projects.filter((p) => p.Type === 'Archive'),
  };

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <motion.div
        className="flex flex-wrap gap-3 justify-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {CATEGORIES.map((category) => (
          <motion.button
            key={category.value}
            onClick={() => {
              setSelectedCategory(category.value);
              // Toggle visibility of project cards
              document.querySelectorAll('[data-project-type]').forEach((el) => {
                if (el.getAttribute('data-project-type') === category.value) {
                  el.style.display = 'block';
                } else {
                  el.style.display = 'none';
                }
              });
            }}
            className={`px-6 py-3 rounded-xl font-semibold cursor-pointer! transition-all duration-300 flex items-center gap-2 ${
              selectedCategory === category.value
                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                : 'bg-white dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/60'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg">{category.icon}</span>
            {category.label}
            {projectsByCategory[category.value].length > 0 && (
              <span className="ml-1 text-xs opacity-75 font-bold">
                ({projectsByCategory[category.value].length})
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {children}
      </div>
    </div>
  );
}
