import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const getCompanyEmoji = (company) => {
  const companyLower = (company || "").toLowerCase();
  if (companyLower.includes("cake")) return "🍰";
  if (companyLower.includes("ipangram")) return "⚡";
  if (companyLower.includes("starlly")) return "⭐";
  if (companyLower.includes("surya")) return "☀️";
  if (companyLower.includes("healthy")) return "🏪";
  if (companyLower.includes("sky")) return "☁️";
  return "🏢";
};

export default function ExperienceSection({ experiences }) {
  const [selectedExp, setSelectedExp] = useState(null);
  const list = experiences || [];

  return (
    <>
      <motion.div
        className="space-y-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {list.length === 0 ? (
          <div className="text-center py-12 p-6 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900/30">
            <p className="text-slate-500 dark:text-slate-400 text-base">
              Loading experience data from Supabase...
            </p>
          </div>
        ) : (
          list.map((exp, idx) => {
            const hasLink = exp.link && exp.link !== '#';
            return (
              <motion.div
                key={exp.id || idx}
                variants={cardVariants}
                className="group"
              >
                <motion.button
                  onClick={() => setSelectedExp(selectedExp?.id === exp.id ? null : exp)}
                  className="w-full text-left p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md dark:hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-6 shadow-sm"
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Logo & Text info block */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 flex-grow w-full">
                    {/* Logo container */}
                    <div className="shrink-0">
                      {exp.logo_url ? (
                        <img
                          src={exp.logo_url}
                          alt={exp.company}
                          className="w-12 h-12 rounded-xl object-contain bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:shadow-md transition-shadow"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.nextElementSibling;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm border border-slate-200/50 dark:border-slate-700 group-hover:scale-105 transition-transform ${exp.logo_url ? 'hidden' : ''}`}>
                        {getCompanyEmoji(exp.company)}
                      </div>
                    </div>

                    {/* Info details */}
                    <div className="space-y-4 flex-grow w-full">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                          {exp.company}
                        </p>
                      </div>

                      <p className="text-slate-605 dark:text-slate-300 text-sm leading-relaxed max-w-2xl">
                        {exp.description}
                      </p>

                      {/* Tech Chips */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.highlights.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700 font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {exp.highlights.length > 3 && (
                            <span className="text-xs text-slate-500 dark:text-slate-400 px-2 py-1.5">
                              +{exp.highlights.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeframe */}
                  <div className="flex items-center gap-3 md:shrink-0">
                    <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400 self-start md:self-auto shadow-sm select-none">
                      {exp.period}
                    </span>
                    <motion.div
                      animate={{ rotate: selectedExp?.id === exp.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-5 h-5 text-slate-400 dark:text-slate-500"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedExp?.id === exp.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 space-y-6">
                        {/* Full Description */}
                        <div>
                          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-3">About this role</h4>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>

                        {/* All Tech Chips */}
                        {exp.highlights && exp.highlights.length > 0 && (
                          <div>
                            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-3">Technologies & Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.highlights.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-medium hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Company Link */}
                        {hasLink && (
                          <div>
                            <a
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors duration-200"
                            >
                              Visit Company
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </>
  );
}
