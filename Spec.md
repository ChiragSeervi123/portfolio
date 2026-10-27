# Portfolio — Chirag Seervi
### Build spec for Claude Code

---

## 0. How to use this file (instructions for Claude Code)

- Read this whole file before writing any code. Then show a short plan and build in the stages in **section 11**, committing after each stage.
- **Never invent facts.** Every project claim (features, numbers, test counts, tech) must come from section 6 or from the project's own repo README/docs. If something is missing or two sources disagree, leave a visible `[TODO: …]` in the page and list it at the end of your reply. Do not fill gaps with plausible-sounding text.
- Anything marked **[FILL]** is something only Chirag can supply. Leave it as a clearly styled placeholder.
- Anything marked **[VERIFY]** must be checked against the linked repo before it goes on the page.
- Keep the code simple enough for a 2nd-year student to explain line by line. No clever abstractions.
- Do not add sections, pages, libraries or features that aren't in this spec.

---

## 1. Goal

A personal portfolio website that presents four projects to recruiters, internship interviewers and hackathon judges. A visitor should understand within 10 seconds who Chirag is and what he builds, and within 2 minutes be able to open any project and see what it does, how it works, and what his part in it was.

**Success = a reviewer can answer three questions per project:** What problem does it solve? How is it built? What did Chirag do?

---

## 2. Owner details

| Field | Value |
|---|---|
| Name | Chirag Seervi |
| Role line | BTech CSE (Data Science), 2nd year |
| Location | Jodhpur, Rajasthan, India |
| Works in | Python, SQL, R, JavaScript/TypeScript |
| Interests | Data science, analytics, AI/ML, full-stack web |
| GitHub | https://github.com/ChiragSeervi123 |
| Email | [FILL] |
| LinkedIn | [FILL] |
| Résumé PDF | [FILL] — place at `/assets/resume_chirag.pdf` |
| Photo | [FILL] — optional; place at `/assets/photo.jpg`. If absent, show a "CS" monogram |
| Tagline | "I map what the data is trying to say." (editable) |

---

## 3. Tech stack (fixed)

- **Plain HTML + CSS + vanilla JavaScript.** No React, no Next.js, no Tailwind, no npm, no build step.
- One shared stylesheet (`css/main.css`) using CSS custom properties for all colours and spacing.
- One shared script (`js/main.js`) for: theme toggle, mobile nav, scroll reveal, hero canvas.
- Fonts from Google Fonts only (see section 7).
- Icons: inline SVG written by hand. No icon libraries.
- No analytics, no cookies, no trackers.
- Must open correctly by double-clicking `index.html` (file://) **and** when served. So: no `fetch()` of local JSON; content lives directly in the HTML.
- Deploy target: **GitHub Pages** (repo `ChiragSeervi123.github.io`) or **Vercel** static. Both must work with zero config.

---

## 4. Folder structure

```
portfolio/
  index.html
  projects/
    cascade.html
    returnloop.html
    sme-pulse.html
    chart-reader.html
  css/
    main.css
  js/
    main.js
  assets/
    resume_chirag.pdf        [FILL]
    photo.jpg                [FILL, optional]
    og-image.png             (generated in stage 6, 1200×630)
    favicon.svg
    shots/
      cascade-1.png  …       [FILL] screenshots, see section 6.5
      returnloop-1.png …
      sme-pulse-1.png …
      chart-reader-1.png …
  404.html
  README.md
  spec.md
```

---

## 5. Site map and page layouts

### 5.1 Home (`index.html`) — one long page, sections in this order

1. **Top bar** (sticky, thin): left "CS" monogram linking to top; right: Projects · About · Contact · theme toggle · "Résumé ↗". Collapses to a menu button below 720px.
2. **Hero**
   - Small mono labels in corners: top-left `SURVEY LOG · NO. 055`, top-right `26.3°N · 73.0°E · JODHPUR`, bottom-left `BTECH CSE · DATA SCIENCE`, bottom-right `REV. 2026.10`.
   - Large italic serif name, amber underline rule, tagline below it.
   - Background: animated topographic contour lines on a faint grid (section 8.1).
   - Two buttons: "See the projects ↓" (primary) and "GitHub ↗" (ghost).
3. **01 — Surveyor (About)**: a "field notes" card. Photo or monogram on the left; on the right a 2×2 grid of label/value pairs: DISCIPLINE, WORKS IN, DRAWN TO, CURRENTLY. Then 2–3 sentences of plain-English bio [FILL — Chirag writes this; leave a placeholder paragraph].
4. **02 — Sites Surveyed (Projects)**: header row with `4 ENTRIES` on the right. Four project rows/cards in this order: **Cascade, ReturnLoop, SME Pulse, Chart Reader**. Each card (section 9.2) links to its case-study page.
5. **03 — Instruments (Skills)**: grouped tags, only skills actually used in the four projects plus the owner table. Groups: Languages · Backend · Frontend & Viz · Data & Stats · Hardware/IoT · Tooling. Build the list from section 6 tech stacks; don't add anything not used there.
6. **04 — Contact**: one sentence ("Open to internships and collaborations."), then email (copy-to-clipboard button with "Copied" feedback), GitHub, LinkedIn, Résumé.
7. **Footer**: `END OF LOG · MORE SITES UNDER SURVEY` left, `GITHUB.COM/CHIRAGSEERVI123` right, year.

### 5.2 Case-study page template (`projects/*.html`)

Same top bar and footer as home. Content column max ~760px, wider for figures.

1. **Header block**: entry number (`02`, `03`…), project name (italic serif), one-line description, badge row (event/course), tech line in mono, buttons: "Code ↗" (repo), "Live demo ↗" (only if a URL exists — else omit, don't show a dead button).
2. **At a glance**: a 4-cell strip — Context · Team · My role · Status.
3. **The problem**: 1–2 short paragraphs.
4. **What it does**: 3–6 bullet points, user-facing.
5. **How it works**: a hand-made inline SVG pipeline diagram (boxes and arrows) as specified per project in section 6, followed by a short paragraph.
6. **Screenshots**: 1–3 images with captions. If an image file is missing, render a framed placeholder box with the caption and the text `[screenshot pending]` — never a broken image icon.
7. **Evidence / results**: only numbers from section 6 or the repo. Each number gets a short label saying what it measures and, where relevant, "(simulation)".
8. **My role**: [FILL] for team projects — a placeholder box styled differently so it's obvious it isn't done.
9. **Prev / next project** links at the bottom.

---

## 6. Project content (source of truth)

Order everywhere: Cascade → ReturnLoop → SME Pulse → Chart Reader.

### 6.1 Cascade — entry 02

- **Slug:** `cascade` · **Repo:** https://github.com/ChiragSeervi123/cascade [VERIFY exact URL]
- **One-liner:** When a dam fails, see where the water goes, when, and how deep.
- **Context:** Smart India Hackathon (SIH) 2026 — team project.
- **Problem statement:** PS 26161, "Dam Break Inundation Modelling Using Hydrodynamic Modelling of any River". Organisation: NTRO (National Technical Research Organisation). Theme: Disaster Management. Category: Software.
- **What it is:** a dam-break flood inundation simulator that runs in the browser. Given a dam and a failure scenario, it models how released water moves downstream and produces time-stepped inundation maps showing which areas flood, how deep and when.
- **Demo scenario:** Bhakra Dam on the Sutlej.
- **Tech:** TypeScript · Next.js · WebGPU · deck.gl [VERIFY against repo; list any other major libraries the repo actually uses]
- **Badge:** `SIH 2026 · PS 26161`
- **Pipeline diagram:** Dam + breach scenario → terrain / river data → hydrodynamic solver (WebGPU) → time-stepped depth grid → deck.gl inundation map with time slider. [VERIFY each stage name against the repo; rename to match]
- **Evidence:** [TODO — pull from repo README; if none, omit this section]
- **Status:** [FILL]
- **My role:** [FILL]
- **Card glyph:** a dam wall line with a filled water wave flowing right.

### 6.2 ReturnLoop — entry 03

- **Slug:** `returnloop` · **Repo:** https://github.com/ChiragSeervi123/Return-Loop
- **One-liner:** A returns desk: pickup, QC grade A/B/C, restock or refurbish, refund to the rupee.
- **Context:** Software Engineering course project — team project.
- **Problem:** Most returned goods get refunded and written off. ReturnLoop grades every item at quality check and routes it to restock, refurbish or scrap, so value is recovered and every status change is on record.
- **What it does:**
  - Role-based app: customer, pickup agent, QC inspector, refurbisher, warehouse, admin. [VERIFY roles against `blueprints/`]
  - Return flow: request → pickup → QC grading (A/B/C) → refurbish / restock / scrap → refund.
  - Business rules: 7-day return window, grade-based refund percentage, pickup fees, frequent-returner flags. [VERIFY values in `config.py`]
  - One state machine controls all status changes, so every item has a full audit trail.
  - Animated QC "stamp" when an item is graded.
- **Tech:** Python · Flask (Blueprints) · SQLite via SQLAlchemy · Jinja2 · vanilla JS · Three.js · Chart.js · pytest
- **Badge:** `SOFTWARE ENGINEERING · COURSE PROJECT`
- **Pipeline diagram:** a horizontal state-machine strip: Requested → Pickup → QC (A / B / C) → branches to Restock / Refurbish / Scrap → Refund issued.
- **Evidence:** 85 automated tests passing. [VERIFY by running `pytest` on the repo; use the current number]
- **Also worth a line:** the UML diagrams map onto the code (swimlane ↔ roles, state diagram ↔ status flow, class diagram ↔ database tables). Only include if `docs/UML_MAPPING.md` exists in the repo.
- **Status:** [FILL]
- **My role:** [FILL]
- **Card glyph:** a circular return arrow next to a small box.

### 6.3 SME Pulse — entry 04

- **Slug:** `sme-pulse` · **Repo:** https://github.com/ChiragSeervi123/SME_Pulse [VERIFY exact URL]
- **Full name:** EcoStruxure SME Pulse
- **One-liner:** Hears a machine drift before it fails, and shows what that drift costs in energy.
- **Context:** Schneider Electric Yuva Yodha Tech 2026 hackathon, Challenge 04 (Smart Manufacturing). Team of 4: two MBA members (research report, financial model) and two on engineering, including Chirag.
- **Problem:** In small factories, friction, imbalance or cooling problems build up slowly. The motor keeps running but wastes energy, and nobody can tie the extra electricity bill to a specific machine. Enterprise monitoring is too expensive for SMEs.
- **What it does:**
  - Retrofit kit design: SCT-013 current clamp, MPU-6050 vibration, DS18B20 temperature, ESP32 node, Pulse Edge gateway that buffers data when the network drops, and a production counter.
  - Tracks Specific Energy Consumption (energy per unit produced).
  - Learns each machine's own normal baseline and alerts on sustained drift, not one fixed threshold; short spikes are filtered.
  - Explainable alerts: a "Why did Pulse alert?" panel shows which signals moved and by how much.
  - Simulator and real sensor node feed the same analytics pipeline.
  - 3D machine twin in the dashboard. [VERIFY]
- **Honesty note (must appear on the page):** the current prototype runs on a deterministic simulated motor. The ESP32 hardware has not yet been built or run. [VERIFY against repo README; if hardware now exists, update]
- **Tech:** Python · [VERIFY rest of stack from `requirements.txt` / README]. List ESP32 only under "planned hardware", not under the working stack, unless the README says it runs.
- **Badge:** `SCHNEIDER ELECTRIC · YUVA YODHA 2026`
- **Pipeline diagram:** Sensors (current · vibration · temp · count) → ESP32 node → Pulse Edge gateway (buffer) → per-machine baseline + drift detection → dashboard: what's happening / why it matters / what to do next. Mark the first two boxes "planned hardware" and show a "simulated motor" box feeding the same pipeline.
- **Evidence (all simulation):** detected 5 of 5 supported fault scenarios; no false alerts in a healthy test window; exposed an 8.51% rise in SEC while output stayed flat.
- **Test count:** [VERIFY — earlier notes say 442 in one place and 266 in another; run the suite or read the README and use the current number]
- **Status:** [FILL]
- **My role:** [FILL]
- **Card glyph:** a pulse/heartbeat line with a small green dot.

### 6.4 Chart Reader — entry 05

- **Slug:** `chart-reader` · **Repo:** https://github.com/ChiragSeervi123/Chart-Reader
- **Formerly:** FXLab (Currency Exchange Rate and Volatility Analysis Using R). Mention the rename in one line only.
- **One-liner:** Drop in a chart screenshot. R reads the candles and does the statistics.
- **Context:** Probability & Statistics course project.
- **Core rule of the project:** every statistical computation runs in R; JavaScript only handles the interface and draws charts.
- **What it does:** [VERIFY — build this list from the repo README. Do NOT mention Monte Carlo / GBM simulation unless the repo actually contains that feature.]
- **Tech:** R · plumber (API) · JavaScript · Chart.js [VERIFY]
- **Badge:** `PROBABILITY & STATISTICS · COURSE PROJECT`
- **Pipeline diagram:** Chart screenshot upload → candle extraction → R plumber API (statistics) → JSON → Chart.js results view. [VERIFY stage names]
- **Evidence:** [TODO from repo]
- **Status:** [FILL]
- **My role:** [FILL — solo or team?]
- **Card glyph:** a small row of candlesticks.

### 6.5 Screenshots

Chirag will drop PNGs into `assets/shots/` named `<slug>-1.png`, `<slug>-2.png`, `<slug>-3.png`. The page must handle 0–3 images gracefully (section 5.2 item 6). Captions [FILL] — use neutral defaults like "Main dashboard" until replaced.

---

## 7. Visual design — "Survey Log" theme

This matches the planned GitHub profile README so the two feel like one brand: a field surveyor's logbook. Amber topographic lines, near-black paper, italic serif headings, monospace labels.

### 7.1 Colour tokens (dark is default)

```css
:root {
  --bg:        #0a0e13;
  --surface:   #0d1218;
  --surface-2: #121a23;
  --line:      #1d2733;
  --line-2:    #253140;
  --text:      #f2ede4;
  --text-2:    #a9b4c0;
  --muted:     #5b6b7c;
  --accent:    #e8a33d;   /* amber */
  --ok:        #5fd38d;   /* status green, used sparingly */
  --todo:      #c2410c;   /* placeholder outline colour */
}
[data-theme="light"] {
  --bg:        #f4efe6;
  --surface:   #fbf8f2;
  --surface-2: #efe8dc;
  --line:      #ddd3c3;
  --line-2:    #cbbfac;
  --text:      #161b21;
  --text-2:    #46505b;
  --muted:     #7a838d;
  --accent:    #b86e0f;
  --ok:        #1f8a4c;
  --todo:      #c2410c;
}
```
Also respect `prefers-color-scheme` on first visit; the toggle overrides it and is saved in `localStorage` (wrapped in try/catch).

### 7.2 Type

- Headings and names: **Instrument Serif** italic (fallback Georgia, serif).
- Body: **Inter** 400/500, 16–17px, line-height 1.6.
- Labels, numbers, tech lines, section indices: **JetBrains Mono** 400/500, uppercase, letter-spacing 0.15–0.2em, 10–12px.
- Section headers follow the pattern `01 — SURVEYOR` in mono amber, with a thin rule under them.

### 7.3 Layout rules

- Max content width 1120px; 16px side gutter on phones, 24px on desktop.
- Sharp corners (border-radius 0–2px). 1px borders in `--line-2`. No drop shadows, no gradients on cards, no glassmorphism.
- A faint 40px grid in `--line` behind the hero only.
- Generous vertical spacing between sections (96–128px desktop, 64px mobile).

### 7.4 Things to avoid (keeps it from looking templated)

- No purple/blue gradients, no emoji, no "Hi, I'm…👋", no typing-text effect, no skill-percentage bars, no stock illustrations, no testimonials section.

---

## 8. Motion and interaction

### 8.1 Hero contour canvas
- `<canvas>` behind the hero drawing ~12 concentric, slightly wobbly closed contour loops in `--accent` at decreasing opacity, centred left of the name, plus a small solid amber dot at the centre.
- Very slow drift (a loop's wobble phase shifts over ~20s). Cursor movement nudges the centre a few pixels (parallax). Redraw on resize and theme change.
- Pause when the tab is hidden or the hero is off-screen (IntersectionObserver).
- `prefers-reduced-motion: reduce` → draw once, static.

### 8.2 Other motion
- Sections fade/slide up 12px on first scroll into view (IntersectionObserver, once).
- Project card hover: border turns amber, glyph lines animate (stroke-dashoffset draw-in), arrow `↗` shifts 2px.
- All transitions 150–300ms, ease-out. Nothing loops except the hero canvas.

### 8.3 Small details
- Copy-email button shows "Copied" for 1.5s.
- Active nav link highlights based on scroll position.
- Keyboard: all interactive elements reachable with Tab; visible amber focus ring.

---

## 9. Components

### 9.1 Field (label/value pair)
Mono muted label on top, serif value below.

### 9.2 Project card (home page)
Row layout on desktop, stacked on mobile:
`[entry no.] [60×50 glyph box] [Name (italic serif) / one-liner / TECH LINE (mono amber)] [badge · VIEW ↗]`
Whole card is one link to the case-study page.

### 9.3 Badge
Mono uppercase, 1px border, small padding, `--muted` text.

### 9.4 Pipeline diagram
Inline SVG, boxes with 1px `--line-2` stroke, labels in mono, arrows in `--accent`. Must use CSS variables so it switches with the theme. Scrolls horizontally inside its own container on phones rather than shrinking text below 11px.

### 9.5 Placeholder box
For [FILL]/[TODO]: dashed 1px `--todo` border, mono text "TODO: …". Easy to spot, easy to search for (`data-todo` attribute on each).

---

## 10. Quality requirements

- **Responsive:** looks right at 360, 768, 1024, 1440px. No horizontal page scroll at any width.
- **Accessibility:** semantic landmarks (`header`, `nav`, `main`, `section`, `footer`); one `h1` per page; alt text on every image; colour contrast ≥ 4.5:1 for body text in both themes; skip-to-content link.
- **Performance:** total page weight under 500 KB excluding screenshots; screenshots `loading="lazy"` with width/height set; fonts with `display=swap`; no JS framework.
- **SEO / sharing:** unique `<title>` and meta description per page; Open Graph + Twitter tags; `og-image.png`; `favicon.svg` (amber "CS" or contour mark).
- **Robustness:** site works with JavaScript disabled (content visible, only animations/theme toggle missing).
- **404 page** in the same theme: "Off the map." with a link home.

---

## 11. Build stages (commit after each)

1. **Skeleton** — folder structure, `main.css` tokens + base typography, top bar, footer, empty sections on `index.html`. ✅ Check: page opens via file://, theme toggle works and persists.
2. **Home content** — hero (static first), About field-notes card, project cards with glyphs, skills, contact. ✅ Check: all four cards link to (empty) case-study pages; layout good at 360px and 1440px.
3. **Case-study template** — build `cascade.html` fully from section 5.2, including placeholder handling and pipeline SVG. ✅ Check: missing screenshots show placeholders, not broken images.
4. **Remaining case studies** — ReturnLoop, SME Pulse, Chart Reader. **Before writing each, clone/read its repo README and docs** and resolve every [VERIFY] you can. ✅ Check: every number on the page is traceable to section 6 or the repo.
5. **Motion** — hero contour canvas, scroll reveals, card hovers, reduced-motion handling.
6. **Polish** — meta tags, OG image (render a 1200×630 hero-style image), favicon, 404, README with run/deploy steps.
7. **Audit** — run Lighthouse (or equivalent) and fix anything under 90 in Accessibility/Best Practices/SEO. Then print a list of every remaining `data-todo` placeholder, grouped by page, so Chirag knows exactly what to fill.

---

## 12. Final acceptance checklist

- [ ] Four projects in order Cascade → ReturnLoop → SME Pulse → Chart Reader, each with its own page.
- [ ] No invented features, numbers or roles; every [VERIFY] either resolved from the repo or left as a visible TODO.
- [ ] SME Pulse page clearly says results are from simulation and hardware is planned.
- [ ] Chart Reader page does not claim features absent from its repo.
- [ ] Dark and light themes both readable; toggle persists.
- [ ] Works on file://, GitHub Pages and Vercel with no build step.
- [ ] No horizontal scroll at 360px; keyboard navigable; reduced motion respected.
- [ ] README explains: how to open locally, where to drop screenshots/résumé, how to deploy.
- [ ] Final reply lists all remaining TODOs.