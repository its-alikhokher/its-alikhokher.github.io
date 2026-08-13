/* Theme toggle + projects pagination. No dependencies.
 * Cards HTML mein pre-rendered hote hain (build.js se) taake Google unhe padh sake;
 * ye script sirf pagination karti hai. Agar HTML khali ho to PROJECTS se render kar leti hai.
 */
(function () {
  // ---------- theme ----------
  var SUN =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/>' +
    '<path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>';
  var MOON =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.3A8.2 8.2 0 0 1 9.7 4a8.5 8.5 0 1 0 10.3 10.3z"/></svg>';

  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored === "dark" || stored === "light") {
    document.documentElement.setAttribute("data-theme", stored);
  }

  function isDark() {
    var set = document.documentElement.getAttribute("data-theme");
    if (set) return set === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function paintToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var dark = isDark();
    btn.innerHTML = dark ? SUN : MOON;
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("title", dark ? "Light mode" : "Dark mode");
  }
  paintToggle();

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("#theme-toggle");
    if (!btn) return;
    var next = isDark() ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (err) {}
    paintToggle();
  });

  // ---------- projects ----------
  var PER_PAGE = 6;
  var list = document.getElementById("project-list");
  if (!list) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function card(p) {
    var links = [];
    if (p.repo) links.push('<a href="' + esc(p.repo) + '" rel="noopener">Source →</a>');
    if (p.demo) links.push('<a href="' + esc(p.demo) + '" rel="noopener">Live demo →</a>');
    var href = p.repo || p.demo;
    var title = href
      ? '<a href="' + esc(href) + '" rel="noopener">' + esc(p.title) + "</a>"
      : esc(p.title);
    return (
      '<article class="card">' +
        '<div class="card-top"><h3>' + title + "</h3>" +
        '<span class="date">' + esc(p.date) + "</span></div>" +
        "<p>" + esc(p.description) + "</p>" +
        '<ul class="stack">' +
          (p.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
        "</ul>" +
        (links.length ? '<div class="card-links">' + links.join("") + "</div>" : "") +
      "</article>"
    );
  }

  // build.js ne pre-render nahi kiya to fallback: PROJECTS se banayein
  var cards = list.querySelectorAll(".card");
  if (!cards.length && window.PROJECTS) {
    list.innerHTML = window.PROJECTS.map(card).join("");
    cards = list.querySelectorAll(".card");
  }
  if (!cards.length) return;

  var pages = Math.max(1, Math.ceil(cards.length / PER_PAGE));
  var pager = document.getElementById("pagination");

  function currentPage() {
    var n = parseInt(new URLSearchParams(location.search).get("page"), 10);
    if (isNaN(n) || n < 1) n = 1;
    return Math.min(n, pages);
  }

  function render() {
    var page = currentPage();
    var from = (page - 1) * PER_PAGE;
    var to = page * PER_PAGE;
    Array.prototype.forEach.call(cards, function (el, i) {
      el.hidden = i < from || i >= to;
    });

    if (!pager) return;
    if (pages < 2) { pager.innerHTML = ""; return; }

    var html = "";
    html += page > 1
      ? '<a href="?page=' + (page - 1) + '" rel="prev">← Newer</a>'
      : '<span class="disabled">← Newer</span>';
    for (var i = 1; i <= pages; i++) {
      html += i === page
        ? '<span class="current" aria-current="page">' + i + "</span>"
        : '<a href="?page=' + i + '">' + i + "</a>";
    }
    html += page < pages
      ? '<a href="?page=' + (page + 1) + '" rel="next">Older →</a>'
      : '<span class="disabled">Older →</span>';
    pager.innerHTML = html;

    Array.prototype.forEach.call(pager.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function (ev) {
        ev.preventDefault();
        history.pushState({}, "", a.getAttribute("href"));
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  window.addEventListener("popstate", render);
  render();
})();
