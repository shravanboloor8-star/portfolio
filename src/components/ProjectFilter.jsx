import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { value: 'Client', label: 'Client Work', icon: '💼' },
  { value: 'Personal', label: 'Personal Projects', icon: '🚀' },
  { value: 'Archive', label: 'Archived', icon: '📦' },
];

export default function ProjectFilter({ selectedCategory, onCategoryChange }) {
  return (
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
          onClick={() => onCategoryChange(category.value)}
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
        </motion.button>
      ))}
    </motion.div>
  );
}
