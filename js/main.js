/* =========================================================
   Portfolio — shared script.
   The page is fully readable without this file; it only adds
   the theme toggle, the mobile menu and small extras.
   ========================================================= */

/* ---------- Theme toggle ---------- */
// The starting theme is set by a tiny script in each page's <head>,
// so the page never flashes the wrong colours. This part handles clicks.

function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    // Storage can be blocked (private windows, file:// in some browsers). Ignore it.
  }
}

function updateToggleLabel(button) {
  var current = document.documentElement.getAttribute("data-theme");
  var next = current === "light" ? "dark" : "light";
  button.setAttribute("aria-label", "Switch to " + next + " theme");
}

var themeButton = document.querySelector(".theme-toggle");

if (themeButton) {
  updateToggleLabel(themeButton);

  themeButton.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    saveTheme(next);
    updateToggleLabel(themeButton);
    // Let other parts of the page (the hero canvas) redraw in the new colours.
    document.dispatchEvent(new Event("themechange"));
  });
}

/* ---------- Mobile menu ---------- */

var menuButton = document.querySelector(".menu-btn");
var siteNav = document.querySelector(".site-nav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", function () {
    var isOpen = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close the menu after picking a link.
  siteNav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      siteNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------- Copy email ---------- */

// Older fallback for browsers where navigator.clipboard isn't available.
function copyWithTextarea(text) {
  var box = document.createElement("textarea");
  box.value = text;
  box.setAttribute("readonly", "");
  box.style.position = "absolute";
  box.style.left = "-9999px";
  document.body.appendChild(box);
  box.select();
  var ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (e) {
    ok = false;
  }
  document.body.removeChild(box);
  return ok;
}

function showCopied(button, status) {
  button.textContent = "Copied";
  if (status) status.textContent = "Email copied to clipboard";
  setTimeout(function () {
    button.textContent = "Copy";
    if (status) status.textContent = "";
  }, 1500);
}

var copyButtons = document.querySelectorAll(".btn-copy");
for (var c = 0; c < copyButtons.length; c++) {
  copyButtons[c].addEventListener("click", function () {
    var button = this;
    var text = button.getAttribute("data-copy");
    var status = button.parentNode.querySelector(".copy-status");
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { showCopied(button, status); },
        function () { if (copyWithTextarea(text)) showCopied(button, status); }
      );
    } else if (copyWithTextarea(text)) {
      showCopied(button, status);
    }
  });
}

/* ---------- Reduced motion ---------- */

var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Scroll reveal ---------- */
// Each section fades up once, the first time it scrolls into view.

if (!reduceMotion && "IntersectionObserver" in window) {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target); // only once
      }
    });
  }, { threshold: 0.1 });

  var revealTargets = document.querySelectorAll(".section, .case-section");
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

/* ---------- Active nav link ---------- */
// Highlight Projects / About / Contact while that section is on screen.

var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

if (navLinks.length && "IntersectionObserver" in window) {
  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (link) {
        var isMatch = link.getAttribute("href") === "#" + entry.target.id;
        link.classList.toggle("is-active", isMatch);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" }); // a thin band across the middle of the screen

  navLinks.forEach(function (link) {
    var section = document.querySelector(link.getAttribute("href"));
    if (section) navObserver.observe(section);
  });

  // The hero has no nav link, so reaching it clears the highlight.
  var heroSection = document.querySelector(".hero");
  if (heroSection) navObserver.observe(heroSection);
}

/* ---------- Hero contour canvas ---------- */
// About 12 wobbly closed contour lines around a small amber dot, like a
// topographic map. They drift slowly and lean a few pixels toward the cursor.

var hero = document.querySelector(".hero");
var canvas = document.querySelector(".hero-canvas");

if (hero && canvas && canvas.getContext) {
  var ctx = canvas.getContext("2d");
  var LOOPS = 12;
  var POINTS = 120;          // points per loop
  var CYCLE_MS = 20000;      // one full wobble cycle takes about 20 seconds
  var width = 0;
  var height = 0;
  var accent = "#e8a33d";
  var mouseX = 0;            // cursor offset from the hero centre, -1 to 1
  var mouseY = 0;
  var shiftX = 0;            // current parallax shift in pixels (eases toward the cursor)
  var shiftY = 0;
  var heroOnScreen = true;
  var frameId = null;

  // Each loop's wobble is only slightly shifted from its neighbour's,
  // so the lines stay nested and never cross, like real contour lines.
  var phases = [];
  for (var p = 0; p < LOOPS; p++) {
    phases.push([p * 0.12, 1 + p * 0.2, 2 + p * 0.3]);
  }

  function readAccent() {
    accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || accent;
  }

  function resize() {
    var ratio = window.devicePixelRatio || 1;
    width = hero.clientWidth;
    height = hero.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); // draw in CSS pixels
  }

  function draw(time) {
    var t = (time / CYCLE_MS) * Math.PI * 2;

    // Centre sits left of the name, a little lower than the middle.
    var cx = Math.max(width * 0.22, 120) + shiftX;
    var cy = height * 0.55 + shiftY;
    var spacing = Math.max(width, height) / 30;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1;

    for (var i = 0; i < LOOPS; i++) {
      var radius = 24 + (i + 1) * spacing;
      var ph = phases[i];
      ctx.globalAlpha = 0.5 - i * 0.035; // fainter as the loops get bigger
      ctx.beginPath();

      for (var k = 0; k <= POINTS; k++) {
        var angle = (k / POINTS) * Math.PI * 2;
        // A few slow sine waves bend the circle into a contour shape.
        var wobble =
          0.10 * Math.sin(2 * angle + ph[0] + t) +
          0.05 * Math.sin(3 * angle + ph[1] - t) +
          0.03 * Math.sin(5 * angle + ph[2] + t * 2);
        var r = radius * (1 + wobble);
        var x = cx + Math.cos(angle) * r * 1.25; // a bit wider than tall
        var y = cy + Math.sin(angle) * r;
        if (k === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // The small solid dot at the centre.
    ctx.globalAlpha = 1;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  function frame(time) {
    // Ease the parallax shift toward the cursor (at most 8px).
    shiftX += (mouseX * 8 - shiftX) * 0.05;
    shiftY += (mouseY * 8 - shiftY) * 0.05;
    draw(time);
    frameId = requestAnimationFrame(frame);
  }

  function start() {
    if (frameId === null && heroOnScreen && !document.hidden) {
      frameId = requestAnimationFrame(frame);
    }
  }

  function stop() {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  readAccent();
  resize();

  if (reduceMotion) {
    // Draw once and keep it still.
    draw(0);
    window.addEventListener("resize", function () { resize(); draw(0); });
    document.addEventListener("themechange", function () { readAccent(); draw(0); });
  } else {
    window.addEventListener("resize", resize);
    document.addEventListener("themechange", readAccent);

    hero.addEventListener("mousemove", function (event) {
      var box = hero.getBoundingClientRect();
      mouseX = (event.clientX - box.left) / box.width * 2 - 1;
      mouseY = (event.clientY - box.top) / box.height * 2 - 1;
    });

    // Pause while the tab is hidden...
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });

    // ...and while the hero is scrolled off screen.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        heroOnScreen = entries[0].isIntersecting;
        if (heroOnScreen) start();
        else stop();
      }).observe(hero);
    }

    start();
  }
}

/* ---------- Footer year ---------- */

var yearSpans = document.querySelectorAll(".year");
for (var i = 0; i < yearSpans.length; i++) {
  yearSpans[i].textContent = new Date().getFullYear();
}
