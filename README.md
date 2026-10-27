# Portfolio — Chirag Seervi

A personal portfolio in the "Survey Log" style: four projects (Cascade, ReturnLoop, SME Pulse, Chart Reader), each with its own case-study page.

Plain HTML, CSS and JavaScript. No framework, no npm, no build step. The build spec is in [Spec.md](Spec.md).

## Open it locally

Double-click `index.html`. That's it: everything works over `file://`.

If you'd rather use a local server (closer to how it behaves online):

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## What's where

```
index.html            home page: hero, about, projects, skills, contact
projects/*.html       one case-study page per project
css/main.css          the only stylesheet; colours are CSS variables at the top
js/main.js            theme toggle, mobile menu, copy-email, scroll reveal, hero contour canvas
assets/favicon.svg    tab icon
assets/og-image.png   1200 × 630 image shown when the link is shared
assets/shots/         project screenshots (you add these)
404.html              "Off the map." page
```

## Filling in the gaps

Everything still missing is marked on the page with a dashed orange box and a `data-todo` attribute. To list them all:

```bash
grep -rn "data-todo" --include=*.html .
```

### Files to add

| What | Where | Notes |
|---|---|---|
| Résumé | `assets/resume_chirag.pdf` | The top bar and Contact already link here. Then delete the résumé TODO box in `index.html`. |
| Photo (optional) | `assets/photo.jpg` | In `index.html`, replace the `CS` monogram line with the `<img>` line in the comment just above it. |
| Screenshots | `assets/shots/<slug>-1.png`, `-2.png`, `-3.png` | Slugs: `cascade`, `returnloop`, `sme-pulse`, `chart-reader`. Screenshot 1 shows a "[screenshot pending]" box until it exists; 2 and 3 are simply hidden when missing. A 16:10 ratio (e.g. 1600 × 1000) fits best. Edit the captions in each page's Screenshots section. |

### Text to write

- **Home:** email (also put it in the copy button's `data-copy` and remove `disabled`; see the comment in `index.html`), LinkedIn URL, the "Currently" field, and a 2–3 sentence bio.
- **Each case study:** "My role" (the big dashed box and the short version in "At a glance") and "Status".
- **Cascade:** team size, plus the authorship note in the My role box.
- **ReturnLoop:** run `python -m pytest` in the Return-Loop repo and put the number of passing tests in the Evidence section.

### Rules for project content

Every feature, number and tech name on the case-study pages comes from the project's own repo (README, config, docs). Keep it that way: if you add a number, it should be something a reviewer can find in the repo.

## Deploy

### GitHub Pages

1. Push this folder to the `portfolio` repo on GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. The site appears at `https://chiragseervi123.github.io/portfolio/` after a minute or two.

The sharing tags (`og:url`, `og:image`, `twitter:image`) in each page's `<head>` already point at that address.

### Vercel

1. **Add New → Project**, import the `portfolio` repo.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Deploy. Vercel serves the files as they are and uses `404.html` for missing pages.

If the site's main address is the Vercel one, find and replace `https://chiragseervi123.github.io/portfolio/` with the Vercel URL in the five HTML pages so link previews show the right image.

## Changing the look

- Colours: the variables at the top of `css/main.css` (`:root` is the dark theme, `[data-theme="light"]` the light one).
- Fonts: Instrument Serif (headings), Inter (body), JetBrains Mono (labels), loaded from Google Fonts in each page's `<head>`.
- The hero animation is the "Hero contour canvas" section of `js/main.js`. It respects the visitor's reduced-motion setting.
