/* Parsha sheet templates: archive (parsha-sheets.html = archive-parsha_sheet.php),
 * one parsha (parsha.html = taxonomy-parsha.php), one sheet (sheet.html = single-parsha_sheet.php). */
(function () {
  "use strict";
  var H = window.HYEW, esc = H.esc;
  var page = document.body.getAttribute("data-page");
  var params = new URLSearchParams(location.search);
  var main = document.getElementById("page-body");

  function countFor(slug) { return (H.sheets || []).filter(function (s) { return s.parsha === slug; }).length; }
  function sheetsFor(slug) { return H.sortedSheets().filter(function (s) { return s.parsha === slug; }); }

  function sheetRow(s) {
    var p = H.parsha(s.parsha);
    return '<li><a href="' + H.sheetUrl(s) + '">' +
      '<span class="t">' + esc(s.title) + '</span><span class="meta sc">No. ' + s.number + " · Shabbos Parshas " + esc(p.en) +
      " · " + esc(s.year) + " · " + esc(H.fmtDate(s.date)) + " · " + esc(H.topicLabelList(s.topics)) + "</span></a></li>";
  }

  /* ---------- archive: five chumashim ---------- */
  if (page === "parsha-sheets") {
    var latest = H.sortedSheets().slice(0, 4);
    var html = '<header class="page-head"><h1>Parsha Sheets</h1></header>' +
      '<section class="latest"><h2 class="tg-h sc">Latest sheets</h2><ul class="sheet-list">' + latest.map(sheetRow).join("") + "</ul></section>" +
      '<nav class="book-jump sc" aria-label="Chumashim">' + H.books.map(function (b) {
        return '<a href="#' + b.id + '">' + esc(b.en) + "</a>";
      }).join('<span aria-hidden="true">·</span>') + "</nav>" +
      '<div class="books">' + H.books.map(function (b, i) {
        return '<section class="book" id="' + b.id + '" aria-labelledby="bk-' + b.id + '">' +
          '<header class="book-h"><h2 id="bk-' + b.id + '">' + esc(b.en) +
          '</h2><span class="he" lang="he" dir="rtl">' + esc(b.he) + "</span></header>" +
          '<ol class="parshiyos">' + b.parshiyos.map(function (p) {
            var n = countFor(p.slug);
            return '<li class="' + (n ? "has" : "none") + '"><a href="' + H.parshaUrl(p.slug) + '"' + (n === 0 ? ' aria-label="' + esc(p.en) + ', no sheets yet"' : ' aria-label="' + esc(p.en) + ", " + n + " sheet" + (n > 1 ? "s" : "") + '"') + ">" +
              '<span class="en">' + esc(p.en) + '</span><span class="dots" aria-hidden="true"></span>' +
              '<span class="he" lang="he" dir="rtl">' + esc(p.he) + "</span>" +
              "</a></li>";
          }).join("") + "</ol></section>";
      }).join("") + "</div>";
    main.innerHTML = html;
  }

  /* ---------- one parsha ---------- */
  if (page === "parsha") {
    var slug = params.get("p") || "";
    var p = H.parshaBySlug[slug];
    if (!p) {
      main.innerHTML = '<div class="soon"><h1>Parsha not found</h1><p>Choose a parsha from the list.</p><a class="btn sc" href="parsha-sheets.html">All parsha sheets</a></div>';
    } else {
      var book = H.books.filter(function (b) { return b.id === p.book; })[0];
      var flat = []; H.books.forEach(function (b) { flat = flat.concat(b.parshiyos); });
      var idx = flat.indexOf(p), prev = flat[idx - 1], next = flat[idx + 1];
      var list = sheetsFor(slug);
      document.title = "Parshas " + p.en + " — Have You Ever Wondered";
      main.innerHTML =
        '<nav class="crumbs sc" aria-label="Breadcrumb"><a href="parsha-sheets.html">Parsha Sheets</a><span>/</span><a href="parsha-sheets.html#' + book.id + '">' + esc(book.en) + "</a><span>/</span><span aria-current=\"page\">" + esc(p.en) + "</span></nav>" +
        '<header class="page-head parsha-head"><div class="kicker sc red">Sefer ' + esc(book.en) + ' · <span lang="he" dir="rtl">' + esc(book.he) + "</span></div>" +
        "<h1>Parshas " + esc(p.en) + '</h1><div class="he-big" lang="he" dir="rtl">פרשת ' + esc(p.he) + "</div>" +
        '<p class="lede">' + (list.length ? list.length + " sheet" + (list.length > 1 ? "s" : "") + " on this parsha, newest first." : "No sheets on this parsha yet.") + "</p></header>" +
        (list.length ? '<ul class="sheet-list big">' + list.map(sheetRow).join("") + "</ul>"
          : '<p class="empty">The sheets for Parshas ' + esc(p.en) + ' will appear here as they are published. <a class="u" href="pages/subscribe.html">Get the weekly paper by email</a>.</p>') +
        '<nav class="pn sc" aria-label="Other parshiyos">' +
          (prev ? '<a href="' + H.parshaUrl(prev.slug) + '">← Parshas ' + esc(prev.en) + "</a>" : "<span></span>") +
          '<a href="parsha-sheets.html">All parshiyos</a>' +
          (next ? '<a href="' + H.parshaUrl(next.slug) + '">Parshas ' + esc(next.en) + " →</a>" : "<span></span>") +
        "</nav>";
    }
  }

  /* ---------- single sheet ---------- */
  if (page === "sheet") {
    var s = H.sheetById(params.get("id")) || H.sortedSheets()[0];
    var ps = H.parsha(s.parsha);
    var bk = H.books.filter(function (b) { return b.id === ps.book; })[0] || { en: "", id: "" };
    var all = H.sortedSheets(), i = all.indexOf(s);
    var newer = all[i - 1], older = all[i + 1];
    var more = sheetsFor(s.parsha).filter(function (x) { return x !== s; });
    var url = location.origin + location.pathname + "?id=" + encodeURIComponent(s.id);
    var shareText = "Have You Ever Wondered " + s.title;
    document.title = s.title.replace(/^…/, "Have You Ever Wondered ") + " — HYEW";

    main.innerHTML =
      '<nav class="crumbs sc" aria-label="Breadcrumb"><a href="parsha-sheets.html">Parsha Sheets</a><span>/</span><a href="parsha-sheets.html#' + bk.id + '">' + esc(bk.en) +
        '</a><span>/</span><a href="' + H.parshaUrl(ps.slug) + '">' + esc(ps.en) + "</a><span>/</span><span aria-current=\"page\">No. " + s.number + "</span></nav>" +
      '<div class="single">' +
        '<article class="paper full" aria-labelledby="sheet-title">' + H.mastHtml(s, "h1") +
          '<div class="byline sc">Shabbos Parshas ' + esc(ps.en) + " · " + esc(H.fmtDate(s.date)) + "</div>" +
          (s.sponsored ? '<div class="spline">' + esc(s.sponsored) + ' · <a class="u" href="pages/sponsor.html">Sponsor the next one</a></div>' : "") +
          '<div class="cols gl-scope">' + H.sheetBody(s) + "</div>" +
          (s.body ? "" : '<p class="disclaimer">Sample sheet (placeholder). The full paper will appear here once the Word document is converted.</p>') +
        "</article>" +
        '<aside class="single-side" aria-label="About this sheet">' +
          '<div class="meta-block"><h2 class="sc">Parsha</h2><p><a href="' + H.parshaUrl(ps.slug) + '">Parshas ' + esc(ps.en) + ' <span lang="he" dir="rtl">' + esc(ps.he) + "</span></a></p>" +
            '<h2 class="sc">Date</h2><p>Shabbos, ' + esc(H.fmtDate(s.date)) + "<br>" + esc(s.year) + " · No. " + s.number + "</p>" +
            '<h2 class="sc">Topics</h2><div class="topic-chips">' + H.chips(s.topics, false) + "</div></div>" +
          '<div class="share" id="share"><h2 class="sc">Share this sheet</h2>' +
            '<button type="button" class="share-btn native" data-share="native" hidden>Share…</button>' +
            '<button type="button" class="share-btn" data-share="copy"><span class="lbl">Copy link</span></button>' +
            '<a class="share-btn" data-share="wa" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(shareText + " " + url) + '">WhatsApp</a>' +
            '<a class="share-btn" data-share="mail" href="mailto:?subject=' + encodeURIComponent(shareText) + "&body=" + encodeURIComponent(shareText + "\n\n" + url) + '">Email</a>' +
            '<button type="button" class="share-btn" data-share="print">Print</button>' +
            '<p class="share-status" role="status" aria-live="polite"></p></div>' +
        "</aside>" +
      "</div>" +
      '<nav class="pn sheet-pn" aria-label="More sheets">' +
        (older ? '<a href="' + H.sheetUrl(older) + '"><span class="sc">← Previous sheet</span><span class="t">' + esc(older.title) + "</span></a>" : "<span></span>") +
        (newer ? '<a class="nx" href="' + H.sheetUrl(newer) + '"><span class="sc">Next sheet →</span><span class="t">' + esc(newer.title) + "</span></a>" : "<span></span>") +
      "</nav>" +
      '<section class="more-on"><h2 class="tg-h sc">More on Parshas ' + esc(ps.en) + "</h2>" +
        (more.length ? '<ul class="sheet-list">' + more.map(sheetRow).join("") + "</ul>"
          : '<p class="empty">This is the only sheet on Parshas ' + esc(ps.en) + ' so far. <a class="u" href="parsha-sheets.html">Browse all parshiyos</a>.</p>') +
      "</section>";

    var status = main.querySelector(".share-status");
    var nativeBtn = main.querySelector('[data-share="native"]');
    if (navigator.share) nativeBtn.hidden = false;
    main.addEventListener("click", function (e) {
      var b = e.target.closest("[data-share]");
      if (!b) return;
      var kind = b.getAttribute("data-share");
      if (kind === "native") {
        e.preventDefault();
        navigator.share({ title: shareText, text: shareText, url: url }).catch(function () {});
      } else if (kind === "copy") {
        e.preventDefault();
        var done = function () {
          b.classList.add("ok"); b.querySelector(".lbl").textContent = "Copied ✓";
          status.textContent = "Link copied to the clipboard.";
          setTimeout(function () { b.classList.remove("ok"); b.querySelector(".lbl").textContent = "Copy link"; status.textContent = ""; }, 2200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, fallback);
        else fallback();
        function fallback() {
          var ta = document.createElement("textarea"); ta.value = url; ta.setAttribute("readonly", "");
          ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); } catch (err) {}
          document.body.removeChild(ta); done();
        }
      } else if (kind === "print") {
        e.preventDefault(); window.print();
      }
    });
  }
})();
