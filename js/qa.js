/* Topic archive (topic.html = taxonomy-topic.php) and a single Q&A
 * (qa.html = single-qa.php). */
(function () {
  "use strict";
  var H = window.HYEW, esc = H.esc;
  var page = document.body.getAttribute("data-page");
  var params = new URLSearchParams(location.search);
  var main = document.getElementById("page-body");
  if (!main) return;

  function qaRow(it) {
    return '<li><a href="' + H.qaUrl(it) + '"><span class="q">' + esc(it.question) +
      '</span><span class="meta">' + esc(H.topicLabelList(it.topics)) + "</span></a></li>";
  }

  /* ---------- one topic ---------- */
  if (page === "topic") {
    var id = params.get("id") || "";
    var t = H.topicById[id];
    if (!t) {
      document.title = "Topic not found — Have You Ever Wondered";
      main.innerHTML = '<div class="soon"><h1>Topic not found</h1><p>Choose a topic from the homepage.</p><a class="btn sc" href="index.html#topics">Browse topics</a></div>';
      return;
    }
    var list = H.qaForTopic(t.id);
    document.title = t.en + " — Have You Ever Wondered";
    main.innerHTML =
      '<nav class="crumbs sc" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><span aria-current="page">' + esc(t.en) + "</span></nav>" +
      '<header class="page-head parsha-head"><h1>' + esc(t.en) + '</h1><div class="he-big" lang="he" dir="rtl">' + esc(t.he) + "</div></header>" +
      (list.length
        ? '<ul class="result-list qa-list">' + list.map(qaRow).join("") + "</ul>"
        : '<p class="empty">No questions in this topic yet.</p>');
    return;
  }

  /* ---------- one Q&A ---------- */
  if (page === "qa") {
    var raw = params.get("id") || "";
    var it = H.qaById(raw);
    if (!it) {
      document.title = "Question not found — Have You Ever Wondered";
      main.innerHTML = '<div class="soon"><h1>Question not found</h1><p>That question isn’t on the site, or the link may be out of date.</p><a class="btn sc" href="index.html#topics">Browse topics</a></div>';
      return;
    }
    if (raw !== it.slug) {
      location.replace(H.qaUrl(it) + location.hash);
      return;
    }
    document.title = it.question;
    var first = H.topicById[it.topics[0]] || { id: it.topics[0], en: H.topicName(it.topics[0]), he: "" };
    var url = location.origin + location.pathname + "?id=" + encodeURIComponent(it.slug);
    var shareText = "Have You Ever Wondered: " + it.question;
    var seen = {};
    seen[it.slug] = true;
    var moreHtml = (it.topics || []).map(function (tid) {
      var topic = H.topicById[tid];
      if (!topic) return "";
      var more = H.qaForTopic(tid).filter(function (x) {
        if (seen[x.slug]) return false;
        seen[x.slug] = true;
        return true;
      }).slice(0, 5);
      if (!more.length) return "";
      return '<section class="more-on"><h2 class="tg-h sc">More questions on <a href="' + H.topicUrl(topic.id) + '">' + esc(topic.en) + "</a></h2>" +
        '<ul class="result-list">' + more.map(qaRow).join("") + "</ul></section>";
    }).join("");

    main.innerHTML =
      '<nav class="crumbs sc" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="' + H.topicUrl(first.id) + '">' + esc(first.en) +
        "</a><span>/</span><span aria-current=\"page\">Question</span></nav>" +
      '<div class="single">' +
        '<article class="qa-article" aria-labelledby="qa-question">' +
          '<div class="topic-chips">' + H.chips(it.topics) + "</div>" +
          '<h1 id="qa-question" class="gl-scope">' + esc(it.question) + "</h1>" +
          '<p class="answer gl-scope" id="qa-answer">' + esc(it.answer) + "</p>" +
          '<p class="disclaimer">Sample placeholder — not a psak. Please ask your rav for a personal ruling.</p>' +
        "</article>" +
        '<aside class="single-side" aria-label="About this question">' +
          H.shareBoxHtml("Share this question", shareText, url) +
          '<div class="qa-follow"><h2 class="sc">A follow-up</h2><p>Have a question about this answer?</p><a class="u sc" href="' + H.askFollowupUrl(it) + '">Ask a follow-up question</a></div>' +
        "</aside>" +
      "</div>" +
      moreHtml;

    H.bindShare(main, shareText, url);
    if (H.gloss) {
      H.gloss.scan(document.getElementById("qa-question"));
      H.gloss.scan(document.getElementById("qa-answer"));
    }
  }
})();
