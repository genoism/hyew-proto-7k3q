/* Have You Ever Wondered — homepage interactions (front-page.php). */
(function () {
  "use strict";
  var H = window.HYEW;
  var esc = H.esc;

  var params = new URLSearchParams(location.search);
  var qaParam = params.get("qa");
  if (qaParam) {
    var oldQa = H.qaById(qaParam);
    location.replace(oldQa ? H.qaUrl(oldQa) : (H.base + "qa.html?id=" + encodeURIComponent(qaParam)));
    return;
  }
  var topicParam = params.get("topic");
  if (topicParam) {
    location.replace(H.topicUrl(topicParam));
    return;
  }

  var paperOpt = params.get("paper") || H.store.get("hyew-paper") || "rail";
  if (paperOpt !== "below") paperOpt = "rail";
  var state = { q: (params.get("q") || "").trim() };

  var homeView = document.getElementById("home-view");
  var resultsView = document.getElementById("results-view");

  function setUrl() {
    var next = new URLSearchParams();
    next.set("search", H.getSearchOpt());
    next.set("paper", paperOpt);
    if (state.q) next.set("q", state.q);
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
    homeView.hidden = false; resultsView.hidden = true;
    H.hideDrops();
    state.q = "";
    setUrl();
    window.scrollTo(0, 0);
  }

  /* Show where the word was found, unless it's already visible in the title */
  function snip(text, title, q) {
    if (H.wordRe(q).test(title)) return "";
    var s = H.snippet(text, q);
    return s ? '<span class="snip">' + s + "</span>" : "";
  }

  function renderGrouped(results, q) {
    var html = '<section class="result-group"><h2>Questions &amp; Answers</h2>';
    if (!results.qa.length) html += '<p class="empty">No matching questions.</p>';
    else {
      html += '<ul class="result-list">';
      results.qa.forEach(function (it) {
        html += '<li><a href="' + H.qaUrl(it) + '"><span class="q">' + H.highlight(it.question, q) +
          '</span><span class="meta">' + esc(H.topicLabelList(it.topics)) + "</span>" + snip(it.answer, it.question, q) + "</a></li>";
      });
      html += "</ul>";
    }
    html += '</section><section class="result-group"><h2>Parsha Sheets</h2>';
    if (!results.sheets.length) html += '<p class="empty">No matching parsha sheets.</p>';
    else {
      html += '<ul class="result-list">';
      results.sheets.forEach(function (it) {
        html += '<li><a href="' + H.sheetUrl(it) + '"><span class="t">' + H.highlight(it.title, q) +
          '</span><span class="meta">' + esc(H.sheetMeta(it)) + " · " + esc(H.topicLabelList(it.topics)) + "</span>" + snip(H.sheetText(it), it.title, q) + "</a></li>";
      });
      html += "</ul>";
    }
    return html + "</section>";
  }

  function showResults(q) {
    q = (q || "").trim();
    state.q = q;
    H.syncSearchInputs(q);
    homeView.hidden = true; resultsView.hidden = false;
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

  function renderTopics() {
    var groups = H.topicGroups || [];
    function item(t) {
      return '<li><a class="topic" href="' + H.topicUrl(t.id) + '">' +
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

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-go-home]");
    if (t) { e.preventDefault(); showHome(); return; }
  });

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

  if (state.q) showResults(state.q);
})();
