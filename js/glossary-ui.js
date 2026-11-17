/* HYEW glossary — finds transliterated terms in content areas (.gl-scope) and
 * shows a definition tooltip. Data + config: js/glossary.js.
 *
 * MATCHING RULES (applied identically to glossary terms/variants and to text):
 *  1. Exact: lowercase, apostrophes (' ’ ‘ ʼ) and hyphens removed. Any listed
 *     variant matches this way, at any length.
 *  2. Normalized key (fuzzy):  kh→ch; doubled letters collapsed (shabbos=shabos);
 *     ai/ay→ei; a final h after a vowel dropped (berachah=beracha); a final t→s,
 *     so -os/-ot, -is/-it, and s/t at the END of a word are equal.
 *  3. Vowel-dropped key (fuzzy): for normalized words longer than 4 letters, the
 *     inner a/e/o vowels are dropped (b(e)racha, ach(a)rona, brocha=bracha).
 *  Guards: fuzzy (2, 3) only if every word is >= minFuzzyLength (4) letters after
 *  normalization and no word is on the English stoplist; anything on the `never`
 *  list is never underlined. Phrases are matched longest-first (up to 6 words),
 *  separated only by spaces or hyphens. Headings, links, buttons, inputs, nav,
 *  footnote markers and the search are never scanned.
 */
(function () {
  "use strict";
  var H = window.HYEW = window.HYEW || {};
  var terms = H.glossaryTerms || [];
  var cfg = H.glossaryConfig || {};
  var MIN = cfg.minFuzzyLength || 4, MAXW = cfg.maxPhraseWords || 6;
  var never = {}, stop = {};
  (cfg.never || []).forEach(function (w) { never[w.toLowerCase()] = 1; });
  (cfg.stoplist || []).forEach(function (w) { stop[w.toLowerCase()] = 1; });

  var APOS = /['’‘ʼ`"]/g;
  function strip(w) { return w.toLowerCase().replace(APOS, "").replace(/-/g, ""); }
  function norm(w) {
    w = strip(w).replace(/kh/g, "ch").replace(/(.)\1+/g, "$1").replace(/ay|ai/g, "ei")
      .replace(/([aeiou])h$/, "$1").replace(/t$/, "s");
    return w.replace(/(.)\1+/g, "$1");
  }
  function skel(n) { return n.length > 4 ? n[0] + n.slice(1, -1).replace(/[ae]/g, "") + n[n.length - 1] : "=" + n; }
  H.glossNormalize = norm; H.glossSkeleton = skel;

  var exact = {}, n1 = {}, sk = {}, byId = {};
  function words(s) { return s.split(/[\s\u00A0\-–]+/).filter(Boolean); }
  terms.forEach(function (e) {
    byId[e.id] = e;
    [e.term].concat(e.variants || []).forEach(function (f) {
      var ws = words(f);
      var k0 = ws.map(strip).join(" "), k1 = ws.map(norm).join(" "), k2 = ws.map(function (w) { return skel(norm(w)); }).join(" ");
      if (!exact[k0]) exact[k0] = e;
      if (!n1[k1]) n1[k1] = e;
      if (!sk[k2]) sk[k2] = e;
    });
  });

  function lookup(toks) {
    var raw = toks.map(strip);
    if (never[raw.join(" ")]) return null;
    var e = exact[raw.join(" ")];
    if (e) return e;
    if (cfg.fuzzy === false) return null;
    var ns = toks.map(norm);
    for (var i = 0; i < ns.length; i++) if (ns[i].length < MIN || stop[raw[i]]) return null;
    return n1[ns.join(" ")] || sk[ns.map(skel).join(" ")] || null;
  }

  var SKIP = "a,button,input,textarea,select,h1,h3,h4,h5,h6,nav,sup,script,style,mark,dfn,.gl-tip,.search,label,.fn";
  var BLOCK = "p,li,blockquote,h2,.bl,td";
  var TOKEN = /[A-Za-z\u00C0-\u024F]+(?:['’‘ʼ][A-Za-z\u00C0-\u024F]+)*/g;
  var SEP = /^[\s\u00A0\-–]+$/;

  function scanRoot(root) {
    var seenScope = {};
    var blockSeen = new WeakMap();
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p || (p.closest(SKIP) && !(p.closest(SKIP) === root))) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var text = node.nodeValue, toks = [], m;
      TOKEN.lastIndex = 0;
      while ((m = TOKEN.exec(text))) toks.push({ s: m.index, e: m.index + m[0].length, w: m[0] });
      if (!toks.length) return;
      var block = node.parentElement.closest(BLOCK) || root;
      var seen = cfg.once === "scope" ? seenScope : (blockSeen.get(block) || {});
      blockSeen.set(block, seen);
      var hits = [];
      for (var i = 0; i < toks.length; i++) {
        for (var len = Math.min(MAXW, toks.length - i); len >= 1; len--) {
          var ok = true;
          for (var j = i + 1; j < i + len; j++) if (!SEP.test(text.slice(toks[j - 1].e, toks[j].s))) { ok = false; break; }
          if (!ok) continue;
          var e = lookup(toks.slice(i, i + len).map(function (t) { return t.w; }));
          if (e) {
            if (cfg.once === "all" || !seen[e.id]) { hits.push({ s: toks[i].s, e: toks[i + len - 1].e, entry: e }); seen[e.id] = 1; }
            i += len - 1; break;
          }
        }
      }
      if (!hits.length) return;
      var frag = document.createDocumentFragment(), pos = 0;
      hits.forEach(function (h) {
        if (h.s > pos) frag.appendChild(document.createTextNode(text.slice(pos, h.s)));
        var d = document.createElement("dfn");
        d.className = "gl"; d.tabIndex = 0; d.setAttribute("data-gl", h.entry.id);
        d.textContent = text.slice(h.s, h.e);
        frag.appendChild(d); pos = h.e;
      });
      if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
      node.parentNode.replaceChild(frag, node);
    });
  }
  function scan(el) {
    if (!el) return;
    var roots = el.classList && el.classList.contains("gl-scope") ? [el] : el.querySelectorAll(".gl-scope");
    Array.prototype.forEach.call(roots, scanRoot);
  }

  /* ---------- tooltip ---------- */
  var tip = document.createElement("div");
  tip.className = "gl-tip"; tip.id = "gl-tip"; tip.setAttribute("role", "tooltip"); tip.hidden = true;
  tip.innerHTML = '<div class="gl-he" lang="he" dir="rtl"></div><div class="gl-term"></div><p class="gl-def"></p><span class="gl-ar" aria-hidden="true"></span>';
  document.body.appendChild(tip);
  var cur = null, pinned = false, hideT = null;

  function place() {
    if (!cur) return;
    var r = cur.getClientRects()[0] || cur.getBoundingClientRect();
    var vw = document.documentElement.clientWidth, vh = window.innerHeight;
    tip.style.left = "0px"; tip.style.top = "0px";
    var w = tip.offsetWidth, h = tip.offsetHeight, gap = 10;
    var left = Math.max(8, Math.min(r.left + r.width / 2 - w / 2, vw - w - 8));
    var below = r.bottom + gap + h <= vh - 8 || r.top - gap - h < 8;
    var top = below ? r.bottom + gap : r.top - gap - h;
    tip.style.left = left + "px"; tip.style.top = top + "px";
    tip.classList.toggle("above", !below);
    tip.querySelector(".gl-ar").style.left = Math.max(14, Math.min(r.left + r.width / 2 - left, w - 14)) + "px";
  }
  function show(el, pin) {
    clearTimeout(hideT);
    if (cur && cur !== el) cur.removeAttribute("aria-describedby");
    var e = byId[el.getAttribute("data-gl")];
    if (!e) return;
    cur = el; pinned = !!pin;
    tip.querySelector(".gl-he").textContent = e.he;
    tip.querySelector(".gl-term").textContent = e.term;
    tip.querySelector(".gl-def").textContent = e.def;
    tip.hidden = false;
    el.setAttribute("aria-describedby", "gl-tip");
    el.classList.add("on");
    place();
  }
  function hide() {
    tip.hidden = true;
    if (cur) { cur.classList.remove("on"); cur.removeAttribute("aria-describedby"); }
    cur = null; pinned = false;
  }
  function later() { clearTimeout(hideT); hideT = setTimeout(function () { if (!pinned) hide(); }, 120); }

  document.addEventListener("mouseover", function (e) {
    var d = e.target.closest && e.target.closest("dfn.gl");
    if (d) { if (cur !== d || tip.hidden) show(d, false); else clearTimeout(hideT); }
    else if (e.target.closest && e.target.closest(".gl-tip")) clearTimeout(hideT);
  });
  document.addEventListener("mouseout", function (e) {
    if (e.target.closest && (e.target.closest("dfn.gl") || e.target.closest(".gl-tip"))) later();
  });
  document.addEventListener("focusin", function (e) { var d = e.target.closest && e.target.closest("dfn.gl"); if (d) show(d, false); });
  document.addEventListener("focusout", function (e) { if (e.target.closest && e.target.closest("dfn.gl") && !pinned) hide(); });
  document.addEventListener("click", function (e) {
    var d = e.target.closest("dfn.gl");
    if (d) { e.preventDefault(); if (cur === d && pinned) hide(); else show(d, true); return; }
    if (!e.target.closest(".gl-tip")) hide();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !tip.hidden) { e.stopPropagation(); hide(); return; }
    var d = e.target.closest && e.target.closest("dfn.gl");
    if (d && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); if (cur === d && pinned) hide(); else show(d, true); }
  }, true);
  window.addEventListener("scroll", place, { passive: true });
  window.addEventListener("resize", place);

  H.gloss = { scan: scan, lookup: lookup, hide: hide };
  scan(document);
})();
