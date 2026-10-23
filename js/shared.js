/* Shared behaviour for every Calibra page:
   - injects the header, footer, and skip link so navigation stays consistent
   - wires the Exit button and mobile menu
   - applies accessibility settings held in memory for the current page view */
(function () {
  var cfg = window.CALIBRA_CONFIG || {};

  var NAV = [
    { href: "index.html", label: "Home" },
    { href: "how-it-works.html", label: "How It Works" },
    { href: "scenarios.html", label: "Scenarios" },
    { href: "guide.html", label: "Calibra Guide" },
    { href: "support.html", label: "Support" },
    { href: "about-research.html", label: "About the Research" },
    { href: "privacy.html", label: "Privacy" },
    { href: "settings.html", label: "Settings" }
  ];

  var LOGO = '<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">' +
    '<circle cx="20" cy="20" r="18" fill="#5B2A5E"/>' +
    '<path d="M24 12.5a9 9 0 1 0 0 15" fill="none" stroke="#E9E1F4" stroke-width="3.2" stroke-linecap="round"/>' +
    '<circle cx="28" cy="20" r="2.4" fill="#C9B6E4"/></svg>';

  function currentFile() {
    var p = window.location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function buildHeader() {
    var here = currentFile();
    var links = NAV.map(function (item) {
      var current = item.href === here ? ' aria-current="page"' : "";
      return '<li><a href="' + item.href + '"' + current + ">" + item.label + "</a></li>";
    }).join("");

    return '<a class="skip-link" href="#main">Skip to main content</a>' +
      '<header class="site-header" id="site-header">' +
      '<div class="container">' +
      '<a class="logo" href="index.html" aria-label="Calibra home">' + LOGO + "<span>Calibra</span></a>" +
      '<div class="header-actions">' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-wrap">Menu</button>' +
      '<button class="exit-btn" type="button" data-exit="true" aria-label="Exit Calibra and leave this page">Exit</button>' +
      "</div>" +
      '<div class="nav-wrap" id="nav-wrap"><nav aria-label="Main navigation"><ul class="nav-list">' + links + "</ul></nav></div>" +
      "</div></header>";
  }

  function buildFooter() {
    return '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
      '<div><p><strong>Calibra</strong> is a non-diagnostic reflection and support-navigation prototype for a student research project. ' +
      "It is not therapy, diagnosis, or emergency support.</p>" +
      '<p class="footer-note" style="border:0;margin:0;padding:0">Project information: student research prototype. Contact details will be added once the project team has confirmed them.</p></div>' +
      '<nav aria-label="Footer navigation"><ul><li><a href="privacy.html">Privacy and Safety</a></li>' +
      '<li><a href="support.html">Support Resources</a></li><li><a href="about-research.html">About the Research</a></li></ul></nav>' +
      '<nav aria-label="Project navigation"><ul><li><a href="how-it-works.html">How Calibra Works</a></li>' +
      '<li><a href="settings.html">Accessibility and Settings</a></li><li><a href="research-demo.html">Research Assessment Demo</a></li></ul></nav>' +
      "</div>" +
      '<p class="footer-note">Calibra does not diagnose, treat, or replace qualified professionals. In immediate danger, contact a trusted adult and local emergency services.</p>' +
      "</div></footer>";
  }

  function wireHeader() {
    var toggle = document.querySelector(".nav-toggle");
    var header = document.getElementById("site-header");
    if (toggle && header) {
      toggle.addEventListener("click", function () {
        var open = header.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
    document.querySelectorAll("[data-exit]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        // Leaves Calibra. Nothing is saved, so no data is cleared or transmitted.
        window.location.href = cfg.exitUrl || "index.html";
      });
    });
  }

  // Injects header and footer into placeholders, then wires behaviour.
  function mount() {
    var h = document.getElementById("site-header-mount");
    if (h) h.outerHTML = buildHeader();
    var f = document.getElementById("site-footer-mount");
    if (f) f.outerHTML = buildFooter();
    wireHeader();
  }

  // Shared helper: show or hide a notice, with an accessible live region.
  window.CalibraUI = {
    announce: function (message) {
      var region = document.getElementById("live-region");
      if (!region) {
        region = document.createElement("div");
        region.id = "live-region";
        region.className = "sr-only";
        region.setAttribute("aria-live", "polite");
        document.body.appendChild(region);
      }
      region.textContent = "";
      window.setTimeout(function () { region.textContent = message; }, 50);
    },
    // Reads a predefined choice ID from the URL (never personal data).
    getParam: function (name) {
      return new URLSearchParams(window.location.search).get(name);
    },
    // Builds a query string for passing predefined IDs between pages.
    link: function (page, params) {
      var q = Object.keys(params || {}).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
      }).join("&");
      return page + (q ? "?" + q : "");
    },
    // Icons: simple line icons, decorative (aria-hidden).
    icon: function (name) {
      var paths = {
        chat: '<path d="M4 5h16v11H8l-4 4z"/>',
        users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.6-3 3-5 6-5s5.4 2 6 5"/><path d="M16 5.5a3 3 0 0 1 0 5.5M18 14c1.6.6 2.8 2.2 3 5"/>',
        ban: '<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
        help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7v.5"/><circle cx="12" cy="17" r=".6"/>',
        book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/>',
        shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/>',
        pause: '<circle cx="12" cy="12" r="8.5"/><path d="M10 9v6M14 9v6"/>',
        search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
        compass: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
        lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
        flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
        eye: '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>'
      };
      return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (paths[name] || "") + "</svg>";
    }
  };

  // Honour the OS reduced-motion setting explicitly for scripted animations too.
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("reduce-motion");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
