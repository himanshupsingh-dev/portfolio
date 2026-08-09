(function () {
  'use strict';

  /* ════════════════════════════════════════════════════════════
     CONFIG — Project case-study details, themes, etc.
     ════════════════════════════════════════════════════════════ */

  const PROJECT_DETAILS = {
    'Rodent Shield — Product & Admin CMS': {
      challenge: 'A non-technical business owner needed a production storefront they could run themselves — every product, price, image, and blog post editable without a developer — without giving up performance, SEO, or security.',
      solution: [
        'Architected the full app on Next.js 16 App Router with React 19 and TypeScript: a 10-model PostgreSQL schema through Prisma ORM serving 25+ routes on Vercel.',
        'Built a role-protected admin CMS on Auth.js v5 + bcrypt with server-action CRUD for products, pricing, media, blog, and leads — zero code deployments to change content.',
        'Shipped a Zod-validated, rate-limited lead-capture pipeline with a status workflow and an admin tracking dashboard.',
        'Hardened against OWASP Top 10: strict CSP/HSTS headers, brute-force throttling with timing-safe user-enumeration defense, magic-byte upload validation, sanitized markdown, and Postgres row-level security.',
        'Developed a scroll-driven 3D product hero in Three.js as a reusable Web Component with adaptive mobile GPU tiering and reduced-motion fallbacks.',
        'Generated the SEO layer from the database — dynamic sitemaps and six Schema.org JSON-LD types — plus GA4 and Meta Pixel tracking.',
      ],
      impact: [
        { num: '25+', lbl: 'Routes shipped' },
        { num: '10', lbl: 'Data models' },
        { num: '0', lbl: 'Deploys to edit content' },
      ],
    },
    'Secure Healthcare Portal': {
      challenge: 'Multi-hospital deployment with strict role-based access for doctors, nurses, and admins — plus real-time patient event streaming and HIPAA-conscious video consultations.',
      solution: [
        'Implemented Keycloak SSO with fine-grained role-based access control across 4 hospital tenants.',
        'Built reactive event streams over GraphQL subscriptions for real-time clinical alerts.',
        'Integrated Shaka Player for adaptive bitrate streaming of recorded consultations.',
        'Established 80%+ unit test coverage with Jest for critical clinical workflows.',
      ],
      impact: [
        { num: '4', lbl: 'Hospitals' },
        { num: '12+', lbl: 'User roles' },
        { num: '80%+', lbl: 'Test coverage' },
      ],
    },
    'IoT Device Web Portal': {
      challenge: 'Visualize and manage thousands of IoT devices in real time across geographic regions, with sub-second latency on map updates.',
      solution: [
        'Built Angular 16 dashboard with virtualized lists handling 5K+ devices per page.',
        'Integrated Google Maps API with custom clustering for geo-distributed device tracking.',
        'JWT-secured WebSocket channels for live device telemetry.',
        'Containerized with Docker and CI/CD on GitLab for zero-downtime deployments.',
      ],
      impact: [
        { num: '5K+', lbl: 'Devices tracked' },
        { num: '<300ms', lbl: 'Update latency' },
        { num: '99.9%', lbl: 'Uptime' },
      ],
    },
    'TEngage — Telehealth Platform': {
      challenge: 'Connect patients, doctors, and hospital staff over secure real-time video — with appointment workflows that hold up under load.',
      solution: [
        'React + Material UI front-end with Amazon Chime SDK for HIPAA-grade video conferencing.',
        'Custom appointment scheduler with conflict detection and notifications.',
        'Role-aware UI: patient, doctor, and admin views from a single codebase.',
      ],
      impact: [
        { num: '3', lbl: 'User personas' },
        { num: '100%', lbl: 'Mobile responsive' },
        { num: 'WCAG AA', lbl: 'Accessibility' },
      ],
    },
    'Clinical Trials Platform': {
      challenge: 'Pharmaceutical clients need a clean way to monitor trial data and component states across long-running studies.',
      solution: [
        'Component-driven architecture with shared Angular Material design system.',
        'JSON-driven configuration so non-developers can adjust trial parameters.',
        'Comprehensive Jasmine/Karma unit tests for all critical components.',
      ],
      impact: [
        { num: '20+', lbl: 'Reusable components' },
        { num: '70%+', lbl: 'Test coverage' },
        { num: '0', lbl: 'P0 incidents' },
      ],
    },
    'AI Code Generation Pipeline': {
      challenge: 'Modernize legacy enterprise codebases without throwing away decades of business logic — at speed.',
      solution: [
        'Designed prompt templates for OpenAI API to refactor legacy code into modern frameworks.',
        'Built a Node.js orchestration layer that splits, refactors, and reassembles modules safely.',
        'TypeScript-first tooling with rollback safety and human-in-the-loop review.',
      ],
      impact: [
        { num: '10×', lbl: 'Faster refactors' },
        { num: 'AI', lbl: 'In the loop' },
        { num: 'GA', lbl: 'In production' },
      ],
    },
    'KPI Analytics Dashboards': {
      challenge: 'Surface meaningful business insights from messy real-world datasets for non-technical stakeholders.',
      solution: [
        'Designed Qlik Sense dashboards with drill-down filters for executives.',
        'Built ETL pipelines to clean and join multiple source systems.',
        'Documented metric definitions to align stakeholders on a single source of truth.',
      ],
      impact: [
        { num: '8+', lbl: 'KPI dashboards' },
        { num: '5', lbl: 'Stakeholder teams' },
        { num: '1', lbl: 'Source of truth' },
      ],
    },
    'Candidate Hiring Management Tool': {
      challenge: 'Enterprise hiring teams lose visibility across recruitment pipeline stages — candidates get stuck in bottlenecks without anyone noticing.',
      solution: [
        'Built end-to-end candidate tracking system with .NET Core backend and Angular frontend.',
        'Real-time dashboards with interactive charts visualizing recruitment funnels and drop-off points.',
        'Stakeholder-focused analytics surfacing bottlenecks by stage to enable data-driven hiring decisions.',
      ],
      impact: [
        { num: '100%', lbl: 'Pipeline visibility' },
        { num: '5+', lbl: 'Recruitment stages' },
        { num: '30%', lbl: 'Faster hiring' },
      ],
    },
  };

  const THEMES = {
    midnight: {
      label: 'Midnight (default)', swatch: '#4f8ef7',
      vars: {
        '--bg':'#0b0f1a','--bg2':'#111827','--bg3':'#1a2236','--surface':'#1e2d47',
        '--accent':'#4f8ef7','--accent2':'#a78bfa','--accent3':'#34d399',
      },
    },
    ocean: {
      label: 'Ocean', swatch: '#06b6d4',
      vars: {
        '--bg':'#0a1620','--bg2':'#0f1f2e','--bg3':'#15293a','--surface':'#1e3a52',
        '--accent':'#06b6d4','--accent2':'#3b82f6','--accent3':'#10b981',
      },
    },
    sunset: {
      label: 'Sunset', swatch: '#f97316',
      vars: {
        '--bg':'#1a0f1a','--bg2':'#241522','--bg3':'#2e1a2c','--surface':'#3d2138',
        '--accent':'#f97316','--accent2':'#ec4899','--accent3':'#fbbf24',
      },
    },
    forest: {
      label: 'Forest', swatch: '#10b981',
      vars: {
        '--bg':'#0a1612','--bg2':'#0f1f1a','--bg3':'#152822','--surface':'#1f3a32',
        '--accent':'#10b981','--accent2':'#84cc16','--accent3':'#22d3ee',
      },
    },
  };

  /* ════════════════════════════════════════════════════════════
     UTILITIES
     ════════════════════════════════════════════════════════════ */

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
  function el(tag, props, html) {
    const e = document.createElement(tag);
    if (props) Object.entries(props).forEach(([k, v]) => {
      // Keys like 'aria-label' aren't element properties — set them as attributes
      if (k in e) e[k] = v;
      else e.setAttribute(k, v);
    });
    if (html != null) e.innerHTML = html;
    return e;
  }

  const REDUCED_MOTION = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Make a non-button element behave like one for keyboard users */
  function makeActivatable(node, handler) {
    node.setAttribute('tabindex', '0');
    node.setAttribute('role', 'button');
    node.addEventListener('keydown', e => {
      if (e.target !== node) return; // ignore keys bubbling from nested activatables
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler(e);
      }
    });
  }

  function showToast(message, icon = '✨', duration = 3500) {
    const wrap = $('#toast-wrap');
    const t = el('div', { className: 'toast' });
    t.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
    wrap.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 500);
    }, duration);
  }

  /* ════════════════════════════════════════════════════════════
     THEME SWITCHER
     ════════════════════════════════════════════════════════════ */

  function applyTheme(key) {
    const t = THEMES[key]; if (!t) return;
    Object.entries(t.vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    localStorage.setItem('hps-theme', key);
    // Read by the inline <head> script to apply the theme before first paint
    localStorage.setItem('hps-theme-vars', JSON.stringify(t.vars));
    $$('.theme-item').forEach(item => {
      item.classList.toggle('active', item.dataset.theme === key);
    });
  }

  function buildThemePicker() {
    const list = $('#theme-list');
    list.innerHTML = Object.entries(THEMES).map(([key, t]) => `
      <div class="theme-item" data-theme="${key}">
        <div class="theme-swatch" style="background:${t.swatch}"></div>
        <span>${t.label}</span>
      </div>
    `).join('');
    $$('.theme-item', list).forEach(item => makeActivatable(item, () => item.click()));
    list.addEventListener('click', e => {
      const item = e.target.closest('.theme-item');
      if (!item) return;
      applyTheme(item.dataset.theme);
      showToast(`Theme: ${THEMES[item.dataset.theme].label}`, '🎨', 1800);
    });

    const pop = $('#theme-pop');
    $('#dock-theme').addEventListener('click', e => {
      e.stopPropagation();
      pop.classList.toggle('open');
    });
    document.addEventListener('click', e => {
      if (!pop.contains(e.target) && e.target.id !== 'dock-theme') pop.classList.remove('open');
    });

    const saved = localStorage.getItem('hps-theme') || 'midnight';
    applyTheme(saved);
  }

  function cycleTheme() {
    const keys = Object.keys(THEMES);
    const cur = localStorage.getItem('hps-theme') || 'midnight';
    const next = keys[(keys.indexOf(cur) + 1) % keys.length];
    applyTheme(next);
    showToast(`Theme: ${THEMES[next].label}`, '🎨', 1500);
  }

  /* ════════════════════════════════════════════════════════════
     ANIMATED COUNTERS (stat numbers)
     ════════════════════════════════════════════════════════════ */

  function animateCounters() {
    if (REDUCED_MOTION) return; // leave the final numbers as authored

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        if (node.dataset.counted) return;
        node.dataset.counted = '1';
        const target = parseInt(node.dataset.target, 10);
        const suffix = node.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const value = Math.floor(eased * target);
          node.firstChild.nodeValue = value;
          if (t < 1) requestAnimationFrame(tick);
          else node.firstChild.nodeValue = target;
        }
        requestAnimationFrame(tick);
        observer.unobserve(node);
      });
    }, { threshold: 0.4 });

    $$('.stat-num').forEach(node => {
      const inner = node.querySelector('span');
      const target = parseInt(node.textContent, 10);
      if (isNaN(target)) return;
      const suffix = inner ? inner.textContent : '';
      node.innerHTML = `0<span>${suffix}</span>`;
      node.dataset.target = target;
      node.dataset.suffix = suffix;
      observer.observe(node);
    });
  }

  /* ════════════════════════════════════════════════════════════
     PROJECT MODAL + TECH FILTER
     ════════════════════════════════════════════════════════════ */

  let lastFocusedBeforeModal = null;

  function openProjectModal(card) {
    lastFocusedBeforeModal = document.activeElement;
    const title = card.querySelector('.wc-title').textContent.trim();
    const desc  = card.querySelector('.wc-desc').textContent.trim();
    const domainEl = card.querySelector('.wc-domain');
    const domain = domainEl.textContent.trim();
    const domainStyle = domainEl.getAttribute('style') || '';
    const banner = card.querySelector('.wc-banner');
    /* Read the emoji alone — the banner may also hold a "Live" badge */
    const emojiEl = banner.querySelector('.wc-emoji');
    const emoji   = (emojiEl || banner).textContent.trim();
    const bannerBg = banner.getAttribute('style') || '';
    const techs = $$('.wc-tech', card).map(t => t.textContent.trim());
    const detail = PROJECT_DETAILS[title] || {};
    const link = card.dataset.link || '';
    const soloEl = card.querySelector('.wc-solo-note');
    const solo = soloEl ? soloEl.textContent.trim() : '';
    const soloTagEl = card.querySelector('.wc-solo');
    const soloTag = soloTagEl ? soloTagEl.textContent.trim() : '';

    $('#modal-banner').setAttribute('style', bannerBg);
    $('#modal-banner').innerHTML = `${emoji}<button class="modal-close" id="modal-close" aria-label="Close">✕</button>`;
    $('#modal-close').addEventListener('click', closeModal);

    $('#modal-body').innerHTML = `
      <div class="modal-tagrow">
        <span class="modal-domain" style="${domainStyle}">${domain}</span>
        ${soloTag ? `<span class="wc-solo">${soloTag}</span>` : ''}
      </div>
      <h3 class="modal-title" id="modal-title">${title}</h3>
      <p style="color:var(--text-muted);line-height:1.7">${desc}</p>

      ${solo ? `<p class="modal-solo">${solo}</p>` : ''}

      ${detail.challenge ? `
        <div class="modal-section">
          <h4>The Challenge</h4>
          <p>${detail.challenge}</p>
        </div>` : ''}

      ${detail.solution ? `
        <div class="modal-section">
          <h4>What I Built</h4>
          <ul>${detail.solution.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>` : ''}

      ${detail.impact ? `
        <div class="modal-stats">
          ${detail.impact.map(s => `
            <div class="modal-stat">
              <div class="modal-stat-num">${s.num}</div>
              <div class="modal-stat-lbl">${s.lbl}</div>
            </div>`).join('')}
        </div>` : ''}

      <div class="modal-section">
        <h4>Tech Stack</h4>
        <div class="modal-techs">
          ${techs.map(t => `<span class="wc-tech">${t}</span>`).join('')}
        </div>
      </div>

      ${link ? `
        <a class="modal-cta" href="${link}" target="_blank" rel="noopener">
          Visit the live site ↗
        </a>` : ''}
    `;
    $('#project-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
    $('#modal-close').focus();
  }

  function closeModal() {
    const modal = $('#project-modal');
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === 'function') {
      lastFocusedBeforeModal.focus();
      lastFocusedBeforeModal = null;
    }
  }

  /* Keep Tab cycling inside the modal while it's open */
  function trapModalFocus(e) {
    if (e.key !== 'Tab') return;
    const modal = $('#project-modal');
    if (!modal.classList.contains('open')) return;
    const focusables = $$('button, [href], [tabindex]:not([tabindex="-1"])', modal);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!modal.contains(document.activeElement)) {
      e.preventDefault(); first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  function setupProjectInteractions() {
    const cards = $$('.work-card');
    if (!cards.length) return;

    cards.forEach(card => {
      card.dataset.clickable = '1';
      card.setAttribute('aria-haspopup', 'dialog');
      makeActivatable(card, () => openProjectModal(card));
      card.addEventListener('click', e => {
        if (e.target.closest('.wc-tech, .wc-link')) return;
        openProjectModal(card);
      });
    });

    $('#project-modal').addEventListener('click', e => {
      if (e.target.id === 'project-modal') closeModal();
    });
    document.addEventListener('keydown', trapModalFocus);

    /* Tech filter chips */
    const allTechs = new Set();
    cards.forEach(c => $$('.wc-tech', c).forEach(t => allTechs.add(t.textContent.trim())));
    const popular = ['Angular 19','React','Next.js 16','TypeScript','Node.js','.NET Core','GraphQL','OpenAI API','Docker'];
    const techsToShow = popular.filter(t => allTechs.has(t));

    const grid = $('.work-grid');
    if (!grid) return;

    const filter = el('div', { className: 'work-filter' });
    filter.innerHTML = `
      <button class="filter-chip active" data-tech="*">All</button>
      ${techsToShow.map(t => `<button class="filter-chip" data-tech="${t}">${t}</button>`).join('')}
    `;
    grid.parentNode.insertBefore(filter, grid);

    filter.addEventListener('click', e => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      $$('.filter-chip', filter).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const tech = chip.dataset.tech;
      cards.forEach(card => {
        const techs = $$('.wc-tech', card).map(t => t.textContent.trim());
        const match = tech === '*' || techs.includes(tech);
        card.classList.toggle('hide', !match);
      });
    });

    /* Make tech chips inside cards clickable as filters */
    cards.forEach(card => {
      $$('.wc-tech', card).forEach(chip => {
        chip.style.cursor = 'pointer';
        makeActivatable(chip, () => chip.click());
        chip.addEventListener('click', e => {
          e.stopPropagation();
          const target = chip.textContent.trim();
          const filterChip = filter.querySelector(`[data-tech="${CSS.escape(target)}"]`);
          if (filterChip) {
            filterChip.click();
            filterChip.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast(`Filtered by ${target}`, '🔎', 2000);
          } else {
            showToast(`No filter for ${target} (yet)`, 'ℹ️', 2000);
          }
        });
      });
    });
  }

  /* ════════════════════════════════════════════════════════════
     COPY EMAIL TO CLIPBOARD
     ════════════════════════════════════════════════════════════ */

  function setupCopyEmail() {
    const cards = $$('.contact-card');
    cards.forEach(card => {
      const value = card.querySelector('.contact-card-value');
      if (!value) return;
      const text = value.textContent.trim();
      if (card.href && card.href.startsWith('http')) return; // external links (LinkedIn, GitHub, …) open normally
      const isEmail = text.includes('@');
      card.addEventListener('click', e => {
        if (e.shiftKey) return;
        e.preventDefault();
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied ${isEmail ? 'email' : 'number'} to clipboard`, '📋', 2200);
        }).catch(() => {
          showToast('Could not copy — try Shift+Click to open instead', '⚠️', 3000);
        });
      });
    });
  }

  /* ════════════════════════════════════════════════════════════
     CONTACT FORM (mailto-based, no backend)
     ════════════════════════════════════════════════════════════ */

  function injectContactForm() {
    const inner = $('#contact-inner');
    if (!inner) return;
    const form = el('form', { className: 'contact-form', id: 'contact-form', noValidate: true });
    form.innerHTML = `
      <div class="form-group">
        <label for="cf-name">Your Name</label>
        <input type="text" id="cf-name" name="name" placeholder="Jane Doe" required />
      </div>
      <div class="form-group">
        <label for="cf-email">Email</label>
        <input type="email" id="cf-email" name="email" placeholder="jane@company.com" required />
      </div>
      <div class="form-group">
        <label for="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" placeholder="Tell me about your project, role, or just say hi…" required></textarea>
      </div>
      <div class="form-error" id="cf-error"></div>
      <button type="submit" class="btn-primary form-submit">Send message →</button>
    `;
    inner.appendChild(form);

    form.addEventListener('submit', e => {
      e.preventDefault();
      const nameEl  = document.getElementById('cf-name');
      const emailEl = document.getElementById('cf-email');
      const msgEl   = document.getElementById('cf-msg');
      const name  = nameEl.value.trim();
      const email = emailEl.value.trim();
      const msg   = msgEl.value.trim();
      const errEl = document.getElementById('cf-error');
      let err = '';

      [nameEl, emailEl, msgEl].forEach(f => f.classList.remove('invalid'));

      if (!name)  { err = 'Please enter your name.'; nameEl.classList.add('invalid'); }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        err = 'Please enter a valid email.'; emailEl.classList.add('invalid');
      }
      else if (msg.length < 10) {
        err = 'Message should be at least 10 characters.'; msgEl.classList.add('invalid');
      }

      if (err) { errEl.textContent = err; return; }
      errEl.textContent = '';

      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body    = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
      window.location.href = `mailto:himanshupsingh47@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening your email client…', '✉️', 3000);
      form.reset();
    });
  }

  /* ════════════════════════════════════════════════════════════
     RESUME DOWNLOAD (generates a printable HTML resume)
     ════════════════════════════════════════════════════════════ */

  function downloadResume() {
    const link = document.createElement('a');
    link.href = 'resume/Himanshu_Pratap_Singh_Resume.pdf';
    link.download = 'Himanshu_Pratap_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Resume downloaded successfully!', '📄', 2000);
  }

  function openResume() {
    const w = window.open('', '_blank');
    if (!w) { showToast('Pop-up blocked — allow pop-ups to view resume', '⚠️', 3500); return; }
    w.document.write(buildResumeHTML());
    w.document.close();
    showToast('Resume opened — print as PDF (Ctrl+P)', '📄', 3500);
  }

  function buildResumeHTML() {
    const D = window.DATA || {};
    const exp = (D.experience && D.experience.jobs) || [];
    const skills = (D.skills && D.skills.categories) || [];
    const certs = (D.certs && D.certs.items) || [];
    return `<!DOCTYPE html><html><head><title>Himanshu Pratap Singh — Resume</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 2rem auto; padding: 2rem; color: #1a202c; line-height: 1.6; }
h1 { margin: 0 0 0.25rem; font-size: 2rem; }
h2 { margin: 1.75rem 0 0.5rem; padding-bottom: 0.25rem; border-bottom: 2px solid #4f8ef7; color: #4f8ef7; font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; }
.role { color: #4f8ef7; font-weight: 600; }
.meta { color: #4a5568; font-size: 0.9rem; margin-bottom: 0.5rem; }
ul { padding-left: 1.25rem; margin: 0.4rem 0; }
li { margin: 0.2rem 0; }
.job { margin-bottom: 1.25rem; }
.skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem 1.5rem; }
.skill-cat strong { display: block; margin-bottom: 0.2rem; }
.contact { color: #4a5568; font-size: 0.95rem; }
@media print { body { margin: 0; padding: 1rem; } }
</style></head><body>
<h1>Himanshu Pratap Singh</h1>
<div class="role">Senior Software Engineer · Full Stack Developer</div>
<div class="contact">Pune, India · himanshupsingh47@gmail.com · +91 7905 359 265 · linkedin.com/in/himanshupratapsingh</div>

<h2>Summary</h2>
<p>4 years building secure, scalable web applications with Angular, React, Node.js & .NET across healthcare, IoT, and telehealth. Currently engineering AI-driven code generation at EY.</p>

<h2>Experience</h2>
${exp.map(j => `
  <div class="job">
    <strong>${j.role}</strong> — ${j.company}
    <div class="meta">${j.period}</div>
    ${j.note ? `<div>${j.note}</div>` : ''}
    <ul>${j.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    <div class="meta"><em>${(j.tags || []).join(' · ')}</em></div>
  </div>`).join('')}

<h2>Skills</h2>
<div class="skills-grid">
${skills.map(s => `<div class="skill-cat"><strong>${s.title}</strong>${s.pills.join(', ')}</div>`).join('')}
</div>

<h2>Certifications & Education</h2>
<ul>${certs.map(c => `<li><strong>${c.name}</strong> — ${c.issuer}</li>`).join('')}</ul>

</body></html>`;
  }

  /* ════════════════════════════════════════════════════════════
     TIME-BASED GREETING
     ════════════════════════════════════════════════════════════ */

  function showGreeting() {
    const h = new Date().getHours();
    let g = 'Hello'; let icon = '👋';
    if (h < 5)       { g = 'Burning the midnight oil?'; icon = '🌙'; }
    else if (h < 12) { g = 'Good morning';              icon = '☀️'; }
    else if (h < 17) { g = 'Good afternoon';            icon = '🌤'; }
    else if (h < 21) { g = 'Good evening';              icon = '🌆'; }
    else             { g = 'Working late, like me';     icon = '🌙'; }
    setTimeout(() => showToast(`${g} — thanks for stopping by`, icon, 4000), 1200);
  }

  /* ════════════════════════════════════════════════════════════
     VISITOR COUNTER (local, fake but persistent)
     ════════════════════════════════════════════════════════════ */

  function showVisitorCounter() {
    let n = parseInt(localStorage.getItem('hps-visits') || '0', 10);
    n += 1;
    localStorage.setItem('hps-visits', String(n));
    const seed = parseInt(localStorage.getItem('hps-visit-seed') || '0', 10) ||
      (Math.floor(Math.random() * 800) + 1240);
    localStorage.setItem('hps-visit-seed', String(seed));
    const total = seed + n;
    const chip = el('div', { className: 'visitor-chip' });
    chip.innerHTML = `<span class="visitor-chip-dot"></span> ${total.toLocaleString()} visits · you're #${n} from this device`;
    document.body.appendChild(chip);
    setTimeout(() => chip.classList.add('show'), 1500);
  }

  /* ════════════════════════════════════════════════════════════
     SCROLL-DOWN INDICATOR IN HERO
     ════════════════════════════════════════════════════════════ */

  function injectScrollDownIndicator() {
    const hero = $('#hero');
    if (!hero) return;
    const a = el('a', { href: '#about', className: 'scroll-down', 'aria-label': 'Scroll to about' });
    hero.appendChild(a);
    window.addEventListener('scroll', () => {
      a.style.opacity = window.scrollY > 100 ? '0' : '1';
    }, { passive: true });
  }

  /* ════════════════════════════════════════════════════════════
     KONAMI CODE → CONFETTI
     ════════════════════════════════════════════════════════════ */

  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiIdx = 0;

  function setupKonami() {
    document.addEventListener('keydown', e => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === KONAMI[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) {
          konamiIdx = 0;
          fireConfetti();
          showToast('🎮 Konami unlocked — you found the easter egg!', '🎉', 4000);
        }
      } else {
        konamiIdx = (k === KONAMI[0]) ? 1 : 0;
      }
    });
  }

  function fireConfetti() {
    if (REDUCED_MOTION) return; // the toast still announces the easter egg
    const canvas = $('#confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const colors = ['#4f8ef7','#a78bfa','#34d399','#fbbf24','#f87171','#06b6d4'];
    const pieces = [];
    for (let i = 0; i < 180; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 3,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    let frames = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
        ctx.restore();
      });
      frames++;
      if (frames < 240) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }

  /* ════════════════════════════════════════════════════════════
     KEYBOARD SHORTCUTS
     ════════════════════════════════════════════════════════════ */

  function buildShortcuts() {
    const overlay = $('#shortcuts-overlay');
    const card = $('#shortcuts-card');
    card.innerHTML = `
      <h3>Keyboard Shortcuts</h3>
      <div class="shortcut-row"><span>Toggle Shortcuts</span><span><span class="kbd">?</span></span></div>
      <div class="shortcut-row"><span>Cycle Theme</span><span><span class="kbd">T</span></span></div>
      <div class="shortcut-row"><span>Go to Contact</span><span><span class="kbd">G</span> then <span class="kbd">C</span></span></div>
      <div class="shortcut-row"><span>Close Overlays</span><span><span class="kbd">Esc</span></span></div>
    `;
    overlay.classList.add('open');
  }

  function setupShortcuts() {
    const overlay = $('#shortcuts-overlay');
    const open  = () => buildShortcuts();
    const close = () => overlay.classList.remove('open');
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    const shortcutsBtn = $('#dock-shortcuts');
    if (shortcutsBtn) shortcutsBtn.addEventListener('click', open);

    let lastG = 0;
    document.addEventListener('keydown', e => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case '?':
          e.preventDefault(); open(); break;
        case 't':
        case 'T':
          if (!isAnyOverlayOpen()) cycleTheme();
          break;
        case 'g':
        case 'G':
          lastG = Date.now();
          break;
        case 'c':
        case 'C':
          if (Date.now() - lastG < 800) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            lastG = 0;
          }
          break;
        case 'Escape':
          close();
          closeModal();
          $('#theme-pop').classList.remove('open');
          break;
      }
    });
  }

  function isAnyOverlayOpen() {
    return $('#project-modal').classList.contains('open') ||
           $('#shortcuts-overlay').classList.contains('open');
  }

  /* ════════════════════════════════════════════════════════════
     EXPOSE DATA + INIT
     ════════════════════════════════════════════════════════════ */

  // Expose DATA from inner closure (it's defined in the previous script's scope as const, but appears as a global because it's at top-level of a script)
  // The original script declares `const DATA = ...` at script-top, which makes it script-scoped. Re-grab via window or fall back gracefully.

  function init() {
    buildThemePicker();
    animateCounters();
    setupProjectInteractions();
    setupCopyEmail();
    injectContactForm();
    injectScrollDownIndicator();
    setupShortcuts();
    setupKonami();
    showVisitorCounter();

    /* Resume button in dock */
    const resumeBtn = $('#dock-resume');
    if (resumeBtn) resumeBtn.addEventListener('click', downloadResume);

    if (!sessionStorage.getItem('hps-greeted')) {
      showGreeting();
      sessionStorage.setItem('hps-greeted', '1');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 50));
  } else {
    setTimeout(init, 50);
  }

  /* Expose functions globally for HTML onclick handlers */
  window.downloadResume = downloadResume;
  window.buildThemePicker = buildThemePicker;
  window.cycleTheme = cycleTheme;
  window.buildShortcuts = buildShortcuts;
  window.setupShortcuts = setupShortcuts;
  window.closeModal = closeModal;
})();
