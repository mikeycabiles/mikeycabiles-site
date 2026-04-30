(function () {
  document.documentElement.classList.add("js-enabled");
  const page = document.body.dataset.page || "home";
  const showModal = document.body.dataset.modalOpen === "true";
  const showDrawer = document.body.dataset.drawerOpen === "true";
  const routes = {
    home: "/",
    about: "/about/",
    blog: "/blog/",
    post: "/blog/post/",
    resources: "/resources/",
    memos: "/memos/",
    links: "/links/"
  };
  const cleanPath = {
    "/index.html": routes.home,
    "/about.html": routes.about,
    "/blog.html": routes.blog,
    "/blog-post.html": routes.post,
    "/resources.html": routes.resources,
    "/memos.html": routes.memos,
    "/links.html": routes.links
  };

  if (window.location.protocol !== "file:" && cleanPath[window.location.pathname]) {
    window.history.replaceState(null, "", cleanPath[window.location.pathname]);
  }

  const nav = `
    <header class="site-header">
      <div class="container nav-row">
        <a class="brand" href="${routes.home}" aria-label="Mikey Cabiles home">
          <span class="brand-mark">MC</span>
          <span class="brand-name">Mikey Cabiles</span>
        </a>
        <nav class="nav-links" aria-label="Primary">
          <a href="${routes.about}" data-nav="about">About</a>
          <a href="${routes.blog}" data-nav="blog">Blog</a>
          <a href="${routes.resources}" data-nav="resources">Resources</a>
          <a href="${routes.memos}" data-nav="memos">Memos</a>
        </nav>
        <div class="nav-right">
          <a class="btn btn-outline-rose" href="${routes.memos}">Join Mikey's Memos</a>
          <button class="menu-toggle" aria-label="Open menu" data-open-drawer>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <aside class="mobile-drawer" data-mobile-drawer>
      <div class="drawer-top">
        <span class="brand-name">Menu</span>
        <button class="btn btn-ghost" data-close-drawer>Close</button>
      </div>
      <p class="drawer-note">AI-led personal marketing, documented in public.</p>
      <div class="drawer-links">
        <a href="${routes.about}">About</a>
        <a href="${routes.blog}">Blog</a>
        <a href="${routes.resources}">Resources</a>
        <a href="${routes.memos}">Memos</a>
        <a href="${routes.links}">Links</a>
        <button data-open-contact>Contact</button>
      </div>
      <a class="btn btn-primary drawer-cta" href="${routes.memos}">Join Mikey's Memos</a>
    </aside>
  `;

  const footer = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <h4>Mikey Cabiles</h4>
          <p class="tagline">Always grateful, never content.</p>
          <div class="social-row" aria-label="Social links">
            <a class="social-dot" href="https://www.youtube.com/@mikeycabiles" aria-label="YouTube vlog channel">YT</a>
            <a class="social-dot" href="https://www.instagram.com/mikeycabiles" aria-label="Instagram">IG</a>
            <a class="social-dot" href="#" aria-label="TikTok">TT</a>
            <a class="social-dot" href="https://www.youtube.com/@mikeycabilesbuilds" aria-label="YouTube builds channel">AI</a>
          </div>
        </div>
        <div class="footer-links">
          <a href="${routes.about}">About</a>
          <a href="${routes.blog}">Blog</a>
          <a href="${routes.resources}">Resources</a>
          <a href="${routes.memos}">Memos</a>
          <a href="${routes.links}">Links</a>
          <a href="#" data-open-contact>Contact</a>
        </div>
        <div class="footer-mini">
          <p class="eyebrow muted">Mikey's Memos</p>
          <p>One practical AI-led personal marketing memo every week.</p>
          <div class="field-underline" style="margin-top:10px;">
            <label for="footer-email">Email</label>
            <input id="footer-email" type="email" placeholder="you@domain.com" />
          </div>
          <button class="btn btn-primary" style="margin-top:12px;">Subscribe</button>
        </div>
      </div>
      <div class="container small-copy">© 2026 Mikey Cabiles. Built in public from Western PA to St. Pete.</div>
    </footer>
  `;

  const modal = `
    <div class="contact-modal ${showModal ? "open" : ""}" data-contact-modal>
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="contact-title">
        <div class="modal-head">
          <h3 id="contact-title">Let's talk.</h3>
          <button class="modal-close" data-close-contact aria-label="Close contact modal">×</button>
        </div>
        <div class="contact-options">
          <a class="contact-option" href="sms:7244870242" data-copy-value="724-487-0242">
            <div>
              <strong>Text me</strong>
              <span>724-487-0242</span>
            </div>
            <span class="copy-hint">Copy</span>
          </a>
          <a class="contact-option" href="mailto:contact@mikeycabiles.com" data-copy-value="contact@mikeycabiles.com">
            <div>
              <strong>Email me</strong>
              <span>contact@mikeycabiles.com</span>
            </div>
            <span class="copy-hint">Copy</span>
          </a>
        </div>
      </div>
    </div>
  `;

  const navTarget = document.querySelector('[data-component="nav"]');
  if (navTarget) navTarget.innerHTML = nav;

  const footerTarget = document.querySelector('[data-component="footer"]');
  if (footerTarget) footerTarget.innerHTML = footer;

  const modalTarget = document.querySelector('[data-component="modal"]');
  if (modalTarget) modalTarget.innerHTML = modal;

  const activeLink = document.querySelector(`.nav-links [data-nav="${page}"]`);
  if (activeLink) activeLink.classList.add('active');

  const drawer = document.querySelector('[data-mobile-drawer]');
  if (showDrawer && drawer) drawer.classList.add('open');
  document.querySelectorAll('[data-open-drawer]').forEach((btn) => {
    btn.addEventListener('click', () => drawer && drawer.classList.add('open'));
  });

  document.querySelectorAll('[data-close-drawer]').forEach((btn) => {
    btn.addEventListener('click', () => drawer && drawer.classList.remove('open'));
  });

  const contactModal = document.querySelector('[data-contact-modal]');
  const openModal = () => {
    if (!contactModal) return;
    contactModal.classList.add('open');
  };

  const closeModal = () => {
    if (!contactModal) return;
    contactModal.classList.remove('open');
  };

  document.querySelectorAll('[data-open-contact]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      openModal();
      drawer && drawer.classList.remove('open');
    });
  });

  document.querySelectorAll('[data-close-contact]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  if (contactModal) {
    contactModal.addEventListener('click', (event) => {
      if (event.target === contactModal) closeModal();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      drawer && drawer.classList.remove('open');
    }
  });

  document.querySelectorAll('[data-copy-value]').forEach((link) => {
    link.addEventListener('click', async (event) => {
      if (window.matchMedia('(max-width: 768px)').matches) return;
      event.preventDefault();
      const value = link.getAttribute('data-copy-value');
      try {
        await navigator.clipboard.writeText(value || '');
        const hint = link.querySelector('.copy-hint');
        if (hint) {
          hint.textContent = 'Copied';
          setTimeout(() => {
            hint.textContent = 'Copy';
          }, 1400);
        }
      } catch (err) {
        // noop
      }
    });
  });

  const cycleWord = document.querySelector("[data-cycle-word]");
  if (cycleWord) {
    const words = ["agentic AI", "ChatGPT", "Claude Code", "AI agents", "automation"];
    let wordIndex = 0;

    setInterval(() => {
      cycleWord.classList.add("is-swapping");
      window.setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length;
        cycleWord.textContent = words[wordIndex];
        cycleWord.classList.remove("is-swapping");
      }, 520);
    }, 2600);
  }

  const revealNodes = document.querySelectorAll('.reveal');
  if (window.location.protocol === 'file:' || !('IntersectionObserver' in window)) {
    revealNodes.forEach((node) => node.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealNodes.forEach((node) => observer.observe(node));
  }
})();

