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

/* ---------- Footer year ---------- */

var yearSpans = document.querySelectorAll(".year");
for (var i = 0; i < yearSpans.length; i++) {
  yearSpans[i].textContent = new Date().getFullYear();
}
