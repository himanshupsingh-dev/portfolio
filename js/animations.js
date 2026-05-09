(function () {
'use strict';

/* ════════════════════════════════════════════════════════════════
   SECTION PROGRESS DOTS
   ════════════════════════════════════════════════════════════════ */
function buildSectionNav() {
  const sections = ['hero','about','skills','experience','work','certs','contact'];
  const labels   = ['Home','About','Skills','Experience','Work','Certs','Contact'];
  const nav = document.createElement('div');
  nav.className = 'sec-nav';

  sections.forEach((id, i) => {
    const dot = document.createElement('div');
    dot.className = 'sec-dot';
    dot.innerHTML = `<span class="sec-dot-label">${labels[i]}</span>`;
    dot.addEventListener('click', () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
    nav.appendChild(dot);
  });
  document.body.appendChild(nav);

  /* Show after a short delay */
  setTimeout(() => nav.classList.add('visible'), 2800);

  /* Update active dot on scroll */
  const dots = nav.querySelectorAll('.sec-dot');
  function updateDots() {
    let active = 0;
    sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - window.innerHeight * 0.4) active = i;
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }
  window.addEventListener('scroll', updateDots, { passive: true });
  updateDots();
}

/* ════════════════════════════════════════════════════════════════
   NAV LINK TEXT SCRAMBLE ON HOVER
   ════════════════════════════════════════════════════════════════ */
function setupScramble() {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const original = link.textContent;
    let timer = null;
    link.addEventListener('mouseenter', () => {
      let iter = 0;
      clearInterval(timer);
      timer = setInterval(() => {
        link.textContent = original.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < iter) return original[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
        iter += 0.55;
        if (iter >= original.length) { clearInterval(timer); link.textContent = original; }
      }, 28);
    });
    link.addEventListener('mouseleave', () => {
      clearInterval(timer); link.textContent = original;
    });
  });
}

/* ════════════════════════════════════════════════════════════════
   CONTACT PULSE RINGS
   ════════════════════════════════════════════════════════════════ */
function buildContactRings() {
  const contact = document.getElementById('contact');
  if (!contact) return;
  const wrap = document.createElement('div');
  wrap.className = 'contact-rings';
  wrap.innerHTML = '<div class="c-ring"></div><div class="c-ring"></div><div class="c-ring"></div>';
  contact.appendChild(wrap);
}

/* ════════════════════════════════════════════════════════════════
   EXTRA REVEAL CLASSES ON EXISTING ELEMENTS
   ════════════════════════════════════════════════════════════════ */
function applyExtraReveals() {
  /* Experience items slide in from left */
  document.querySelectorAll('.tl-item').forEach(el => {
    el.classList.add('reveal-left');
    el.classList.remove('reveal');
  });

  /* Cert cards scale in */
  document.querySelectorAll('.cert-card').forEach(el => {
    el.classList.add('reveal-scale');
    el.classList.remove('reveal');
  });

  /* Unified IntersectionObserver for all reveal elements */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => revealObserver.observe(el));
}

/* ════════════════════════════════════════════════════════════════
   AI ROBOT INTERACTIONS
   ════════════════════════════════════════════════════════════════ */
(function() {
  const messages = [
    "👋 Hey there!",
    "🤖 Ready to code?",
    "⚡ Let's build something!",
    "🎉 Nice to meet you!",
    "💡 Got an idea?",
    "🚀 Let's launch it!",
    "😎 You're awesome!",
    "🔥 Let's ship it!",
    "🎨 Design it!",
    "✨ Make it shine!",
  ];

  const animations = ['robotDance', 'robotSpin', 'robotWiggle', 'robotJump'];
  let lastMessageTime = 0;

  function init() {
    const robot = document.querySelector('.nav-logo-robot');
    if (!robot) {
      setTimeout(init, 100);
      return;
    }

    function showMessage() {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      const popup = document.createElement('div');
      popup.className = 'robot-message-popup';
      popup.textContent = msg;
      popup.style.position = 'fixed';
      document.body.appendChild(popup);

      const rect = robot.getBoundingClientRect();
      popup.style.left = (rect.left + rect.width/2) + 'px';
      popup.style.top = (rect.top - 50) + 'px';

      setTimeout(() => popup.classList.add('show'), 10);
      setTimeout(() => popup.remove(), 2500);
    }

    function playAnimation() {
      const robotBody = robot.querySelector('.robot-body');
      if (!robotBody) return;

      const anim = animations[Math.floor(Math.random() * animations.length)];
      robotBody.classList.add('anim-' + anim);

      setTimeout(() => {
        robotBody.classList.remove('anim-' + anim);
      }, 850);
    }

    // Scroll event
    window.addEventListener('scroll', () => {
      const now = Date.now();
      if (now - lastMessageTime > 2500) {
        lastMessageTime = now;
        showMessage();
        playAnimation();
      }
    }, { passive: true });

    // Click event
    robot.addEventListener('click', () => {
      showMessage();
      playAnimation();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ════════════════════════════════════════════════════════════════
   INIT — fire after renders are done
   ════════════════════════════════════════════════════════════════ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}
function run() {
  buildSectionNav();
  setupScramble();
  buildContactRings();
  applyExtraReveals();
}

})();
