import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) return;
    if (start === end) return;

    const duration = 1500; // 1.5 seconds
    const increment = end / (duration / 16);

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  const metrics = [
    { value: "11", suffix: "+", label: "Projects Delivered" },
    { value: "5", suffix: "+", label: "Years Experience" },
    { value: "3", suffix: "", label: "Industries Served" },
    { value: "2", suffix: "", label: "Products Being Built" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto py-8">
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          className="text-center p-6 rounded-2xl border border-slate-200 dark:border-slate-200/5 bg-white/70 dark:bg-slate-900/30 backdrop-blur-md hover:border-primary-500/30 dark:hover:border-primary-500/20 hover:bg-white dark:hover:bg-slate-900/50 transition-all duration-300 shadow-sm dark:shadow-none"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
        >
          <div className="text-4xl sm:text-5xl font-extrabold font-display bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 dark:from-primary-400 dark:via-secondary-400 dark:to-accent-400 bg-clip-text text-transparent mb-2">
            <CountUp value={metric.value} suffix={metric.suffix} />
          </div>
          <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-450 font-semibold tracking-wider uppercase">
            {metric.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
