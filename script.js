/* ============================================================
   Discrete Mathematics — Study Notes
   Theme, mobile nav, search, copy-to-clipboard, progress
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  var THEME_KEY = "dm-notes-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0c1519" : "#0f2727");
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      var sun = btn.querySelector(".icon-sun");
      var moon = btn.querySelector(".icon-moon");
      if (sun && moon) {
        sun.style.display = theme === "dark" ? "block" : "none";
        moon.style.display = theme === "dark" ? "none" : "block";
      }
    });
  }

  var stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
  var initial = stored || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(initial);

  document.addEventListener("click", function (e) {
    var toggle = e.target.closest("[data-theme-toggle]");
    if (toggle) {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (err) {}
    }
  });

  /* ---------- Mobile navigation ---------- */
  var body = document.body;
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var overlay = document.querySelector(".nav-overlay");

  function closeNav() { body.classList.remove("nav-open"); if (menuBtn) menuBtn.setAttribute("aria-expanded", "false"); }
  function openNav() { body.classList.add("nav-open"); if (menuBtn) menuBtn.setAttribute("aria-expanded", "true"); }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      body.classList.contains("nav-open") ? closeNav() : openNav();
    });
  }
  if (overlay) overlay.addEventListener("click", closeNav);
  document.querySelectorAll(".sidebar a").forEach(function (a) {
    a.addEventListener("click", function () { if (window.innerWidth <= 900) closeNav(); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeNav(); closeSearch(); }
  });

  /* ---------- Reading progress ---------- */
  var bar = document.querySelector(".progress-bar");
  var backTop = document.querySelector(".back-top");
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = pct.toFixed(2) + "%";
    if (backTop) backTop.classList.toggle("show", h.scrollTop > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (backTop) backTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- Search (current page) ---------- */
  var searchInput = document.querySelector("[data-search]");
  var resultsBox = document.querySelector("[data-search-results]");
  var pageHeadings = [];

  function slugify(s) {
    return s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  }

  function buildIndex() {
    pageHeadings = [];
    document.querySelectorAll(".content h2, .content h3").forEach(function (h) {
      if (!h.id) h.id = slugify(h.textContent.replace(/¶/g, ""));
      // heading text without the anchor link
      var clone = h.cloneNode(true);
      var al = clone.querySelector(".anchor-link");
      if (al) al.remove();
      pageHeadings.push({ id: h.id, text: clone.textContent.trim(), level: h.tagName });
    });
  }

  function closeSearch() {
    if (resultsBox) { resultsBox.classList.remove("open"); resultsBox.innerHTML = ""; }
  }

  function openResult(id, text) {
    var el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#" + id);
    }
    closeSearch();
    if (searchInput) { searchInput.value = ""; searchInput.blur(); }
  }

  if (searchInput && resultsBox) {
    buildIndex();

    searchInput.addEventListener("input", function () {
      var q = searchInput.value.trim().toLowerCase();
      resultsBox.innerHTML = "";
      if (!q) { resultsBox.classList.remove("open"); return; }

      var matches = pageHeadings.filter(function (h) { return h.text.toLowerCase().indexOf(q) !== -1; }).slice(0, 10);
      if (!matches.length) {
        resultsBox.innerHTML = '<div class="search-empty">No section found on this page.</div>';
        resultsBox.classList.add("open");
        return;
      }
      matches.forEach(function (m) {
        var a = document.createElement("a");
        a.className = "search-result";
        a.href = "#" + m.id;
        a.innerHTML = '<span class="sr-topic">' + (m.level === "H2" ? "Section" : "Subsection") + "</span>" + escapeHtml(m.text);
        a.addEventListener("click", function (ev) { ev.preventDefault(); openResult(m.id, m.text); });
        resultsBox.appendChild(a);
      });
      resultsBox.classList.add("open");
    });

    searchInput.addEventListener("focus", function () {
      if (searchInput.value.trim()) searchInput.dispatchEvent(new Event("input"));
    });

    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = resultsBox.querySelector(".search-result");
        if (first) { e.preventDefault(); first.click(); }
      }
      if (e.key === "ArrowDown") {
        var first = resultsBox.querySelector(".search-result");
        if (first) { e.preventDefault(); first.focus(); }
      }
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search-wrap")) closeSearch();
    });

    document.addEventListener("keydown", function (e) {
      var tag = (e.target.tagName || "").toLowerCase();
      var typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Copy code ---------- */
  document.querySelectorAll(".code-block").forEach(function (block) {
    var pre = block.querySelector("pre");
    if (!pre) return;
    var head = block.querySelector(".code-head");
    if (!head) return;
    var btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.textContent = "Copy";
    head.appendChild(btn);

    btn.addEventListener("click", function () {
      var text = pre.innerText;
      var done = function () {
        btn.textContent = "Copied";
        btn.classList.add("copied");
        setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("copied"); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
      } else { fallback(); }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- TOC scroll spy ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    var targets = tocLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        tocLinks.forEach(function (a) {
          a.style.fontWeight = a.getAttribute("href") === "#" + id ? "700" : "";
          a.style.color = a.getAttribute("href") === "#" + id ? "var(--accent)" : "";
        });
      });
    }, { rootMargin: "-18% 0px -70% 0px", threshold: 0 });
    targets.forEach(function (t) { spy.observe(t); });
  }
})();
