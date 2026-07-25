/* =========================================================
   EDITKARO.IN — script.js
   ========================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const catLabel = {
    "short-form": "Short-form videos",
    "long-form": "Long-form videos",
    "gaming": "Gaming videos",
    "football": "Football edits",
    "ecommerce": "eCommerce ads",
    "documentary": "Documentary style",
    "color-grading": "Color grading",
    "anime": "Anime videos",
    "ads": "Ads"
  };

  /* ---------------------------------------------------------
     Real reference videos (public YouTube, embedded via the
     standard YouTube player, which always shows its own
     channel name/branding — so nothing here is presented as
     Editkaro's own footage). Swap these ytId values for real
     client cuts once available.
  --------------------------------------------------------- */
  const videoCredits = {
    "g4iTjJ66js8": { creator: "Ameya Khanolkar", url: "https://www.youtube.com/watch?v=g4iTjJ66js8" },
    "6oxHFaUfcvI": { creator: "EditedByMario", url: "https://www.youtube.com/watch?v=6oxHFaUfcvI" },
    "zFuJgOiUEso": { creator: "Sujith Rajendran", url: "https://www.youtube.com/watch?v=zFuJgOiUEso" },
    "acoMwXjhamk": { creator: "Oculus Films", url: "https://www.youtube.com/watch?v=acoMwXjhamk" }
  };

  /* ---------------------------------------------------------
     Project data — sample catalogue covering every category
     from the brief. Swap thumbnails for real client stills
     when available; the gradient placeholders keep the grid
     consistent until then.
  --------------------------------------------------------- */
  const projects = [
    { cat: "short-form", title: "Hook in 3 Seconds", desc: "Reel series for a D2C skincare drop.", aspect: "9-16", duration: "00:00:09", tags: ["Reels", "CapCut", "Captions"], ytId: "g4iTjJ66js8" },
    { cat: "short-form", title: "Behind the Counter", desc: "Café story-series, daily posting cadence.", aspect: "9-16", duration: "00:00:14", tags: ["Reels", "Premiere Pro"], ytId: "g4iTjJ66js8" },
    { cat: "long-form", title: "The Roaster's Table", desc: "12-minute founder interview & process film.", aspect: "16-9", duration: "00:11:40", tags: ["YouTube", "Resolve", "Sound design"], ytId: "6oxHFaUfcvI" },
    { cat: "long-form", title: "Studio Sessions Ep. 04", desc: "Long-form music documentary cut.", aspect: "16-9", duration: "00:16:05", tags: ["YouTube", "Multicam"], ytId: "6oxHFaUfcvI" },
    { cat: "gaming", title: "Clutch Reel — Valorant", desc: "Highlight montage synced to beat drops.", aspect: "16-9", duration: "00:02:20", tags: ["After Effects", "Beat-sync"], ytId: "zFuJgOiUEso" },
    { cat: "gaming", title: "Season Recap", desc: "Esports team season highlight package.", aspect: "9-16", duration: "00:00:45", tags: ["Motion titles"], ytId: "zFuJgOiUEso" },
    { cat: "football", title: "Derby Day Highlights", desc: "Match recap edit for a local club channel.", aspect: "16-9", duration: "00:04:10", tags: ["Sports graphics", "Premiere Pro"], ytId: "acoMwXjhamk" },
    { cat: "football", title: "Skill Reel — U19s", desc: "Player highlight reel for recruitment.", aspect: "9-16", duration: "00:01:05", tags: ["Slow-mo", "Captions"], ytId: "acoMwXjhamk" },
    { cat: "ecommerce", title: "Unbox & Convert", desc: "Product unboxing ad for a Shopify store.", aspect: "9-16", duration: "00:00:22", tags: ["Meta Ads", "Hook-driven"], ytId: "g4iTjJ66js8" },
    { cat: "ecommerce", title: "Feature Walkthrough", desc: "eCommerce feature explainer with UGC cutdowns.", aspect: "16-9", duration: "00:00:38", tags: ["Motion graphics"], ytId: "g4iTjJ66js8" },
    { cat: "documentary", title: "Foothill Roasters", desc: "Origin-story documentary, teal & amber grade.", aspect: "16-9", duration: "00:08:52", tags: ["Resolve", "Color grading"], ytId: "6oxHFaUfcvI" },
    { cat: "documentary", title: "Makers of the Old Quarter", desc: "Short observational documentary series.", aspect: "16-9", duration: "00:06:18", tags: ["Field audio", "Resolve"], ytId: "6oxHFaUfcvI" },
    { cat: "color-grading", title: "Grade Pass — Wedding Reel", desc: "Full LUT-based grade for a wedding highlight film.", aspect: "16-9", duration: "00:03:30", tags: ["LUTs", "Resolve"], ytId: "zFuJgOiUEso" },
    { cat: "color-grading", title: "Grade Pass — Travel Vlog", desc: "Warm cinematic grade over log footage.", aspect: "16-9", duration: "00:05:12", tags: ["Color wheels"], ytId: "zFuJgOiUEso" },
    { cat: "anime", title: "AMV — Ember & Ash", desc: "Fan edit with beat-synced transitions.", aspect: "9-16", duration: "00:00:58", tags: ["After Effects", "Beat-sync"], ytId: "acoMwXjhamk" },
    { cat: "anime", title: "Character Spotlight", desc: "Anime edit series for a fan community page.", aspect: "9-16", duration: "00:00:34", tags: ["Motion titles"], ytId: "acoMwXjhamk" },
    { cat: "ads", title: "Launch Day 15s", desc: "Paid social ad for an app launch.", aspect: "9-16", duration: "00:00:15", tags: ["Meta Ads", "A/B cuts"], ytId: "g4iTjJ66js8" },
    { cat: "ads", title: "Brand Film — 30s TVC", desc: "Broadcast-ready brand ad, full grade & mix.", aspect: "16-9", duration: "00:00:30", tags: ["Broadcast", "Sound mix"], ytId: "g4iTjJ66js8" }
  ];

  /* ---------------------------------------------------------
     Preloader
  --------------------------------------------------------- */
  function runPreloader() {
    const pre = document.getElementById("preloader");
    const fill = document.getElementById("preloaderFill");
    const code = document.getElementById("preloaderCode");
    if (reduceMotion) { pre.classList.add("is-done"); return; }

    let frame = 0;
    const totalFrames = 48; // ~2s at 24fps feel
    const timer = setInterval(() => {
      frame++;
      const pct = Math.min(100, (frame / totalFrames) * 100);
      fill.style.width = pct + "%";
      const ff = String(frame % 24).padStart(2, "0");
      const ss = String(Math.floor(frame / 24)).padStart(2, "0");
      code.textContent = `00:00:${ss}:${ff}`;
      if (frame >= totalFrames) {
        clearInterval(timer);
        pre.classList.add("is-done");
      }
    }, 40);
  }

  /* ---------------------------------------------------------
     Timeline nav — scroll-synced playhead + active chapter
  --------------------------------------------------------- */
  function initTimelineNav() {
    const fill = document.getElementById("timelineFill");
    const playhead = document.getElementById("timelinePlayhead");
    const chapters = Array.from(document.querySelectorAll(".chapter"));
    const sections = chapters
      .map((c) => document.getElementById(c.dataset.target))
      .filter(Boolean);

    function update() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(100, (scrollTop / max) * 100) : 0;
      fill.style.width = pct + "%";
      playhead.style.left = pct + "%";

      let activeIndex = 0;
      const probe = scrollTop + window.innerHeight * 0.35;
      sections.forEach((sec, i) => {
        if (sec.offsetTop <= probe) activeIndex = i;
      });
      chapters.forEach((c, i) => c.classList.toggle("is-active", i === activeIndex));
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------------------------------------------------------
     Mobile menu
  --------------------------------------------------------- */
  function initMobileMenu() {
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  }

  /* ---------------------------------------------------------
     Hero player — aspect ratio toggle + fake timecode tick
  --------------------------------------------------------- */
  function initHeroPlayer() {
    const frame = document.getElementById("playerFrame");
    const badge = document.getElementById("aspectBadge");
    const toggleBtn = document.getElementById("aspectToggle");
    const video = document.getElementById("heroVideo");
    const playBtn = document.getElementById("playerPlay");
    if (!frame || !toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
      const isWide = frame.dataset.aspect === "16-9";
      frame.dataset.aspect = isWide ? "9-16" : "16-9";
      badge.textContent = isWide ? "9:16" : "16:9";
    });

    if (video && playBtn) {
      playBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        playBtn.innerHTML = video.muted
          ? '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>'
          : '<svg viewBox="0 0 24 24" width="22" height="22"><rect x="6" y="5" width="4" height="14" fill="currentColor"/><rect x="14" y="5" width="4" height="14" fill="currentColor"/></svg>';
      });
    }

    if (!reduceMotion) {
      const timeEl = document.getElementById("playerTime");
      let f = 12, s = 3;
      setInterval(() => {
        f++;
        if (f > 23) { f = 0; s++; if (s > 9) s = 0; }
        timeEl.textContent = `00:00:0${s}:${String(f).padStart(2, "0")}`;
      }, 90);
    }
  }

  /* ---------------------------------------------------------
     Build project grid
  --------------------------------------------------------- */
  function buildGrid() {
    const grid = document.getElementById("grid");
    const frag = document.createDocumentFragment();

    projects.forEach((p, idx) => {
      const card = document.createElement("article");
      card.className = "card";
      card.dataset.category = p.cat;

      card.innerHTML = `
        <div class="card__thumb" data-aspect="${p.aspect}" data-index="${idx}" data-cursor="PLAY" tabindex="0" role="button" aria-label="Open preview: ${p.title}">
          <img src="https://img.youtube.com/vi/${p.ytId}/hqdefault.jpg" alt="" loading="lazy" />
          <div class="card__badges">
            <span class="card__badge">${p.aspect === "9-16" ? "9:16" : "16:9"}</span>
          </div>
          <button class="card__play" tabindex="-1" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
          </button>
          <span class="card__duration">${p.duration}</span>
        </div>
        <div class="card__body">
          <span class="card__cat">${catLabel[p.cat]}</span>
          <h3 class="card__title">${p.title}</h3>
          <p class="card__desc">${p.desc}</p>
        </div>`;
      frag.appendChild(card);
    });

    grid.appendChild(frag);
  }

  /* ---------------------------------------------------------
     Filters
  --------------------------------------------------------- */
  function initFilters() {
    const buttons = Array.from(document.querySelectorAll(".filter"));
    const cards = () => Array.from(document.querySelectorAll(".card"));

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        const filter = btn.dataset.filter;
        cards().forEach((card) => {
          const match = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  /* ---------------------------------------------------------
     Lightbox
  --------------------------------------------------------- */
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const backdrop = document.getElementById("lightboxBackdrop");
    const closeBtn = document.getElementById("lightboxClose");
    const thumbEl = document.getElementById("lightboxThumb");
    const watchEl = document.getElementById("lightboxWatch");
    const catEl = document.getElementById("lightboxCat");
    const titleEl = document.getElementById("lightboxTitle");
    const descEl = document.getElementById("lightboxDesc");
    const tagsEl = document.getElementById("lightboxTags");
    const aspectEl = document.getElementById("lightboxAspect");
    const creditEl = document.getElementById("lightboxCredit");

    let lastFocused = null;

    function open(project) {
      thumbEl.src = `https://img.youtube.com/vi/${project.ytId}/hqdefault.jpg`;
      watchEl.href = `https://www.youtube.com/watch?v=${project.ytId}`;
      catEl.textContent = catLabel[project.cat];
      titleEl.textContent = project.title;
      descEl.textContent = project.desc;
      aspectEl.textContent = project.aspect === "9-16" ? "9:16" : "16:9";
      tagsEl.innerHTML = project.tags.map((t) => `<span>${t}</span>`).join("");

      const credit = videoCredits[project.ytId];
      creditEl.innerHTML = credit
        ? `Reference clip via <a href="${credit.url}" target="_blank" rel="noopener">${credit.creator} on YouTube</a> — used as a stand-in, swap for real Editkaro footage when available.`
        : "";

      lastFocused = document.activeElement;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    document.getElementById("grid").addEventListener("click", (e) => {
      const thumb = e.target.closest(".card__thumb");
      if (!thumb) return;
      open(projects[Number(thumb.dataset.index)]);
    });
    document.getElementById("grid").addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const thumb = e.target.closest(".card__thumb");
      if (!thumb) return;
      e.preventDefault();
      open(projects[Number(thumb.dataset.index)]);
    });

    backdrop.addEventListener("click", close);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
    });
  }

  /* ---------------------------------------------------------
     Stats count-up on scroll into view
  --------------------------------------------------------- */
  function initStats() {
    const nums = document.querySelectorAll(".stat__num");
    if (!nums.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach((n) => (n.textContent = n.dataset.count));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    nums.forEach((n) => observer.observe(n));
  }

  /* ---------------------------------------------------------
     Before / after compare slider
  --------------------------------------------------------- */
  function initCompareSlider() {
    const compare = document.getElementById("compare");
    const before = document.getElementById("compareBefore");
    const handle = document.getElementById("compareHandle");
    if (!compare) return;

    let dragging = false;

    function setPosition(clientX) {
      const rect = compare.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + "%";
      handle.setAttribute("aria-valuenow", Math.round(pct));
    }

    function onMove(e) {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(x);
    }

    compare.addEventListener("pointerdown", (e) => { dragging = true; setPosition(e.clientX); });
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", () => (dragging = false));

    handle.addEventListener("keydown", (e) => {
      const current = parseFloat(handle.style.left) || 50;
      if (e.key === "ArrowLeft") { setPosition(compare.getBoundingClientRect().left + (compare.clientWidth * (current - 5) / 100)); }
      if (e.key === "ArrowRight") { setPosition(compare.getBoundingClientRect().left + (compare.clientWidth * (current + 5) / 100)); }
    });
  }

  /* ---------------------------------------------------------
     Contact form — client-side only, no backend
  --------------------------------------------------------- */
  function initForm() {
    const form = document.getElementById("contactForm");
    const toast = document.getElementById("toast");
    if (!form) return;

    let toastTimer;
    function showToast(msg) {
      toast.textContent = msg;
      toast.classList.add("is-visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      Array.from(form.elements).forEach((el) => {
        if (!el.name) return;
        const field = el.closest(".field");
        if (el.hasAttribute("required") && !el.value.trim()) {
          valid = false;
          if (field) field.classList.add("has-error");
        } else if (field) {
          field.classList.remove("has-error");
        }
      });

      if (!valid) {
        showToast("Please fill in every field before sending.");
        return;
      }
      showToast("Brief received — we'll reply within 24h.");
      form.reset();
    });
  }

  /* ---------------------------------------------------------
     Custom cursor — a trailing dot that shows a short
     contextual word over specific elements. Unlike a magnetic
     cursor, it never resizes or snaps to anything; it only
     follows the pointer with a short, smooth delay.
  --------------------------------------------------------- */
  function initCursor() {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer || reduceMotion) return;

    document.body.classList.add("has-fine-pointer");
    const cursor = document.getElementById("cursor");
    const label = document.getElementById("cursorLabel");
    if (!cursor || !label) return;

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let x = mouseX, y = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function loop() {
      x += (mouseX - x) * 0.22;
      y += (mouseY - y) * 0.22;
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    document.addEventListener("mouseover", (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        label.textContent = target.dataset.cursor;
        label.classList.add("is-visible");
      }
    });
    document.addEventListener("mouseout", (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target && !e.relatedTarget?.closest("[data-cursor]")) {
        label.classList.remove("is-visible");
      }
    });
  }

  /* ---------------------------------------------------------
     Init
  --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    runPreloader();
    initTimelineNav();
    initMobileMenu();
    initHeroPlayer();
    buildGrid();
    initFilters();
    initLightbox();
    initStats();
    initCompareSlider();
    initForm();
    initCursor();
  });
})();
