// DSA Cram local server: serves the app and adds two AI endpoints that run through your Claude Code login.
//   node server.mjs            -> http://localhost:5180
// POST /api/grade  { q, a, answer }            -> { score, verdict, got[], missing[], wrong[], tip }
// POST /api/doubt  { card, page, messages[] }  -> text/event-stream of {t:'text'|'status'|'done'|'error', d}
// No dependencies. Needs the `claude` CLI (logged in). Listens on 127.0.0.1 only.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.DSA_PORT || 5180);
const GRADE_MODEL = process.env.DSA_GRADE_MODEL || 'sonnet';
const DOUBT_MODEL = process.env.DSA_DOUBT_MODEL || 'sonnet';

function findClaude() {
  if (process.env.CLAUDE_BIN && fs.existsSync(process.env.CLAUDE_BIN)) return process.env.CLAUDE_BIN;
  for (const c of [path.join(os.homedir(), '.local/bin/claude'), '/opt/homebrew/bin/claude', '/usr/local/bin/claude']) if (fs.existsSync(c)) return c;
  try { return execFileSync('which', ['claude']).toString().trim() || null; } catch { return null; }
}
const CLAUDE = findClaude();

// Flags that keep the CLI lean: no MCP servers, no skills, no user/project settings or hooks, no saved session.
const LEAN = ['--strict-mcp-config', '--disable-slash-commands', '--setting-sources', '', '--no-session-persistence'];

function runClaude(args, input, { onLine, timeoutMs = 120000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(CLAUDE, ['-p', ...args, ...LEAN], { cwd: os.tmpdir(), env: { ...process.env, CLAUDE_CODE_ENTRYPOINT: 'dsa-cram' } });
    let out = '', err = '', buf = '';
    const timer = setTimeout(() => { child.kill('SIGTERM'); reject(new Error('timed out')); }, timeoutMs);
    child.stdout.on('data', (d) => {
      const s = d.toString();
      out += s;
      if (onLine) {
        buf += s;
        let i;
        while ((i = buf.indexOf('\n')) >= 0) { const line = buf.slice(0, i); buf = buf.slice(i + 1); if (line.trim()) onLine(line); }
      }
    });
    child.stderr.on('data', (d) => { err += d.toString(); });
    child.on('error', (e) => { clearTimeout(timer); reject(e); });
    child.on('close', (code) => {
      clearTimeout(timer);
      if (code === 0) resolve(out);
      else reject(new Error((err || out).trim().slice(0, 400) || 'claude exited with ' + code));
    });
    child.stdin.end(input);
    resolve.child = child;
    runClaude.last = child;
  });
}

// ---------- grading ----------
const GRADE_SYSTEM = `You grade a student's from-memory answer for a university Data Structures & Algorithms exam (C++ syllabus) against the reference answer from their own notes.

Grade MEANING, not wording. Accept synonyms, paraphrase, a different order where order does not matter, abbreviations, informal language, different variable names, different but equivalent code (loop style, braces, names, i++ vs i=i+1), and equivalent notation (O(n^2) = O(n²), log n = lg n). Never deduct for missing filler, missing examples that only illustrate, or style.

Deduct for: essential points of the reference that are missing; statements that are factually wrong; algorithm steps that are wrong or in the wrong order where order matters; wrong complexities; code whose logic would not work.

score (0-100) = how much of the reference's essential content the student reproduced correctly, minus a fair penalty for errors. A complete, correct answer in different words is 90-100.

Reply with ONLY a JSON object, no prose, no code fence:
{"score": <int>, "verdict": "<one short sentence>", "got": ["<key point they got right>", ...], "missing": ["<essential point they left out>", ...], "wrong": ["<what they said> -> <correct version>", ...], "tip": "<one short memory hook for what they missed, or empty>"}
Keep every list item under 15 words. Empty lists are fine.`;

async function grade({ q, a, answer }) {
  if (!String(answer || '').trim()) return { score: 0, verdict: 'Left blank.', got: [], missing: ['Everything: nothing was written.'], wrong: [], tip: '' };
  const prompt = `QUESTION:\n${q}\n\nREFERENCE ANSWER (from the notes):\n${a}\n\nSTUDENT ANSWER (written from memory):\n${answer}`;
  const raw = await runClaude(['--model', GRADE_MODEL, '--tools', '', '--output-format', 'json', '--system-prompt', GRADE_SYSTEM], prompt, { timeoutMs: 90000 });
  const env = JSON.parse(raw);
  if (env.is_error) throw new Error(env.result || 'grading failed');
  const m = String(env.result || '').match(/\{[\s\S]*\}/);
  if (!m) throw new Error('grader returned no JSON');
  const g = JSON.parse(m[0]);
  const list = (x) => (Array.isArray(x) ? x.map(String).slice(0, 12) : []);
  return {
    score: Math.max(0, Math.min(100, Math.round(Number(g.score) || 0))),
    verdict: String(g.verdict || ''),
    got: list(g.got), missing: list(g.missing), wrong: list(g.wrong),
    tip: String(g.tip || ''),
  };
}

// ---------- doubt room ----------
const DOUBT_SYSTEM = `You are the "Doubt Room" tutor inside a DSA exam cram app. The student has their Data Structures & Algorithms (C++) end-semester exam tomorrow and is studying from their class notes.

The app tells you which study card is on screen (unit, topic, question and the answer from their notes). "This", "this card", "this algorithm" refer to it. Stay consistent with the notes' definitions and conventions; if a source on the web differs from the notes, say what the notes say and mention the difference briefly.

Explain simply and exam-focused: short paragraphs, bullet points, small examples, dry runs or ASCII sketches when they help, C++ when code is asked. Be concise first; go deeper only if asked.

You have WebSearch and WebFetch tools and they work. Use them when the question needs facts beyond the card, when you are unsure, and ALWAYS when the student asks for links, resources, videos, visualisers or anything online: search first and only give URLs that appeared in your search results, never links from memory. Cite the URLs you used at the end under "Sources:". Do not search for things the card already answers.`;

function doubtPrompt({ card, page, messages }) {
  let ctx = `SCREEN: ${page || 'unknown page'}\n`;
  if (card) {
    ctx += `CURRENT CARD: Unit ${card.unit}${card.unitTitle ? ' (' + card.unitTitle + ')' : ''} > ${card.topic}\nCard question: ${card.q}\nAnswer from the student's notes:\n${card.a}\n`;
    if (card.studentAnswer) ctx += `\nThe student's own attempt at this card:\n${card.studentAnswer}\n`;
    if (card.grade) ctx += `Grading feedback they got: ${card.grade}\n`;
  } else ctx += 'No specific card is open.\n';
  const convo = (messages || []).slice(-16).map((m) => `${m.role === 'user' ? 'STUDENT' : 'TUTOR'}: ${m.content}`).join('\n\n');
  return `${ctx}\n--- CONVERSATION ---\n${convo}\n\nReply as TUTOR to the student's last message.`;
}

const TOOL_STATUS = { WebSearch: 'Searching the web…', WebFetch: 'Reading a web page…' };

async function doubt(body, res, req) {
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
  const send = (t, d) => res.write(`data: ${JSON.stringify({ t, d })}\n\n`);
  let wroteText = false, needBreak = false;
  const p = runClaude(
    ['--model', DOUBT_MODEL, '--tools', 'WebSearch', 'WebFetch', '--allowedTools', 'WebSearch', 'WebFetch',
      '--output-format', 'stream-json', '--verbose', '--include-partial-messages', '--system-prompt', DOUBT_SYSTEM],
    doubtPrompt(body),
    {
      timeoutMs: 240000,
      onLine: (line) => {
        let ev; try { ev = JSON.parse(line); } catch { return; }
        if (ev.type !== 'stream_event') return;
        const e = ev.event;
        if (e.type === 'message_start' && wroteText) needBreak = true;
        if (e.type === 'content_block_start' && e.content_block?.type === 'tool_use') send('status', TOOL_STATUS[e.content_block.name] || 'Working…');
        if (e.type === 'content_block_start' && e.content_block?.type === 'server_tool_use') send('status', 'Searching the web…');
        if (e.type === 'content_block_delta' && e.delta?.type === 'text_delta') {
          if (needBreak) { send('text', '\n\n'); needBreak = false; }
          wroteText = true;
          send('text', e.delta.text);
        }
      },
    },
  );
  const child = runClaude.last;
  req.on('close', () => { if (child && child.exitCode == null) child.kill('SIGTERM'); });
  try { await p; send('done', ''); } catch (e) { send('error', e.message); }
  res.end();
}

// ---------- http ----------
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };

function readBody(req) {
  return new Promise((resolve, reject) => {
    let s = '';
    req.on('data', (d) => { s += d; if (s.length > 2e6) { reject(new Error('too large')); req.destroy(); } });
    req.on('end', () => { try { resolve(JSON.parse(s || '{}')); } catch (e) { reject(e); } });
  });
}
const json = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); };

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname === '/api/health') return json(res, 200, { ok: true, ai: !!CLAUDE });
    if (url.pathname === '/api/grade' && req.method === 'POST') {
      if (!CLAUDE) return json(res, 503, { error: 'claude CLI not found' });
      return json(res, 200, await grade(await readBody(req)));
    }
    if (url.pathname === '/api/doubt' && req.method === 'POST') {
      if (!CLAUDE) return json(res, 503, { error: 'claude CLI not found' });
      return await doubt(await readBody(req), res, req);
    }
    if (req.method !== 'GET') return json(res, 405, { error: 'method not allowed' });
    let rel = decodeURIComponent(url.pathname);
    if (rel === '/') rel = '/index.html';
    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(ROOT + path.sep) || path.basename(file).startsWith('.') || file.endsWith('.mjs')) return json(res, 404, { error: 'not found' });
    fs.readFile(file, (err, data) => {
      if (err) return json(res, 404, { error: 'not found' });
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(data);
    });
  } catch (e) {
    if (!res.headersSent) json(res, 500, { error: e.message });
    else res.end();
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`DSA Cram running at http://localhost:${PORT}`);
  console.log(CLAUDE ? `AI grading + Doubt Room: via your Claude login (${CLAUDE})` : 'claude CLI not found: AI grading and Doubt Room are off (keyword grading still works).');
});
