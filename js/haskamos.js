/* Haskamos page: missing-image fallback + lightbox with zoom and pan. */
(function () {
  "use strict";
  document.querySelectorAll(".hask-page img").forEach(function (img) {
    function miss() { var f = img.closest("figure"); if (f) f.classList.add("missing"); }
    if (img.complete && img.naturalWidth === 0) miss();
    img.addEventListener("error", miss);
  });

  var lb = document.getElementById("lightbox"), stage = document.getElementById("lb-stage");
  var im = document.getElementById("lb-img"), cap = document.getElementById("lb-cap");
  var scale = 1, x = 0, y = 0, opener = null, drag = null, pinch = null;
  function apply() { im.style.transform = "translate(" + x + "px," + y + "px) scale(" + scale + ")"; lb.classList.toggle("zoomed", scale > 1.01); }
  function zoom(f, cx, cy) {
    var ns = Math.min(6, Math.max(1, scale * f));
    if (cx != null) { var r = stage.getBoundingClientRect(); var ox = cx - r.left - r.width / 2, oy = cy - r.top - r.height / 2;
      x = ox - (ox - x) * (ns / scale); y = oy - (oy - y) * (ns / scale); }
    scale = ns; if (scale === 1) { x = 0; y = 0; } apply();
  }
  function open(src, caption, btn) {
    if (btn.closest("figure").classList.contains("missing")) return;
    opener = btn; im.src = src; im.alt = caption; cap.textContent = caption;
    scale = 1; x = 0; y = 0; apply();
    lb.hidden = false; document.body.classList.add("modal-open");
    lb.querySelector(".lb-close").focus();
  }
  function close() { lb.hidden = true; document.body.classList.remove("modal-open"); if (opener) opener.focus(); }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-lightbox]");
    if (b) { open(b.getAttribute("data-lightbox"), b.getAttribute("data-caption"), b); return; }
    var t = e.target.closest("[data-lb]");
    if (t) { var k = t.getAttribute("data-lb");
      if (k === "close") close(); else if (k === "in") zoom(1.5); else if (k === "out") zoom(1 / 1.5); else { scale = 1; x = 0; y = 0; apply(); } return; }
    if (e.target === stage && scale === 1) close();
  });
  im.addEventListener("dblclick", function (e) { if (scale > 1) { scale = 1; x = 0; y = 0; apply(); } else zoom(2.5, e.clientX, e.clientY); });
  stage.addEventListener("wheel", function (e) { if (lb.hidden) return; e.preventDefault(); zoom(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX, e.clientY); }, { passive: false });
  stage.addEventListener("pointerdown", function (e) { if (scale <= 1 || e.pointerType === "touch") return; drag = { sx: e.clientX - x, sy: e.clientY - y }; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener("pointermove", function (e) { if (!drag) return; x = e.clientX - drag.sx; y = e.clientY - drag.sy; apply(); });
  stage.addEventListener("pointerup", function () { drag = null; });
  stage.addEventListener("touchstart", function (e) {
    if (e.touches.length === 2) { pinch = { d: dist(e.touches), s: scale }; }
    else if (e.touches.length === 1 && scale > 1) { drag = { sx: e.touches[0].clientX - x, sy: e.touches[0].clientY - y }; }
  }, { passive: true });
  stage.addEventListener("touchmove", function (e) {
    if (pinch && e.touches.length === 2) { e.preventDefault(); scale = Math.min(6, Math.max(1, pinch.s * dist(e.touches) / pinch.d)); if (scale === 1) { x = 0; y = 0; } apply(); }
    else if (drag && e.touches.length === 1) { e.preventDefault(); x = e.touches[0].clientX - drag.sx; y = e.touches[0].clientY - drag.sy; apply(); }
  }, { passive: false });
  stage.addEventListener("touchend", function () { pinch = null; drag = null; });
  function dist(t) { return Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY); }
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "+" || e.key === "=") zoom(1.5);
    else if (e.key === "-") zoom(1 / 1.5);
    else if (e.key === "Tab") { var f = lb.querySelectorAll("button"); if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); } }
  });
})();
