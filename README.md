# its-alikhokher.github.io

Ali Raza ki personal site — plain HTML, CSS aur thoda sa JavaScript. Koi build step nahi,
koi dependency nahi. Bas push karein aur GitHub Pages live kar dega.

## Structure

```
index.html              → "Hi" page (about + skills + contact)
projects/index.html     → projects list + pagination
experience/index.html   → work history + education (CV se)
assets/projects.js      → PROJECTS array — yahan projects edit karein
assets/style.css        → styling + light/dark theme tokens
assets/site.js          → theme toggle aur projects rendering
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
