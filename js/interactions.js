/* ── Toggle Menu ───────────────────────────────────────────────── */
function toggleMenu() {
  const navbar = document.getElementById('navbar');
  const navlinks = document.getElementById('navlinks');
  const hamburger = document.querySelector('.hamburger');

  navlinks.classList.toggle('open');
  hamburger.classList.toggle('active');
}

// Close menu when a link is clicked
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navlinks').classList.remove('open');
      document.querySelector('.hamburger').classList.remove('active');
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {

  /* ── Header Hide/Show on Scroll ────────────────────────────── */
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      if (currentScrollY > lastScrollY + 5) {
        navbar.style.transform = 'translateY(-100%)';
      } else if (currentScrollY < lastScrollY - 5) {
        navbar.style.transform = 'translateY(0)';
      }
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  /* ── Scroll Progress ─────────────────────────────────────── */
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = (pct * 100) + '%';
  }, { passive: true });

  /* ── Custom Cursor ───────────────────────────────────────── */
  if (window.matchMedia('(pointer: coarse)').matches) {
    /* skip custom cursor on touch devices */
    document.body.setAttribute('data-touch', 'true');
  } else {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.append(dot, ring);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener('mousedown', () => ring.classList.add('clicked'));
    document.addEventListener('mouseup',   () => ring.classList.remove('clicked'));

    (function loop() {
      dot.style.transform  = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, .work-card, .skill-category, .cert-card, .highlight-item, .pill, .tl-tag').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }

  /* ── Section Glow ────────────────────────────────────────── */
  document.querySelectorAll('section').forEach(sec => {
    sec.addEventListener('mousemove', e => {
      const r = sec.getBoundingClientRect();
      sec.style.setProperty('--sx', (e.clientX - r.left) + 'px');
      sec.style.setProperty('--sy', (e.clientY - r.top)  + 'px');
      sec.style.setProperty('--sg', '1');
    }, { passive: true });
    sec.addEventListener('mouseleave', () => sec.style.setProperty('--sg', '0'));
  });

  /* ── Card Inner Spotlight ────────────────────────────────── */
  document.querySelectorAll('.work-card,.skill-category,.cert-card,.highlight-item').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--cx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--cy', (e.clientY - r.top)  + 'px');
      card.classList.add('lit');
    }, { passive: true });
    card.addEventListener('mouseleave', () => card.classList.remove('lit'));
  });

  /* ── 3D Card Tilt ────────────────────────────────────────── */
  document.querySelectorAll('.work-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.08s ease-out, border-color 0.2s, box-shadow 0.3s';
    });
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const rx = ((e.clientY - cy) / (r.height / 2)) * -8;
      const ry = ((e.clientX - cx) / (r.width  / 2)) *  8;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px) scale(1.01)`;
    }, { passive: true });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.2s, box-shadow 0.3s';
      card.style.transform  = '';
    });
  });

  /* ── Magnetic Buttons ────────────────────────────────────── */
  document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.32;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.32;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    }, { passive: true });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ── Hero Parallax: float tags + code card ───────────────── */
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    document.querySelectorAll('.float-tag').forEach((tag, i) => {
      const d = ((i % 3) + 1) * 6;
      tag.style.setProperty('--px', (dx * d) + 'px');
      tag.style.setProperty('--py', (dy * d) + 'px');
    });

    const cc = document.querySelector('.code-card');
    if (cc) cc.style.transform = `perspective(1100px) rotateX(${dy * 7}deg) rotateY(${dx * -7}deg)`;
  }, { passive: true });

  /* ── Hero Entrance Animation ─────────────────────────────── */
  // Split first name into animated chars
  const first = document.querySelector('.hero-name .first');
  if (first) {
    first.innerHTML = [...first.textContent].map((ch, i) =>
      ch === ' ' ? ' '
      : `<span class="h-char" style="animation-delay:${0.04 + i * 0.055}s">${ch}</span>`
    ).join('');
  }

  // Slide last name in as whole (preserves gradient)
  const last = document.querySelector('.hero-name .last');
  if (last) {
    last.style.opacity = '0';
    last.style.transform = 'translateY(42px)';
    last.style.transition = 'opacity 0.85s 0.42s cubic-bezier(0.16,1,0.3,1), transform 0.85s 0.42s cubic-bezier(0.16,1,0.3,1)';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      last.style.opacity = '1';
      last.style.transform = 'none';
    }));
  }

  // Stagger remaining hero elements
  ['.hero-role', '.hero-desc', '.hero-actions', '.hero-stats'].forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.classList.add('hero-enter');
    setTimeout(() => el.classList.add('in'), 650 + i * 110);
  });

  /* ── Hero badge pulse ────────────────────────────────────── */
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    badge.classList.add('hero-enter');
    setTimeout(() => badge.classList.add('in'), 200);
  }

  /* ── AI Chat dock button ─────────────────────────────────── */
  const aiBtn = document.getElementById('dock-ai');
  if (aiBtn) {
    aiBtn.addEventListener('click', () => {
      const panel = document.getElementById('ai-chat-panel');
      if (panel && panel.classList.contains('open')) {
        if (typeof window.closeAIChat === 'function') window.closeAIChat();
      } else {
        if (typeof window.openAIChat === 'function') window.openAIChat();
      }
    });
  }

});
