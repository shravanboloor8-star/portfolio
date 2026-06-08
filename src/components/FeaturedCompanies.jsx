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

export default function FeaturedCompanies() {
  const companies = [
    {
      name: "Cake Capital",
      role: "Senior Frontend Developer",
      tagline: "Digital Banking Platform",
      description: "Contributed customer-facing modules, administrative operations dashboards, and payment interface integrations using React and Bubble.",
      color: "from-blue-500/10 to-indigo-500/10 hover:border-blue-500/30",
      glowColor: "rgba(59, 130, 246, 0.15)",
      logo: "🍰",
    },
    {
      name: "HealthyMart",
      role: "Co-Founder & Full-Stack Developer",
      tagline: "Healthcare Commerce Platform",
      description: "Spearheaded health-conscious marketplace product design, inventory synchronization, ingredient analyzers, and merchant onboarding flow sheets.",
      color: "from-emerald-500/10 to-teal-500/10 hover:border-emerald-500/30",
      glowColor: "rgba(16, 185, 129, 0.15)",
      logo: "🏪",
    },
    {
      name: "SkyPay",
      role: "Co-Founder & Full-Stack Developer",
      tagline: "Payment & Financial Platform",
      description: "Designed multi-currency ledger interfaces, global bank compliance modules, transaction audit streams, and Antigravity AI workflows.",
      color: "from-purple-500/10 to-pink-500/10 hover:border-purple-500/30",
      glowColor: "rgba(139, 92, 246, 0.15)",
      logo: "☁️",
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
      {companies.map((company, idx) => (
        <motion.div
          key={idx}
          className={`relative p-8 rounded-2xl border border-slate-200/5 bg-slate-900/30 backdrop-blur-md bg-gradient-to-br ${company.color} transition-all duration-500 flex flex-col justify-between group overflow-hidden`}
          variants={cardVariants}
          whileHover={{
            y: -6,
            boxShadow: `0 0 35px ${company.glowColor}`,
          }}
        >
          {/* Inner highlights */}
          <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-3xl filter drop-shadow-md select-none">{company.logo}</span>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-slate-350">
                {company.role}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-display text-slate-100 group-hover:text-primary-400 transition-colors">
                {company.name}
              </h3>
              <p className="text-xs font-semibold text-primary-400 tracking-wide">
                {company.tagline}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed pt-2">
                {company.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
