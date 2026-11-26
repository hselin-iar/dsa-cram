/* DSA Cram — flashcards, typing board, cloze, diagrams, AI-graded recall and a Doubt Room.
   content/unitN.js push into window.DSA, content/diagrams-unitN.js fill window.DSA_DIAGRAMS,
   diagrams.js renders them. AI features need `node server.mjs` (they fall back gracefully without it). */
(() => {
  'use strict';

  // ---------- data ----------
  const UNITS = (window.DSA || []).slice().sort((a, b) => a.unit - b.unit);
  const DIAG = window.DSA_DIAGRAMS || {};
  const DRAW = window.DSA_DRAW;
  const ALL = [];
  const BY_ID = new Map();
  for (const u of UNITS) {
    u.cards = [];
    for (const t of u.topics) {
      for (const c of t.cards) {
        const card = { ...c, unit: u.unit, topicId: t.id, topicTitle: t.title };
        card.keys = (card.keys || []).filter(Boolean);
        u.cards.push(card);
        ALL.push(card);
        BY_ID.set(card.id, card);
      }
    }
  }
  const unitOf = (n) => UNITS.find((u) => u.unit === n);

  // ---------- progress (localStorage) ----------
  const STORE_KEY = 'dsa-cram-v1';
  let P;
  try { P = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { P = {}; }
  P.cards = P.cards || {};   // id -> { seen, r (1..3), n, best, t, star }
  P.last = P.last || {};     // unit -> card index in Learn
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(P)); } catch {} };
  const rec = (id) => (P.cards[id] = P.cards[id] || {});

  function stats(cards) {
    let seen = 0, got = 0, weak = 0;
    for (const c of cards) {
      const r = P.cards[c.id];
      if (!r) continue;
      if (r.seen) seen++;
      if (r.r === 3) got++;
      if (r.r === 1 || r.r === 2) weak++;
    }
    return { total: cards.length, seen, got, weak };
  }
  function resetCards(cards, label) {
    if (!confirm(`Reset reading and test progress for ${label}? (Stars are kept.)`)) return false;
    for (const c of cards) {
      const r = P.cards[c.id];
      if (!r) continue;
      if (r.star) P.cards[c.id] = { star: true }; else delete P.cards[c.id];
    }
    save();
    return true;
  }

  // ---------- AI helper (server.mjs) ----------
  const AI = { up: false, checked: false };
  async function checkAI() {
    if (location.protocol === 'file:') { AI.checked = true; return; }
    try {
      const r = await fetch('/api/health');
      const j = await r.json();
      AI.up = !!(j.ok && j.ai);
    } catch { AI.up = false; }
    AI.checked = true;
  }

  // ---------- text helpers ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  function inline(s) {
    return String(s).split(/(`[^`]+`)/g).map((part) => {
      if (/^`[^`]+`$/.test(part)) return '<code>' + esc(part.slice(1, -1)) + '</code>';
      return esc(part)
        .replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s<]+[^\s<.,;:)\]])/g, (m, t, u, bare) =>
          `<a href="${u || bare}" target="_blank" rel="noopener">${t || bare}</a>`);
    }).join('');
  }

  const CPP_KW = new Set(('int void char float double bool long short unsigned signed const static struct class public private protected ' +
    'return if else for while do switch case break continue default new delete NULL nullptr true false using namespace include ' +
    'template typename auto this sizeof typedef enum union virtual friend operator cout cin endl std string vector main').split(' '));
  function highlight(code) {
    const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(#\s*\w+)|\b([A-Za-z_]\w*)\b|\b(\d+(?:\.\d+)?)\b/g;
    let out = '', last = 0, m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      const [tok] = m;
      if (m[1]) out += '<span class="c-com">' + esc(tok) + '</span>';
      else if (m[2]) out += '<span class="c-str">' + esc(tok) + '</span>';
      else if (m[3]) out += '<span class="c-pre">' + esc(tok) + '</span>';
      else if (m[4]) out += CPP_KW.has(tok) ? '<span class="c-kw">' + tok + '</span>' : esc(tok);
      else out += '<span class="c-num">' + tok + '</span>';
      last = m.index + tok.length;
    }
    return out + esc(code.slice(last));
  }

  // Small Markdown subset: paragraphs, - / 1. lists, **bold**, `code`, ``` blocks, | tables |, # headings, links.
  function md(src) {
    const lines = String(src || '').replace(/\r/g, '').split('\n');
    let html = '', para = [], i = 0;
    const flush = () => { if (para.length) { html += '<p>' + para.map(inline).join('<br>') + '</p>'; para = []; } };
    while (i < lines.length) {
      const t = lines[i].trim();
      if (t.startsWith('```')) {
        flush();
        const buf = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) buf.push(lines[i++]);
        i++;
        html += '<pre class="code"><code>' + highlight(dedent(buf).join('\n')) + '</code></pre>';
        continue;
      }
      if (t.startsWith('|')) {
        flush();
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i++].trim());
        html += table(rows);
        continue;
      }
      if (/^[-*•]\s+/.test(t)) {
        flush();
        html += '<ul>';
        while (i < lines.length && /^\s*[-*•]\s+/.test(lines[i])) {
          const ind = lines[i].match(/^\s*/)[0].length >= 2 ? ' class="ind"' : '';
          html += '<li' + ind + '>' + inline(lines[i].trim().replace(/^[-*•]\s+/, '')) + '</li>';
          i++;
        }
        html += '</ul>';
        continue;
      }
      if (/^\d+[.)]\s+/.test(t)) {
        flush();
        const start = parseInt(t, 10);
        html += '<ol' + (start !== 1 ? ' start="' + start + '"' : '') + '>';
        while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
          html += '<li>' + inline(lines[i].trim().replace(/^\d+[.)]\s+/, '')) + '</li>';
          i++;
          while (i < lines.length && /^\s{3,}\S/.test(lines[i]) && !/^\s*(\d+[.)]|[-*•])\s+/.test(lines[i])) {
            html = html.replace(/<\/li>$/, '<br>' + inline(lines[i].trim()) + '</li>');
            i++;
          }
        }
        html += '</ol>';
        continue;
      }
      if (/^#{1,6}\s+/.test(t)) { flush(); html += '<h4>' + inline(t.replace(/^#+\s+/, '')) + '</h4>'; i++; continue; }
      if (t === '') { flush(); i++; continue; }
      para.push(t);
      i++;
    }
    flush();
    return html;
  }
  function dedent(lines) {
    const ind = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length), 99);
    return lines.map((l) => l.slice(Math.min(ind, l.match(/^\s*/)[0].length)));
  }
  function table(rows) {
    const cells = (r) => r.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
    const real = rows.filter((r) => !/^\|[\s:|-]+\|?$/.test(r)); // drop the |---|---| separator
    if (!real.length) return '';
    const [head, ...rest] = real;
    return '<div class="tbl"><table><thead><tr>' + cells(head).map((c) => '<th>' + inline(c) + '</th>').join('') + '</tr></thead><tbody>' +
      rest.map((r) => '<tr>' + cells(r).map((c) => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
  }

  // ---------- diagrams ----------
  function diagramsHTML(card) {
    const specs = DIAG[card.id];
    if (!specs || !DRAW) return '';
    try { return '<div class="dgs">' + specs.map((s) => DRAW.figure(s)).join('') + '</div>'; }
    catch (e) { console.warn('diagram failed for', card.id, e); return ''; }
  }

  // ---------- cloze ----------
  function applyCloze(root, card) {
    if (!root) return 0;
    root.querySelectorAll('strong').forEach((s) => { if (!s.closest('pre')) s.classList.add('cz'); });
    const keys = card.keys.filter((k) => k.length >= 3).sort((a, b) => b.length - a.length);
    if (keys.length) {
      const re = new RegExp('(?<![A-Za-z0-9])(' + keys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')(?![A-Za-z0-9])', 'gi');
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) {
        const n = walker.currentNode;
        if (n.parentElement.closest('pre, code, .cz, a')) continue;
        if (re.test(n.nodeValue)) nodes.push(n);
        re.lastIndex = 0;
      }
      for (const n of nodes) {
        const frag = document.createDocumentFragment();
        let last = 0;
        n.nodeValue.replace(re, (m, _g, off) => {
          if (off > last) frag.appendChild(document.createTextNode(n.nodeValue.slice(last, off)));
          const sp = document.createElement('span');
          sp.className = 'cz';
          sp.textContent = m;
          frag.appendChild(sp);
          last = off + m.length;
          return m;
        });
        if (last < n.nodeValue.length) frag.appendChild(document.createTextNode(n.nodeValue.slice(last)));
        n.parentNode.replaceChild(frag, n);
      }
    }
    return root.querySelectorAll('.cz').length;
  }

  // ---------- grading ----------
  const STOP = new Set('a an the of to in on and or is are be by for with as at it its from that this then than'.split(' '));
  const norm = (s) => String(s).toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/−/g, '-');
  const compact = (s) => norm(s).replace(/\s+/g, '');
  const stem = (w) => (w.length > 4 ? w.replace(/(ings|ing|ies|es|ed|s)$/, '') : w);
  const words = (s) => norm(s).split(/[^a-z0-9²³₂ⁿθωΩ]+/i).filter(Boolean).map(stem);
  function keyHit(key, ansWords, ansCompact) {
    if (ansCompact.includes(compact(key))) return true;
    const kw = words(key).filter((w) => !STOP.has(w));
    if (!kw.length) return false;
    return kw.every((w) => ansWords.has(w) || (w.length >= 5 && [...ansWords].some((a) => a.length >= 5 && a.slice(0, 5) === w.slice(0, 5))));
  }
  function keywordGrade(card, ans) {
    const ansWords = new Set(words(ans));
    const ansCompact = compact(ans);
    const hits = card.keys.map((k) => keyHit(k, ansWords, ansCompact));
    const score = card.keys.length ? Math.round((hits.filter(Boolean).length / card.keys.length) * 100) : 0;
    return {
      score, via: 'keywords',
      verdict: ans.trim() ? 'Keyword check: counts which key terms you used. Judge the meaning yourself.' : 'Left blank.',
      got: card.keys.filter((_, j) => hits[j]), missing: card.keys.filter((_, j) => !hits[j]), wrong: [], tip: card.tip || '',
    };
  }
  async function gradeAnswer(card, answer) {
    if (!answer.trim()) return { score: 0, via: 'blank', verdict: 'Left blank: read the answer below, then try again.', got: [], missing: [], wrong: [], tip: card.tip || '' };
    if (AI.up) {
      try {
        const r = await fetch('/api/grade', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ q: card.q, a: card.a, answer }) });
        const j = await r.json();
        if (r.ok && typeof j.score === 'number') return { ...j, via: 'ai' };
        throw new Error(j.error || 'grading failed');
      } catch (e) {
        const g = keywordGrade(card, answer);
        g.verdict = 'AI grading failed (' + e.message + '), so this is a keyword check.';
        return g;
      }
    }
    return keywordGrade(card, answer);
  }
  const ratingOf = (score) => (score >= 80 ? 3 : score >= 45 ? 2 : 1);
  function recordGrade(card, g, r) {
    const x = rec(card.id);
    x.r = r; x.n = (x.n || 0) + 1; x.t = Date.now(); x.seen = 1;
    if (g) x.best = Math.max(x.best || 0, g.score);
    save();
  }

  function gradePanel(g) {
    const r = ratingOf(g.score);
    const li = (arr, cls, mark) => arr.map((x) => `<li class="${cls}"><span>${mark}</span>${inline(x)}</li>`).join('');
    const via = g.via === 'ai' ? 'Graded by AI on meaning, not exact wording'
      : g.via === 'keywords' ? (AI.up ? 'Keyword check' : 'Keyword check. Start the helper (node server.mjs) for AI grading on meaning')
      : '';
    return `<div class="grade g${r}">
      <div class="g-score"><b>${g.score}</b><span>/ 100</span></div>
      <div class="g-body">
        <p class="g-verdict">${inline(g.verdict || '')}</p>
        ${g.got.length || g.missing.length || g.wrong.length ? `<ul class="g-list">${li(g.got, 'ok', '✓')}${li(g.missing, 'miss', '✗')}${li(g.wrong, 'wrong', '!')}</ul>` : ''}
        ${g.tip ? `<p class="g-tip"><b>Remember:</b> ${inline(g.tip)}</p>` : ''}
        ${via ? `<p class="g-via">${via}</p>` : ''}
      </div>
    </div>`;
  }

  // ---------- routing / state ----------
  const app = document.getElementById('app');
  let S = { view: 'home' };
  let searchQ = '';
  let gradeSeq = 0;

  function go(next) { S = next; render(); window.scrollTo(0, 0); }

  function render() {
    if (!UNITS.length) { app.innerHTML = '<main class="wrap"><h1>No content loaded</h1><p>The files in <code>content/</code> are missing.</p></main>'; return; }
    if (S.view === 'home') renderHome();
    else if (S.view === 'learn') renderLearn();
    else if (S.view === 'setup') renderSetup();
    else if (S.view === 'test') renderTest();
    else if (S.view === 'summary') renderSummary();
    else if (S.view === 'search') renderSearch();
    doubtSync();
  }

  // ---------- home ----------
  function renderHome() {
    const s = stats(ALL);
    const stars = ALL.filter((c) => P.cards[c.id]?.star).length;
    app.innerHTML = `
      <main class="wrap home">
        <header class="top">
          <div>
            <h1>DSA Cram</h1>
            <p class="sub">${ALL.length} cards from your five unit notes. Read a card, just start typing to write it out, then switch the card to Test.</p>
          </div>
          <button class="ghost" data-act="search" title="Search all cards">Search <kbd>Ctrl/⌘ K</kbd></button>
        </header>
        ${AI.checked && !AI.up ? `<p class="banner">AI grading and the Doubt Room are off. In a terminal run <code>cd ~/java-dojo/dsa && node server.mjs</code>, then open <a href="http://localhost:5180">localhost:5180</a>. Everything else works as is.</p>` : ''}

        <section class="overall">
          ${meter('Read', s.seen, s.total)}
          ${meter('Recalled', s.got, s.total, 'good')}
          <div class="ov-actions">
            <button class="btn" data-act="test-all">Mixed test</button>
            <button class="btn ${s.weak ? '' : 'dim'}" data-act="test-weak" ${s.weak ? '' : 'disabled'}>Weak cards (${s.weak})</button>
            <button class="btn ${stars ? '' : 'dim'}" data-act="test-star" ${stars ? '' : 'disabled'}>Starred (${stars})</button>
          </div>
        </section>

        <section class="units">
          ${UNITS.map((u) => {
            const us = stats(u.cards);
            const last = P.last[u.unit] || 0;
            return `
            <article class="unit">
              <div class="unit-head">
                <span class="unit-no">Unit ${u.unit}</span>
                <h2>${esc(u.title)}</h2>
                <p class="unit-meta">${u.topics.length} topics · ${us.total} cards${us.weak ? ` · <span class="warn">${us.weak} weak</span>` : ''}</p>
              </div>
              ${meter('Read', us.seen, us.total)}
              ${meter('Recalled', us.got, us.total, 'good')}
              <div class="unit-actions">
                <button class="btn primary" data-act="learn" data-unit="${u.unit}">${last ? 'Continue reading' : 'Start reading'}</button>
                <button class="btn" data-act="setup" data-unit="${u.unit}">Test unit</button>
                <button class="link reset" data-act="reset-unit" data-unit="${u.unit}" title="Reset this unit's progress">Reset</button>
              </div>
              <details class="topics">
                <summary>Topics</summary>
                <ol>${u.topics.map((t) => {
                  const ts = stats(u.cards.filter((c) => c.topicId === t.id));
                  return `<li><a href="#" data-act="learn-topic" data-unit="${u.unit}" data-topic="${esc(t.id)}">${esc(t.title)}</a>
                    <span class="muted">${ts.seen}/${ts.total}</span>
                    ${ts.seen || ts.got || ts.weak ? `<button class="mini" data-act="reset-topic" data-unit="${u.unit}" data-topic="${esc(t.id)}" title="Reset this topic">↺</button>` : ''}</li>`;
                }).join('')}</ol>
              </details>
            </article>`;
          }).join('')}
        </section>

        <footer class="foot">
          <span>Progress is saved in this browser.</span>
          <button class="link" data-act="reset-all">Reset everything</button>
        </footer>
      </main>`;
  }

  function meter(label, n, total, cls = '') {
    const pct = total ? Math.round((n / total) * 100) : 0;
    return `<div class="meter ${cls}"><div class="meter-top"><span>${label}</span><span>${n}/${total} · ${pct}%</span></div><div class="bar"><i style="width:${pct}%"></i></div></div>`;
  }

  // ---------- learn (with per-card Learn / Test tabs) ----------
  function openLearn(unit, idx = P.last[unit] || 0) {
    const u = unitOf(unit);
    go({ view: 'learn', unit, idx: Math.max(0, Math.min(idx, u.cards.length - 1)), tab: 'learn', answer: '', grade: null, grading: false });
  }
  const learnCard = () => unitOf(S.unit).cards[S.idx];

  function renderLearn() {
    const u = unitOf(S.unit);
    const card = learnCard();
    const r = rec(card.id);
    if (!r.seen) { r.seen = 1; save(); }
    P.last[u.unit] = S.idx; save();
    const topicIdx = u.topics.findIndex((t) => t.id === card.topicId);
    const cloze = !!P.cloze;

    let body;
    if (S.tab === 'learn') {
      body = `
        ${diagramsHTML(card)}
        <div class="a md" id="answer">${md(card.a)}</div>
        ${card.tip ? `<p class="tip"><b>Remember:</b> ${inline(card.tip)}</p>` : ''}
        ${card.keys.length && !cloze ? `<div class="keys">${card.keys.map((k) => `<span>${esc(k)}</span>`).join('')}</div>` : ''}`;
    } else if (S.grading) {
      body = `<div class="grading"><span class="spin"></span> Grading your answer…</div>
        <pre class="mine-text faded">${esc(S.answer)}</pre>`;
    } else if (S.grade) {
      body = `${gradePanel(S.grade)}
        <div class="cmp">
          <section class="mine"><h3>Your answer</h3><pre class="mine-text">${S.answer.trim() ? esc(S.answer) : '<span class="muted">(left blank)</span>'}</pre></section>
          <section class="model"><h3>From the notes</h3>${diagramsHTML(card)}<div class="a md">${md(card.a)}</div></section>
        </div>
        <div class="after-grade">
          <button class="btn" data-act="retry">Try again</button>
          <button class="btn" data-act="tab" data-tab="learn">Back to Learn</button>
          <span class="rate-override">Rate it yourself:
            ${[1, 2, 3].map((n) => `<button class="chip ${rec(card.id).r === n ? 'on' : ''}" data-act="override" data-r="${n}">${['', 'Missed', 'Partly', 'Got it'][n]}</button>`).join('')}
          </span>
          <button class="btn primary" data-act="next" ${S.idx < u.cards.length - 1 ? '' : 'disabled'}>Next card →</button>
        </div>`;
    } else {
      body = `<textarea id="ans" class="ans" spellcheck="false" placeholder="Write the answer from memory. Enter = new line, Tab = indent.">${esc(S.answer)}</textarea>
        <div class="test-actions">
          <span class="hints"><kbd>Ctrl/⌘ Enter</kbd> grade · <kbd>Esc</kbd> back to Learn</span>
          <button class="btn primary" data-act="grade">Grade my answer</button>
        </div>`;
    }

    app.innerHTML = `
      <div class="learn">
        <aside class="side">
          <button class="link back" data-act="home">← All units</button>
          <div class="side-unit">Unit ${u.unit}</div>
          <div class="side-title">${esc(u.title)}</div>
          <nav>
            ${u.topics.map((t, ti) => {
              const first = u.cards.findIndex((c) => c.topicId === t.id);
              const ts = stats(u.cards.filter((c) => c.topicId === t.id));
              return `<div class="side-row ${ti === topicIdx ? 'on' : ''}">
                <a href="#" data-act="jump" data-idx="${first}"><span>${esc(t.title)}</span><span class="muted">${ts.seen}/${ts.total}</span></a>
                ${ts.seen || ts.got || ts.weak ? `<button class="mini" data-act="reset-topic" data-unit="${u.unit}" data-topic="${esc(t.id)}" title="Reset this topic">↺</button>` : ''}
              </div>`;
            }).join('')}
          </nav>
          <button class="link side-reset" data-act="reset-unit" data-unit="${u.unit}">Reset unit ${u.unit} progress</button>
        </aside>
        <main class="stage">
          <div class="stage-bar">
            <span class="crumb">${esc(card.topicTitle)}</span>
            <span class="pos">${S.idx + 1} / ${u.cards.length}</span>
          </div>
          <div class="progress"><i style="width:${((S.idx + 1) / u.cards.length) * 100}%"></i></div>
          <div class="card-top">
            <div class="tabs" role="tablist">
              <button class="${S.tab === 'learn' ? 'on' : ''}" data-act="tab" data-tab="learn">Learn</button>
              <button class="${S.tab === 'test' ? 'on' : ''}" data-act="tab" data-tab="test">Test</button>
            </div>
            <span class="tab-hint"><kbd>Tab</kbd> switch</span>
            <div class="card-tools">
              ${S.tab === 'learn' ? `<button class="tool ${cloze ? 'on' : ''}" data-act="cloze" title="Cover the keywords (Alt+C)">Cloze</button>
                ${cloze ? '<button class="tool" data-act="cloze-all" title="Uncover all">Reveal all</button>' : ''}` : ''}
              <button class="tool" data-act="doubt" title="Ask about this card (Alt+D)">Doubt room</button>
              <button class="star ${r.star ? 'on' : ''}" data-act="star" title="Star (Alt+S)">${r.star ? '★' : '☆'}</button>
            </div>
          </div>
          <article class="card kind-${esc(card.kind || 'concept')} ${S.tab === 'test' ? 'testing' : ''}">
            <div class="card-meta">
              <span class="kind">${kindLabel(card.kind)}</span>
              ${r.r ? `<span class="rate r${r.r}">${['', 'Missed', 'Partly', 'Got it'][r.r]}${r.best != null ? ' · best ' + r.best : ''}</span>` : ''}
            </div>
            <h2 class="q">${inline(card.q)}</h2>
            ${body}
          </article>
          ${S.tab === 'learn' ? `
          <div class="learn-nav">
            <button class="btn" data-act="prev" ${S.idx ? '' : 'disabled'}>← Prev</button>
            <button class="btn primary" data-act="tab" data-tab="test">Test me on this</button>
            <button class="btn" data-act="next" ${S.idx < u.cards.length - 1 ? '' : 'disabled'}>Next →</button>
          </div>
          <p class="hints">
            <b>Just start typing</b> to write on the board · <kbd>Tab</kbd> Learn/Test · <kbd>←</kbd><kbd>→</kbd> move ·
            <kbd>Alt C</kbd> cloze · <kbd>Alt S</kbd> star · <kbd>Alt D</kbd> doubt room · <kbd>Alt F</kbd> focus · <kbd>Alt L</kbd> light/dark · <kbd>Alt P</kbd> sepia · <kbd>Ctrl/⌘ K</kbd> search · <kbd>Esc</kbd> home
          </p>` : ''}
        </main>
      </div>`;

    if (S.tab === 'learn' && cloze) applyCloze(document.getElementById('answer'), card);
    const ta = document.getElementById('ans');
    if (ta) wireAnswerBox(ta, () => gradeLearn());
  }

  function wireAnswerBox(ta, submit) {
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
    ta.addEventListener('input', () => { S.answer = ta.value; });
    ta.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); S.answer = ta.value; submit(); }
      else if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); ta.setRangeText('    ', ta.selectionStart, ta.selectionEnd, 'end'); S.answer = ta.value; }
      else if (e.key === 'Escape' && S.view === 'learn') { e.preventDefault(); e.stopPropagation(); setTab('learn'); }
    });
  }

  async function gradeLearn() {
    const card = learnCard();
    const seq = ++gradeSeq;
    S.grading = true; S.grade = null; render();
    const g = await gradeAnswer(card, S.answer);
    if (seq !== gradeSeq || S.view !== 'learn' || learnCard() !== card) return;
    S.grading = false; S.grade = g;
    if (g.via !== 'blank') recordGrade(card, g, ratingOf(g.score));
    else recordGrade(card, null, 1);
    render();
  }

  function setTab(tab) {
    if (S.view !== 'learn') return;
    gradeSeq++;
    S.tab = tab; S.grading = false;
    if (tab === 'test') { S.answer = ''; S.grade = null; }
    render();
    window.scrollTo(0, 0);
  }

  const KIND = { def: 'Definition', concept: 'Concept', list: 'List', algo: 'Algorithm', code: 'C++ code', compare: 'Comparison', formula: 'Formula', trace: 'Worked example', pyq: 'Exam question' };
  const kindLabel = (k) => KIND[k] || 'Concept';

  function learnMove(d) {
    const u = unitOf(S.unit);
    const n = S.idx + d;
    if (n < 0 || n >= u.cards.length) return;
    gradeSeq++;
    Object.assign(S, { idx: n, tab: 'learn', answer: '', grade: null, grading: false });
    render();
    window.scrollTo(0, 0);
  }

  // ---------- typing board ----------
  const board = document.getElementById('board');
  const boardInput = document.getElementById('boardInput');
  const boardCount = document.getElementById('boardCount');
  let boardSession = 0;
  function openBoard(initial = '') {
    board.hidden = false;
    board.classList.remove('solid');
    boardInput.value = initial;
    boardSession = 0;
    boardCount.textContent = '';
    boardInput.focus(); // synchronous, so keys typed right after are not lost
    boardInput.setSelectionRange(initial.length, initial.length);
  }
  function closeBoard() { board.hidden = true; boardInput.blur(); }
  boardInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeBoard(); return; }
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyB') { e.preventDefault(); board.classList.toggle('solid'); return; }
    if (e.key === 'Tab') { e.preventDefault(); boardInput.setRangeText('    ', boardInput.selectionStart, boardInput.selectionEnd, 'end'); return; }
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      e.stopPropagation();
      closeBoard();
    }
  });

  // ---------- test session setup ----------
  function openSetup(opts = {}) {
    go({ view: 'setup', units: opts.units || UNITS.map((u) => u.unit), filter: opts.filter || 'all', count: opts.count ?? 20, mode: P.mode || 'type', topic: opts.topic || null });
  }

  function pool(units, filter, topic) {
    return ALL.filter((c) => {
      if (topic && c.topicId !== topic) return false;
      if (!units.includes(c.unit)) return false;
      const r = P.cards[c.id] || {};
      if (filter === 'weak') return r.r === 1 || r.r === 2;
      if (filter === 'new') return !r.r;
      if (filter === 'star') return !!r.star;
      if (filter === 'pyq') return c.kind === 'pyq';
      if (filter === 'seen') return !!r.seen;
      return true;
    });
  }

  function renderSetup() {
    const p = pool(S.units, S.filter, S.topic);
    const topicTitle = S.topic ? ALL.find((c) => c.topicId === S.topic)?.topicTitle : null;
    const opt = (name, val, label, cur) => `<button class="chip ${cur === val ? 'on' : ''}" data-act="set" data-k="${name}" data-v="${val}">${label}</button>`;
    app.innerHTML = `
      <main class="wrap setup">
        <button class="link back" data-act="home">← All units</button>
        <h1>Test yourself</h1>
        <p class="sub">You see only the question. Write the answer from memory and it gets graded on meaning against the notes. Each card comes up once per test.</p>
        ${topicTitle ? `<p class="scope">Topic: <b>${esc(topicTitle)}</b> <button class="link" data-act="set" data-k="topic" data-v="">clear</button></p>` : `
        <div class="row"><label>Units</label><div class="chips">
          ${UNITS.map((u) => `<button class="chip ${S.units.includes(u.unit) ? 'on' : ''}" data-act="unit-toggle" data-unit="${u.unit}">Unit ${u.unit}</button>`).join('')}
        </div></div>`}
        <div class="row"><label>Cards</label><div class="chips">
          ${opt('filter', 'all', 'All', S.filter)}${opt('filter', 'new', 'Not tested yet', S.filter)}${opt('filter', 'seen', 'Already read', S.filter)}${opt('filter', 'weak', 'Weak', S.filter)}${opt('filter', 'star', 'Starred', S.filter)}${opt('filter', 'pyq', 'Exam questions only', S.filter)}
        </div></div>
        <div class="row"><label>How many</label><div class="chips">
          ${[10, 20, 40].map((n) => opt('count', n, String(n), S.count)).join('')}${opt('count', 0, 'All ' + p.length, S.count)}
        </div></div>
        <div class="row"><label>Mode</label><div class="chips">
          ${opt('mode', 'type', 'Write the answer (graded)', S.mode)}${opt('mode', 'flip', 'Quick flip (think, then reveal)', S.mode)}
        </div></div>
        <div class="go">
          <button class="btn primary big" data-act="start" ${p.length ? '' : 'disabled'}>Start · ${S.count && S.count < p.length ? S.count : p.length} cards</button>
          ${p.length ? '' : '<span class="muted">No cards match these settings.</span>'}
        </div>
      </main>`;
  }

  function startTest(cards) {
    if (!cards.length) return;
    go({ view: 'test', queue: cards.map((c) => c.id), i: 0, phase: 'ask', mode: P.mode || 'type', answer: '', grade: null, results: [] });
  }

  // ---------- test session ----------
  const testCard = () => BY_ID.get(S.queue[S.i]);
  function renderTest() {
    const card = testCard();
    const n = S.queue.length;
    const head = `
      <div class="test-bar">
        <button class="link" data-act="end">End test</button>
        <span class="crumb">Unit ${card.unit} · ${esc(card.topicTitle)}</span>
        <span class="pos">${S.i + 1} / ${n}</span>
      </div>
      <div class="progress"><i style="width:${(S.i / n) * 100}%"></i></div>
      <div class="card-meta"><span class="kind">${kindLabel(card.kind)}</span>
        <button class="tool push" data-act="doubt">Doubt room</button></div>
      <h2 class="q">${inline(card.q)}</h2>`;

    if (S.phase === 'ask') {
      app.innerHTML = `<main class="wrap test">${head}
        ${S.mode === 'type'
          ? `<textarea id="ans" class="ans" spellcheck="false" placeholder="Write everything you remember. Enter = new line.">${esc(S.answer)}</textarea>
             <div class="test-actions"><span class="hints"><kbd>Ctrl/⌘ Enter</kbd> grade · empty = I don't know</span>
             <button class="btn primary" data-act="check">Grade</button></div>`
          : `<div class="covered big"><p>Answer it in your head (or out loud).</p><button class="btn primary" data-act="check">Reveal <kbd>Space</kbd></button></div>`}
      </main>`;
      const ta = document.getElementById('ans');
      if (ta) wireAnswerBox(ta, () => check());
      return;
    }
    if (S.phase === 'grading') {
      app.innerHTML = `<main class="wrap test">${head}<div class="grading"><span class="spin"></span> Grading your answer…</div><pre class="mine-text faded">${esc(S.answer)}</pre></main>`;
      return;
    }

    const typed = S.mode === 'type';
    const sug = typed && S.grade ? ratingOf(S.grade.score) : 0;
    app.innerHTML = `<main class="wrap test review">${head}
      ${typed && S.grade ? gradePanel(S.grade) : ''}
      <div class="cmp ${typed ? '' : 'single'}">
        ${typed ? `<section class="mine"><h3>Your answer</h3><pre class="mine-text">${S.answer.trim() ? esc(S.answer) : '<span class="muted">(left blank)</span>'}</pre></section>` : ''}
        <section class="model"><h3>From the notes</h3>${diagramsHTML(card)}<div class="a md">${md(card.a)}</div>
          ${card.tip ? `<p class="tip"><b>Remember:</b> ${inline(card.tip)}</p>` : ''}</section>
      </div>
      <div class="rate-row">
        <span>How did you do?</span>
        <button class="btn rate-btn r1 ${sug === 1 ? 'sug' : ''}" data-act="rate" data-r="1">Missed <kbd>1</kbd></button>
        <button class="btn rate-btn r2 ${sug === 2 ? 'sug' : ''}" data-act="rate" data-r="2">Partly <kbd>2</kbd></button>
        <button class="btn rate-btn r3 ${sug === 3 ? 'sug' : ''}" data-act="rate" data-r="3">Got it <kbd>3</kbd></button>
        ${sug ? '<span class="muted">Enter accepts the highlighted one</span>' : ''}
      </div>
    </main>`;
  }

  async function check() {
    const card = testCard();
    if (S.mode !== 'type') { S.phase = 'review'; render(); window.scrollTo(0, 0); return; }
    const seq = ++gradeSeq;
    S.phase = 'grading'; render();
    const g = await gradeAnswer(card, S.answer);
    if (seq !== gradeSeq || S.view !== 'test' || testCard() !== card) return;
    S.grade = g; S.phase = 'review';
    render();
    window.scrollTo(0, 0);
  }

  function rate(r) {
    const card = testCard();
    recordGrade(card, S.grade && S.grade.via !== 'blank' ? S.grade : null, r);
    S.results.push({ id: card.id, r, score: S.grade ? S.grade.score : null });
    if (S.i + 1 >= S.queue.length) return go({ view: 'summary', results: S.results });
    gradeSeq++;
    Object.assign(S, { i: S.i + 1, phase: 'ask', answer: '', grade: null });
    render();
    window.scrollTo(0, 0);
  }

  function renderSummary() {
    const res = S.results;
    const c = [0, 0, 0, 0];
    res.forEach((x) => c[x.r]++);
    const missed = res.filter((x) => x.r < 3).map((x) => BY_ID.get(x.id));
    app.innerHTML = `
      <main class="wrap summary">
        <h1>Test done</h1>
        <div class="tally">
          <div class="t r3"><b>${c[3]}</b><span>Got it</span></div>
          <div class="t r2"><b>${c[2]}</b><span>Partly</span></div>
          <div class="t r1"><b>${c[1]}</b><span>Missed</span></div>
        </div>
        <div class="go">
          ${missed.length ? `<button class="btn primary" data-act="retest">Retest the ${missed.length} not-perfect cards</button>` : ''}
          <button class="btn" data-act="home">Back to units</button>
        </div>
        ${missed.length ? `<h3>Read these again</h3><ul class="missed">${missed.map((m) =>
          `<li><a href="#" data-act="open-card" data-id="${esc(m.id)}">${inline(m.q)}</a> <span class="muted">Unit ${m.unit}</span></li>`).join('')}</ul>` : ''}
      </main>`;
  }

  // ---------- search ----------
  function renderSearch() {
    app.innerHTML = `
      <main class="wrap search">
        <button class="link back" data-act="home">← All units</button>
        <input id="q" class="q-in" placeholder="Search questions and answers, e.g. 'AVL rotation' or 'linear probing'" value="${esc(searchQ)}">
        <ul id="results" class="results"></ul>
      </main>`;
    const q = document.getElementById('q');
    const out = document.getElementById('results');
    const run = () => {
      searchQ = q.value;
      const terms = norm(searchQ).split(/\s+/).filter(Boolean);
      if (!terms.length) { out.innerHTML = ''; return; }
      const hits = [];
      for (const c of ALL) {
        const hq = norm(c.q), ha = norm(c.a + ' ' + c.topicTitle);
        if (!terms.every((t) => hq.includes(t) || ha.includes(t))) continue;
        hits.push({ c, s: terms.filter((t) => hq.includes(t)).length });
      }
      hits.sort((a, b) => b.s - a.s);
      out.innerHTML = hits.slice(0, 60).map(({ c }) =>
        `<li><a href="#" data-act="open-card" data-id="${esc(c.id)}"><span class="muted">U${c.unit} · ${esc(c.topicTitle)}</span><br>${inline(c.q)}</a></li>`).join('') ||
        '<li class="muted">Nothing found.</li>';
    };
    q.addEventListener('input', run);
    q.addEventListener('keydown', (e) => { if (e.key === 'Enter') out.querySelector('a')?.click(); if (e.key === 'Escape') go({ view: 'home' }); });
    q.focus();
    run();
  }

  function openCard(id) {
    const c = BY_ID.get(id);
    if (!c) return;
    openLearn(c.unit, unitOf(c.unit).cards.findIndex((x) => x.id === id));
  }

  // ---------- doubt room ----------
  const threads = new Map(); // context key -> [{role, content}]
  let doubtOpen = false, doubtBusy = false;
  const dock = document.createElement('div');
  dock.innerHTML = `
    <button id="doubtFab" class="doubt-fab" title="Doubt room (Alt+D)">? Doubt room</button>
    <aside id="doubt" class="doubt" hidden>
      <header class="d-head"><b>Doubt room</b><span class="muted">AI tutor with web search</span>
        <button class="tool d-new" title="Erase this conversation and start fresh">New chat</button><button class="d-x" title="Close (Esc)">✕</button></header>
      <div class="d-ctx" id="dctx"></div>
      <div class="d-msgs" id="dmsgs"></div>
      <form class="d-form" id="dform">
        <textarea id="din" rows="3" placeholder="Ask anything about this card… (Enter to send, Shift+Enter new line)"></textarea>
        <button class="btn primary" type="submit">Ask</button>
      </form>
    </aside>`;
  document.body.appendChild(dock);
  const dEl = document.getElementById('doubt');
  const dMsgs = document.getElementById('dmsgs');
  const dIn = document.getElementById('din');
  const dCtx = document.getElementById('dctx');

  function currentCard() {
    if (S.view === 'learn') return learnCard();
    if (S.view === 'test') return testCard();
    return null;
  }
  function pageName() {
    if (S.view === 'learn') return `Learn view, ${S.tab === 'test' ? 'Test tab (student writing the answer from memory)' : 'reading the card'}`;
    if (S.view === 'test') return S.phase === 'ask' ? 'Test session: student is answering (do not reveal the full answer unless asked)' : 'Test session: reviewing the answer';
    return { home: 'Home (unit overview)', setup: 'Test setup', summary: 'Test summary', search: 'Search' }[S.view] || S.view;
  }
  const ctxKey = () => currentCard()?.id || 'general';

  function doubtSync() {
    if (!doubtOpen) return;
    const card = currentCard();
    dCtx.innerHTML = card
      ? `<span class="muted">About this card · Unit ${card.unit}</span><div>${inline(card.q)}</div>`
      : `<span class="muted">No card open: ask anything about DSA.</span>`;
    renderThread();
  }
  function renderThread() {
    const msgs = threads.get(ctxKey()) || [];
    if (location.protocol === 'file:' || (AI.checked && !AI.up)) {
      dMsgs.innerHTML = `<div class="d-msg sys">The Doubt Room needs the local helper. In a terminal run:<pre class="code"><code>cd ~/java-dojo/dsa && node server.mjs</code></pre>then open <a href="http://localhost:5180">localhost:5180</a>. It uses your Claude login and can search the web.</div>`;
      return;
    }
    dMsgs.innerHTML = msgs.length ? msgs.map((m, i) => `<div class="d-msg ${m.role}" data-i="${i}">${m.role === 'user' ? esc(m.content).replace(/\n/g, '<br>') : md(m.content) || '<span class="spin"></span>'}${m.status ? `<div class="d-status">${esc(m.status)}</div>` : ''}</div>`).join('')
      : `<div class="d-msg sys">Ask a doubt about what's on screen. Examples: “Explain this with a smaller example”, “Why is the worst case O(n²)?”, “Find a visualiser for this”.</div>`;
    dMsgs.scrollTop = dMsgs.scrollHeight;
  }
  function openDoubt() {
    doubtOpen = true;
    dEl.hidden = false;
    document.body.classList.add('doubt-on');
    doubtSync();
    dIn.focus();
  }
  function closeDoubt() {
    doubtOpen = false;
    dEl.hidden = true;
    document.body.classList.remove('doubt-on');
    dIn.blur();
  }
  document.getElementById('doubtFab').addEventListener('click', () => (doubtOpen ? closeDoubt() : openDoubt()));
  dEl.querySelector('.d-x').addEventListener('click', closeDoubt);
  let doubtCtl = null;
  dEl.querySelector('.d-new').addEventListener('click', () => {
    if (doubtCtl) doubtCtl.abort();
    threads.delete(ctxKey());
    doubtBusy = false;
    renderThread();
    dIn.focus();
  });
  dIn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); sendDoubt(); }
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeDoubt(); }
  });
  document.getElementById('dform').addEventListener('submit', (e) => { e.preventDefault(); sendDoubt(); });

  async function sendDoubt() {
    const text = dIn.value.trim();
    if (!text || doubtBusy) return;
    if (!AI.up) { renderThread(); return; }
    const key = ctxKey();
    const card = currentCard();
    const ctl = new AbortController();
    doubtCtl = ctl;
    const msgs = threads.get(key) || [];
    threads.set(key, msgs);
    msgs.push({ role: 'user', content: text });
    const reply = { role: 'assistant', content: '', status: 'Thinking…' };
    msgs.push(reply);
    dIn.value = '';
    doubtBusy = true;
    renderThread();
    const payload = {
      page: pageName(),
      messages: msgs.slice(0, -1).map(({ role, content }) => ({ role, content })),
      card: card && {
        unit: card.unit, unitTitle: unitOf(card.unit).title, topic: card.topicTitle, q: card.q, a: card.a,
        studentAnswer: (S.view === 'learn' && S.tab === 'test') || S.view === 'test' ? S.answer || '' : '',
        grade: S.grade ? `${S.grade.score}/100. ${S.grade.verdict} Missing: ${S.grade.missing.join('; ')}. Wrong: ${S.grade.wrong.join('; ')}` : '',
      },
    };
    let raf = 0;
    const paint = () => { raf = 0; if (doubtOpen && ctxKey() === key) renderThread(); };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(paint); };
    try {
      const res = await fetch('/api/doubt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: ctl.signal });
      if (!res.ok || !res.body) throw new Error('helper returned ' + res.status);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let k;
        while ((k = buf.indexOf('\n\n')) >= 0) {
          const chunk = buf.slice(0, k); buf = buf.slice(k + 2);
          if (!chunk.startsWith('data: ')) continue;
          const ev = JSON.parse(chunk.slice(6));
          if (ev.t === 'text') { reply.content += ev.d; reply.status = ''; }
          else if (ev.t === 'status') reply.status = ev.d;
          else if (ev.t === 'error') { reply.content += (reply.content ? '\n\n' : '') + '**Error:** ' + ev.d; reply.status = ''; }
          schedule();
        }
      }
    } catch (e) {
      if (ctl.signal.aborted) return; // "New chat" pressed: thread already erased
      reply.content += '**Could not reach the helper:** ' + e.message;
    }
    if (doubtCtl === ctl) doubtCtl = null;
    reply.status = '';
    doubtBusy = false;
    if (!reply.content) reply.content = '_(no answer)_';
    schedule();
  }

  // ---------- view: theme, sepia, focus mode ----------
  const VIEW_KEY = 'dsa-cram-view';
  let V;
  try { V = JSON.parse(localStorage.getItem(VIEW_KEY)) || {}; } catch { V = {}; }
  V.theme = V.theme === 'light' ? 'light' : 'dark';
  const saveView = () => { try { localStorage.setItem(VIEW_KEY, JSON.stringify({ theme: V.theme, sepia: !!V.sepia })); } catch {} };
  const vdock = document.createElement('div');
  vdock.className = 'vdock';
  document.body.appendChild(vdock);
  function applyView() {
    const h = document.documentElement;
    h.dataset.theme = V.theme;
    if (V.sepia) h.dataset.sepia = ''; else delete h.dataset.sepia;
    document.body.classList.toggle('focus', !!V.focus);
    vdock.innerHTML = `
      <button data-v="theme" title="Light / dark (Alt+L)">${V.theme === 'dark' ? '☀ Light' : '☾ Dark'}</button>
      <button data-v="sepia" class="${V.sepia ? 'on' : ''}" title="Sepia tint (Alt+P)">Sepia</button>
      <button data-v="focus" class="${V.focus ? 'on' : ''}" title="Fullscreen focus mode (Alt+F)">${V.focus ? '⤡ Exit focus' : '⤢ Focus'}</button>`;
  }
  let fsExitAt = 0;
  function setFocus(on) {
    V.focus = on;
    if (on && !document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
        // Keep Esc for the app (closing the board, leaving the Test tab) instead of dropping out of fullscreen.
        .then(() => navigator.keyboard && navigator.keyboard.lock && navigator.keyboard.lock(['Escape']))
        .catch((err) => console.warn('fullscreen not available:', err && err.message));
    }
    if (!on && document.fullscreenElement) document.exitFullscreen().catch(() => {});
    applyView();
  }
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && V.focus) { fsExitAt = Date.now(); V.focus = false; applyView(); }
  });
  vdock.addEventListener('click', (e) => {
    const b = e.target.closest('[data-v]');
    if (!b) return;
    if (b.dataset.v === 'theme') { V.theme = V.theme === 'dark' ? 'light' : 'dark'; saveView(); applyView(); }
    if (b.dataset.v === 'sepia') { V.sepia = !V.sepia; saveView(); applyView(); }
    if (b.dataset.v === 'focus') setFocus(!V.focus);
    b.blur();
  });
  applyView();

  // ---------- events ----------
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  app.addEventListener('click', (e) => {
    const cz = e.target.closest('.cz');
    if (cz) { cz.classList.toggle('open'); return; }
    const el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    e.preventDefault();
    const d = el.dataset;
    switch (d.act) {
      case 'home': go({ view: 'home' }); break;
      case 'search': go({ view: 'search' }); break;
      case 'learn': openLearn(+d.unit); break;
      case 'learn-topic': { const u = unitOf(+d.unit); openLearn(+d.unit, u.cards.findIndex((c) => c.topicId === d.topic)); break; }
      case 'jump': gradeSeq++; Object.assign(S, { idx: +d.idx, tab: 'learn', answer: '', grade: null, grading: false }); render(); window.scrollTo(0, 0); break;
      case 'prev': learnMove(-1); break;
      case 'next': learnMove(1); break;
      case 'tab': setTab(d.tab); break;
      case 'grade': gradeLearn(); break;
      case 'retry': S.grade = null; S.answer = ''; render(); break;
      case 'override': { const card = learnCard(); recordGrade(card, null, +d.r); rec(card.id).n--; save(); render(); break; }
      case 'cloze': P.cloze = !P.cloze; save(); render(); break;
      case 'cloze-all': app.querySelectorAll('.cz').forEach((x) => x.classList.add('open')); break;
      case 'doubt': openDoubt(); break;
      case 'star': { const card = currentCard(); if (!card) break; const r = rec(card.id); r.star = !r.star; save(); render(); break; }
      case 'reset-unit': { const u = unitOf(+d.unit); if (resetCards(u.cards, `Unit ${u.unit}`)) { delete P.last[u.unit]; save(); S.view === 'learn' ? openLearn(u.unit, 0) : render(); } break; }
      case 'reset-topic': { const u = unitOf(+d.unit); const cs = u.cards.filter((c) => c.topicId === d.topic); if (resetCards(cs, `"${cs[0].topicTitle}"`)) render(); break; }
      case 'reset-all': if (resetCards(ALL, 'ALL units')) { P.last = {}; save(); render(); } break;
      case 'setup': openSetup({ units: [+d.unit] }); break;
      case 'test-all': openSetup(); break;
      case 'test-weak': openSetup({ filter: 'weak', count: 0 }); break;
      case 'test-star': openSetup({ filter: 'star', count: 0 }); break;
      case 'unit-toggle': {
        const n = +d.unit;
        S.units = S.units.includes(n) ? S.units.filter((x) => x !== n) : [...S.units, n].sort();
        render(); break;
      }
      case 'set': {
        if (d.k === 'count') S.count = +d.v;
        else if (d.k === 'topic') S.topic = d.v || null;
        else { S[d.k] = d.v; if (d.k === 'mode') { P.mode = d.v; save(); } }
        render(); break;
      }
      case 'start': { const p = shuffle(pool(S.units, S.filter, S.topic)); startTest(S.count ? p.slice(0, S.count) : p); break; }
      case 'check': check(); break;
      case 'rate': rate(+d.r); break;
      case 'end': gradeSeq++; if (S.results.length) go({ view: 'summary', results: S.results }); else go({ view: 'home' }); break;
      case 'retest': startTest(shuffle(S.results.filter((x) => x.r < 3).map((x) => BY_ID.get(x.id)))); break;
      case 'open-card': openCard(d.id); break;
    }
  });

  const printable = (e) => e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !e.isComposing;

  document.addEventListener('keydown', (e) => {
    if (!board.hidden) return; // the board handles its own keys
    // global shortcuts (work everywhere)
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK') { e.preventDefault(); go({ view: 'search' }); return; }
    if (e.altKey && e.code === 'KeyD') { e.preventDefault(); doubtOpen ? closeDoubt() : openDoubt(); return; }
    if (e.key === 'Escape' && doubtOpen) { closeDoubt(); return; }
    if (e.altKey && e.code === 'KeyL') { e.preventDefault(); V.theme = V.theme === 'dark' ? 'light' : 'dark'; saveView(); applyView(); return; }
    if (e.altKey && e.code === 'KeyP') { e.preventDefault(); V.sepia = !V.sepia; saveView(); applyView(); return; }
    if (e.altKey && e.code === 'KeyF') { e.preventDefault(); setFocus(!V.focus); return; }
    if (e.key === 'Escape' && (V.focus || Date.now() - fsExitAt < 400)) { if (V.focus) setFocus(false); return; }
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'textarea' || tag === 'input') return;
    if (doubtOpen && dEl.contains(e.target)) return;
    const k = e.key;

    if (S.view === 'learn') {
      if (e.altKey && e.code === 'KeyC' && S.tab === 'learn') { e.preventDefault(); P.cloze = !P.cloze; save(); render(); return; }
      if (e.altKey && e.code === 'KeyS') { e.preventDefault(); const r = rec(learnCard().id); r.star = !r.star; save(); render(); return; }
      if (k === 'Tab') { e.preventDefault(); setTab(S.tab === 'learn' ? 'test' : 'learn'); return; }
      if (k === 'ArrowRight') { e.preventDefault(); learnMove(1); return; }
      if (k === 'ArrowLeft') { e.preventDefault(); learnMove(-1); return; }
      if (k === 'Escape') { if (S.tab === 'test') setTab('learn'); else go({ view: 'home' }); return; }
      if (S.tab === 'learn' && printable(e)) { e.preventDefault(); openBoard(k === ' ' ? '' : k); return; }
      return;
    }
    if (S.view === 'test') {
      if (S.phase === 'ask' && S.mode === 'flip' && (k === ' ' || k === 'Enter')) { e.preventDefault(); check(); }
      else if (S.phase === 'review') {
        if (k === '1' || k === '2' || k === '3') { e.preventDefault(); rate(+k); }
        else if (k === 'Enter' && S.grade) { e.preventDefault(); rate(ratingOf(S.grade.score)); }
      }
      if (k === 'Escape') { gradeSeq++; if (S.results.length) go({ view: 'summary', results: S.results }); else go({ view: 'home' }); }
      return;
    }
    if (S.view === 'setup' && k === 'Enter') { app.querySelector('[data-act="start"]')?.click(); return; }
    if (k === 'Escape' && S.view !== 'home') go({ view: 'home' });
  });

  render();
  checkAI().then(() => { if (S.view === 'home') render(); else doubtSync(); });
})();
