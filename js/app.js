/* Have You Ever Wondered — homepage prototype interactions. */
(function () {
  "use strict";

  var topics = (window.HYEW && HYEW.topics) || [];
  var qa = (window.HYEW && HYEW.qa) || [];
  var sheets = (window.HYEW && HYEW.sheets) || [];

  var topicById = {};
  topics.forEach(function (t) { topicById[t.id] = t; });

  var params = new URLSearchParams(window.location.search);
  var state = {
    search: params.get("search") === "header" ? "header" : "below",
    paper: params.get("paper") === "below" ? "below" : "rail",
    q: (params.get("q") || "").trim(),
    topic: params.get("topic") || "",
    qa: params.get("qa") || "",
    sheet: params.get("sheet") || ""
  };

  var homeView = document.getElementById("home-view");
  var resultsView = document.getElementById("results-view");
  var topicView = document.getElementById("topic-view");
  var qaModal = document.getElementById("qa-modal");
  var sheetModal = document.getElementById("sheet-modal");
  var mobileMenu = document.getElementById("mobile-menu");

  function topicName(id) {
    return topicById[id] ? topicById[id].en : id;
  }

  function topicLabelList(ids) {
    return (ids || []).map(topicName).join(" · ");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function highlight(text, q) {
    var safe = escapeHtml(text);
    if (!q) return safe;
    var words = q.trim().split(/\s+/).filter(function (w) { return w.length > 1; });
    if (!words.length) return safe;
    var pattern = words.map(function (w) {
      return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("|");
    try {
      return safe.replace(new RegExp("(" + pattern + ")", "gi"), "<mark>$1</mark>");
    } catch (e) {
      return safe;
    }
  }

  function searchItems(q) {
    var needle = q.trim().toLowerCase();
    if (!needle) return { qa: [], sheets: [] };
    function hay(parts) { return parts.join(" ").toLowerCase(); }
    var qHits = qa.filter(function (item) {
      var names = (item.topics || []).map(topicName);
      return hay([item.question, item.answer].concat(names)).indexOf(needle) !== -1;
    });
    var sHits = sheets.filter(function (item) {
      var names = (item.topics || []).map(topicName);
      return hay([item.title, item.excerpt || "", item.parsha || "", "No. " + item.number].concat(names)).indexOf(needle) !== -1;
    });
    return { qa: qHits, sheets: sHits };
  }

  function setUrl(extra) {
    extra = extra || {};
    var next = new URLSearchParams();
    next.set("search", state.search);
    next.set("paper", state.paper);
    var q = extra.q !== undefined ? extra.q : state.q;
    var topic = extra.topic !== undefined ? extra.topic : state.topic;
    var qaId = extra.qa !== undefined ? extra.qa : state.qa;
    var sheetId = extra.sheet !== undefined ? extra.sheet : state.sheet;
    if (q) next.set("q", q); else next.delete("q");
    if (topic) next.set("topic", topic); else next.delete("topic");
    if (qaId) next.set("qa", qaId); else next.delete("qa");
    if (sheetId) next.set("sheet", sheetId); else next.delete("sheet");
    var qs = next.toString();
    var url = qs ? (window.location.pathname + "?" + qs) : window.location.pathname;
    window.history.replaceState({}, "", url);
    state.q = q || "";
    state.topic = topic || "";
    state.qa = qaId || "";
    state.sheet = sheetId || "";
  }

  function applyLayout() {
    document.body.setAttribute("data-search", state.search);
    document.body.setAttribute("data-paper", state.paper);
    var sHeader = document.querySelector('input[name="opt-search"][value="header"]');
    var sBelow = document.querySelector('input[name="opt-search"][value="below"]');
    var pRail = document.querySelector('input[name="opt-paper"][value="rail"]');
    var pBelow = document.querySelector('input[name="opt-paper"][value="below"]');
    if (sHeader) sHeader.checked = state.search === "header";
    if (sBelow) sBelow.checked = state.search === "below";
    if (pRail) pRail.checked = state.paper === "rail";
    if (pBelow) pBelow.checked = state.paper === "below";
    setUrl();
    syncSearchInputs();
  }

  function visibleSearchInput() {
    return state.search === "header"
      ? document.getElementById("q-header")
      : document.getElementById("q-below");
  }

  function syncSearchInputs() {
    ["q-header", "q-below"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.value !== state.q && document.activeElement !== el) el.value = state.q;
    });
  }

  function hideDrops() {
    document.querySelectorAll(".search-drop").forEach(function (d) {
      d.hidden = true;
      d.innerHTML = "";
    });
  }

  function renderDrop(root, results, q) {
    var drop = root.querySelector(".search-drop");
    if (!drop) return;
    if (!q.trim()) { drop.hidden = true; drop.innerHTML = ""; return; }
    var html = "";
    if (!results.qa.length && !results.sheets.length) {
      html = '<p class="drop-empty">No questions or papers matched “' + escapeHtml(q) + '.” Try another word, or browse by topic.</p>';
    } else {
      if (results.qa.length) {
        html += '<div class="drop-group"><h3>Questions &amp; Answers</h3>';
        results.qa.slice(0, 5).forEach(function (item) {
          html += '<button type="button" class="drop-item" data-open-qa="' + item.id + '">' +
            '<span>' + highlight(item.question, q) + '</span>' +
            '<span class="meta">' + escapeHtml(topicLabelList(item.topics)) + '</span></button>';
        });
        html += "</div>";
      }
      if (results.sheets.length) {
        html += '<div class="drop-group"><h3>Parsha Sheets</h3>';
        results.sheets.slice(0, 4).forEach(function (item) {
          html += '<button type="button" class="drop-item" data-open-sheet="' + item.id + '">' +
            '<span>' + highlight(item.title, q) + '</span>' +
            '<span class="meta">No. ' + item.number + ' · ' + escapeHtml(item.parsha) + '</span></button>';
        });
        html += "</div>";
      }
      var total = results.qa.length + results.sheets.length;
      html += '<p class="drop-more"><button type="button" data-open-results>View all ' + total + ' result' + (total === 1 ? "" : "s") + ' →</button></p>';
    }
    drop.innerHTML = html;
    drop.hidden = false;
  }

  function showHome() {
    homeView.hidden = false;
    resultsView.hidden = true;
    topicView.hidden = true;
    hideDrops();
    setUrl({ q: "", topic: "", qa: state.qa, sheet: state.sheet });
    window.scrollTo(0, 0);
  }

  function showResults(q) {
    q = (q || "").trim();
    state.q = q;
    syncSearchInputs();
    homeView.hidden = true;
    topicView.hidden = true;
    resultsView.hidden = false;
    hideDrops();
    setUrl({ q: q, topic: "", qa: "", sheet: "" });
    var sub = document.getElementById("results-sub");
    var body = document.getElementById("results-body");
    if (!q) {
      sub.textContent = "Type a word to search questions and weekly papers.";
      body.innerHTML = "";
      return;
    }
    var results = searchItems(q);
    var total = results.qa.length + results.sheets.length;
    sub.textContent = total
      ? total + " result" + (total === 1 ? "" : "s") + " for “" + q + ".”"
      : "No questions or papers matched “" + q + ".”";
    if (!total) {
      body.innerHTML = '<p class="empty">Try another word, or <button type="button" class="u" data-go-home style="background:none;border:0;padding:0;color:var(--red);font:inherit">browse by topic</button>.</p>';
      return;
    }
    body.innerHTML = renderGrouped(results, q);
    window.scrollTo(0, 0);
  }

  function renderGrouped(results, q) {
    var html = "";
    html += '<section class="result-group"><h2>Questions &amp; Answers</h2>';
    if (!results.qa.length) {
      html += '<p class="empty">No matching questions.</p>';
    } else {
      html += '<ul class="result-list">';
      results.qa.forEach(function (item) {
        html += '<li><button type="button" data-open-qa="' + item.id + '">' +
          '<span class="q">' + highlight(item.question, q) + '</span>' +
          '<span class="meta">' + escapeHtml(topicLabelList(item.topics)) + '</span></button></li>';
      });
      html += "</ul>";
    }
    html += '</section><section class="result-group"><h2>Parsha Sheets</h2>';
    if (!results.sheets.length) {
      html += '<p class="empty">No matching weekly papers.</p>';
    } else {
      html += '<ul class="result-list">';
      results.sheets.forEach(function (item) {
        html += '<li><button type="button" data-open-sheet="' + item.id + '">' +
          '<span class="t">' + highlight(item.title, q) + '</span>' +
          '<span class="meta">No. ' + item.number + ' · Parshas ' + escapeHtml(item.parsha) + ' · ' + escapeHtml(topicLabelList(item.topics)) + '</span></button></li>';
      });
      html += "</ul>";
    }
    html += "</section>";
    return html;
  }

  function showTopic(id) {
    var t = topicById[id];
    if (!t) return;
    closeModals();
    homeView.hidden = true;
    resultsView.hidden = true;
    topicView.hidden = false;
    hideDrops();
    setUrl({ topic: id, q: "", qa: "", sheet: "" });
    var title = document.getElementById("topic-title");
    title.innerHTML = escapeHtml(t.en) + ' <span class="he" lang="he">' + escapeHtml(t.he) + "</span>";
    var tQa = qa.filter(function (item) { return (item.topics || []).indexOf(id) !== -1; });
    var tSheets = sheets.filter(function (item) { return (item.topics || []).indexOf(id) !== -1; });
    document.getElementById("topic-body").innerHTML = renderGrouped({ qa: tQa, sheets: tSheets }, "");
    window.scrollTo(0, 0);
  }

  function openQa(id) {
    var item = qa.filter(function (x) { return x.id === id; })[0];
    if (!item) return;
    document.getElementById("qa-question").textContent = item.question;
    document.getElementById("qa-answer").textContent = item.answer;
    var chips = document.getElementById("qa-chips");
    chips.innerHTML = (item.topics || []).map(function (tid) {
      var t = topicById[tid];
      if (!t) return "";
      return '<button type="button" class="topic-chip" data-open-topic="' + t.id + '">' +
        escapeHtml(t.en) + ' <span lang="he">' + escapeHtml(t.he) + "</span></button>";
    }).join("");
    qaModal.hidden = false;
    document.body.classList.add("modal-open");
    state.qa = id;
    setUrl({ qa: id });
    var heading = document.getElementById("qa-question");
    if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus(); }
  }

  function featuredCopy() {
    return document.querySelector("#featured-paper .cols")
      ? document.querySelector("#featured-paper .cols").innerHTML
      : "";
  }

  function openSheet(id) {
    var item = sheets.filter(function (x) { return x.id === id; })[0];
    if (!item) return;
    var chips = document.getElementById("sheet-chips");
    chips.innerHTML = (item.topics || []).map(function (tid) {
      var t = topicById[tid];
      if (!t) return "";
      return '<button type="button" class="topic-chip" data-open-topic="' + t.id + '">' +
        escapeHtml(t.en) + ' <span lang="he">' + escapeHtml(t.he) + "</span></button>";
    }).join("");
    var body = document.getElementById("sheet-body");
    var isFeatured = item.featured || item.id === "sheet-47";
    var excerptHtml = isFeatured
      ? featuredCopy()
      : '<p>' + escapeHtml(item.excerpt) + "</p><p class=\"disclaimer\" style=\"margin-top:16px\">Sample excerpt (placeholder). The full weekly paper will appear here.</p>";
    body.innerHTML =
      '<div class="mast"><div class="row sc"><span>No. ' + item.number + "</span><span>בס״ד</span><span>Parshas " +
      escapeHtml(item.parsha) + " · " + escapeHtml(item.year || "") + '</span></div>' +
      '<div class="t">Have You Ever Wondered<span>…</span></div><div class="sub">HALACHA</div></div>' +
      '<h2 id="sheet-title">' + escapeHtml(item.title) + "</h2>" +
      '<div class="byline sc">' + escapeHtml(topicLabelList(item.topics)) + " · " + escapeHtml(item.date || "") + "</div>" +
      '<div class="cols">' + excerptHtml + "</div>";
    sheetModal.hidden = false;
    document.body.classList.add("modal-open");
    state.sheet = id;
    setUrl({ sheet: id });
    var heading = document.getElementById("sheet-title");
    if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus(); }
  }

  function closeModals() {
    qaModal.hidden = true;
    sheetModal.hidden = true;
    document.body.classList.remove("modal-open");
    if (state.qa || state.sheet) setUrl({ qa: "", sheet: "" });
  }

  function renderTopics() {
    var grid = document.getElementById("topics-grid");
    var groups = (window.HYEW && HYEW.topicGroups) || [];
    function item(t) {
      return '<li><button type="button" class="topic" data-open-topic="' + t.id + '">' +
        '<span class="tx"><span class="en">' + escapeHtml(t.en) + "</span>" +
        '<span class="he" lang="he" dir="rtl">' + escapeHtml(t.he) + "</span></span>" +
        '<span class="ar" aria-hidden="true">→</span></button></li>';
    }
    var used = {};
    var html = groups.map(function (g) {
      var list = topics.filter(function (t) { return t.group === g.id; });
      list.forEach(function (t) { used[t.id] = true; });
      if (!list.length) return "";
      return '<section class="tgroup" aria-labelledby="tg-' + g.id + '">' +
        '<h2 class="tg-h sc" id="tg-' + g.id + '">' + escapeHtml(g.en) + "</h2>" +
        "<ul>" + list.map(item).join("") + "</ul></section>";
    }).join("");
    /* Any topic without a group (e.g. newly added) lands in a final "More" group. */
    var rest = topics.filter(function (t) { return !used[t.id]; });
    if (rest.length) {
      html += '<section class="tgroup" aria-labelledby="tg-more"><h2 class="tg-h sc" id="tg-more">More topics</h2>' +
        "<ul>" + rest.map(item).join("") + "</ul></section>";
    }
    grid.innerHTML = html;
  }

  function renderPastWeeks() {
    var list = document.getElementById("past-weeks");
    var past = sheets.filter(function (s) { return !s.featured; });
    list.innerHTML = past.map(function (s) {
      return '<li><span class="w sc">No. ' + s.number + " · " + escapeHtml(s.parsha) + "</span>" +
        '<button type="button" data-open-sheet="' + s.id + '">' + escapeHtml(s.title) + "</button></li>";
    }).join("");
  }

  /* Events — delegated where lists are rendered later. */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open-topic]");
    if (t) { e.preventDefault(); showTopic(t.getAttribute("data-open-topic")); return; }
    t = e.target.closest("[data-open-qa]");
    if (t) { e.preventDefault(); hideDrops(); openQa(t.getAttribute("data-open-qa")); return; }
    t = e.target.closest("[data-open-sheet]");
    if (t) { e.preventDefault(); hideDrops(); openSheet(t.getAttribute("data-open-sheet")); return; }
    t = e.target.closest("[data-open-results]");
    if (t) { e.preventDefault(); showResults(visibleSearchInput().value); return; }
    t = e.target.closest("[data-go-home]");
    if (t) { e.preventDefault(); showHome(); return; }
    t = e.target.closest("[data-close-modal]");
    if (t) { e.preventDefault(); closeModals(); return; }
    t = e.target.closest("[data-open-menu]");
    if (t) { e.preventDefault(); mobileMenu.hidden = false; t.setAttribute("aria-expanded", "true"); return; }
    t = e.target.closest("[data-close-menu]");
    if (t) { e.preventDefault(); mobileMenu.hidden = true; var b = document.querySelector("[data-open-menu]"); if (b) b.setAttribute("aria-expanded", "false"); return; }
    if (e.target.classList.contains("modal-back")) { closeModals(); return; }
    if (!e.target.closest(".search")) hideDrops();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!qaModal.hidden || !sheetModal.hidden) { closeModals(); return; }
      if (!mobileMenu.hidden) { mobileMenu.hidden = true; return; }
      hideDrops();
    }
  });

  document.querySelectorAll("[data-search-root]").forEach(function (root) {
    var input = root.querySelector("input[type='search']");
    var form = root.querySelector("form");
    input.addEventListener("input", function () {
      state.q = input.value;
      var other = input.id === "q-header" ? document.getElementById("q-below") : document.getElementById("q-header");
      if (other) other.value = input.value;
      renderDrop(root, searchItems(input.value), input.value);
    });
    input.addEventListener("focus", function () {
      if (input.value.trim()) renderDrop(root, searchItems(input.value), input.value);
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showResults(input.value);
    });
  });

  document.querySelectorAll('input[name="opt-search"]').forEach(function (el) {
    el.addEventListener("change", function () {
      state.search = el.value;
      applyLayout();
    });
  });
  document.querySelectorAll('input[name="opt-paper"]').forEach(function (el) {
    el.addEventListener("change", function () {
      state.paper = el.value;
      applyLayout();
    });
  });

  var proto = document.getElementById("proto");
  var protoTog = document.getElementById("proto-tog");
  protoTog.addEventListener("click", function () {
    var min = proto.classList.toggle("is-min");
    protoTog.textContent = min ? "Show" : "Hide";
    protoTog.setAttribute("aria-expanded", min ? "false" : "true");
  });
  if (window.matchMedia("(max-width: 900px)").matches) {
    proto.classList.add("is-min");
    protoTog.textContent = "Show";
    protoTog.setAttribute("aria-expanded", "false");
  }

  document.getElementById("sub-form").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("sub-note").textContent = "Thank you — this is a prototype, so no email was stored.";
  });

  document.getElementById("donate-chips").addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (!btn) return;
    document.querySelectorAll("#donate-chips button").forEach(function (b) { b.classList.remove("on"); });
    btn.classList.add("on");
  });

  /* Home hash should restore the homepage even if a view was open. */
  window.addEventListener("hashchange", function () {
    if (location.hash === "#topics" || location.hash === "") showHome();
  });

  renderTopics();
  renderPastWeeks();
  applyLayout();

  if (state.q && !state.topic) showResults(state.q);
  else if (state.topic) showTopic(state.topic);
  if (state.qa) openQa(state.qa);
  if (state.sheet) openSheet(state.sheet);
})();
