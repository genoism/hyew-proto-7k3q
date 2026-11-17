/* Ask a Question form (prototype). Validates in the browser; does not send.
   In WordPress this posts to a theme-registered REST route that emails the author. */
(function () {
  "use strict";
  var form = document.getElementById("ask-form");
  if (!form) return;
  var status = document.getElementById("f-status");
  var file = document.getElementById("f-file");
  var fileName = document.getElementById("file-name");
  file.addEventListener("change", function () {
    fileName.textContent = file.files.length ? file.files[0].name : "No file chosen";
  });
  var rules = {
    name: function (v) { return v.trim().length > 0; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
    subject: function (v) { return !!v; },
    question: function (v) { return v.trim().length > 0; }
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
    Object.keys(rules).forEach(function (n) { if (!check(n) && !first) first = form.elements[n]; });
    if (first) { first.focus(); status.hidden = true; return; }
    status.hidden = false;
    status.className = "f-status ok";
    status.textContent = "This is a prototype, so nothing was sent. On the live site, your question would go straight to the author.";
  });
})();
