/* ═══════════════════════════════════════════════════════════════
   PORTFOLIO DATA — edit this object to update every section
   ═══════════════════════════════════════════════════════════════ */
const DATA = {

  /* ── Site meta ─────────────────────────────────────────── */
  site: {
    pageTitle: 'Himanshu Pratap Singh — Senior Software Engineer',
    logo:      'hps.dev',
    logoMark:  '.',
    navLinks: [
      { label: 'About',      href: '#about' },
      { label: 'Skills',     href: '#skills' },
      { label: 'Experience', href: '#experience' },
      { label: 'Work',       href: '#work' },
      { label: 'Certs',      href: '#certs' },
    ],
    navCta: { label: "Let's Talk", href: '#contact' },
    footerLinks: ['about', 'skills', 'experience', 'contact'],
  },

  /* ── Hero ──────────────────────────────────────────────── */
  hero: {
    badge:       'Available for opportunities',
    firstName:   'Himanshu',
    lastName:    'Pratap Singh',
    role:        'Senior Software Engineer',
    roleExtras:  'Frontend · Backend · AI Integrations',
    description: 'From real-time healthcare portals to large-scale IoT dashboards — I build software that handles the hard parts. 4 years across the full stack, now at EY engineering OpenAI integrations that help enterprises modernize legacy systems at speed.',
    cta: [
      { label: 'View My Work ↓', href: '#work',    cls: 'btn-primary' },
      { label: 'Get In Touch →', href: '#contact', cls: 'btn-secondary' },
    ],
    stats: [
      { num: '4', suffix: '', label: 'Years Experience' },
      { num: '10', suffix: '+', label: 'Tech Stacks' },
      { num: '5', suffix: '+', label: 'Certifications' },
    ],
    floatTags: [
      'Angular 19', 'Next.js 16', 'AI / LLMs',
      'TypeScript', 'React 19', 'Node.js',
      '.NET Core', 'PostgreSQL', 'Prisma ORM',
      'GraphQL', 'Three.js', 'Claude AI',
    ],
    codeCard: {
      filename: 'developer.ts',
      lines: [
        `<span class="kw">const</span> <span class="fn">developer</span> = {`,
        `&nbsp;&nbsp;<span class="obj">name</span>: <span class="str">"Himanshu Pratap Singh"</span>,`,
        `&nbsp;&nbsp;<span class="obj">role</span>: <span class="str">"Senior Software Engineer"</span>,`,
        `&nbsp;&nbsp;<span class="obj">experience</span>: <span class="num">4</span>,`,
        `&nbsp;&nbsp;<span class="obj">stack</span>: [`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="str">"Angular"</span>, <span class="str">"React"</span>, <span class="str">"Next.js"</span>,`,
        `&nbsp;&nbsp;&nbsp;&nbsp;<span class="str">"Node.js"</span>, <span class="str">".NET"</span>, <span class="str">"TypeScript"</span>,`,
        `&nbsp;&nbsp;],`,
        `&nbsp;&nbsp;<span class="obj">passion</span>: <span class="str">"Building for impact"</span>,`,
        `};<span class="cursor"></span>`,
      ],
    },
  },

  /* ── About ─────────────────────────────────────────────── */
  about: {
    sectionLabel: 'About Me',
    title:        'Full Stack Developer.<br>Problem Solver.<br>Continuous Learner.',
    photo:        'photo.jpeg',
    paragraphs: [
      "I'm a results-driven Senior Software Engineer with 4 years of experience building end-to-end web applications — from pixel-perfect UIs to scalable backend services in Node.js and .NET.",
      "I thrive on building things that matter — from real-time healthcare portals with role-based access control, to large-scale IoT dashboards tracking thousands of devices, to telehealth platforms connecting patients and doctors.",
      "Currently at EY as a Senior Software Engineer, I'm engineering OpenAI API integrations to modernize legacy systems and accelerate development workflows using AI-driven code refactoring.",
      "Outside client work I ship products end to end — most recently Rodent Shield, a production Next.js 16 platform I built solo from database schema to admin CMS, 3D front end, security hardening, and deployment.",
    ],
    highlights: [
      { icon: '📍', label: 'Location',     value: 'Pune, Maharashtra' },
      { icon: '🏢', label: 'Current Role', value: 'Sr. Software Engineer @ EY' },
      { icon: '🎓', label: 'Education',    value: 'BE Computer Science' },
      { icon: '🏆', label: 'Recognition',  value: 'EY Achiever Extraordinaire 2026<br>Extra Mile Award 2023' },
    ],
  },

  /* ── Skills ────────────────────────────────────────────── */
  skills: {
    sectionLabel: 'Skills & Technologies',
    title:        'My Tech Stack',
    subtitle:     'A curated set of tools and technologies I use to build exceptional digital experiences.',
    categories: [
      {
        icon: '⚛️', iconBg: 'rgba(79,142,247,0.15)',
        title: 'Frontend Technologies', sub: 'UI Frameworks & Libraries',
        pills: ['Angular 19','Angular Signals','React 19','Next.js 16','TypeScript','RxJS','Three.js','Web Components','Tailwind CSS','SCSS','Material UI','Bootstrap','Keycloak'],
      },
      {
        icon: '🔧', iconBg: 'rgba(52,211,153,0.15)',
        title: 'Backend & APIs', sub: 'Server & Integration Layer',
        pills: ['Node.js','.NET Core','ASP.NET Core','GraphQL','RESTful APIs','Server Actions','PostgreSQL','Prisma ORM','JWT Auth','WebSockets','JSON'],
      },
      {
        icon: '🤖', iconBg: 'rgba(6,182,212,0.15)',
        title: 'AI Tools & Integration', sub: 'LLMs & AI-Driven Development',
        pills: ['OpenAI API','Claude','GitHub Copilot','Azure AI','Prompt Engineering','AI Code Generation & Refactoring'],
      },
      {
        icon: '💻', iconBg: 'rgba(167,139,250,0.15)',
        title: 'Programming Languages', sub: 'Core Engineering Skills',
        pills: ['JavaScript','TypeScript','C#','Python','Java','C++'],
      },
      {
        icon: '🚀', iconBg: 'rgba(251,191,36,0.15)',
        title: 'DevOps & Tools', sub: 'CI/CD & Version Control',
        pills: ['Docker','GitLab','GitHub','Gerrit','Jenkins','Tomcat','CI/CD','Vercel','Supabase','Jira'],
      },
      {
        icon: '🧪', iconBg: 'rgba(239,68,68,0.15)',
        title: 'Testing & Quality', sub: 'Reliability & Coverage',
        pills: ['Jest','Jasmine','Karma','Postman','Debugging Tools'],
      },
      {
        icon: '🔒', iconBg: 'rgba(244,114,182,0.15)',
        title: 'Security & Web Foundations', sub: 'Hardening, Auth & SEO',
        pills: ['OWASP Top 10','CSP & HSTS','Auth.js v5','bcrypt','Zod Validation','Rate Limiting','Postgres RLS','Schema.org JSON-LD','GA4 / Meta Pixel'],
      },
      {
        icon: '📊', iconBg: 'rgba(16,185,129,0.15)',
        title: 'Data & Analytics', sub: 'Insights & Visualization',
        pills: ['Qlik Sense','SQL','KPI Dashboards'],
      },
    ],
  },

  /* ── Experience ────────────────────────────────────────── */
  experience: {
    sectionLabel: 'Career Journey',
    title:        'Work Experience',
    subtitle:     '4 years of building production-grade solutions across enterprise clients in healthcare, telecom, and IoT.',
    jobs: [
      {
        company: 'EY — Ernst & Young',
        role:    'Senior Software Engineer',
        period:  'Sep 2025 — Present',
        bullets: [
          'Developing full-stack features for legacy application modernization — building Angular front-end components while contributing to backend services in .NET and C# — accelerating delivery across the stack.',
          'Leveraging GitHub Copilot with custom instructions and reusable prompt templates to automate recurring development tasks, improving code consistency and throughput.',
          'Engineering OpenAI API integrations for automated code generation and refactoring within legacy projects, streamlining the development lifecycle and reducing manual effort.',
          'Developing a full-stack Candidate Hiring Management tool using .NET Core and Angular, featuring interactive stakeholder dashboards that surface bottlenecks across recruitment stages through real-time charts and KPIs.',
        ],
        tags: ['Angular','.NET Core','C#','OpenAI API','GitHub Copilot','AI Integration','Legacy Modernization','Hiring Analytics'],
      },
      {
        company: 'TATA Elxsi',
        role:    'Software Developer',
        period:  'Nov 2022 — Jul 2025',
        note:    'Delivered multiple enterprise-grade client solutions across healthcare, IoT, and telehealth domains.',
        bullets: [
          'Baxter, Bangalore (Jan 2025 – Jul 2025): Built responsive, accessible UI for a secure healthcare portal using Angular 19, Tailwind CSS and TypeScript, with Keycloak-based login and role-based rendering; integrated GraphQL APIs for real-time events and a custom Shaka Player video streaming module with RxJS.',
          'Ooredoo, Qatar (Feb 2024 – Dec 2024): Developed a large-scale IoT portal for real-time device tracking using Angular 16 with JWT authentication, integrating Google Maps and Ericsson Aeris APIs via Node.js for live geolocation; managed deployments with Docker.',
          'TEngage Telehealth Platform (Feb 2023 – Jan 2024): Built a telehealth web solution with React, Material UI and Amazon Chime SDK for secure video conferencing between patients, doctors, and hospital staff.',
          'Smart Clinical Trials Platform (Nov 2022 – Jan 2023): Created responsive interfaces for pharmaceutical trial data management using Angular 16 and Material UI, with JSON-based data flows and unit testing.',
        ],
        tags: ['Angular 16/19','React','GraphQL','Keycloak','RxJS','Node.js','JWT','Docker','Amazon Chime SDK','Google Maps API','Ericsson Aeris APIs'],
      },
      {
        company: 'Diagonal.ai',
        role:    'Data Analyst',
        period:  'Aug 2022 — Oct 2022',
        bullets: [
          'Designed and developed KPI dashboards using Qlik Sense with real-world company datasets to surface business insights.',
        ],
        tags: ['Qlik Sense','KPI Dashboards','Data Analysis'],
      },
    ],
  },

  /* ── Work / Projects ───────────────────────────────────── */
  work: {
    sectionLabel: 'Selected Work',
    title:        "Things I've Built",
    subtitle:     'A selection of impactful projects across full-stack product, healthcare, IoT, telehealth, HR tech, and AI domains.',
    projects: [
      {
        emoji:      '🛡️',
        bannerBg:   'linear-gradient(135deg,#141b06,#2f4310)',
        domain:     'Full-Stack Product',
        domainStyle:'background:rgba(163,230,53,0.1);color:#a3e635',
        title:      'Rodent Shield — Product & Admin CMS',
        desc:       'A production full-stack product platform built solo end to end: a Next.js 16 App Router storefront with a scroll-driven Three.js hero, a 10-model PostgreSQL schema via Prisma across 25+ routes, a role-protected admin CMS that lets a non-technical owner manage every product, price, and post without a deploy, and OWASP-hardened security throughout.',
        solo:       'Personal Project',
        soloNote:   'Built independently, outside client work — sole developer across architecture, database, admin portal, 3D front end, security, and deployment.',
        link:       'https://www.motormintautomotive.com/rodent-shield',
        linkLabel:  'Visit the live site',
        live:       true,
        techs:      ['Next.js 16','React 19','TypeScript','PostgreSQL','Prisma ORM','Auth.js v5','Server Actions','Three.js','Zod','Vercel'],
      },
      {
        emoji:      '🏥',
        bannerBg:   'linear-gradient(135deg,#0d1b3e,#1a3a6b)',
        domain:     'Healthcare',
        domainStyle:'background:rgba(79,142,247,0.1);color:var(--accent)',
        title:      'Secure Healthcare Portal',
        desc:       'Enterprise-grade healthcare portal built for Baxter with role-based access control, real-time notifications, multi-hospital dynamic deployments, and a custom video streaming module.',
        techs:      ['Angular 19','TypeScript','GraphQL','Keycloak','Tailwind CSS','Shaka Player','RxJS','Jest'],
      },
      {
        emoji:      '📡',
        bannerBg:   'linear-gradient(135deg,#0a2a1a,#0d4a2a)',
        domain:     'IoT',
        domainStyle:'background:rgba(52,211,153,0.1);color:var(--accent3)',
        title:      'IoT Device Web Portal',
        desc:       'Large-scale IoT platform built for Ooredoo Qatar — real-time device tracking and status visualization with live geolocation via Google Maps and Ericsson Aeris APIs, JWT-secured access, and live data binding across thousands of devices.',
        techs:      ['Angular 16','Node.js','Google Maps API','Ericsson Aeris APIs','JWT','RxJS','Docker','Jasmine/Karma'],
      },
      {
        emoji:      '🩺',
        bannerBg:   'linear-gradient(135deg,#1a0d2e,#3a1a5e)',
        domain:     'Telehealth',
        domainStyle:'background:rgba(167,139,250,0.1);color:var(--accent2)',
        title:      'TEngage — Telehealth Platform',
        desc:       'Real-time communication platform connecting patients, doctors, and hospital staff with secure video conferencing, virtual consultations, and appointment management.',
        techs:      ['React','Material UI','Amazon Chime SDK','SCSS','REST APIs'],
      },
      {
        emoji:      '🔬',
        bannerBg:   'linear-gradient(135deg,#1a1500,#3a2e00)',
        domain:     'Pharma',
        domainStyle:'background:rgba(251,191,36,0.1);color:#fbbf24',
        title:      'Clinical Trials Platform',
        desc:       'Responsive interface for managing pharmaceutical trial data with real-time monitoring, component-based UI architecture, and comprehensive unit testing.',
        techs:      ['Angular 16','Material UI','SCSS','REST APIs','Unit Testing'],
      },
      {
        emoji:      '👥',
        bannerBg:   'linear-gradient(135deg,#0d1a2e,#0a2a50)',
        domain:     'HR Tech',
        domainStyle:'background:rgba(79,142,247,0.1);color:var(--accent)',
        title:      'Candidate Hiring Management Tool',
        desc:       'Enterprise internal tool for end-to-end candidate tracking and hiring pipeline management. Stakeholders gain real-time visibility through interactive charts highlighting bottlenecks — stages where candidates are delayed or dropping off — enabling data-driven recruitment decisions.',
        techs:      ['.NET Core','ASP.NET Core','Angular','C#','REST APIs','Chart.js','SQL Server','JWT Auth'],
      },
      {
        emoji:      '🤖',
        bannerBg:   'linear-gradient(135deg,#0d1f1a,#0a3320)',
        domain:     'AI / LLMs',
        domainStyle:'background:rgba(52,211,153,0.1);color:var(--accent3)',
        title:      'AI Code Generation Pipeline',
        desc:       'Integrated OpenAI API into legacy enterprise systems to enable automated code generation and AI-driven refactoring, accelerating the modernization of large codebases.',
        techs:      ['OpenAI API','Node.js','TypeScript','AI Tooling'],
      },
      {
        emoji:      '📊',
        bannerBg:   'linear-gradient(135deg,#1a0808,#3a1010)',
        domain:     'Analytics',
        domainStyle:'background:rgba(239,68,68,0.1);color:#f87171',
        title:      'KPI Analytics Dashboards',
        desc:       'Designed and developed business intelligence dashboards using Qlik Sense, surfacing key performance metrics from real-world company datasets for stakeholder decision-making.',
        techs:      ['Qlik Sense','SQL','Data Visualization'],
      },
    ],
  },

  /* ── Certifications ────────────────────────────────────── */
  certs: {
    sectionLabel: 'Achievements',
    title:        'Certifications & Awards',
    subtitle:     'Continuous learning through industry-recognized certifications and real-world recognition.',
    items: [
      { icon: '☁️', iconBg: 'rgba(0,120,212,0.15)',   name: 'Azure AI Fundamentals',   issuer: 'Microsoft Certified' },
      { icon: '🤖', iconBg: 'rgba(36,36,36,0.4)',      name: 'GitHub Copilot',          issuer: 'GitHub' },
      { icon: '🌟', iconBg: 'rgba(255,215,0,0.15)',    name: 'Extraordinary YOU — Achiever Extraordinaire', issuer: 'EY GDS — Jun 2026' },
      { icon: '🏆', iconBg: 'rgba(251,191,36,0.15)',   name: 'Extra Mile Award',        issuer: 'TATA Elxsi — Aug 2023' },
      { icon: '💛', iconBg: 'rgba(10,102,194,0.15)',   name: 'JavaScript & ReactJS',    issuer: 'LinkedIn Learning' },
      { icon: '🐳', iconBg: 'rgba(13,183,237,0.15)',   name: 'Docker Certification',    issuer: 'LinkedIn Learning' },
      { icon: '📖', iconBg: 'rgba(240,80,50,0.15)',    name: 'GIT & RESTful APIs',      issuer: "O'Reilly" },
      { icon: '☁️', iconBg: 'rgba(255,153,0,0.15)',    name: 'AWS Cloud Practitioner',  issuer: 'FutureSkills Prime' },
      { icon: '🎓', iconBg: 'rgba(79,142,247,0.15)',   name: 'B.E. Computer Science',   issuer: 'MVJ College of Engineering, 2022' },
    ],
  },

  /* ── Contact ───────────────────────────────────────────── */
  contact: {
    sectionLabel: 'Get In Touch',
    title:        "Let's Build",
    titleAccent:  'Something Great',
    subtitle:     "Whether you're looking for a frontend engineer, need AI integrations, or just want to connect — I'd love to hear from you. Let's turn ideas into impactful products.",
    cards: [
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
        label: 'Email', value: 'himanshupsingh47@gmail.com', href: 'mailto:himanshupsingh47@gmail.com',
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
        label: 'LinkedIn', value: 'himanshupratapsingh', href: 'https://www.linkedin.com/in/himanshupratapsingh/', external: true,
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/></svg>`,
        label: 'Phone', value: '+91 7905 359 265', href: 'tel:+917905359265',
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
        label: 'GitHub', value: 'himanshupsingh-dev', href: 'https://github.com/himanshupsingh-dev', external: true,
      },
    ],
    socials: [],
  },

  /* ── Footer ────────────────────────────────────────────── */
  footer: {
    logo:      'hps.dev',
    copy:      '© 2025–2026 Himanshu Pratap Singh. All rights reserved.',
    navLinks:  [
      { label: 'About',      href: '#about' },
      { label: 'Skills',     href: '#skills' },
      { label: 'Experience', href: '#experience' },
      { label: 'Contact',    href: '#contact' },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════
   ROBOT SVG GENERATOR - Multiple Variants
   ═══════════════════════════════════════════════════════════════ */
function createRobotSVG(className = 'robot-deco sm float', gradId = 'decoBot', variant = 'standard') {
  const gradientDefs = `<defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f8ef7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:1" />
    </linearGradient>
  </defs>`;

  const robots = {
    standard: `<svg class="${className}" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      ${gradientDefs}
      <g class="robot-body">
        <rect x="15" y="20" width="70" height="60" rx="8" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <g class="robot-eyes">
          <circle class="robot-eye" cx="35" cy="40" r="3.5" fill="#fff"/>
          <circle class="robot-eye" cx="65" cy="40" r="3.5" fill="#fff"/>
        </g>
        <path d="M 35 55 Q 50 62 65 55" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none" stroke-linecap="round"/>
        <g class="robot-antenna">
          <line x1="50" y1="20" x2="50" y2="5" stroke="#4f8ef7" stroke-width="2" stroke-linecap="round"/>
          <circle cx="50" cy="3" r="2.5" fill="#4f8ef7"/>
        </g>
      </g>
      <rect x="25" y="85" width="50" height="25" rx="4" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" opacity="0.8"/>
    </svg>`,

    happy: `<svg class="${className}" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      ${gradientDefs}
      <rect x="10" y="15" width="80" height="75" rx="12" fill="url(#${gradId})" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
      <circle cx="30" cy="35" r="6" fill="#fff"/>
      <circle cx="70" cy="35" r="6" fill="#fff"/>
      <path d="M 30 60 Q 50 72 70 60" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
      <g transform="translate(50, 10)">
        <circle cx="0" cy="0" r="3" fill="#34d399"/>
        <circle cx="8" cy="-2" r="2.5" fill="#34d399"/>
        <circle cx="-8" cy="-2" r="2.5" fill="#34d399"/>
      </g>
      <rect x="20" y="92" width="60" height="20" rx="3" fill="url(#${gradId})" opacity="0.6"/>
    </svg>`,

    thinking: `<svg class="${className}" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      ${gradientDefs}
      <rect x="15" y="20" width="70" height="55" rx="10" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <circle cx="32" cy="38" r="4.5" fill="#fff"/>
      <circle cx="68" cy="38" r="4.5" fill="#fff"/>
      <path d="M 32 55 Q 50 62 68 55" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"/>
      <circle cx="78" cy="50" r="4" fill="url(#${gradId})" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
      <circle cx="85" cy="42" r="3" fill="url(#${gradId})" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
      <rect x="25" y="78" width="50" height="28" rx="4" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" opacity="0.7"/>
    </svg>`,

    waving: `<svg class="${className}" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      ${gradientDefs}
      <rect x="15" y="30" width="60" height="55" rx="8" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <circle cx="32" cy="48" r="4" fill="#fff"/>
      <circle cx="58" cy="48" r="4" fill="#fff"/>
      <path d="M 32 62 Q 45 68 58 62" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none"/>
      <rect x="72" y="25" width="12" height="50" rx="6" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <circle cx="78" cy="15" r="8" fill="url(#${gradId})" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
      <rect x="25" y="87" width="45" height="22" rx="3" fill="url(#${gradId})" opacity="0.6"/>
    </svg>`,

    rocket: `<svg class="${className}" viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      ${gradientDefs}
      <path d="M 50 10 L 65 45 L 35 45 Z" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <rect x="30" y="45" width="40" height="50" rx="8" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <circle cx="38" cy="60" r="3" fill="#fff"/>
      <circle cx="62" cy="60" r="3" fill="#fff"/>
      <circle cx="50" cy="75" r="2.5" fill="rgba(255,255,255,0.7)"/>
      <path d="M 20 100 L 28 135 L 20 125 Z" fill="#fbbf24" opacity="0.8"/>
      <path d="M 80 100 L 72 135 L 80 125 Z" fill="#fbbf24" opacity="0.8"/>
      <path d="M 48 100 L 48 130 L 52 130 L 52 100 Z" fill="#f87171" opacity="0.7"/>
    </svg>`,

    code: `<svg class="${className}" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      ${gradientDefs}
      <rect x="12" y="20" width="76" height="70" rx="10" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <circle cx="30" cy="40" r="3.5" fill="#34d399"/>
      <circle cx="70" cy="40" r="3.5" fill="#34d399"/>
      <path d="M 28 70 L 42 82 M 72 70 L 58 82 M 50 68 L 50 84" stroke="rgba(255,255,255,0.7)" stroke-width="2" fill="none" stroke-linecap="round"/>
      <rect x="20" y="92" width="60" height="20" rx="3" fill="url(#${gradId})" opacity="0.6" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <text x="50" y="105" font-family="monospace" font-size="8" fill="#fff" text-anchor="middle" opacity="0.8">{ }</text>
    </svg>`,

    sunglasses: `<svg class="${className}" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      ${gradientDefs}
      <rect x="15" y="25" width="70" height="58" rx="9" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <rect x="22" y="38" width="18" height="16" rx="4" fill="#1a1a2e" stroke="#34d399" stroke-width="2"/>
      <rect x="60" y="38" width="18" height="16" rx="4" fill="#1a1a2e" stroke="#34d399" stroke-width="2"/>
      <line x1="40" y1="46" x2="60" y2="46" stroke="#34d399" stroke-width="2"/>
      <path d="M 35 68 Q 50 76 65 68" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none"/>
      <rect x="25" y="85" width="50" height="25" rx="4" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" opacity="0.7"/>
    </svg>`,

    party: `<svg class="${className}" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      ${gradientDefs}
      <rect x="16" y="22" width="68" height="62" rx="10" fill="url(#${gradId})" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <circle cx="32" cy="42" r="5" fill="#fff"/>
      <circle cx="68" cy="42" r="5" fill="#fff"/>
      <path d="M 32 60 Q 50 70 68 60" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="25" cy="15" r="3" fill="#fbbf24"/>
      <circle cx="75" cy="18" r="2.5" fill="#f87171"/>
      <path d="M 25 15 L 20 25 M 75 18 L 82 28" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round"/>
      <rect x="24" y="88" width="52" height="24" rx="4" fill="url(#${gradId})" opacity="0.6"/>
    </svg>`,
  };

  return robots[variant] || robots.standard;
}

/* ═══════════════════════════════════════════════════════════════
   RENDER FUNCTIONS
   ═══════════════════════════════════════════════════════════════ */

function renderNav() {
  const { logo, logoMark, navLinks, navCta } = DATA.site;
  document.getElementById('nav-logo').innerHTML = `
    <svg class="nav-logo-robot" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" title="AI Bot">
      <defs>
        <linearGradient id="navBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4f8ef7;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:1" />
        </linearGradient>
      </defs>
      <g class="robot-body">
        <rect x="15" y="20" width="70" height="60" rx="8" fill="url(#navBotGrad)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <g class="robot-eyes">
          <circle class="robot-eye" cx="35" cy="40" r="3.5" fill="#fff"/>
          <circle class="robot-eye" cx="65" cy="40" r="3.5" fill="#fff"/>
        </g>
        <path d="M 35 55 Q 50 62 65 55" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none" stroke-linecap="round"/>
        <g class="robot-antenna">
          <line x1="50" y1="20" x2="50" y2="5" stroke="#4f8ef7" stroke-width="2" stroke-linecap="round"/>
          <circle cx="50" cy="3" r="2.5" fill="#4f8ef7"/>
        </g>
      </g>
      <rect x="25" y="85" width="50" height="25" rx="4" fill="url(#navBotGrad)" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" opacity="0.8"/>
    </svg>
    <div class="nav-logo-text">Himanshu<span>.</span></div>
  `;
  document.getElementById('navlinks').innerHTML =
    navLinks.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('') +
    `<li><a href="${navCta.href}" class="nav-cta">${navCta.label}</a></li>`;
}

function renderHero() {
  const h = DATA.hero;

  /* Left panel */
  document.getElementById('hero-left').innerHTML = `
    <div class="hero-badge">${h.badge}</div>
    <h1 class="hero-name">
      <span class="first">${h.firstName}</span>
      <span class="last">${h.lastName}</span>
    </h1>
    <p class="hero-role"><strong>${h.role}</strong> &nbsp;·&nbsp; ${h.roleExtras}</p>
    <p class="hero-desc">${h.description}</p>
    <div class="hero-actions">
      ${h.cta.map(c => `<a href="${c.href}" class="${c.cls}">${c.label}</a>`).join('')}
    </div>
    <div class="hero-stats">
      ${h.stats.map(s => `
        <div>
          <span class="stat-num">${s.num}<span>${s.suffix}</span></span>
          <span class="stat-label">${s.label}</span>
        </div>`).join('')}
    </div>`;

  /* Right panel – AI Chat Widget */
  document.getElementById('hero-right').innerHTML =
    `<canvas id="hero-right-canvas" class="hero-right-canvas"></canvas>
    <div class="hr-orb hr-orb-1"></div>
    <div class="hr-orb hr-orb-2"></div>
    <div class="hr-orb hr-orb-3"></div>
    <div class="hr-dot-grid"></div>` +
    h.floatTags.map(t => `<span class="float-tag">${t}</span>`).join('') +
    createRobotSVG('robot-deco lg float-slow', 'heroBotGrad', 'rocket') +
    `<div class="ai-chat-glow"></div>
    <div class="ai-chat-card">
      <div class="ai-chat-grid-bg"></div>
      <div class="ai-chat-header">
        <div class="ai-avatar-wrap">
          <div class="ai-avatar-ring"></div>
          <div class="ai-avatar">🤖</div>
        </div>
        <div class="ai-header-info">
          <div class="ai-header-name">Himanshu<span class="ai-header-dot">'s</span> AI</div>
          <div class="ai-header-status">
            <span class="ai-status-dot"></span>
            <span class="ai-status-text">Neural link active</span>
          </div>
        </div>
        <div class="ai-header-right">
          <div class="ai-live-badge"><span class="ai-live-dot"></span>LIVE</div>
          <div class="ai-header-badge">LLaMA 3.3</div>
      </div>
      </div>
      <div class="ai-scan-line"></div>
      <div class="ai-chat-body" id="ai-chat-body">
        <div class="ai-msg" id="ai-m1">
          <div class="ai-bubble-ai">
            <span class="ai-typewriter" id="ai-typewriter"></span><span class="ai-cursor">▋</span>
          </div>
        </div>
        <div class="ai-chips" id="ai-chips" style="opacity:0;">
          <button class="ai-chip" onclick="window.heroAskQuestion && window.heroAskQuestion('Tell me about his top projects')">🚀 Projects</button>
          <button class="ai-chip" onclick="window.heroAskQuestion && window.heroAskQuestion('What AI work has Himanshu done?')">🧠 AI work</button>
          <button class="ai-chip" onclick="window.heroAskQuestion && window.heroAskQuestion('How can I get in touch with Himanshu?')">📬 Contact</button>
        </div>
      </div>
      <div class="ai-stats-row">
        <div class="ai-stat"><span class="ai-stat-dot"></span><span>Avg reply</span><strong>&lt; 1s</strong></div>
        <div class="ai-stat-divider"></div>
        <div class="ai-stat"><span class="ai-stat-dot green"></span><span>Uptime</span><strong>99.9%</strong></div>
        <div class="ai-stat-divider"></div>
        <div class="ai-stat"><span class="ai-stat-dot purple"></span><span>Topics</span><strong>15+</strong></div>
      </div>
      <div class="ai-chat-footer">
        <div class="ai-input-row">
          <input type="text" id="hero-chat-input" class="ai-fake-input"
            placeholder="Ask about skills, projects, experience..."
            autocomplete="off" maxlength="500">
          <button id="hero-send-btn" class="ai-send-btn" aria-label="Send">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M2 21L23 12 2 3v7l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>`;

  /* Typewriter + chip reveal */
  const text = "Hi! 👋 I'm Himanshu's AI assistant. Ask me anything about his skills, experience, projects, or how to get in touch!";
  const tw = document.getElementById('ai-typewriter');
  const cursor = document.querySelector('.ai-cursor');
  const m1 = document.getElementById('ai-m1');
  const chips = document.getElementById('ai-chips');

  setTimeout(() => {
    if (m1) m1.classList.add('ai-msg-visible');
    let i = 0;
    const type = () => {
      if (!tw) return;
      tw.textContent = text.slice(0, i++);
      if (i <= text.length) requestAnimationFrame(() => setTimeout(type, 28));
      else {
        if (cursor) cursor.style.animation = 'ai-blink 1s step-end infinite';
        if (chips) { chips.style.transition = 'opacity 0.5s'; chips.style.opacity = '1'; }
      }
    };
    type();
  }, 600);
}

function renderAbout() {
  const a = DATA.about;
  const imgContent = a.photo
    ? `<img src="${a.photo}" alt="Himanshu Pratap Singh" class="avatar-img" />
       <div class="avatar-badge">
         <span class="avatar-badge-dot"></span> Open to work
       </div>`
    : a.avatar || '👨‍💻';

  document.getElementById('about-inner').innerHTML = `
    <p class="section-label reveal">${a.sectionLabel}</p>
    <h2 class="section-title reveal reveal-delay-1">${a.title}</h2>
    <div class="about-grid">
      <div class="about-img-wrap reveal reveal-delay-2">
        <div class="about-img-box">${imgContent}</div>
        <div class="about-img-deco"></div>
      </div>
      <div class="about-content">
        ${a.paragraphs.map((p, i) =>
          `<p class="about-text reveal reveal-delay-${i + 1}">${p}</p>`).join('')}
        <div class="about-highlights">
          ${a.highlights.map((h, i) => `
            <div class="highlight-item reveal reveal-delay-${i + 1}">
              <div class="hi-icon">${h.icon}</div>
              <div class="hi-label">${h.label}</div>
              <div class="hi-value">${h.value}</div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

function renderSkills() {
  const s = DATA.skills;
  /* Stagger the reveal in rows of three, whatever the category count */
  const delays = s.categories.map((_, i) => String((i % 3) + 1));
  document.getElementById('skills-inner').innerHTML = `
    <p class="section-label reveal">${s.sectionLabel}</p>
    <h2 class="section-title reveal reveal-delay-1 glitch-text">${s.title}</h2>
    <p class="section-sub reveal reveal-delay-2">${s.subtitle}</p>
    <div class="skills-categories">
      ${s.categories.map((c, i) => `
        <div class="skill-category reveal reveal-delay-${delays[i]} color-pulse">
          <div class="sc-header">
            <div class="sc-icon float-icon" style="background:${c.iconBg}">${c.icon}</div>
            <div>
              <div class="sc-title">${c.title}</div>
              <div class="sc-sub">${c.sub}</div>
            </div>
          </div>
          <div class="skill-pills">
            ${c.pills.map((p, j) => `<span class="pill list-item" style="animation-delay:${0.6 + j * 0.1}s;">${p}</span>`).join('')}
          </div>
        </div>`).join('')}
    </div>`;
}

function renderExperience() {
  const e = DATA.experience;
  document.getElementById('experience-inner').innerHTML = `
    <p class="section-label reveal">${e.sectionLabel}</p>
    <h2 class="section-title reveal reveal-delay-1">${e.title}</h2>
    <p class="section-sub reveal reveal-delay-2">${e.subtitle}</p>
    <div class="timeline">
      ${e.jobs.map((j, i) => `
        <div class="tl-item reveal reveal-delay-${i}">
          <div class="tl-header">
            <div>
              <div class="tl-company">${j.company}</div>
              <div class="tl-role">${j.role}</div>
            </div>
            <span class="tl-period">${j.period}</span>
          </div>
          <div class="tl-body">
            ${j.note ? `<p style="margin-bottom:0.75rem;font-size:0.9rem;color:var(--text-muted)">${j.note}</p>` : ''}
            <ul class="tl-bullets">
              ${j.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
            <div class="tl-tags">
              ${j.tags.map(t => `<span class="tl-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>`).join('')}
    </div>`;
}

function renderWork() {
  const w = DATA.work;
  document.getElementById('work-inner').innerHTML = `
    <p class="section-label reveal">${w.sectionLabel}</p>
    <h2 class="section-title reveal reveal-delay-1">${w.title}</h2>
    <p class="section-sub reveal reveal-delay-2">${w.subtitle}</p>
    <div class="work-grid">
      ${w.projects.map((p, i) => `
        <div class="work-card reveal reveal-delay-${i % 3}"${p.link ? ` data-link="${p.link}"` : ''}>
          <div class="wc-banner" style="background:${p.bannerBg}">
            <span class="wc-emoji">${p.emoji}</span>
            ${p.live ? `<span class="wc-live"><span class="wc-live-dot"></span>Live</span>` : ''}
          </div>
          <div class="wc-body">
            <div class="wc-tagrow">
              <span class="wc-domain" style="${p.domainStyle}">${p.domain}</span>
              ${p.solo ? `<span class="wc-solo">${p.solo}</span>` : ''}
            </div>
            <div class="wc-title">${p.title}</div>
            <p class="wc-desc">${p.desc}</p>
            ${p.soloNote ? `<p class="wc-solo-note">${p.soloNote}</p>` : ''}
            <div class="wc-techs">
              ${p.techs.map(t => `<span class="wc-tech">${t}</span>`).join('')}
            </div>
            ${p.link ? `<a class="wc-link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel || 'Visit site'} ↗</a>` : ''}
          </div>
        </div>`).join('')}
    </div>`;
}

function renderCerts() {
  const c = DATA.certs;
  document.getElementById('certs-inner').innerHTML = `
    <p class="section-label reveal">${c.sectionLabel}</p>
    <h2 class="section-title reveal reveal-delay-1">${c.title}</h2>
    <p class="section-sub reveal reveal-delay-2">${c.subtitle}</p>
    <div class="certs-grid">
      ${c.items.map((item, i) => `
        <div class="cert-card reveal reveal-delay-${i % 4}">
          <div class="cert-icon" style="background:${item.iconBg}">${item.icon}</div>
          <div>
            <div class="cert-name">${item.name}</div>
            <div class="cert-issuer">${item.issuer}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

function renderContact() {
  const c = DATA.contact;
  document.getElementById('contact-inner').innerHTML = `
    <div class="contact-inner">
      <p class="section-label reveal" style="justify-content:center;display:flex">${c.sectionLabel}</p>
      <h2 class="contact-title reveal reveal-delay-1">
        ${c.title}<br><span>${c.titleAccent}</span>
      </h2>
      <p class="contact-sub reveal reveal-delay-2">${c.subtitle}</p>
      <div class="contact-cards reveal reveal-delay-1">
        ${c.cards.map(card => `
          <a href="${card.href}" class="contact-card" aria-label="${card.label}" title="${card.label}" ${card.external ? 'target="_blank" rel="noopener"' : ''}>
            <div class="contact-card-icon">${card.icon}</div>
            <div class="contact-card-value">${card.value}</div>
          </a>`).join('')}
      </div>
    </div>`;
}

function renderFooter() {
  const f = DATA.footer;
  document.getElementById('site-footer').innerHTML = `
    <div class="footer-logo">
      <div class="footer-logo-box">H</div>
      <span class="footer-logo-text">Himanshu<span style="background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">.</span></span>
    </div>
    <div class="footer-copy">${f.copy}</div>
    <div class="footer-links">
      ${f.navLinks.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
    </div>`;
}

/* ═══════════════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════════════ */
function init() {
  document.title = DATA.site.pageTitle;
  renderNav();
  renderHero();
  renderAbout();
  renderSkills();
  renderExperience();
  renderWork();
  renderCerts();
  renderContact();
  renderFooter();

  /* Scroll to top button */
  const scrollBtn = document.getElementById('scrolltop');
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    const footer = document.getElementById('site-footer');
    const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
    const nearFooter = footerTop <= window.innerHeight + 10;
    scrollBtn.classList.toggle('visible', window.scrollY > 400 && !nearFooter);
    const dock = document.querySelector('.dock');
    if (dock) dock.style.opacity = nearFooter ? '0' : '1';
    if (dock) dock.style.pointerEvents = nearFooter ? 'none' : 'auto';
  });

  /* Active nav highlight */
  window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
    });
  });
}

window.DATA = DATA;

/* Move section background canvases into their sections */
document.addEventListener('DOMContentLoaded', () => {
  const mapping = [
    { canvasId: 'about-bg', sectionId: 'about' },
    { canvasId: 'skills-bg', sectionId: 'skills' },
    { canvasId: 'experience-bg', sectionId: 'experience' },
    { canvasId: 'work-bg', sectionId: 'work' },
    { canvasId: 'certs-bg', sectionId: 'certs' },
    { canvasId: 'contact-bg', sectionId: 'contact' },
  ];
  mapping.forEach(({ canvasId, sectionId }) => {
    const canvas = document.getElementById(canvasId);
    const section = document.getElementById(sectionId);
    if (canvas && section) section.insertAdjacentElement('afterbegin', canvas);
  });
}, { once: true });

document.addEventListener('DOMContentLoaded', () => {
  init();
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => document.getElementById('navlinks').classList.remove('open'))
  );
});
