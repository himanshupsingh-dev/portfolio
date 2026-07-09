// Your Cloudflare Worker URL — no API key needed here, it's stored in the Worker
const WORKER_URL = 'https://ai-proxy.himanshu-ai-proxy.workers.dev';

(function () {
  'use strict';

  const MODEL    = 'llama-3.3-70b-versatile';
  const MAX_MSGS = 15;
  const $        = id => document.getElementById(id);

  /* OpenAI-compatible history: [{role: 'user'|'assistant', content: '...'}] */
  let history   = [];
  let msgCount  = 0;
  let streaming = false;

  /* ── System prompt — built from the live DATA object ──────── */
  function buildSystemPrompt() {
    const d  = window.DATA;
    const jb = d.experience.jobs;
    const sk = d.skills.categories;
    const pr = d.work.projects;
    const ct = d.certs.items;
    const co = d.contact.cards;

    return `You are Himanshu Pratap Singh's AI assistant on his personal portfolio website. Your job is to represent him professionally, accurately, and in a friendly tone.

## About Himanshu
- Full Name: Himanshu Pratap Singh
- Role: Senior Software Engineer — Frontend · Backend · AI Integrations
- Location: Pune, Maharashtra, India
- Availability: ${d.hero.badge}
- Summary: ${d.hero.description}

## Work Experience

### ${jb[0].company} | ${jb[0].role} | ${jb[0].period}
${jb[0].bullets.map(b => `- ${b}`).join('\n')}
Technologies: ${jb[0].tags.join(', ')}

### ${jb[1].company} | ${jb[1].role} | ${jb[1].period}
${jb[1].note ? jb[1].note + '\n' : ''}${jb[1].bullets.map(b => `- ${b}`).join('\n')}
Technologies: ${jb[1].tags.join(', ')}

### ${jb[2].company} | ${jb[2].role} | ${jb[2].period}
${jb[2].bullets.map(b => `- ${b}`).join('\n')}

## Technical Skills
${sk.map(s => `${s.title}: ${s.pills.join(', ')}`).join('\n')}

## Projects Built
${pr.map(p => `${p.title} (${p.domain})\n${p.desc}\nStack: ${p.techs.join(', ')}`).join('\n\n')}

## Certifications & Awards
${ct.map(c => `- ${c.name} — ${c.issuer}`).join('\n')}

## Education
- B.E. Computer Science — MVJ College of Engineering, Bangalore (2018–2022)

## Contact
${co.map(c => `- ${c.label}: ${c.value}${c.href && c.href.startsWith('http') ? ` (${c.href})` : ''}`).join('\n')}

## Instructions
1. Answer questions about Himanshu's skills, experience, projects, education, certifications, and availability only.
2. Be concise (under 150 words), professional, and friendly. Go longer only when real depth is needed.
3. Refer to Himanshu in third person ("Himanshu has...", "He built...").
4. For availability questions, confirm he is open to opportunities and share ${co[0].value} or his LinkedIn.
5. For anything unrelated to Himanshu's professional background, respond: "I'm here to answer questions about Himanshu's work and career — feel free to ask about his skills, projects, or experience!"
6. Never fabricate information not listed above.`;
  }

  /* ── Sanitize user content — prevents XSS ─────────────────── */
  function sanitize(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderText(str) {
    return sanitize(str).replace(/\n/g, '<br>');
  }

  /* ── Panel open / close ────────────────────────────────────── */
  function openAIChat() {
    $('ai-chat-panel').classList.add('open');
    $('ai-msg-input').focus();
    /* hide avatar while chat is visible */
    const av  = document.getElementById('ai-avatar-float');
    const bub = document.getElementById('ai-avatar-bubble');
    if (av)  av.classList.add('chat-open');
    if (bub) bub.classList.remove('visible');
  }

  function closeAIChat() {
    $('ai-chat-panel').classList.remove('open');
    /* restore avatar */
    const av = document.getElementById('ai-avatar-float');
    if (av) av.classList.remove('chat-open');
  }

  /* ── Open chat with a pre-filled question ─────────────────── */
  function openAIChatWithMessage(msg) {
    openAIChat();
    if (msg) {
      const input = $('ai-msg-input');
      if (input) {
        input.value = msg;
        input.dispatchEvent(new Event('input')); /* resize height */
        input.focus();
      }
    }
  }

  window.openAIChat            = openAIChat;
  window.closeAIChat           = closeAIChat;
  window.openAIChatWithMessage = openAIChatWithMessage;

  /* ── Append a message bubble ───────────────────────────────── */
  function appendMessage(role, html, bubbleId) {
    const msgs = $('ai-messages');
    const wrap = document.createElement('div');
    wrap.className = `ai-msg ai-msg-${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'ai-bubble';
    if (bubbleId) bubble.id = bubbleId;
    bubble.innerHTML = html;

    wrap.appendChild(bubble);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    return bubble;
  }

  /* ── Typing indicator ──────────────────────────────────────── */
  function showTyping() {
    const msgs = $('ai-messages');
    const wrap = document.createElement('div');
    wrap.id = 'ai-typing';
    wrap.className = 'ai-msg ai-msg-assistant';
    wrap.innerHTML = '<div class="ai-bubble ai-typing"><span></span><span></span><span></span></div>';
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    const el = $('ai-typing');
    if (el) el.remove();
  }

  /* ── Counter ───────────────────────────────────────────────── */
  function updateCounter() {
    const el = $('ai-msg-counter');
    if (el) el.textContent = `${msgCount}/${MAX_MSGS} messages`;
  }

  /* ── Send a message ────────────────────────────────────────── */
  async function sendMessage() {
    if (streaming) return;

    const input = $('ai-msg-input');
    const text  = input.value.trim();
    if (!text) return;

    if (msgCount >= MAX_MSGS) {
      appendMessage('assistant', '🔒 Session limit reached (15/15). Refresh the page to start a new conversation.');
      return;
    }

    if (WORKER_URL.includes('YOUR-WORKER-NAME')) {
      appendMessage('assistant', '⚠️ Worker URL not set. Deploy the Cloudflare Worker and update <code>WORKER_URL</code> in <strong>js/ai-agent.js</strong>.');
      return;
    }

    input.value = '';
    input.style.height = 'auto';
    appendMessage('user', renderText(text));
    msgCount++;
    updateCounter();
    history.push({ role: 'user', content: text });

    streaming = true;
    $('ai-send-btn').disabled = true;
    showTyping();

    try {
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: buildSystemPrompt() },
            ...history,
          ],
          max_tokens: 1024,
          stream: true,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error?.message || `API error ${res.status}`);
      }

      hideTyping();

      const bubble  = appendMessage('assistant', '', 'ai-stream-bubble');
      let fullText  = '';
      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let buf       = '';

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
            const evt   = JSON.parse(raw);
            const chunk = evt.choices?.[0]?.delta?.content;
            if (chunk) {
              fullText += chunk;
              bubble.innerHTML = renderText(fullText);
              $('ai-messages').scrollTop = $('ai-messages').scrollHeight;
            }
          } catch { /* skip malformed chunk */ }
        }
      }

      history.push({ role: 'assistant', content: fullText });

    } catch (err) {
      hideTyping();
      appendMessage('assistant', `⚠️ ${renderText(err.message)}. Please try again.`);
    } finally {
      streaming = false;
      $('ai-send-btn').disabled = false;
      const sb = $('ai-stream-bubble');
      if (sb) sb.removeAttribute('id');
      $('ai-messages').scrollTop = $('ai-messages').scrollHeight;
    }
  }

  /* ── Typewriter bar in hero ────────────────────────────────── */
  function initTypewriter() {
    const el = document.getElementById('hero-ai-typewriter');
    if (!el) return;

    const questions = [
      '"What is his tech stack?"',
      '"Is he open to new opportunities?"',
      '"What has he built with AI?"',
      '"How many years of experience?"',
      '"Tell me about his top projects."',
    ];

    let qi = 0, ci = 0, deleting = false;

    function tick() {
      const q = questions[qi];
      if (!deleting) {
        ci++;
        el.textContent = q.slice(0, ci);
        if (ci >= q.length) { deleting = true; setTimeout(tick, 2200); return; }
        setTimeout(tick, 62);
      } else {
        ci--;
        el.textContent = q.slice(0, ci);
        if (ci <= 0) {
          deleting = false;
          qi = (qi + 1) % questions.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 33);
      }
    }

    /* start after page intro animation settles */
    setTimeout(tick, 1600);
  }

  /* ── Floating avatar + speech bubble ──────────────────────── */
  function initFloatingAvatar() {
    const avatar  = document.getElementById('ai-avatar-float');
    const btn     = document.getElementById('ai-avatar-btn');
    const bubble  = document.getElementById('ai-avatar-bubble');
    const closeB  = document.getElementById('ai-bubble-close');
    const miniBot = document.getElementById('ai-avatar-mini-bot');
    if (!avatar || !btn || !bubble) return;

    /* inject the portfolio's own robot SVG into the button */
    if (typeof createRobotSVG === 'function') {
      btn.innerHTML     = createRobotSVG('avatar-robot', 'avatarBotGrad', 'waving');
      if (miniBot) miniBot.innerHTML = createRobotSVG('mini-robot', 'miniBotGrad', 'happy');
    }

    /* show bubble after 4 s if chat not already open */
    setTimeout(() => {
      if (!$('ai-chat-panel').classList.contains('open')) {
        bubble.classList.add('visible');
      }
    }, 4000);

    /* auto-hide bubble after another 12 s */
    setTimeout(() => bubble.classList.remove('visible'), 16000);

    /* lift avatar above the scroll-to-top button when it appears */
    const scrollTopBtn = document.getElementById('scrolltop');
    if (scrollTopBtn) {
      const stObs = new MutationObserver(() => {
        avatar.classList.toggle('above-scrolltop', scrollTopBtn.classList.contains('visible'));
      });
      stObs.observe(scrollTopBtn, { attributes: true, attributeFilter: ['class'] });
    }

    /* close button */
    if (closeB) {
      closeB.addEventListener('click', e => {
        e.stopPropagation();
        bubble.classList.remove('visible');
      });
    }

    /* avatar button — open chat */
    btn.addEventListener('click', () => {
      bubble.classList.remove('visible');
      openAIChat();
    });

    /* quick-question chips */
    document.querySelectorAll('.ai-avatar-chip').forEach(chip => {
      chip.addEventListener('click', e => {
        e.stopPropagation();
        const q = chip.dataset.question || chip.textContent.trim();
        bubble.classList.remove('visible');
        openAIChatWithMessage(q);
      });
    });
  }

  /* ── Hero card mini-chat ──────────────────────────────────── */
  function setupHeroChat() {
    const heroInput = document.getElementById('hero-chat-input');
    const heroSend  = document.getElementById('hero-send-btn');
    if (!heroInput || !heroSend) return;

    let heroHistory  = [];
    let heroStreaming = false;

    async function heroSendMessage() {
      if (heroStreaming) return;
      const text = heroInput.value.trim();
      if (!text) return;

      const chatBody = document.getElementById('ai-chat-body');
      if (!chatBody) return;

      heroInput.value = '';

      const userEl = document.createElement('div');
      userEl.className = 'ai-msg ai-msg-visible';
      userEl.innerHTML = `<div class="ai-bubble-user">${sanitize(text)}</div>`;
      chatBody.appendChild(userEl);
      chatBody.scrollTop = chatBody.scrollHeight;

      heroHistory.push({ role: 'user', content: text });
      heroStreaming  = true;
      heroSend.disabled = true;

      const aiEl = document.createElement('div');
      aiEl.className = 'ai-msg ai-msg-visible';
      aiEl.innerHTML = '<div class="ai-bubble-ai"><span class="hero-typing">···</span></div>';
      chatBody.appendChild(aiEl);
      chatBody.scrollTop = chatBody.scrollHeight;
      const aiBubble = aiEl.querySelector('.ai-bubble-ai');

      try {
        const res = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: MODEL,
            messages: [{ role: 'system', content: buildSystemPrompt() }, ...heroHistory],
            stream: true
          })
        });

        const reader  = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText  = '';
        aiBubble.innerHTML = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          for (const line of decoder.decode(value).split('\n')) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const delta = JSON.parse(data).choices?.[0]?.delta?.content || '';
              fullText += delta;
              aiBubble.innerHTML = renderText(fullText);
              chatBody.scrollTop = chatBody.scrollHeight;
            } catch {}
          }
        }
        heroHistory.push({ role: 'assistant', content: fullText });
      } catch {
        aiBubble.textContent = '⚠️ Something went wrong. Please try again.';
      } finally {
        heroStreaming = false;
        heroSend.disabled = false;
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }

    heroSend.addEventListener('click', heroSendMessage);
    heroInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); heroSendMessage(); }
    });

    /* suggestion chips ask their question inline through the hero chat */
    window.heroAskQuestion = msg => {
      if (!msg || heroStreaming) return;
      heroInput.value = msg;
      heroSendMessage();
    };
  }

  /* ── Init ─────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    updateCounter();

    appendMessage('assistant', 'Hi! 👋 I\'m Himanshu\'s AI assistant. Ask me anything about his skills, experience, projects, or how to get in touch!');

    $('ai-send-btn').addEventListener('click', sendMessage);

    const input = $('ai-msg-input');

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });

    $('ai-close-btn').addEventListener('click', closeAIChat);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && $('ai-chat-panel').classList.contains('open')) {
        closeAIChat();
      }
    });

    /* hero typewriter bar click */
    const heroBar = document.getElementById('hero-ai-bar');
    if (heroBar) {
      const open = () => {
        const tw = document.getElementById('hero-ai-typewriter');
        const q  = tw ? tw.textContent.replace(/['"]/g, '').trim() : '';
        openAIChatWithMessage(q || 'Tell me about Himanshu');
      };
      heroBar.addEventListener('click', open);
      heroBar.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    }

    /* kick off new interactive features */
    initTypewriter();
    initFloatingAvatar();
    setupHeroChat();
  });

})();
