import React from 'react';
import { motion } from 'framer-motion';

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

export default function Testimonials() {
  const reviews = [
    {
      quote: "Shravan is an exceptional engineer who combines deep React expertise with a sharp product mindset. He stepped in to build our fintech payout rails and delivered ahead of schedule.",
      author: "Co-Founder",
      company: "Skypay",
      avatar: "SP",
    },
    {
      quote: "We worked with Shravan to design and build Medora. His grasp of React/TanStack architecture and attention to visual detail made the integration extremely smooth.",
      author: "Tech Lead",
      company: "Medora",
      avatar: "MD",
    },
    {
      quote: "A rare full-stack builder who understands visual work processes and product scaling. Shravan's contribution to Cake Capital's dashboard tools was invaluable.",
      author: "Product Manager",
      company: "Cake Capital",
      avatar: "CC",
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {reviews.map((rev, idx) => (
        <motion.div
          key={idx}
          className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-200/5 bg-white/70 dark:bg-slate-900/30 backdrop-blur-md hover:border-slate-350 dark:hover:border-slate-800 hover:bg-white dark:hover:bg-slate-900/40 hover:shadow-md dark:hover:shadow-none transition-all duration-300 flex flex-col justify-between group shadow-sm"
          variants={cardVariants}
          whileHover={{
            y: -5,
            transition: { duration: 0.2 },
          }}
        >
          {/* Quote Mark */}
          <span className="text-4xl text-primary-600/20 font-serif leading-none select-none">“</span>

          <p className="text-slate-605 dark:text-slate-300 text-sm leading-relaxed mb-6 italic group-hover:text-slate-800 dark:group-hover:text-slate-105 transition-colors">
            {rev.quote}
          </p>

          {/* Author */}
          <div className="flex items-center gap-4 border-t border-slate-100 dark:border-slate-800/40 pt-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-600 to-secondary-550 dark:to-secondary-500 p-[1.5px] shrink-0">
              <div className="w-full h-full rounded-full bg-slate-50 dark:bg-slate-955 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300 font-display uppercase">
                {rev.avatar}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                {rev.company}
              </h4>
              <p className="text-xs text-slate-500">
                {rev.author}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
