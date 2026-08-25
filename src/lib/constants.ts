export const SITE_CONFIG = {
  name: 'Shravan Boloor',
  title: 'Full-Stack Software Engineer | Frontend Developer | Product Builder',
  description: 'Building scalable web applications in fintech, healthcare, and e-commerce. Currently developing Healthy Mart and Skypay.',
  email: 'shravanboloor1@gmail.com',
  phone: '+91-9483693865',
  location: 'Udupi, Karnataka, India',
  timezone: 'IST (UTC +5:30)',
  url: 'https://shravanboloor.com',
  github: 'https://github.com/shravan27090',
  linkedin: 'https://www.linkedin.com/in/shravan-boloor-3a669a16a/',
  twitter: 'https://twitter.com/shravanboloor',
};

export const NAVIGATION = [
  { label: 'Projects', href: '/#projects', icon: 'briefcase' },
  { label: 'Skills', href: '/#skills', icon: 'code' },
  { label: 'Experience', href: '/#experience', icon: 'clock' },
  { label: 'Contact', href: '/#contact', icon: 'mail' },
];

export const SKILLS = {
  'Frontend': {
    icon: 'react',
    items: ['React.js', 'TanStack', 'Astro', 'Tailwind CSS', 'shadcn/ui', 'Next.js']
  },
  'Backend': {
    icon: 'server',
    items: ['REST APIs', 'Webhooks', 'Authentication', 'Make', 'Automation' ]
  },
  'Database': {
    icon: 'database',
    items: ['Supabase', 'PostgreSQL', 'Airtable', 'Firebase']
  },
  'No-Code': {
    icon: 'toggle-left',
    items: ['Bubble.io', 'Xano', 'Framer', 'Webflow', 'Make']
  },
  'Tools': {
    icon: 'tool',
    items: ['Vercel', 'GitHub', 'Stripe', 'RazorPay', 'ShipRocket', 'VS Code', 'Figma', 'Supabase CLI', 'Docker']
  }
};


export const SOCIAL_LINKS = [
  { label: 'LinkedIn', url: SITE_CONFIG.linkedin, icon: 'linkedin' },
  { label: 'GitHub', url: SITE_CONFIG.github, icon: 'github' },
  { label: 'Twitter', url: SITE_CONFIG.twitter, icon: 'twitter' },
  { label: 'Email', url: `mailto:${SITE_CONFIG.email}`, icon: 'mail' },
];
