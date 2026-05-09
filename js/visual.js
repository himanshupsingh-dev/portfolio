(function () {
'use strict';

/* ════════════════════════════════════════════════════════════════
   1. LOADING SCREEN
   ════════════════════════════════════════════════════════════════ */
const loader  = document.getElementById('page-loader');
const plFill  = document.getElementById('pl-fill');
const plLabel = document.getElementById('pl-label');
const messages = ['Parsing skills…', 'Loading projects…', 'Crafting UI…', 'Almost ready…'];

let pct = 0;
const minMs = 2000;
const startTs = Date.now();

const tick = setInterval(() => {
  pct = Math.min(pct + Math.random() * 14 + 4, 92);
  plFill.style.width = pct + '%';
  const idx = Math.floor((pct / 100) * messages.length);
  plLabel.textContent = messages[Math.min(idx, messages.length - 1)];
}, 130);

function finishLoader() {
  clearInterval(tick);
  pct = 100; plFill.style.width = '100%';
  plLabel.textContent = 'Ready ✓';
  const waited = Date.now() - startTs;
  setTimeout(() => {
    loader.classList.add('pl-exit');
    setTimeout(() => { loader.style.display = 'none'; }, 700);
    /* Show particle canvas once loader leaves */
    const cvs = document.getElementById('particles-bg');
    if (cvs) cvs.classList.add('visible');
  }, Math.max(0, minMs - waited));
}

if (document.readyState === 'complete') {
  setTimeout(finishLoader, 80);
} else {
  window.addEventListener('load', () => setTimeout(finishLoader, 80));
}

/* ════════════════════════════════════════════════════════════════
   2. PARTICLE NETWORK CANVAS
   ════════════════════════════════════════════════════════════════ */
(function () {
  const cvs = document.getElementById('particles-bg');
  const ctx = cvs.getContext('2d');
  const N = 65, LINK_DIST = 165, MOUSE_DIST = 230;
  let W, H, particles;
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    W = cvs.width  = window.innerWidth;
    H = cvs.height = window.innerHeight;
  }

  function mkParticle() {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 3 + 1.2,          /* bigger: 1.2–4.2 px */
      a: Math.random() * 0.55 + 0.25,      /* more opaque: 0.25–0.80 */
    };
  }

  function init() { resize(); particles = Array.from({ length: N }, mkParticle); }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* ── Draw particles with glow halo ── */
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      /* outer soft glow */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79,142,247,${p.a * 0.12})`;
      ctx.fill();

      /* solid core */
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(79,142,247,${p.a})`;
      ctx.fill();
    });

    /* ── Draw connections ── */
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          const alpha = (1 - d / LINK_DIST) * 0.38;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(79,142,247,${alpha})`;
          ctx.lineWidth = 1.2; ctx.stroke();
        }
      }

      /* ── Mouse proximity connections (brighter + thicker) ── */
      const mdx = a.x - mouse.x, mdy = a.y - mouse.y;
      const md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < MOUSE_DIST) {
        const alpha = (1 - md / MOUSE_DIST) * 0.65;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
        ctx.lineWidth = 1.8; ctx.stroke();

        /* also pulse the dot when mouse is close */
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r * (1 + (1 - md / MOUSE_DIST) * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${a.a * 0.6})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); }, { passive: true });
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  init(); draw();
})();

/* ════════════════════════════════════════════════════════════════
   SECTION BACKGROUND ANIMATIONS
   ════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
/* ABOUT: Animated mesh gradient */
(function() {
  const cvs = document.getElementById('about-bg');
  const ctx = cvs.getContext('2d');
  let t = 0;

  function resize() {
    cvs.width = cvs.parentElement.offsetWidth;
    cvs.height = cvs.parentElement.offsetHeight;
  }

  function draw() {
    t += 0.003;
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    const w = cvs.width, h = cvs.height;
    const gridSize = 80;

    for (let y = 0; y < h; y += gridSize) {
      for (let x = 0; x < w; x += gridSize) {
        const hue = (Math.sin(x * 0.003 + t) + Math.sin(y * 0.003 + t)) * 180 + 200;
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.15)`;
        ctx.fillRect(x, y, gridSize, gridSize);
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize(); draw();
})();

/* SKILLS: Floating pulsing orbs with rings */
(function() {
  const cvs = document.getElementById('skills-bg');
  const ctx = cvs.getContext('2d');
  let t = 0;

  function resize() {
    cvs.width = cvs.parentElement.offsetWidth;
    cvs.height = cvs.parentElement.offsetHeight;
  }

  function draw() {
    t += 0.01;
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    const w = cvs.width, h = cvs.height;
    const orbCount = 5;

    for (let i = 0; i < orbCount; i++) {
      const x = w * (0.2 + 0.15 * i);
      const y = h * (0.3 + Math.sin(t * 0.5 + i) * 0.2);
      const size = 30 + Math.sin(t + i * 0.6) * 10;
      const pulse = 1 + Math.sin(t * 1.2 + i) * 0.3;

      // Inner glow
      ctx.fillStyle = `rgba(79, 142, 247, 0.3)`;
      ctx.beginPath();
      ctx.arc(x, y, size * pulse * 2, 0, Math.PI * 2);
      ctx.fill();

      // Core orb
      ctx.fillStyle = `rgba(79, 142, 247, 0.6)`;
      ctx.beginPath();
      ctx.arc(x, y, size * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Rotating rings
      for (let r = 1; r <= 3; r++) {
        const ringRadius = size * r * 1.5;
        const ringAlpha = 0.2 / r;
        ctx.strokeStyle = `rgba(167, 139, 250, ${ringAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, ringRadius * (1 + Math.sin(t * 0.8 - i) * 0.2), 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize(); draw();
})();

/* EXPERIENCE: Animated vertical timeline bars */
(function() {
  const cvs = document.getElementById('experience-bg');
  const ctx = cvs.getContext('2d');
  let t = 0;

  function resize() {
    cvs.width = cvs.parentElement.offsetWidth;
    cvs.height = cvs.parentElement.offsetHeight;
  }

  function draw() {
    t += 0.008;
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    const w = cvs.width, h = cvs.height;
    const barCount = 6;
    const barWidth = w / (barCount * 2);

    for (let i = 0; i < barCount; i++) {
      const x = (i * 2 + 1) * (w / (barCount * 2));
      const heightVariation = Math.sin(t * 0.6 + i * 0.8) * 0.4 + 0.6;
      const barHeight = h * heightVariation;
      const y = h - barHeight;

      // Gradient
      const grad = ctx.createLinearGradient(0, y, 0, h);
      grad.addColorStop(0, `rgba(79, 142, 247, ${0.5 + Math.sin(t + i) * 0.3})`);
      grad.addColorStop(1, `rgba(167, 139, 250, ${0.3 + Math.cos(t + i) * 0.2})`);

      ctx.fillStyle = grad;
      ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize(); draw();
})();

/* WORK: Grid pattern with interactive cells */
(function() {
  const cvs = document.getElementById('work-bg');
  const ctx = cvs.getContext('2d');
  let t = 0;
  const mouse = { x: 0, y: 0 };

  function resize() {
    cvs.width = cvs.parentElement.offsetWidth;
    cvs.height = cvs.parentElement.offsetHeight;
  }

  function draw() {
    t += 0.005;
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    const w = cvs.width, h = cvs.height;
    const gridSize = 60;

    for (let y = 0; y < h; y += gridSize) {
      for (let x = 0; x < w; x += gridSize) {
        const dx = mouse.x - (x + gridSize / 2);
        const dy = mouse.y - (y + gridSize / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const distFactor = Math.max(0, 1 - dist / 200);

        ctx.fillStyle = `rgba(52, 211, 153, ${0.1 + Math.sin(t + x + y) * 0.1 + distFactor * 0.3})`;
        ctx.fillRect(x, y, gridSize, gridSize);

        ctx.strokeStyle = `rgba(79, 142, 247, ${0.15 + distFactor * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, gridSize, gridSize);
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  cvs.parentElement.addEventListener('mousemove', (e) => {
    const rect = cvs.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });

  resize(); draw();
})();

/* CERTS: Rotating badge rings */
(function() {
  const cvs = document.getElementById('certs-bg');
  const ctx = cvs.getContext('2d');
  let t = 0;

  function resize() {
    cvs.width = cvs.parentElement.offsetWidth;
    cvs.height = cvs.parentElement.offsetHeight;
  }

  function draw() {
    t += 0.006;
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    const w = cvs.width, h = cvs.height;
    const centerX = w / 2, centerY = h / 2;
    const ringCount = 4;

    for (let ring = 1; ring <= ringCount; ring++) {
      const radius = 90 * ring;
      const rotation = t * (0.3 / ring);
      const nodeCount = ring + 2;

      ctx.strokeStyle = `rgba(${79 + ring * 20}, ${142 - ring * 15}, ${247 - ring * 10}, ${0.3 / ring})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      for (let n = 0; n < nodeCount; n++) {
        const angle = (n / nodeCount) * Math.PI * 2 + rotation;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.fillStyle = `rgba(${79 + ring * 20}, ${142 - ring * 15}, ${247 - ring * 10}, 0.6)`;
        ctx.beginPath();
        ctx.arc(x, y, 6 + ring * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize(); draw();
})();

/* CONTACT: Interactive particle burst on click */
(function() {
  const cvs = document.getElementById('contact-bg');
  const ctx = cvs.getContext('2d');
  let t = 0;
  let particles = [];

  function resize() {
    cvs.width = cvs.parentElement.offsetWidth;
    cvs.height = cvs.parentElement.offsetHeight;
  }

  function createParticleBurst(x, y) {
    const count = 20;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * (2 + Math.random() * 2),
        vy: Math.sin(angle) * (2 + Math.random() * 2),
        life: 1,
        size: Math.random() * 3 + 2,
      });
    }
  }

  function draw() {
    t += 0.016;
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    // Background grid
    ctx.strokeStyle = 'rgba(79, 142, 247, 0.1)';
    ctx.lineWidth = 1;
    const step = 50;
    for (let x = 0; x < cvs.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, cvs.height);
      ctx.stroke();
    }
    for (let y = 0; y < cvs.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(cvs.width, y);
      ctx.stroke();
    }

    // Draw and update particles
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;
      p.vy += 0.1; // gravity
      p.life -= 0.02;

      ctx.fillStyle = `rgba(79, 142, 247, ${p.life * 0.6})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  cvs.parentElement.addEventListener('click', (e) => {
    const rect = cvs.getBoundingClientRect();
    createParticleBurst(e.clientX - rect.left, e.clientY - rect.top);
  }, { passive: true });

  resize(); draw();
})();
});

/* ════════════════════════════════════════════════════════════════
   3. TYPEWRITER CYCLING ROLE
   ════════════════════════════════════════════════════════════════ */
(function () {
  const roles = [
    'Senior Software Developer',
    'Angular Developer',
    'AI Integration Engineer',
    'React Developer',
    '.NET Core Developer',
  ];
  let ri = 0, ci = 0, deleting = false;

  function tick() {
    /* prefer new gradient element, fall back to legacy strong */
    const el = document.querySelector('.hero-role-text') || document.querySelector('.hero-role strong');
    if (!el) return;

    /* Inject cursor once — inside the title wrapper, after the strong */
    if (!document.querySelector('.tw-cursor')) {
      const cur = document.createElement('span');
      cur.className = 'tw-cursor'; cur.setAttribute('aria-hidden', 'true');
      el.insertAdjacentElement('afterend', cur);
    }

    const word = roles[ri];
    if (deleting) {
      el.textContent = word.slice(0, --ci);
      if (ci <= 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 480); return; }
      setTimeout(tick, 38);
    } else {
      el.textContent = word.slice(0, ++ci);
      if (ci >= word.length) { deleting = true; setTimeout(tick, 2600); return; }
      setTimeout(tick, 78);
    }
  }

  /* Start after loader + hero entrance settle */
  setTimeout(tick, 2800);
})();

/* ════════════════════════════════════════════════════════════════
   4. CURSOR TRAIL DOTS
   ════════════════════════════════════════════════════════════════ */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return; /* skip on touch */
  const N = 7;
  const trail = [];
  for (let i = 0; i < N; i++) {
    const d = document.createElement('div');
    d.className = 'trail-dot';
    const sz = (N - i) * 2.5;
    const op = ((N - i) / N * 0.28).toFixed(3);
    d.style.cssText = `width:${sz}px;height:${sz}px;background:rgba(79,142,247,${op});box-shadow:0 0 ${4 + i}px rgba(79,142,247,${op});`;
    document.body.appendChild(d);
    trail.push({ el: d, x: window.innerWidth / 2, y: window.innerHeight / 2 });
  }
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function loop() {
    trail[0].x = mx; trail[0].y = my;
    for (let i = 1; i < N; i++) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * 0.38;
      trail[i].y += (trail[i - 1].y - trail[i].y) * 0.38;
    }
    trail.forEach(t => {
      const half = t.el.offsetWidth / 2;
      t.el.style.transform = `translate(${t.x - half}px,${t.y - half}px)`;
    });
    requestAnimationFrame(loop);
  })();
})();

/* ════════════════════════════════════════════════════════════════
   5. AURORA ORBS IN HERO
   ════════════════════════════════════════════════════════════════ */
(function () {
  const hero = document.getElementById('hero');
  if (!hero) return;
  [1, 2, 3].forEach(n => {
    const orb = document.createElement('div');
    orb.className = `hero-orb hero-orb-${n}`;
    hero.appendChild(orb);
  });
})();

/* ════════════════════════════════════════════════════════════════
   6. CARD SHINE + TIMELINE WRAP + DOM POLISH
   ════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Hero role: replace plain text line with gradient title + chips ── */
  const roleEl = document.querySelector('.hero-role');
  if (roleEl) {
    const D = window.DATA || {};
    const extras = (D.hero && D.hero.roleExtras) || 'Frontend · Backend · AI Integrations';
    const labels = extras.split(' · ');
    const chipCfg = [
      { cls: 'role-chip-blue',   icon: '⚡' },
      { cls: 'role-chip-green',  icon: '⚙️' },
      { cls: 'role-chip-purple', icon: '🤖' },
    ];
    const chips = labels.map((lbl, i) => {
      const c = chipCfg[i] || chipCfg[0];
      return `<span class="role-chip ${c.cls}">${c.icon} ${lbl}</span>`;
    }).join('');
    const block = document.createElement('div');
    block.className = 'hero-role-block';
    block.innerHTML = `
      <div class="hero-role-title">
        <strong class="hero-role-text">${(D.hero && D.hero.role) || 'Senior Software Developer'}</strong>
      </div>
      <div class="hero-role-extras">${chips}</div>
    `;
    roleEl.replaceWith(block);
  }

  /* Shine layer on each work card */
  document.querySelectorAll('.work-card').forEach(card => {
    const shine = document.createElement('div');
    shine.className = 'wc-shine';
    card.appendChild(shine);
  });

  /* Re-attach cursor ring hover to shine elements (doesn't affect cursor) */

  /* Update cursor hover targets to include new interactive elements */
  const ring = document.querySelector('.cursor-ring');
  if (ring) {
    document.querySelectorAll('.wc-shine, .trail-dot').forEach(el => {
      /* these are decorative, skip hover handler */
    });
  }

  /* Improve section-labels by converting spans if needed */
  document.querySelectorAll('.section-label').forEach(el => {
    /* already styled via CSS ::before */
  });

  /* Add subtle hover glow on timeline items via data-attribute */
  document.querySelectorAll('.tl-item').forEach(item => {
    item.classList.add('tl-hoverable');
  });

});

})(); /* end IIFE */
