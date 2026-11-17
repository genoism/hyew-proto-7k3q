/* Have You Ever Wondered — shared site chrome (header, search, mobile menu,
 * footer) and helpers. Every page includes this, so the header is the same
 * markup + CSS everywhere (the WordPress equivalent is header.php/footer.php).
 * Pages set <body data-base=""> (root) or data-base="../" (pages/). */
(function () {
  "use strict";
  var H = window.HYEW = window.HYEW || {};
  var body = document.body;
  var base = body.getAttribute("data-base") || "";
  H.base = base;

  /* ---------- helpers ---------- */
  var topicById = {};
  (H.topics || []).forEach(function (t) { topicById[t.id] = t; });
  H.topicById = topicById;
  H.topicName = function (id) { return topicById[id] ? topicById[id].en : id; };
  H.topicLabelList = function (ids) { return (ids || []).map(H.topicName).join(" · "); };
  H.esc = function (str) {
    return String(str == null ? "" : str).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  /* Whole-word matching: the query must start and end on a word edge
     (works for Hebrew too). "rav" matches "rav" and "Rav", not "gravy". */
  function reEsc(w) { return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  H.wordRe = function (q, flags) {
    var phrase = (q || "").trim().split(/\s+/).map(reEsc).join("\\s+");
    if (!phrase) return null;
    try { return new RegExp("(^|[^\\p{L}\\p{N}])(" + phrase + ")(?![\\p{L}\\p{N}])", "iu" + (flags || "")); }
    catch (e) { return null; }
  };
  H.plain = function (html) {
    html = (html || "").replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, "")
      .replace(/<\/(p|h\d|li|div|ul|ol|blockquote)>|<br\s*\/?>/gi, " ");
    var d = document.createElement("div"); d.innerHTML = html;
    return (d.textContent || "").replace(/\s+/g, " ").trim();
  };
  H.highlight = function (text, q) {
    var safe = H.esc(text);
    if (!q || !q.trim()) return safe;
    var re = H.wordRe(H.esc(q.trim()), "g");
    return re ? safe.replace(re, "$1<mark>$2</mark>") : safe;
  };
  /* A short excerpt around the first match, for results pages */
  H.snippet = function (text, q, len) {
    len = len || 170;
    var re = H.wordRe(q); if (!re) return "";
    var m = re.exec(text); if (!m) return "";
    var at = m.index + m[1].length;
    var start = Math.max(0, at - Math.floor(len / 2));
    if (start > 0) { var sp = text.indexOf(" ", start); if (sp !== -1 && sp < at) start = sp + 1; }
    var end = Math.min(text.length, start + len);
    if (end < text.length) { var sp2 = text.lastIndexOf(" ", end); if (sp2 > at) end = sp2; }
    return (start > 0 ? "… " : "") + H.highlight(text.slice(start, end), q) + (end < text.length ? " …" : "");
  };
  H.parsha = function (slug) { return (H.parshaBySlug || {})[slug] || { slug: slug, en: slug, he: "" }; };
  H.sheetById = function (id) { return (H.sheets || []).filter(function (s) { return s.id === String(id); })[0]; };
  H.sheetUrl = function (s) { return base + "sheet.html?id=" + encodeURIComponent(s.id); };
  H.parshaUrl = function (slug) { return base + "parsha.html?p=" + encodeURIComponent(slug); };
  H.topicUrl = function (id) { return base + "index.html?topic=" + encodeURIComponent(id); };
  H.qaUrl = function (id) { return base + "index.html?qa=" + encodeURIComponent(id); };
  var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  H.fmtDate = function (iso) {
    if (!iso) return "";
    var p = iso.split("-");
    return parseInt(p[2], 10) + " " + MONTHS[parseInt(p[1], 10) - 1] + " " + p[0];
  };
  /* Sheets newest first */
  H.sortedSheets = function () {
    return (H.sheets || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  };
  H.sheetText = function (s) { return s._text || (s._text = H.plain(H.sheetBody(s))); };
  H.searchItems = function (q) {
    var re = H.wordRe(q);
    if (!re) return { qa: [], sheets: [] };
    function hit(parts) { return re.test(parts.join(" \n ")); }
    return {
      qa: (H.qa || []).filter(function (it) {
        return hit([it.question, it.answer].concat((it.topics || []).map(H.topicName)));
      }),
      sheets: H.sortedSheets().filter(function (it) {
        var p = H.parsha(it.parsha);
        return hit([it.title, it.excerpt || "", H.sheetText(it), p.en, p.he, it.year, "No. " + it.number]
          .concat((it.topics || []).map(H.topicName)));
      })
    };
  };
  H.sheetMeta = function (s) { return "No. " + s.number + " · Parshas " + H.parsha(s.parsha).en + " " + s.year; };

  /* ---------- layout option (search position), shared across pages ---------- */
  var params = new URLSearchParams(location.search);
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var searchOpt = params.get("search") || store.get("hyew-search") || "below";
  if (searchOpt !== "header") searchOpt = "below";
  if (params.get("search")) store.set("hyew-search", searchOpt);
  H.setSearchOpt = function (v) {
    searchOpt = v === "header" ? "header" : "below";
    store.set("hyew-search", searchOpt);
    body.setAttribute("data-search", searchOpt);
  };
  H.getSearchOpt = function () { return searchOpt; };
  H.store = store;
  body.setAttribute("data-search", searchOpt);

  /* ---------- chrome markup ---------- */
  var cur = body.getAttribute("data-page") || "";
  function nav(href, label, key, cls) {
    return '<a href="' + base + href + '"' + (cls ? ' class="' + cls + '"' : "") +
      (cur === key ? ' aria-current="page"' : "") + ">" + label + "</a>";
  }
  var brand = '<a class="brand" href="' + base + 'index.html"><b>Have You Ever Wondered</b></a>';
  var headerHtml =
    '<a class="skip" href="#main">Skip to content</a>' +
    '<header class="site">' +
      '<button class="menu-btn sc" type="button" aria-controls="mobile-menu" aria-expanded="false" data-open-menu>Menu</button>' +
      '<nav class="nav-l sc" aria-label="Primary">' +
        nav("index.html", "Home", "home") + nav("pages/about.html", "About", "about") + nav("haskamos.html", "Haskamos", "haskamos") +
      "</nav>" + brand +
      '<div class="search search-in-header" data-search-root="header">' +
        '<form class="search-field" role="search" action="' + base + 'index.html">' +
          '<label class="vh" for="q-header">Search questions and parsha sheets</label>' +
          '<input id="q-header" type="search" name="q" placeholder="Search questions and parsha sheets…" autocomplete="off" aria-controls="drop-header">' +
          '<button type="submit" class="sc"><svg class="s-ic" viewBox="0 0 20 20" width="15" height="15" aria-hidden="true" focusable="false"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M13 13l5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span>Search</span></button>' +
        "</form>" +
        '<div class="search-drop" id="drop-header" hidden aria-label="Search suggestions"></div>' +
      "</div>" +
      '<nav class="nav-r sc" aria-label="Secondary">' +
        nav("parsha-sheets.html", "Parsha Sheets", "parsha-sheets") + nav("pages/ask.html", "Ask a Question", "ask") +
        nav("pages/donate.html", "Donate", "donate", "don") +
      "</nav>" +
    "</header>" +
    '<div class="search-band"><div class="wrap"><div class="search" data-search-root="below">' +
      '<p class="kicker sc">Search answers and parsha sheets</p>' +
      '<form class="search-field" role="search" action="' + base + 'index.html">' +
        '<label class="vh" for="q-below">Search questions and parsha sheets</label>' +
        '<input id="q-below" type="search" name="q" placeholder="Ask a word, a topic, a question…" autocomplete="off" aria-controls="drop-below">' +
        '<button type="submit" class="sc"><svg class="s-ic" viewBox="0 0 20 20" width="15" height="15" aria-hidden="true" focusable="false"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M13 13l5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span>Search</span></button>' +
      "</form>" +
      '<div class="search-drop" id="drop-below" hidden aria-label="Search suggestions"></div>' +
    "</div></div></div>";

  var menuHtml =
    '<div class="mobile-menu" id="mobile-menu" hidden>' +
      '<div class="mm-top">' + brand + '<button type="button" class="mm-close" data-close-menu>Close</button></div>' +
      '<nav aria-label="Mobile">' +
        nav("index.html", "Home", "home") + nav("parsha-sheets.html", "Parsha Sheets", "parsha-sheets") +
        nav("pages/about.html", "About", "about") + nav("haskamos.html", "Haskamos", "haskamos") +
        nav("pages/ask.html", "Ask a Question", "ask") + nav("pages/subscribe.html", "Subscribe", "subscribe") +
        nav("pages/donate.html", "Donate", "donate") + nav("pages/sponsor.html", "Sponsor the next HYEW", "sponsor") +
      "</nav>" +
    "</div>";

  var footerHtml =
    '<footer class="site sc">' +
      '<div><span class="foot-brand">Have You Ever Wondered</span><span class="foot-sub">A weekly halacha paper.</span></div>' +
      "<div>" + nav("index.html", "Home") + nav("pages/about.html", "About") + nav("haskamos.html", "Haskamos") + nav("parsha-sheets.html", "Parsha Sheets") + "</div>" +
      "<div>" + nav("pages/ask.html", "Ask a Question") + nav("pages/subscribe.html", "Subscribe") + nav("pages/donate.html", "Donate") + nav("pages/sponsor.html", "Sponsor the next HYEW") + "</div>" +
      '<div class="foot-ded"><p><span class="l">In the Zechus of a Refuah Shleima of my Rabbeim,</span><span class="l">Rav Shmuel Kamenetzky <i>shlita</i>,</span><span class="l" lang="he" dir="rtl">הגאון הרב שמואל בן איטא עטיל</span><span class="l">and Rav Moshe Heinemann <i>shlita</i>,</span><span class="l" lang="he" dir="rtl">הגאון הרב משה בן פנינה</span></p><p class="copy">© 2026 · HYEWhalacha.com</p></div>' +
    "</footer>";

  var hSlot = document.getElementById("site-header");
  if (hSlot) hSlot.outerHTML = headerHtml;
  var fSlot = document.getElementById("site-footer");
  if (fSlot) fSlot.outerHTML = footerHtml + menuHtml;
  else document.body.insertAdjacentHTML("beforeend", menuHtml);

  /* ---------- search ---------- */
  H.onSearchSubmit = null; /* homepage overrides to show results in-page */
  H.onOpenQa = null;       /* homepage overrides to open the Q&A modal */

  function hideDrops() {
    document.querySelectorAll(".search-drop").forEach(function (d) { d.hidden = true; d.innerHTML = ""; });
  }
  H.hideDrops = hideDrops;
  H.visibleSearchInput = function () {
    return document.getElementById(searchOpt === "header" ? "q-header" : "q-below");
  };
  H.syncSearchInputs = function (q) {
    ["q-header", "q-below"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.value !== q && document.activeElement !== el) el.value = q;
    });
  };

  function renderDrop(root, results, q) {
    var drop = root.querySelector(".search-drop");
    if (!drop) return;
    if (!q.trim()) { drop.hidden = true; drop.innerHTML = ""; return; }
    var html = "";
    if (!results.qa.length && !results.sheets.length) {
      html = '<p class="drop-empty">No questions or parsha sheets matched “' + H.esc(q) + '.” Try another word, or browse by topic.</p>';
    } else {
      if (results.qa.length) {
        html += '<div class="drop-group"><h3>Questions &amp; Answers</h3>';
        results.qa.slice(0, 5).forEach(function (it) {
          html += '<a class="drop-item" href="' + H.qaUrl(it.id) + '" data-open-qa="' + it.id + '">' +
            "<span>" + H.highlight(it.question, q) + '</span><span class="meta">' + H.esc(H.topicLabelList(it.topics)) + "</span></a>";
        });
        html += "</div>";
      }
      if (results.sheets.length) {
        html += '<div class="drop-group"><h3>Parsha Sheets</h3>';
        results.sheets.slice(0, 4).forEach(function (it) {
          html += '<a class="drop-item" href="' + H.sheetUrl(it) + '">' +
            "<span>" + H.highlight(it.title, q) + '</span><span class="meta">' + H.esc(H.sheetMeta(it)) + "</span></a>";
        });
        html += "</div>";
      }
      var total = results.qa.length + results.sheets.length;
      html += '<p class="drop-more"><button type="button" data-open-results>View all ' + total + " result" + (total === 1 ? "" : "s") + " →</button></p>";
    }
    drop.innerHTML = html;
    drop.hidden = false;
  }

  function submitSearch(q) {
    hideDrops();
    if (H.onSearchSubmit) { H.onSearchSubmit(q); return; }
    location.href = base + "index.html?q=" + encodeURIComponent(q.trim());
  }

  document.querySelectorAll("[data-search-root]").forEach(function (root) {
    var input = root.querySelector("input[type='search']");
    var form = root.querySelector("form");
    input.addEventListener("input", function () {
      var other = document.getElementById(input.id === "q-header" ? "q-below" : "q-header");
      if (other) other.value = input.value;
      renderDrop(root, H.searchItems(input.value), input.value);
    });
    input.addEventListener("focus", function () {
      if (input.value.trim()) renderDrop(root, H.searchItems(input.value), input.value);
    });
    form.addEventListener("submit", function (e) { e.preventDefault(); submitSearch(input.value); });
  });

  var mobileMenu = document.getElementById("mobile-menu");
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open-qa]");
    if (t && H.onOpenQa) { e.preventDefault(); hideDrops(); H.onOpenQa(t.getAttribute("data-open-qa")); return; }
    t = e.target.closest("[data-open-results]");
    if (t) { e.preventDefault(); submitSearch(H.visibleSearchInput().value); return; }
    t = e.target.closest("[data-open-menu]");
    if (t) { e.preventDefault(); mobileMenu.hidden = false; t.setAttribute("aria-expanded", "true"); return; }
    t = e.target.closest("[data-close-menu]");
    if (t) {
      e.preventDefault(); mobileMenu.hidden = true;
      var b = document.querySelector("[data-open-menu]"); if (b) b.setAttribute("aria-expanded", "false"); return;
    }
    if (!e.target.closest(".search")) hideDrops();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!mobileMenu.hidden) { mobileMenu.hidden = true; return; }
    hideDrops();
  });

  /* Topic chips markup, used by sheet pages and the homepage. */
  H.chips = function (ids, asButtons) {
    return (ids || []).map(function (tid) {
      var t = topicById[tid];
      if (!t) return "";
      var inner = H.esc(t.en) + ' <span lang="he" dir="rtl">' + H.esc(t.he) + "</span>";
      return asButtons
        ? '<button type="button" class="topic-chip" data-open-topic="' + t.id + '">' + inner + "</button>"
        : '<a class="topic-chip" href="' + H.topicUrl(t.id) + '">' + inner + "</a>";
    }).join("");
  };

  /* Placeholder body for sheets that only have an excerpt (sample data). */
  H.sheetBody = function (s) {
    if (s.body) return s.body;
    return '<p class="dc">' + H.esc(s.excerpt) + "</p>" +
      "<h3>Sample section (placeholder)</h3>" +
      "<p>The full paper will appear here once the Word document is converted. Each paper fits on one page: a short opening, the halachic discussion with its sources in footnotes, and a bottom line.<sup>1</sup> This sample paragraph stands in for that discussion and is not a psak.<sup>2</sup></p>" +
      '<p class="q">Q: A sample follow-up question would appear here.</p>' +
      "<p>A sample answer to the follow-up would appear here, with its own source.<sup>3</sup></p>" +
      '<div class="bl"><b>Bottom line</b><ul><li>Sample bottom-line point (placeholder).</li><li>Sample bottom-line point (placeholder).</li><li>Ask your rav for a personal ruling.</li></ul></div>' +
      '<div class="fn"><p><sup>1</sup>Source placeholder.</p><p><sup>2</sup>Source placeholder.</p><p><sup>3</sup>Source placeholder.</p></div>';
  };
  H.mastHtml = function (s, tag) {
    tag = tag || "h1";
    var p = H.parsha(s.parsha);
    return '<div class="mast"><div class="row sc"><span>No. ' + s.number + "</span><span lang=\"he\">בס״ד</span><span>Parshas " +
      H.esc(p.en) + " · " + H.esc(s.year) + '</span></div><div class="t">Have You Ever Wondered<span>…</span></div><div class="sub">HALACHA</div></div>' +
      "<" + tag + ' class="sheet-title" id="sheet-title">' + H.esc(s.title).replace(/\?$/, "<em>?</em>") + "</" + tag + ">";
  };
})();
