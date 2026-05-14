/* ═══════════════════════════════════════════════════════════════
   SKILLS UNIVERSE — Interactive constellation visualization
   Each skill = a glowing star, clustered by category,
   with mouse-reactive connections and particle trails.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const CATEGORY_COLORS = {
    'Frontend Technologies':    { r: 79, g: 142, b: 247 },   // blue
    'Backend & APIs':           { r: 52, g: 211, b: 153 },   // green
    'Programming Languages':    { r: 167, g: 139, b: 250 },  // purple
    'DevOps & Tools':           { r: 251, g: 191, b: 36  },  // amber
    'Testing & Quality':        { r: 239, g: 68,  b: 68  },  // red
    'Data & Analytics':         { r: 6,   g: 182, b: 212 },  // cyan
  };

  const CATEGORY_ICONS = {
    'Frontend Technologies':    '⚛️',
    'Backend & APIs':           '🔧',
    'Programming Languages':    '💻',
    'DevOps & Tools':           '🚀',
    'Testing & Quality':        '🧪',
    'Data & Analytics':         '📊',
  };

  let canvas, ctx, W, H, stars = [], mouse = { x: -9999, y: -9999 }, animId;
  let hoveredStar = null;
  let shootingStars = [];
  let nebulaClouds = [];
  let time = 0;

  /* ── Build star data from DATA.skills ───────────────────────── */
  function buildStars() {
    const D = window.DATA;
    if (!D || !D.skills) return;

    stars = [];
    const cats = D.skills.categories;
    const totalCats = cats.length;

    cats.forEach((cat, ci) => {
      const color = CATEGORY_COLORS[cat.title] || { r: 79, g: 142, b: 247 };
      const angle = (ci / totalCats) * Math.PI * 2 - Math.PI / 2;
      const clusterRadius = Math.min(W, H) * 0.28;
      const cx = W / 2 + Math.cos(angle) * clusterRadius;
      const cy = H / 2 + Math.sin(angle) * clusterRadius;

      cat.pills.forEach((skill, si) => {
        const spread = 45 + cat.pills.length * 4;
        const subAngle = (si / cat.pills.length) * Math.PI * 2 + ci * 0.5;
        const dist = 30 + Math.random() * spread;

        stars.push({
          name: skill,
          category: cat.title,
          categoryIcon: CATEGORY_ICONS[cat.title] || '⭐',
          x: cx + Math.cos(subAngle) * dist,
          y: cy + Math.sin(subAngle) * dist,
          baseX: cx + Math.cos(subAngle) * dist,
          baseY: cy + Math.sin(subAngle) * dist,
          r: 2.5 + Math.random() * 2.5,
          color,
          alpha: 0.6 + Math.random() * 0.4,
          twinkleSpeed: 0.02 + Math.random() * 0.03,
          twinkleOffset: Math.random() * Math.PI * 2,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: 0.0003 + Math.random() * 0.0005,
          driftRadius: 3 + Math.random() * 5,
          clusterCx: cx,
          clusterCy: cy,
        });
      });
    });

    // Build nebula clouds around each category center
    nebulaClouds = [];
    cats.forEach((cat, ci) => {
      const color = CATEGORY_COLORS[cat.title] || { r: 79, g: 142, b: 247 };
      const angle = (ci / totalCats) * Math.PI * 2 - Math.PI / 2;
      const clusterRadius = Math.min(W, H) * 0.28;
      const cx = W / 2 + Math.cos(angle) * clusterRadius;
      const cy = H / 2 + Math.sin(angle) * clusterRadius;

      for (let i = 0; i < 3; i++) {
        nebulaClouds.push({
          x: cx + (Math.random() - 0.5) * 60,
          y: cy + (Math.random() - 0.5) * 60,
          radius: 50 + Math.random() * 40,
          color,
          alpha: 0.03 + Math.random() * 0.025,
          pulseSpeed: 0.005 + Math.random() * 0.008,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    });
  }

  /* ── Shooting stars ─────────────────────────────────────────── */
  function spawnShootingStar() {
    if (shootingStars.length > 2) return;
    const side = Math.random();
    let sx, sy, angle;
    if (side < 0.5) {
      sx = Math.random() * W; sy = -10;
      angle = Math.PI / 4 + Math.random() * Math.PI / 4;
    } else {
      sx = -10; sy = Math.random() * H * 0.5;
      angle = Math.random() * Math.PI / 6;
    }
    shootingStars.push({
      x: sx, y: sy, angle,
      speed: 4 + Math.random() * 4,
      life: 1,
      length: 40 + Math.random() * 60,
    });
  }

  /* ── Draw ────────────────────────────────────────────────────── */
  function draw() {
    time++;
    ctx.clearRect(0, 0, W, H);

    // Spawn shooting stars occasionally
    if (Math.random() < 0.004) spawnShootingStar();

    // Draw nebula clouds
    nebulaClouds.forEach(cloud => {
      const pulse = 1 + Math.sin(time * cloud.pulseSpeed + cloud.pulseOffset) * 0.3;
      const grad = ctx.createRadialGradient(
        cloud.x, cloud.y, 0,
        cloud.x, cloud.y, cloud.radius * pulse
      );
      grad.addColorStop(0, `rgba(${cloud.color.r},${cloud.color.g},${cloud.color.b},${cloud.alpha * pulse})`);
      grad.addColorStop(1, `rgba(${cloud.color.r},${cloud.color.g},${cloud.color.b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.radius * pulse, 0, Math.PI * 2);
      ctx.fill();
    });

    // Drift stars gently
    stars.forEach(s => {
      s.driftAngle += s.driftSpeed;
      s.x = s.baseX + Math.cos(s.driftAngle) * s.driftRadius;
      s.y = s.baseY + Math.sin(s.driftAngle) * s.driftRadius;
    });

    // Draw constellation lines between same-category stars
    const catGroups = {};
    stars.forEach(s => {
      if (!catGroups[s.category]) catGroups[s.category] = [];
      catGroups[s.category].push(s);
    });
    Object.values(catGroups).forEach(group => {
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          const a = group[i], b = group[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            const alpha = (1 - d / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.color.r},${a.color.g},${a.color.b},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    });

    // Mouse proximity: draw bright connections to nearby stars
    const MOUSE_RANGE = 150;
    const nearStars = [];
    stars.forEach(s => {
      const dx = s.x - mouse.x, dy = s.y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < MOUSE_RANGE) nearStars.push({ star: s, dist: d });
    });

    nearStars.forEach(({ star: s, dist: d }) => {
      const alpha = (1 - d / MOUSE_RANGE) * 0.5;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = `rgba(${s.color.r},${s.color.g},${s.color.b},${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    // Connect near stars to each other (mouse-area mesh)
    for (let i = 0; i < nearStars.length; i++) {
      for (let j = i + 1; j < nearStars.length; j++) {
        const a = nearStars[i].star, b = nearStars[j].star;
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,255,255,${(1 - d / 120) * 0.15})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw stars
    hoveredStar = null;
    stars.forEach(s => {
      const twinkle = 0.5 + Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.5;
      const dx = s.x - mouse.x, dy = s.y - mouse.y;
      const mouseDist = Math.sqrt(dx * dx + dy * dy);
      const isNear = mouseDist < MOUSE_RANGE;
      const isHovered = mouseDist < 18;

      if (isHovered && (!hoveredStar || mouseDist < Math.sqrt((hoveredStar.x - mouse.x) ** 2 + (hoveredStar.y - mouse.y) ** 2))) {
        hoveredStar = s;
      }

      const scale = isNear ? 1 + (1 - mouseDist / MOUSE_RANGE) * 1.5 : 1;
      const r = s.r * scale;
      const a = s.alpha * (0.6 + twinkle * 0.4) * (isNear ? 1 : 0.7);

      // Outer glow
      const glowR = r * (isHovered ? 8 : isNear ? 5 : 3);
      const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
      grad.addColorStop(0, `rgba(${s.color.r},${s.color.g},${s.color.b},${a * 0.35})`);
      grad.addColorStop(0.5, `rgba(${s.color.r},${s.color.g},${s.color.b},${a * 0.08})`);
      grad.addColorStop(1, `rgba(${s.color.r},${s.color.g},${s.color.b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${s.color.r},${s.color.g},${s.color.b},${a})`;
      ctx.fill();

      // White center
      ctx.beginPath();
      ctx.arc(s.x, s.y, r * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a * 0.7})`;
      ctx.fill();
    });

    // Draw shooting stars
    shootingStars = shootingStars.filter(ss => ss.life > 0);
    shootingStars.forEach(ss => {
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.life -= 0.008;

      const tailX = ss.x - Math.cos(ss.angle) * ss.length;
      const tailY = ss.y - Math.sin(ss.angle) * ss.length;

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      grad.addColorStop(0, `rgba(255,255,255,0)`);
      grad.addColorStop(1, `rgba(255,255,255,${ss.life * 0.7})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Head glow
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${ss.life})`;
      ctx.fill();
    });

    // Draw hovered star tooltip
    if (hoveredStar) {
      const s = hoveredStar;
      const tx = s.x;
      const ty = s.y - 28;

      ctx.font = '600 13px Inter, system-ui, sans-serif';
      const textW = ctx.measureText(s.name).width;
      const catText = s.categoryIcon + ' ' + s.category;
      ctx.font = '11px Inter, system-ui, sans-serif';
      const catW = ctx.measureText(catText).width;
      const boxW = Math.max(textW, catW) + 24;

      // Tooltip background
      ctx.fillStyle = 'rgba(11, 15, 26, 0.92)';
      ctx.strokeStyle = `rgba(${s.color.r},${s.color.g},${s.color.b},0.5)`;
      ctx.lineWidth = 1;
      const bx = tx - boxW / 2;
      const by = ty - 42;
      roundRect(ctx, bx, by, boxW, 44, 8);
      ctx.fill();
      ctx.stroke();

      // Tooltip text
      ctx.font = '600 13px Inter, system-ui, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(s.name, tx, by + 18);

      ctx.font = '11px Inter, system-ui, sans-serif';
      ctx.fillStyle = `rgba(${s.color.r},${s.color.g},${s.color.b},0.9)`;
      ctx.fillText(catText, tx, by + 34);
      ctx.textAlign = 'start';
    }

    // Draw category labels at cluster centers
    const D = window.DATA;
    if (D && D.skills) {
      const totalCats = D.skills.categories.length;
      D.skills.categories.forEach((cat, ci) => {
        const color = CATEGORY_COLORS[cat.title] || { r: 79, g: 142, b: 247 };
        const angle = (ci / totalCats) * Math.PI * 2 - Math.PI / 2;
        const clusterRadius = Math.min(W, H) * 0.28;
        const labelRadius = clusterRadius + 60 + cat.pills.length * 3;
        const lx = W / 2 + Math.cos(angle) * labelRadius;
        const ly = H / 2 + Math.sin(angle) * labelRadius;

        ctx.font = '600 11px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},0.65)`;
        ctx.fillText(cat.title.toUpperCase(), lx, ly);
        ctx.textAlign = 'start';
      });
    }

    // Center label
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillText('[ hover to explore ]', W / 2, H / 2);
    ctx.textAlign = 'start';

    animId = requestAnimationFrame(draw);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /* ── Resize ─────────────────────────────────────────────────── */
  function resize() {
    const section = document.getElementById('skills-universe');
    if (!section) return;
    W = canvas.width = section.offsetWidth;
    H = canvas.height = Math.max(section.offsetHeight, 500);
    buildStars();
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    canvas = document.getElementById('skills-universe-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize, { passive: true });

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      canvas.style.cursor = hoveredStar ? 'pointer' : 'default';
    }, { passive: true });

    canvas.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    draw();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 200));
  } else {
    setTimeout(init, 200);
  }

})();
