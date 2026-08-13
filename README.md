# its-alikhokher.github.io

Ali Raza ki personal site — plain HTML, CSS aur thoda sa JavaScript. Koi build step nahi,
koi dependency nahi. Bas push karein aur GitHub Pages live kar dega.

## Structure

```
index.html              → "Hi" page (about + skills + contact)
projects/index.html     → projects list + pagination (cards pre-rendered)
experience/index.html   → work history + education (CV se)
assets/projects.js      → PROJECTS array — yahan projects edit karein
assets/style.css        → styling + light/dark theme tokens
assets/site.js          → theme toggle aur pagination
assets/og.png           → social share image (1200x630)
assets/avatar.png       → profile photo
build.js                → projects ko HTML mein pre-render + sitemap banata hai
sitemap.xml, robots.txt → SEO
404.html                → not-found page
.nojekyll               → GitHub ko batata hai ke Jekyll na chalaye
```

## Naya project add karna

`assets/projects.js` kholein aur array ke **sabse upar** ek entry daal dein:

```js
{
  title: "Project ka naam",
  date: "Sep 2026",
  description: "Ek do line mein kya cheez hai.",
  tags: ["Python", "Frappe"],
  repo: "https://github.com/its-alikhokher/repo-name",
  demo: "https://example.com"        // optional
},
```

`repo` aur `demo` dono optional hain. Har page par 6 projects dikhte hain —
ye number `assets/site.js` mein `PER_PAGE` se badla ja sakta hai.

**Zaroori:** edit karne ke baad ye command chalayein —

```bash
node build.js
```

Ye projects ko HTML mein pre-render karta hai (taake Google unhe padh sake, sirf
JavaScript par depend na ho) aur `sitemap.xml` update karta hai. Iske baad commit + push.

## SEO

Site par pehle se lagaya gaya hai:

- Har page par unique `<title>`, meta description, canonical URL
- Open Graph + Twitter card (share karne par `assets/og.png` dikhta hai)
- JSON-LD structured data — home par `Person`/`ProfilePage`, projects par `ItemList`,
  experience par `Person` + `Occupation`, dono par `BreadcrumbList`
- `sitemap.xml` + `robots.txt`
- Projects cards HTML mein pre-rendered (JS off ho tab bhi crawl hote hain)
- Local images (koi external request nahi) — page tez load hota hai

**Push ke baad ek dafa:** [Google Search Console](https://search.google.com/search-console)
mein `https://its-alikhokher.github.io/` add karein aur sitemap submit karein:
`https://its-alikhokher.github.io/sitemap.xml`

## Local par dekhna

```bash
python3 -m http.server 8000
```

Phir browser mein http://localhost:8000 kholein.

## Deploy (GitHub Pages)

1. GitHub par naya **public** repo banayein: `its-alikhokher.github.io`
2. Is folder mein:

```bash
git init -b main
git add -A
git commit -m "Personal site"
git remote add origin https://github.com/its-alikhokher/its-alikhokher.github.io.git
git push -u origin main
```

3. Repo → **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main` / `root`.

1–2 minute baad site live: **https://its-alikhokher.github.io**
