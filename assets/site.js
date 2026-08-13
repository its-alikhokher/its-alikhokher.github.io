/* Theme toggle + projects rendering with pagination. No dependencies. */
(function () {
  // ---------- theme ----------
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored === "dark" || stored === "light") {
    document.documentElement.setAttribute("data-theme", stored);
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("#theme-toggle");
    if (!btn) return;
    var isDark =
      document.documentElement.getAttribute("data-theme") === "dark" ||
      (!document.documentElement.getAttribute("data-theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    var next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (err) {}
    btn.textContent = next === "dark" ? "☀" : "☾";
  });

  // ---------- projects ----------
  var PER_PAGE = 6;
  var list = document.getElementById("project-list");
  if (!list || !window.PROJECTS) return;

  var items = window.PROJECTS;
  var pages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  var pager = document.getElementById("pagination");

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function card(p) {
    var links = [];
    if (p.repo) links.push('<a href="' + esc(p.repo) + '" rel="noopener">Source →</a>');
    if (p.demo) links.push('<a href="' + esc(p.demo) + '" rel="noopener">Live demo →</a>');
    var title = p.repo || p.demo
      ? '<a href="' + esc(p.repo || p.demo) + '" rel="noopener">' + esc(p.title) + "</a>"
      : esc(p.title);
    return (
      '<article class="card">' +
        '<div class="card-top"><h3>' + title + "</h3>" +
        '<span class="date">' + esc(p.date || "") + "</span></div>" +
        "<p>" + esc(p.description || "") + "</p>" +
        '<ul class="stack">' +
          (p.tags || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
        "</ul>" +
        (links.length ? '<div class="card-links">' + links.join("") + "</div>" : "") +
      "</article>"
    );
  }

  function currentPage() {
    var n = parseInt(new URLSearchParams(location.search).get("page"), 10);
    if (isNaN(n) || n < 1) n = 1;
    return Math.min(n, pages);
  }

  function render() {
    var page = currentPage();
    var slice = items.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    list.innerHTML = slice.map(card).join("");

    if (!pager) return;
    if (pages < 2) { pager.innerHTML = ""; return; }

    var html = "";
    html += page > 1
      ? '<a href="?page=' + (page - 1) + '">← Newer</a>'
      : '<span class="disabled">← Newer</span>';
    for (var i = 1; i <= pages; i++) {
      html += i === page
        ? '<span class="current">' + i + "</span>"
        : '<a href="?page=' + i + '">' + i + "</a>";
    }
    html += page < pages
      ? '<a href="?page=' + (page + 1) + '">Older →</a>'
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
