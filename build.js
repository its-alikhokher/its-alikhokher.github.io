#!/usr/bin/env node
/*  Build step: projects ko HTML mein pre-render karta hai (SEO ke liye)
 *  aur sitemap.xml generate karta hai.
 *
 *  Chalane ka tareeqa:  node build.js
 *  (projects.js edit karne ke baad ye zaroor chalayein, phir commit + push)
 */
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SITE = "https://its-alikhokher.github.io";
const PAGES = ["/", "/projects/", "/experience/"];

// ---- projects.js load karein (browser ke bina) ----
const src = fs.readFileSync(path.join(ROOT, "assets/projects.js"), "utf8");
const sandbox = { window: {} };
new Function("window", src)(sandbox.window);
const projects = sandbox.window.PROJECTS || [];

const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );

// ---- project cards ka HTML ----
function card(p) {
  const links = [];
  if (p.repo) links.push(`<a href="${esc(p.repo)}" rel="noopener">Source →</a>`);
  if (p.demo) links.push(`<a href="${esc(p.demo)}" rel="noopener">Live demo →</a>`);
  const href = p.repo || p.demo;
  const title = href
    ? `<a href="${esc(href)}" rel="noopener">${esc(p.title)}</a>`
    : esc(p.title);
  const tags = (p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("");
  return `        <article class="card">
          <div class="card-top"><h3>${title}</h3><span class="date">${esc(p.date)}</span></div>
          <p>${esc(p.description)}</p>
          <ul class="stack">${tags}</ul>
          ${links.length ? `<div class="card-links">${links.join("")}</div>` : ""}
        </article>`;
}

// ---- structured data (Google ke liye) ----
function itemList() {
  const items = projects.map((p, i) => {
    const entry = {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        keywords: (p.tags || []).join(", "),
        author: { "@type": "Person", name: "Ali Raza" }
      }
    };
    if (p.demo || p.repo) entry.item.url = p.demo || p.repo;
    return entry;
  });
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Projects by Ali Raza",
      numberOfItems: projects.length,
      itemListElement: items
    },
    null,
    2
  );
}

function replaceBlock(html, marker, body) {
  const start = `<!-- ${marker}:start -->`;
  const end = `<!-- ${marker}:end -->`;
  const re = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (!re.test(html)) throw new Error(`Marker "${marker}" nahi mila`);
  return html.replace(re, `${start}\n${body}\n        ${end}`);
}

// ---- projects page likhein ----
const projPath = path.join(ROOT, "projects/index.html");
let html = fs.readFileSync(projPath, "utf8");
html = replaceBlock(html, "projects", projects.map(card).join("\n"));
html = replaceBlock(
  html,
  "projects-jsonld",
  `<script type="application/ld+json">\n${itemList()}\n</script>`
);
fs.writeFileSync(projPath, html);

// ---- sitemap.xml ----
const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  PAGES.map(
    (u) =>
      `  <url>\n    <loc>${SITE}${u}</loc>\n    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>monthly</changefreq>\n    <priority>${u === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
  ).join("\n") +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);

console.log(`✓ ${projects.length} projects pre-rendered → projects/index.html`);
console.log(`✓ sitemap.xml (${PAGES.length} pages, lastmod ${today})`);
