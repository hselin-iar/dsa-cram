/* DSA diagram renderer: turns small data specs into inline SVG/HTML strings.
   Works in the browser (window.DSA_DRAW) and in Node (module.exports) so specs can be checked headlessly.

   Spec types (every spec may carry `caption`):
   array  { cells:[v|null], index?:true|false|[labels], start?:0, hl?:[i], dim?:[i], ptr?:{i:'label'|['a','b']}, wrap?:bool, name? }
   list   { kind:'single'|'double'|'circular'|'circular-double', nodes:[v], head?:'head', ptr?:{i:'temp'}, hl?:[i] }
   stack  { items:[bottom..top], size?:n, hl?:[i] }
   tree   { root:{ v, c:[child|null, ...], note?, hl? }, general?:bool }   binary by default: c = [left, right]
   graph  { nodes:[{id,x,y,hl?}], edges:[[a,b,w?]], directed?:bool, hl?:[[a,b]] }   x,y on a small grid (0..8)
   matrix { rows:[labels], cols:[labels], cells:[[v]], hl?:[[r,c]] }
   hash   { slots:[v|null], chains?:{i:[v]}, links?:[[from,to]], hl?:[i], extra?:{title:'Chain', vals:[v]} }
   row    { items:[spec], arrow?:'→' }   side-by-side steps (before → after)
*/
(function (root) {
  'use strict';
  let uid = 0;
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const tw = (s, px = 15) => String(s ?? '').length * px * 0.6;

  function svg(w, h, body) {
    const id = 'dg' + (++uid);
    const defs = `<defs><marker id="${id}a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-head"/></marker>` +
      `<marker id="${id}h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-head hl"/></marker></defs>`;
    return `<svg class="dg-svg" viewBox="0 0 ${Math.ceil(w)} ${Math.ceil(h)}" width="${Math.ceil(w)}" height="${Math.ceil(h)}" role="img">${defs}${body.replace(/MARK\b/g, `url(#${id}a)`).replace(/MARKH\b/g, `url(#${id}h)`)}</svg>`;
  }
  const text = (x, y, s, cls = 'dg-t', anchor = 'middle') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}" dominant-baseline="central">${esc(s)}</text>`;
  const line = (x1, y1, x2, y2, cls = 'dg-l', arrow = true) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"${arrow ? ` marker-end="${cls.includes('hl') ? 'MARKH' : 'MARK'}"` : ''}/>`;
  const rect = (x, y, w, h, cls = 'dg-box') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" class="${cls}"/>`;
  const has = (arr, i) => Array.isArray(arr) && arr.includes(i);
  const ptrs = (p, i) => { const v = p && p[i]; return v == null ? [] : Array.isArray(v) ? v : [v]; };

  // ---------- array ----------
  function array(s) {
    const cells = s.cells || [];
    const cw = Math.max(44, ...cells.map((v) => tw(v) + 18));
    const ch = 40;
    const nameW = s.name ? tw(s.name, 14) + 14 : 0;
    const maxPtr = Math.max(0, ...cells.map((_, i) => ptrs(s.ptr, i).length));
    const top = maxPtr ? 30 + maxPtr * 16 : 8;
    const x0 = 10 + nameW;
    let b = '';
    if (s.name) b += text(x0 - 8, top + ch / 2, s.name, 'dg-t dg-name', 'end');
    cells.forEach((v, i) => {
      const x = x0 + i * cw;
      const cls = has(s.hl, i) ? 'dg-box hl' : has(s.dim, i) ? 'dg-box dim' : 'dg-box';
      b += rect(x, top, cw, ch, cls);
      if (v != null && v !== '') b += text(x + cw / 2, top + ch / 2, v, has(s.dim, i) ? 'dg-t dim' : 'dg-t');
      if (s.index !== false) {
        const lab = Array.isArray(s.index) ? s.index[i] : (s.start || 0) + i;
        b += text(x + cw / 2, top + ch + 12, lab, 'dg-idx');
      }
      const ps = ptrs(s.ptr, i);
      if (ps.length) {
        ps.forEach((p, k) => { b += text(x + cw / 2, top - 24 - (ps.length - 1 - k) * 16, p, 'dg-ptr'); });
        b += line(x + cw / 2, top - 15, x + cw / 2, top - 1, 'dg-l hl');
      }
    });
    let h = top + ch + (s.index !== false ? 22 : 8);
    if (s.wrap && cells.length > 1) {
      const xa = x0 + (cells.length - 0.5) * cw, xb = x0 + cw / 2, yb = h + 4;
      b += `<path d="M${xa},${top + ch + (s.index !== false ? 20 : 4)} C${xa},${yb + 22} ${xb},${yb + 22} ${xb},${top + ch + (s.index !== false ? 20 : 4)}" class="dg-l dg-curve" marker-end="MARK"/>`;
      b += text((xa + xb) / 2, yb + 22, 'wraps around', 'dg-idx');
      h += 34;
    }
    return svg(x0 + cells.length * cw + 10, h, b);
  }

  // ---------- linked list ----------
  function list(s) {
    const nodes = s.nodes || [];
    const kind = s.kind || 'single';
    const dbl = kind.includes('double');
    const circ = kind.includes('circular');
    const dw = Math.max(40, ...nodes.map((v) => tw(v) + 16));
    const pw = 22;
    const nw = dw + pw * (dbl ? 2 : 1);
    const gap = 42;
    const nh = 36;
    const labels = nodes.map((_, i) => [...(i === 0 && s.head !== false ? [s.head || 'head'] : []), ...ptrs(s.ptr, i)]);
    const maxL = Math.max(0, ...labels.map((l) => l.length));
    const top = (maxL ? 30 + maxL * 16 : 10) + (kind === 'circular-double' ? 14 : 0);
    const x0 = 14;
    let b = '';
    nodes.forEach((v, i) => {
      const x = x0 + i * (nw + gap);
      const cls = has(s.hl, i) ? 'dg-box hl' : 'dg-box';
      b += rect(x, top, nw, nh, cls);
      let dx = x;
      if (dbl) { b += `<line x1="${x + pw}" y1="${top}" x2="${x + pw}" y2="${top + nh}" class="dg-div"/>`; dx = x + pw; }
      b += text(dx + dw / 2, top + nh / 2, v);
      b += `<line x1="${dx + dw}" y1="${top}" x2="${dx + dw}" y2="${top + nh}" class="dg-div"/>`;
      const nx = dx + dw + pw / 2;
      const last = i === nodes.length - 1;
      if (!last) {
        b += `<circle cx="${nx}" cy="${top + (dbl ? nh / 3 : nh / 2)}" r="2.5" class="dg-dot"/>`;
        b += line(nx, top + (dbl ? nh / 3 : nh / 2), x + nw + gap, top + (dbl ? nh / 3 : nh / 2));
        if (dbl) {
          b += `<circle cx="${x + nw + gap + pw / 2}" cy="${top + (2 * nh) / 3}" r="2.5" class="dg-dot"/>`;
          b += line(x + nw + gap + pw / 2, top + (2 * nh) / 3, x + nw, top + (2 * nh) / 3);
        }
      } else if (!circ) {
        b += text(nx, top + nh / 2, '╳', 'dg-null');
      }
      if (dbl && i === 0 && !circ) b += text(x + pw / 2, top + nh / 2, '╳', 'dg-null');
      const lift = kind === 'circular-double' ? 14 : 0;
      labels[i].forEach((l, k) => { b += text(x + nw / 2, top - 24 - lift - (labels[i].length - 1 - k) * 16, l, 'dg-ptr'); });
      if (labels[i].length) b += line(x + nw / 2, top - 15 - lift, x + nw / 2, top - 1 - (lift ? 9 : 0), 'dg-l hl');
    });
    let h = top + nh + 14;
    const w = x0 + nodes.length * (nw + gap) - gap + 14;
    if (circ && nodes.length) {
      const lx = x0 + (nodes.length - 1) * (nw + gap) + nw - pw / 2;
      const fx = x0 + (dbl ? pw + dw / 2 : nw / 3);
      const yb = top + nh + 26;
      b += `<circle cx="${lx}" cy="${top + nh / 2}" r="2.5" class="dg-dot"/>`;
      b += `<path d="M${lx},${top + nh / 2} L${lx},${yb} L${fx},${yb} L${fx},${top + nh + 1}" class="dg-l dg-curve" marker-end="MARK"/>`;
      if (dbl) {
        const px = x0 + pw / 2, ly = x0 + (nodes.length - 1) * (nw + gap) + nw / 2;
        b += `<path d="M${px},${top} L${px},${top - 8} L${ly},${top - 8} L${ly},${top - 1}" class="dg-l dg-curve" marker-end="MARK"/>`;
      }
      h = yb + 10;
    }
    return svg(w, h, b);
  }

  // ---------- stack ----------
  function stack(s) {
    const items = s.items || [];
    const n = Math.max(items.length, s.size || 0, 1);
    const cw = Math.max(70, ...items.map((v) => tw(v) + 24));
    const ch = 32;
    const x0 = 40, y0 = 10;
    let b = '';
    for (let k = 0; k < n; k++) {
      const i = n - 1 - k; // draw top first
      const y = y0 + k * ch;
      const v = items[i];
      b += rect(x0, y, cw, ch, has(s.hl, i) ? 'dg-box hl' : v == null ? 'dg-box dim' : 'dg-box');
      if (v != null) b += text(x0 + cw / 2, y + ch / 2, v);
      b += text(x0 - 10, y + ch / 2, i, 'dg-idx', 'end');
    }
    if (items.length) {
      const ty = y0 + (n - items.length) * ch + ch / 2;
      b += line(x0 + cw + 46, ty, x0 + cw + 4, ty, 'dg-l hl');
      b += text(x0 + cw + 50, ty, 'top', 'dg-ptr', 'start');
    } else {
      b += text(x0 + cw + 10, y0 + n * ch - ch / 2, 'top = -1 (empty)', 'dg-ptr', 'start');
    }
    return svg(x0 + cw + (items.length ? 90 : 150), y0 + n * ch + 10, b);
  }

  // ---------- tree ----------
  function tree(s) {
    const R = 18, dx = 46, dy = 62;
    const nodes = [];
    let cursor = 0, maxD = 0;
    const general = !!s.general;
    function place(n, d) {
      if (!n) return null;
      maxD = Math.max(maxD, d);
      const me = { n, d, kids: [] };
      const c = n.c || [];
      if (!general) {
        const L = place(c[0], d + 1);
        me.x = cursor++;
        const Rn = place(c[1], d + 1);
        me.kids = [L, Rn].filter(Boolean);
      } else {
        const kids = c.map((k) => place(k, d + 1)).filter(Boolean);
        me.kids = kids;
        me.x = kids.length ? (kids[0].x + kids[kids.length - 1].x) / 2 : cursor++;
      }
      nodes.push(me);
      return me;
    }
    place(s.root, 0);
    const wide = Math.max(1, ...nodes.map((m) => tw(m.n.v, 14) + 10 > 2 * R ? (tw(m.n.v, 14) + 10) / (2 * R) : 1));
    const sx = dx * Math.min(wide, 1.8);
    const px = (m) => 30 + m.x * sx + (wide > 1 ? 10 : 0);
    const py = (m) => 26 + m.d * dy;
    let b = '';
    for (const m of nodes) for (const k of m.kids) {
      const x1 = px(m), y1 = py(m), x2 = px(k), y2 = py(k);
      const len = Math.hypot(x2 - x1, y2 - y1);
      const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
      b += line(x1 + ux * R, y1 + uy * R, x2 - ux * R, y2 - uy * R, k.n.hle ? 'dg-l hl' : 'dg-l', false);
    }
    for (const m of nodes) {
      const rw = Math.max(R, (tw(m.n.v, 14) + 10) / 2);
      b += rw > R
        ? `<rect x="${px(m) - rw}" y="${py(m) - R}" width="${2 * rw}" height="${2 * R}" rx="${R}" class="dg-node${m.n.hl ? ' hl' : ''}"/>`
        : `<circle cx="${px(m)}" cy="${py(m)}" r="${R}" class="dg-node${m.n.hl ? ' hl' : ''}"/>`;
      b += text(px(m), py(m), m.n.v, 'dg-t');
      if (m.n.note != null) b += text(px(m) + rw + 4, py(m) - R + 2, m.n.note, 'dg-note', 'start');
    }
    const w = Math.max(...nodes.map((m) => px(m))) + 60;
    return svg(Math.max(w, 80), 26 + maxD * dy + R + 14, b);
  }

  // ---------- graph ----------
  function graph(s) {
    const S = 78, R = 18, pad = 30;
    const pos = {};
    for (const n of s.nodes) pos[n.id] = { x: pad + n.x * S, y: pad + n.y * S, n };
    const hl = new Set((s.hl || []).map(([a, b]) => a + '|' + b));
    const isHl = (a, b) => hl.has(a + '|' + b) || (!s.directed && hl.has(b + '|' + a));
    const pairs = new Set(s.edges.map(([a, b]) => a + '|' + b));
    let b = '';
    for (const [a, c, w] of s.edges) {
      const A = pos[a], C = pos[c];
      if (!A || !C) continue;
      const cls = isHl(a, c) ? 'dg-l hl' : 'dg-l';
      if (a === c) { // self loop
        b += `<path d="M${A.x - 8},${A.y - R + 2} C${A.x - 30},${A.y - 62} ${A.x + 30},${A.y - 62} ${A.x + 8},${A.y - R + 2}" class="${cls} dg-curve"${s.directed ? ' marker-end="' + (cls.includes('hl') ? 'MARKH' : 'MARK') + '"' : ''}/>`;
        if (w != null) b += label(A.x, A.y - 50, w);
        continue;
      }
      const len = Math.hypot(C.x - A.x, C.y - A.y);
      const ux = (C.x - A.x) / len, uy = (C.y - A.y) / len;
      const both = s.directed && pairs.has(c + '|' + a);
      if (both) {
        const nx = -uy * 10, ny = ux * 10;
        const mx = (A.x + C.x) / 2 + nx * 2, my = (A.y + C.y) / 2 + ny * 2;
        b += `<path d="M${A.x + ux * R + nx * 0.6},${A.y + uy * R + ny * 0.6} Q${mx},${my} ${C.x - ux * R + nx * 0.6},${C.y - uy * R + ny * 0.6}" class="${cls} dg-curve" marker-end="${cls.includes('hl') ? 'MARKH' : 'MARK'}"/>`;
        if (w != null) b += label(mx, my, w);
        continue;
      }
      b += line(A.x + ux * R, A.y + uy * R, C.x - ux * (R + (s.directed ? 1 : 0)), C.y - uy * (R + (s.directed ? 1 : 0)), cls, !!s.directed);
      if (w != null) b += label((A.x + C.x) / 2, (A.y + C.y) / 2, w);
    }
    for (const id in pos) {
      const { x, y, n } = pos[id];
      b += `<circle cx="${x}" cy="${y}" r="${R}" class="dg-node${n.hl ? ' hl' : ''}"/>` + text(x, y, n.label ?? id);
      if (n.note != null) b += text(x + R + 3, y - R + 2, n.note, 'dg-note', 'start');
    }
    const xs = Object.values(pos).map((p) => p.x), ys = Object.values(pos).map((p) => p.y);
    return svg(Math.max(...xs) + pad + 20, Math.max(...ys) + pad, b);
    function label(x, y, w) {
      const ww = tw(w, 13) + 10;
      return `<rect x="${x - ww / 2}" y="${y - 9}" width="${ww}" height="18" rx="4" class="dg-wbg"/>` + text(x, y, w, 'dg-w');
    }
  }

  // ---------- matrix ----------
  function matrix(s) {
    const rows = s.rows || [], cols = s.cols || [];
    const cw = Math.max(34, ...cols.map((c) => tw(c) + 14), ...s.cells.flat().map((v) => tw(v) + 14));
    const ch = 30, hw = Math.max(30, ...rows.map((r) => tw(r) + 14));
    const hl = new Set((s.hl || []).map(([r, c]) => r + ',' + c));
    let b = '';
    cols.forEach((c, j) => { b += text(hw + j * cw + cw / 2, 14, c, 'dg-hdr'); });
    rows.forEach((r, i) => {
      b += text(hw - 8, 28 + i * ch + ch / 2, r, 'dg-hdr', 'end');
      (s.cells[i] || []).forEach((v, j) => {
        b += rect(hw + j * cw, 28 + i * ch, cw, ch, hl.has(i + ',' + j) ? 'dg-box hl' : 'dg-box');
        if (v != null) b += text(hw + j * cw + cw / 2, 28 + i * ch + ch / 2, v);
      });
    });
    return svg(hw + cols.length * cw + 10, 28 + rows.length * ch + 8, b);
  }

  // ---------- hash table ----------
  function hash(s) {
    const slots = s.slots || [];
    const ch = 30, iw = 34;
    const kw = Math.max(54, ...slots.map((v) => tw(v) + 18));
    const extra = s.extra;
    const ew = extra ? Math.max(54, tw(extra.title, 13) + 16, ...extra.vals.map((v) => tw(v) + 18)) : 0;
    const top = 26, x0 = 12;
    const chains = s.chains || {};
    const cnw = Math.max(40, ...Object.values(chains).flat().map((v) => tw(v) + 14)) + 20;
    let maxChain = 0;
    let b = text(x0 + iw / 2, 12, 'index', 'dg-hdr') + text(x0 + iw + kw / 2, 12, 'key', 'dg-hdr');
    if (extra) b += text(x0 + iw + kw + ew / 2, 12, extra.title, 'dg-hdr');
    slots.forEach((v, i) => {
      const y = top + i * ch;
      b += rect(x0, y, iw, ch, 'dg-box dim') + text(x0 + iw / 2, y + ch / 2, i, 'dg-idx');
      b += rect(x0 + iw, y, kw, ch, has(s.hl, i) ? 'dg-box hl' : 'dg-box');
      if (v != null && v !== '') b += text(x0 + iw + kw / 2, y + ch / 2, v);
      if (extra) { b += rect(x0 + iw + kw, y, ew, ch, 'dg-box'); if (extra.vals[i] != null) b += text(x0 + iw + kw + ew / 2, y + ch / 2, extra.vals[i]); }
      const chain = chains[i];
      if (chain && chain.length) {
        maxChain = Math.max(maxChain, chain.length);
        let px = x0 + iw + kw + ew;
        chain.forEach((cv) => {
          const nx = px + 22;
          b += line(px - (px === x0 + iw + kw + ew ? 8 : 0), y + ch / 2, nx, y + ch / 2);
          b += rect(nx, y + 3, cnw - 20, ch - 6, 'dg-box') + text(nx + (cnw - 20) / 2, y + ch / 2, cv);
          px = nx + cnw - 20;
        });
        b += text(px + 14, y + ch / 2, '╳', 'dg-null');
      }
    });
    const right = x0 + iw + kw + ew;
    (s.links || []).forEach(([f, t], k) => {
      const y1 = top + f * ch + ch / 2, y2 = top + t * ch + ch / 2;
      const bulge = right + 18 + (k % 3) * 12 + Math.min(40, Math.abs(t - f) * 4);
      b += `<path d="M${right},${y1} C${bulge},${y1} ${bulge},${y2} ${right + 2},${y2}" class="dg-l dg-curve hl" marker-end="MARKH"/>`;
    });
    const w = right + Math.max(maxChain * cnw + 30, (s.links || []).length ? 80 : 10);
    return svg(w, top + slots.length * ch + 8, b);
  }

  const RENDER = { array, list, stack, tree, graph, matrix, hash };

  function render(spec) {
    if (!spec) return '';
    if (spec.type === 'row') {
      const parts = spec.items.map((it) => `<figure class="dg-item">${render1(it)}${it.caption ? `<figcaption>${esc(it.caption)}</figcaption>` : ''}</figure>`);
      return `<div class="dg-row">${parts.join(`<span class="dg-arrow">${esc(spec.arrow || '→')}</span>`)}</div>`;
    }
    return render1(spec);
  }
  function render1(spec) {
    if (spec.type === 'row') return render(spec);
    const f = RENDER[spec.type];
    if (!f) throw new Error('Unknown diagram type: ' + spec.type);
    return f(spec);
  }
  function figure(spec) {
    const cap = spec.type !== 'row' ? spec.caption : spec.caption;
    return `<figure class="dg">${render(spec)}${cap ? `<figcaption>${esc(cap)}</figcaption>` : ''}</figure>`;
  }

  const api = { render, figure, types: Object.keys(RENDER).concat('row') };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DSA_DRAW = api;
})(typeof window !== 'undefined' ? window : globalThis);
