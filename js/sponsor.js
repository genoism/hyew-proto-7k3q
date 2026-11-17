/* Sponsor the next HYEW form (prototype). Validates in the browser; does not send.
   In WordPress this posts to a theme-registered REST route that emails the author. */
(function () {
  "use strict";
  var H = window.HYEW, form = document.getElementById("sp-form");
  if (!form || !H) return;
  var status = document.getElementById("f-status"), line = document.getElementById("sp-line");

  /* Upcoming weeks: the parshiyos after the latest sheet */
  var all = [];
  H.books.forEach(function (b) { all = all.concat(b.parshiyos); });
  var latest = H.sortedSheets()[0];
  var at = latest ? all.findIndex(function (p) { return p.slug === latest.parsha; }) : -1;
  var sel = form.elements.week;
  all.slice(at + 1, at + 11).forEach(function (p) {
    var o = document.createElement("option");
    o.value = p.slug; o.textContent = p.en + "  ·  " + p.he;
    sel.appendChild(o);
  });

  function val(n) { return (form.elements[n].value || "").trim(); }
  function preview() {
    var kind = form.querySelector("input[name=kind]:checked").value;
    var who = val("honoree") || "[Name]", heb = val("heb");
    var html = "This week’s paper is sponsored " + H.esc(kind) + " " + H.esc(who) +
      (heb ? ', <span lang="he" dir="rtl">' + H.esc(heb) + "</span>" : "");
    if (form.elements.credit.checked) html += " · Sponsored by " + H.esc(val("name") || "[your name]");
    line.innerHTML = html;
  }
  form.addEventListener("input", preview);
  form.addEventListener("change", preview);
  preview();

  var rules = {
    honoree: function (v) { return v.trim().length > 0; },
    name: function (v) { return v.trim().length > 0; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
  };
  function check(name) {
    var el = form.elements[name], ok = rules[name](el.value), err = document.getElementById("e-" + name);
    err.hidden = ok;
    el.setAttribute("aria-invalid", ok ? "false" : "true");
    if (ok) el.removeAttribute("aria-describedby"); else el.setAttribute("aria-describedby", "e-" + name);
    return ok;
  }
  Object.keys(rules).forEach(function (n) {
    form.elements[n].addEventListener("blur", function () { if (form.elements[n].getAttribute("aria-invalid")) check(n); });
    form.elements[n].addEventListener("input", function () { if (form.elements[n].getAttribute("aria-invalid") === "true") check(n); });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var first = null;
    ["honoree", "name", "email"].forEach(function (n) { if (!check(n) && !first) first = form.elements[n]; });
    if (first) { first.focus(); status.hidden = true; return; }
    status.hidden = false;
    status.className = "f-status ok";
    status.textContent = "This is a prototype, so nothing was sent. On the live site, the author would get your request and email you to confirm the week.";
  });
})();
