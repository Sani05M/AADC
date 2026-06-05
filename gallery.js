/* ==========================================================================
   AADC PHOTO GALLERY PAGE INTERACTIVE CONTROLLER  —  gallery.js
   Academic and Administrative Development Centre (AADC)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. HIDE LOADER OVERLAY ────────────────────────────────────────────── */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }, 400);
    });

    // Fallback if window load fired already
    if (document.readyState === 'complete') {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }, 400);
    }
  }

  // ── 2. MOBILE NAVIGATION HAMBURGER & SCROLL TRIGGER ────────────────────── */
  const hamburger = document.getElementById('hamburger-btn');
  const navLinksList = document.getElementById('navbar-links');
  const navbar = document.getElementById('main-navbar');

  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksList.classList.toggle('active');
    });

    // Close when links are clicked
    const links = navLinksList.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksList.classList.remove('active');
      });
    });

    // Close when clicking outside navbar area
    document.addEventListener('click', (e) => {
      if (navbar && !navbar.contains(e.target) && navLinksList.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinksList.classList.remove('active');
      }
    });
  }

  // Toggle navbar backdrop blur style on scroll
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // ── 3. DYNAMIC CATEGORY FILTERING ENGINE ───────────────────────────────── */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active styling states
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hide');
          card.classList.add('visible'); // ensure immediately visible when filtering
          
          // Re-trigger entrance fade animations on filter reset
          card.style.animation = 'none';
          card.offsetHeight; /* force reflow trigger */
          card.style.animation = null;
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // ── 4. FILTER-AWARE LIGHTBOX POPUP ENGINE ──────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  
  let activeCards = [];
  let currentActiveIndex = 0;

  // Gather only currently visible items in the grid (ignores filtered elements)
  const updateActiveCardsList = () => {
    activeCards = Array.from(galleryCards).filter(card => !card.classList.contains('hide'));
  };

  const openLightbox = (index) => {
    updateActiveCardsList();
    currentActiveIndex = index;
    const selectedCard = activeCards[currentActiveIndex];
    if (!selectedCard) return;

    const img = selectedCard.querySelector('img');
    const title = selectedCard.querySelector('.gallery-card-info h3');
    const desc = selectedCard.querySelector('.gallery-card-desc');

    if (img && lightboxImg) {
      lightboxImg.src = img.src;
      if (lightboxCaption) {
        lightboxCaption.textContent = `${title ? title.textContent : ''} — ${desc ? desc.textContent : ''}`;
      }
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  const nextImage = () => {
    if (activeCards.length === 0) return;
    currentActiveIndex = (currentActiveIndex + 1) % activeCards.length;
    openLightbox(currentActiveIndex);
  };

  const prevImage = () => {
    if (activeCards.length === 0) return;
    currentActiveIndex = (currentActiveIndex - 1 + activeCards.length) % activeCards.length;
    openLightbox(currentActiveIndex);
  };

  // Bind click handlers to gallery cards
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      updateActiveCardsList();
      const cardIndex = activeCards.indexOf(card);
      if (cardIndex !== -1) {
        openLightbox(cardIndex);
      }
    });
  });

  // Bind controls
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

  // Close lightbox on clicking dark overlay background
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
  });

  // ── 5. BUTTON RIPPLE EFFECT ────────────────────────────────────────────── */
  const rippleButtons = document.querySelectorAll('.filter-btn');
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripples = document.createElement('span');
      ripples.classList.add('ripple');
      ripples.style.left = `${x}px`;
      ripples.style.top = `${y}px`;
      
      this.appendChild(ripples);
      
      setTimeout(() => {
        ripples.remove();
      }, 600);
    });
  });

  // ── 6. SCROLL REVEAL ANIMATIONS ────────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.fade-up');
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: "0px 0px -30px 0px"
  });

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });
});
