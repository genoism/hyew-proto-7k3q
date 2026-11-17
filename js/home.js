/* Have You Ever Wondered — homepage interactions (front-page.php). */
(function () {
  "use strict";
  var H = window.HYEW;
  var qa = H.qa || [];
  var topicById = H.topicById;
  var esc = H.esc;

  var params = new URLSearchParams(location.search);
  var paperOpt = params.get("paper") || H.store.get("hyew-paper") || "rail";
  if (paperOpt !== "below") paperOpt = "rail";
  var state = {
    q: (params.get("q") || "").trim(),
    topic: params.get("topic") || "",
    qa: params.get("qa") || ""
  };

  var homeView = document.getElementById("home-view");
  var resultsView = document.getElementById("results-view");
  var topicView = document.getElementById("topic-view");
  var qaModal = document.getElementById("qa-modal");

  function setUrl() {
    var next = new URLSearchParams();
    next.set("search", H.getSearchOpt());
    next.set("paper", paperOpt);
    if (state.q) next.set("q", state.q);
    if (state.topic) next.set("topic", state.topic);
    if (state.qa) next.set("qa", state.qa);
    history.replaceState({}, "", location.pathname + "?" + next.toString() + location.hash);
  }

  function applyLayout() {
    document.body.setAttribute("data-paper", paperOpt);
    H.store.set("hyew-paper", paperOpt);
    document.querySelectorAll('input[name="opt-search"]').forEach(function (el) { el.checked = el.value === H.getSearchOpt(); });
    document.querySelectorAll('input[name="opt-paper"]').forEach(function (el) { el.checked = el.value === paperOpt; });
    setUrl();
    H.syncSearchInputs(state.q);
  }

  function showHome() {
    homeView.hidden = false; resultsView.hidden = true; topicView.hidden = true;
    H.hideDrops();
    state.q = ""; state.topic = "";
    setUrl();
    window.scrollTo(0, 0);
  }

  function renderGrouped(results, q) {
    var html = '<section class="result-group"><h2>Questions &amp; Answers</h2>';
    if (!results.qa.length) html += '<p class="empty">No matching questions.</p>';
    else {
      html += '<ul class="result-list">';
      results.qa.forEach(function (it) {
        html += '<li><a href="' + H.qaUrl(it.id) + '" data-open-qa="' + it.id + '"><span class="q">' + H.highlight(it.question, q) +
          '</span><span class="meta">' + esc(H.topicLabelList(it.topics)) + "</span></a></li>";
      });
      html += "</ul>";
    }
    html += '</section><section class="result-group"><h2>Parsha Sheets</h2>';
    if (!results.sheets.length) html += '<p class="empty">No matching parsha sheets.</p>';
    else {
      html += '<ul class="result-list">';
      results.sheets.forEach(function (it) {
        html += '<li><a href="' + H.sheetUrl(it) + '"><span class="t">' + H.highlight(it.title, q) +
          '</span><span class="meta">' + esc(H.sheetMeta(it)) + " · " + esc(H.topicLabelList(it.topics)) + "</span></a></li>";
      });
      html += "</ul>";
    }
    return html + "</section>";
  }

  function showResults(q) {
    q = (q || "").trim();
    state.q = q; state.topic = "";
    H.syncSearchInputs(q);
    homeView.hidden = true; topicView.hidden = true; resultsView.hidden = false;
    H.hideDrops();
    setUrl();
    var sub = document.getElementById("results-sub");
    var bodyEl = document.getElementById("results-body");
    if (!q) { sub.textContent = "Type a word to search questions and parsha sheets."; bodyEl.innerHTML = ""; return; }
    var results = H.searchItems(q);
    var total = results.qa.length + results.sheets.length;
    sub.textContent = total ? total + " result" + (total === 1 ? "" : "s") + " for “" + q + ".”" : "No questions or parsha sheets matched “" + q + ".”";
    bodyEl.innerHTML = total ? renderGrouped(results, q)
      : '<p class="empty">Try another word, or <button type="button" class="u linkish" data-go-home>browse by topic</button>.</p>';
    window.scrollTo(0, 0);
  }

  function showTopic(id) {
    var t = topicById[id];
    if (!t) return;
    closeModal();
    homeView.hidden = true; resultsView.hidden = true; topicView.hidden = false;
    H.hideDrops();
    state.topic = id; state.q = "";
    setUrl();
    document.getElementById("topic-title").innerHTML = esc(t.en) + ' <span class="he" lang="he" dir="rtl">' + esc(t.he) + "</span>";
    var tQa = qa.filter(function (it) { return (it.topics || []).indexOf(id) !== -1; });
    var tSheets = H.sortedSheets().filter(function (it) { return (it.topics || []).indexOf(id) !== -1; });
    document.getElementById("topic-body").innerHTML = renderGrouped({ qa: tQa, sheets: tSheets }, "");
    window.scrollTo(0, 0);
  }

  function openQa(id) {
    var it = qa.filter(function (x) { return x.id === id; })[0];
    if (!it) return;
    document.getElementById("qa-question").textContent = it.question;
    var ans = document.getElementById("qa-answer");
    ans.textContent = it.answer;
    document.getElementById("qa-chips").innerHTML = H.chips(it.topics, true);
    qaModal.hidden = false;
    document.body.classList.add("modal-open");
    state.qa = id;
    setUrl();
    if (H.gloss) { H.gloss.scan(document.getElementById("qa-question")); H.gloss.scan(ans); }
    var heading = document.getElementById("qa-question");
    heading.setAttribute("tabindex", "-1"); heading.focus();
  }

  function closeModal() {
    if (qaModal.hidden) return;
    qaModal.hidden = true;
    document.body.classList.remove("modal-open");
    state.qa = "";
    setUrl();
  }

  function renderTopics() {
    var groups = H.topicGroups || [];
    function item(t) {
      return '<li><a class="topic" href="' + H.topicUrl(t.id) + '" data-open-topic="' + t.id + '">' +
        '<span class="tx"><span class="en">' + esc(t.en) + "</span>" +
        '<span class="he" lang="he" dir="rtl">' + esc(t.he) + "</span></span>" +
        '<span class="ar" aria-hidden="true">→</span></a></li>';
    }
    var used = {};
    var html = groups.map(function (g) {
      var list = (H.topics || []).filter(function (t) { return t.group === g.id; });
      list.forEach(function (t) { used[t.id] = true; });
      if (!list.length) return "";
      return '<section class="tgroup" aria-labelledby="tg-' + g.id + '"><h2 class="tg-h sc" id="tg-' + g.id + '">' + esc(g.en) + "</h2><ul>" + list.map(item).join("") + "</ul></section>";
    }).join("");
    var rest = (H.topics || []).filter(function (t) { return !used[t.id]; });
    if (rest.length) html += '<section class="tgroup"><h2 class="tg-h sc">More topics</h2><ul>' + rest.map(item).join("") + "</ul></section>";
    document.getElementById("topics-grid").innerHTML = html;
  }

  function renderFeatured() {
    var all = H.sortedSheets();
    var f = all.filter(function (s) { return s.featured; })[0] || all[0];
    var p = H.parsha(f.parsha);
    document.getElementById("featured-paper").innerHTML =
      H.mastHtml(f, "h2") +
      '<div class="byline sc">' + esc(H.topicLabelList(f.topics)) + " · Shabbos Parshas " + esc(p.en) + " · " + esc(H.fmtDate(f.date)) + "</div>" +
      (f.sponsored ? '<div class="spline">' + esc(f.sponsored) + ' · <a class="u" href="pages/sponsor.html">Sponsor the next one</a></div>' : "") +
      '<div class="cols gl-scope">' + H.sheetBody(f) + "</div>" +
      '<div class="fade"><a class="sc" href="' + H.sheetUrl(f) + '">Read the full paper →</a></div>';
    var past = all.filter(function (s) { return s !== f; }).slice(0, 5);
    document.getElementById("past-weeks").innerHTML = past.map(function (s) {
      return '<li><span class="w sc">No. ' + s.number + " · " + esc(H.parsha(s.parsha).en) + " " + s.year + "</span>" +
        '<a href="' + H.sheetUrl(s) + '">' + esc(s.title) + "</a></li>";
    }).join("") + '<li class="all"><a class="u sc" href="parsha-sheets.html">All parsha sheets →</a></li>';
  }

  H.onSearchSubmit = showResults;
  H.onOpenQa = openQa;

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open-topic]");
    if (t) { e.preventDefault(); showTopic(t.getAttribute("data-open-topic")); return; }
    t = e.target.closest("[data-go-home]");
    if (t) { e.preventDefault(); showHome(); return; }
    t = e.target.closest("[data-close-modal]");
    if (t) { e.preventDefault(); closeModal(); return; }
    if (e.target === qaModal) closeModal();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  document.querySelectorAll('input[name="opt-search"]').forEach(function (el) {
    el.addEventListener("change", function () { H.setSearchOpt(el.value); applyLayout(); });
  });
  document.querySelectorAll('input[name="opt-paper"]').forEach(function (el) {
    el.addEventListener("change", function () { paperOpt = el.value; applyLayout(); });
  });

  var proto = document.getElementById("proto");
  var protoTog = document.getElementById("proto-tog");
  protoTog.addEventListener("click", function () {
    var min = proto.classList.toggle("is-min");
    protoTog.textContent = min ? "Show" : "Hide";
    protoTog.setAttribute("aria-expanded", min ? "false" : "true");
  });
  if (window.matchMedia("(max-width: 900px)").matches) {
    proto.classList.add("is-min"); protoTog.textContent = "Show"; protoTog.setAttribute("aria-expanded", "false");
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
  window.addEventListener("hashchange", function () { if (location.hash === "#topics" || location.hash === "") showHome(); });

  renderTopics();
  renderFeatured();
  applyLayout();

  if (state.q && !state.topic) showResults(state.q);
  else if (state.topic) showTopic(state.topic);
  if (state.qa) openQa(state.qa);
})();
