/* ═══════════════════════════════════════════════════════════════
   AI COMMAND CENTER — Immersive neural network + integrated chat
   A full-section experience replacing the tiny floating widget.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Neural Network Canvas ──────────────────────────────────── */
  let canvas, ctx, W, H, time = 0;
  let neurons = [];
  let connections = [];
  let pulses = [];
  let isActive = false; // lights up when AI is "thinking"
  let activeTimeout = null;

  const NEURON_LAYERS = [
    { count: 4, x: 0.12 },
    { count: 6, x: 0.30 },
    { count: 8, x: 0.50 },
    { count: 6, x: 0.70 },
    { count: 3, x: 0.88 },
  ];

  function buildNetwork() {
    neurons = [];
    connections = [];

    NEURON_LAYERS.forEach((layer, li) => {
      const layerNeurons = [];
      for (let i = 0; i < layer.count; i++) {
        const spacing = H / (layer.count + 1);
        const neuron = {
          x: W * layer.x + (Math.random() - 0.5) * 20,
          y: spacing * (i + 1) + (Math.random() - 0.5) * 15,
          r: 4 + Math.random() * 3,
          layer: li,
          index: i,
          pulsePhase: Math.random() * Math.PI * 2,
          activation: 0,
        };
        layerNeurons.push(neuron);
        neurons.push(neuron);
      }

      // Connect to previous layer
      if (li > 0) {
        const prevLayer = neurons.filter(n => n.layer === li - 1);
        layerNeurons.forEach(n => {
          // Connect to 2-4 random neurons from prev layer
          const connectCount = 2 + Math.floor(Math.random() * 3);
          const shuffled = [...prevLayer].sort(() => Math.random() - 0.5);
          for (let c = 0; c < Math.min(connectCount, shuffled.length); c++) {
            connections.push({
              from: shuffled[c],
              to: n,
              weight: 0.3 + Math.random() * 0.7,
              activation: 0,
            });
          }
        });
      }
    });
  }

  function firePulse() {
    // Pick a random input neuron and fire a signal through the network
    const inputNeurons = neurons.filter(n => n.layer === 0);
    const start = inputNeurons[Math.floor(Math.random() * inputNeurons.length)];
    if (!start) return;

    const pulse = {
      neuron: start,
      layer: 0,
      progress: 0,
      connection: null,
      trail: [],
    };

    function propagate(p) {
      p.neuron.activation = 1;
      const outConns = connections.filter(c => c.from === p.neuron);
      if (outConns.length === 0) return;

      // Fire along 1-2 connections
      const fireCount = 1 + Math.floor(Math.random() * 2);
      const shuffled = [...outConns].sort(() => Math.random() - 0.5);
      for (let i = 0; i < Math.min(fireCount, shuffled.length); i++) {
        const conn = shuffled[i];
        conn.activation = 1;
        pulses.push({
          from: conn.from,
          to: conn.to,
          progress: 0,
          speed: 0.02 + Math.random() * 0.02,
          connection: conn,
        });
      }
    }

    propagate(pulse);
  }

  function drawNetwork() {
    time++;

    // Auto-fire pulses when active
    if (isActive && time % 8 === 0) firePulse();
    if (!isActive && time % 45 === 0) firePulse(); // slow ambient pulses

    // Draw connections
    connections.forEach(conn => {
      conn.activation *= 0.96;
      const baseAlpha = 0.06 + conn.weight * 0.04;
      const activeAlpha = conn.activation * 0.5;
      const alpha = baseAlpha + activeAlpha;

      ctx.beginPath();
      ctx.moveTo(conn.from.x, conn.from.y);

      // Curved connections
      const mx = (conn.from.x + conn.to.x) / 2;
      const my = (conn.from.y + conn.to.y) / 2 + (conn.from.index - conn.to.index) * 8;
      ctx.quadraticCurveTo(mx, my, conn.to.x, conn.to.y);

      if (conn.activation > 0.1) {
        ctx.strokeStyle = `rgba(79, 142, 247, ${alpha})`;
        ctx.lineWidth = 1.5 + conn.activation;
        ctx.shadowColor = 'rgba(79, 142, 247, 0.4)';
        ctx.shadowBlur = 8 * conn.activation;
      } else {
        ctx.strokeStyle = `rgba(79, 142, 247, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    });

    // Update and draw pulses (traveling signals)
    pulses = pulses.filter(p => p.progress <= 1);
    pulses.forEach(p => {
      p.progress += p.speed;

      // Position along the connection curve
      const t = p.progress;
      const mx = (p.from.x + p.to.x) / 2;
      const my = (p.from.y + p.to.y) / 2 + (p.from.index - p.to.index) * 8;

      const px = (1 - t) * (1 - t) * p.from.x + 2 * (1 - t) * t * mx + t * t * p.to.x;
      const py = (1 - t) * (1 - t) * p.from.y + 2 * (1 - t) * t * my + t * t * p.to.y;

      // Pulse glow
      const grad = ctx.createRadialGradient(px, py, 0, px, py, 12);
      grad.addColorStop(0, `rgba(167, 139, 250, 0.8)`);
      grad.addColorStop(0.5, `rgba(79, 142, 247, 0.3)`);
      grad.addColorStop(1, `rgba(79, 142, 247, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fill();

      // Pulse core
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
      ctx.fill();

      // When pulse reaches destination, activate that neuron and propagate
      if (p.progress >= 1) {
        p.to.activation = 1;
        // Chain reaction: fire from destination
        if (Math.random() < 0.65) {
          const outConns = connections.filter(c => c.from === p.to);
          if (outConns.length > 0) {
            const next = outConns[Math.floor(Math.random() * outConns.length)];
            next.activation = 1;
            pulses.push({
              from: next.from,
              to: next.to,
              progress: 0,
              speed: 0.02 + Math.random() * 0.02,
              connection: next,
            });
          }
        }
      }
    });

    // Draw neurons
    neurons.forEach(n => {
      n.activation *= 0.97;
      const pulse = Math.sin(time * 0.02 + n.pulsePhase) * 0.3 + 0.7;
      const baseAlpha = 0.3 + pulse * 0.2;
      const activeAlpha = n.activation * 0.7;
      const alpha = baseAlpha + activeAlpha;
      const r = n.r * (1 + n.activation * 0.6);

      // Outer glow
      const glowSize = r * (2.5 + n.activation * 3);
      const glowGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
      const isOutput = n.layer === NEURON_LAYERS.length - 1;
      const color = isOutput ? '52, 211, 153' : '79, 142, 247';

      glowGrad.addColorStop(0, `rgba(${color}, ${alpha * 0.4})`);
      glowGrad.addColorStop(0.5, `rgba(${color}, ${alpha * 0.1})`);
      glowGrad.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, r + 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${color}, ${alpha * 0.5})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Core
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.fill();

      // White inner dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
      ctx.fill();
    });

    // Draw layer labels
    const layerLabels = ['Input', 'Process', 'Analyze', 'Synthesize', 'Output'];
    NEURON_LAYERS.forEach((layer, i) => {
      ctx.font = '500 10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = `rgba(255,255,255,${isActive ? 0.25 : 0.12})`;
      ctx.fillText(layerLabels[i] || '', W * layer.x, H - 15);
    });
    ctx.textAlign = 'start';
  }

  /* ── Thought Bubbles ────────────────────────────────────────── */
  const THOUGHTS = [
    { text: '4 Years Experience', icon: '⚡' },
    { text: 'Angular · React · Node', icon: '⚛️' },
    { text: 'AI Integration Expert', icon: '🤖' },
    { text: 'Open to Opportunities', icon: '🟢' },
    { text: 'Healthcare · IoT · AI', icon: '🏥' },
    { text: 'Full Stack Developer', icon: '💻' },
  ];

  let thoughtBubbles = [];
  let lastThoughtTime = 0;

  function spawnThought() {
    if (thoughtBubbles.length >= 3) return;
    const t = THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
    // Check for duplicates
    if (thoughtBubbles.some(b => b.text === t.text)) return;

    const neuron = neurons[Math.floor(Math.random() * neurons.length)];
    if (!neuron) return;

    thoughtBubbles.push({
      text: t.text,
      icon: t.icon,
      x: neuron.x,
      y: neuron.y,
      targetY: neuron.y - 50 - Math.random() * 30,
      opacity: 0,
      life: 1,
      phase: 0,
    });
  }

  function drawThoughts() {
    if (time - lastThoughtTime > 180 && isActive) {
      spawnThought();
      lastThoughtTime = time;
    }

    thoughtBubbles = thoughtBubbles.filter(b => b.life > 0);
    thoughtBubbles.forEach(b => {
      b.phase++;
      b.y += (b.targetY - b.y) * 0.04;
      b.x += Math.sin(b.phase * 0.03) * 0.3;

      if (b.phase < 20) b.opacity = b.phase / 20;
      else if (b.life < 0.3) b.opacity = b.life / 0.3;
      else b.opacity = 1;

      b.life -= 0.003;

      const label = `${b.icon} ${b.text}`;
      ctx.font = '500 11px Inter, system-ui, sans-serif';
      const w = ctx.measureText(label).width + 20;

      ctx.fillStyle = `rgba(11, 15, 26, ${b.opacity * 0.85})`;
      ctx.strokeStyle = `rgba(79, 142, 247, ${b.opacity * 0.35})`;
      ctx.lineWidth = 1;
      roundRect(ctx, b.x - w / 2, b.y - 14, w, 28, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.85})`;
      ctx.textAlign = 'center';
      ctx.fillText(label, b.x, b.y + 4);
      ctx.textAlign = 'start';
    });
  }

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  }

  /* ── Main draw loop ─────────────────────────────────────────── */
  function mainDraw() {
    ctx.clearRect(0, 0, W, H);
    drawNetwork();
    drawThoughts();
    requestAnimationFrame(mainDraw);
  }

  /* ── Activate neural network (called when AI is processing) ── */
  function activateNetwork() {
    isActive = true;
    // Fire rapid pulses
    for (let i = 0; i < 5; i++) {
      setTimeout(() => firePulse(), i * 80);
    }
    clearTimeout(activeTimeout);
    activeTimeout = setTimeout(() => { isActive = false; }, 4000);
  }

  /* ── Terminal-style chat (integrated into section) ──────────── */
  function initCommandChat() {
    const input = document.getElementById('acc-input');
    const sendBtn = document.getElementById('acc-send');
    const messages = document.getElementById('acc-messages');
    if (!input || !sendBtn || !messages) return;

    // Quick-action chips
    document.querySelectorAll('.acc-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.dataset.q;
        if (q) {
          input.value = q;
          sendCommandMessage();
        }
      });
    });

    sendBtn.addEventListener('click', sendCommandMessage);
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendCommandMessage();
      }
    });

    // Welcome message
    appendCommandMsg('ai', `Hey! I'm Himanshu's AI neural assistant. Ask me anything about his skills, experience, or projects. The neural network behind me lights up as I think! ✨`);
  }

  let cmdMsgCount = 0;
  const CMD_MAX = 15;
  let cmdHistory = [];
  let cmdStreaming = false;

  function appendCommandMsg(role, html, id) {
    const messages = document.getElementById('acc-messages');
    const wrap = document.createElement('div');
    wrap.className = `acc-msg acc-msg-${role}`;

    const prefix = document.createElement('span');
    prefix.className = 'acc-msg-prefix';
    prefix.textContent = role === 'user' ? 'you ›' : 'ai ›';

    const bubble = document.createElement('div');
    bubble.className = 'acc-msg-text';
    if (id) bubble.id = id;
    bubble.innerHTML = html;

    wrap.appendChild(prefix);
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  }

  function showCmdTyping() {
    const messages = document.getElementById('acc-messages');
    const wrap = document.createElement('div');
    wrap.id = 'acc-typing';
    wrap.className = 'acc-msg acc-msg-ai';
    wrap.innerHTML = '<span class="acc-msg-prefix">ai ›</span><div class="acc-msg-text acc-typing-dots"><span></span><span></span><span></span></div>';
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideCmdTyping() {
    const el = document.getElementById('acc-typing');
    if (el) el.remove();
  }

  function sanitize(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  async function sendCommandMessage() {
    if (cmdStreaming) return;
    const input = document.getElementById('acc-input');
    const text = input.value.trim();
    if (!text) return;

    if (cmdMsgCount >= CMD_MAX) {
      appendCommandMsg('ai', '🔒 Session limit reached. Refresh to start a new conversation.');
      return;
    }

    input.value = '';
    appendCommandMsg('user', sanitize(text));
    cmdMsgCount++;
    cmdHistory.push({ role: 'user', content: text });

    // Update counter
    const counter = document.getElementById('acc-counter');
    if (counter) counter.textContent = `${cmdMsgCount}/${CMD_MAX}`;

    // Activate neural network visualization
    activateNetwork();

    cmdStreaming = true;
    showCmdTyping();

    try {
      const WORKER_URL = 'https://ai-proxy.himanshu-ai-proxy.workers.dev';
      const systemPrompt = buildSystemPrompt();

      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            ...cmdHistory,
          ],
          max_tokens: 1024,
          stream: true,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error?.message || `API error ${res.status}`);
      }

      hideCmdTyping();
      const bubble = appendCommandMsg('ai', '', 'acc-stream');
      let fullText = '';
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';

      outer: while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop();

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') break outer;
          if (!raw) continue;
          try {
            const evt = JSON.parse(raw);
            const chunk = evt.choices?.[0]?.delta?.content;
            if (chunk) {
              fullText += chunk;
              bubble.innerHTML = sanitize(fullText).replace(/\n/g, '<br>');
              document.getElementById('acc-messages').scrollTop = document.getElementById('acc-messages').scrollHeight;
              // Keep network active during streaming
              if (time % 3 === 0) activateNetwork();
            }
          } catch {}
        }
      }

      cmdHistory.push({ role: 'assistant', content: fullText });

    } catch (err) {
      hideCmdTyping();
      appendCommandMsg('ai', `⚠️ ${sanitize(err.message)}`);
    } finally {
      cmdStreaming = false;
      const sb = document.getElementById('acc-stream');
      if (sb) sb.removeAttribute('id');
      isActive = false;
    }
  }

  function buildSystemPrompt() {
    const d = window.DATA;
    if (!d) return 'You are a helpful assistant.';
    const jb = d.experience.jobs;
    const sk = d.skills.categories;
    const pr = d.work.projects;
    const ct = d.certs.items;
    const co = d.contact.cards;

    return `You are Himanshu Pratap Singh's AI neural assistant on his portfolio. Be professional, friendly, and concise (under 150 words).

## Quick Facts
- Role: Senior Software Engineer — Frontend · Backend · AI Integrations
- Location: Pune, India | Availability: ${d.hero.badge}
- Summary: ${d.hero.description}

## Experience
${jb.map(j => `${j.company} | ${j.role} | ${j.period}\n${j.bullets.map(b => '- ' + b).join('\n')}`).join('\n\n')}

## Skills
${sk.map(s => `${s.title}: ${s.pills.join(', ')}`).join('\n')}

## Projects
${pr.map(p => `${p.title} (${p.domain}): ${p.desc}`).join('\n')}

## Certs
${ct.map(c => `${c.name} — ${c.issuer}`).join(', ')}

## Contact
${co.map(c => `${c.label}: ${c.href && c.href.startsWith('http') ? c.href : c.value}`).join(' | ')}

Rules: Only answer about Himanshu. Use third person. For unrelated questions say you're here to discuss Himanshu's work.`;
  }

  /* ── Resize ─────────────────────────────────────────────────── */
  function resize() {
    const container = document.getElementById('acc-neural-container');
    if (!container || !canvas) return;
    W = canvas.width = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
    buildNetwork();
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    canvas = document.getElementById('acc-neural-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize, { passive: true });
    mainDraw();
    initCommandChat();

    // Connect the floating avatar to also open this section
    const avatarBtn = document.getElementById('ai-avatar-btn');
    if (avatarBtn) {
      avatarBtn.addEventListener('click', () => {
        const section = document.getElementById('ai-command');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const input = document.getElementById('acc-input');
            if (input) input.focus();
          }, 800);
        }
      });
    }
  }

  // Expose activateNetwork globally for external use
  window.activateNeuralNetwork = activateNetwork;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 300));
  } else {
    setTimeout(init, 300);
  }

})();
