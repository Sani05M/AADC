/* ==========================================================================
   AADC LANDING PAGE INTERACTIVE ENGINE (script.js)
   Academic and Administrative Development Centre (AADC)
   Adamas University in collaboration with AIU
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. PAGE LOADER AND INITIALIZATION
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
      }
    }, 600); // Small delay to guarantee assets are rendered
  });


  // 2. MOUSE CURSOR AND NAVIGATION INITIALIZATION
  // Keep mouse cursor normal, standard browser behavior


  // 3. STICKY NAVBAR AND SCROLL SPY ACTIVE INDICATOR
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, header');

  window.addEventListener('scroll', () => {
    // Toggle solid background on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy active page marker removed to keep Home universally active
    // on the homepage.
  });


  // 4. MOBILE HAMBURGER MENU OVERLAY
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.navbar-nav');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside of navbar-nav
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }


  // 5. HERO FULL SCREEN IMAGE SLIDER
  const slides = document.querySelectorAll('.hero-slide');
  const indicatorsContainer = document.querySelector('.hero-indicators');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0) {
    // Generate slide pagination indicators dynamically
    slides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('hero-indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => {
        goToSlide(index);
        resetSlideTimer();
      });
      if (indicatorsContainer) {
        indicatorsContainer.appendChild(indicator);
      }
    });

    const indicators = document.querySelectorAll('.hero-indicator');

    const goToSlide = (n) => {
      slides[currentSlide].classList.remove('active');
      if (indicators[currentSlide]) indicators[currentSlide].classList.remove('active');

      currentSlide = (n + slides.length) % slides.length;

      slides[currentSlide].classList.add('active');
      if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
      goToSlide(currentSlide + 1);
    };

    const startSlideTimer = () => {
      slideInterval = setInterval(nextSlide, 6000); // 6s rotation
    };

    const resetSlideTimer = () => {
      clearInterval(slideInterval);
      startSlideTimer();
    };

    // Initialize Hero Slider timer
    startSlideTimer();
  }


  // 6. LIVE ANNOUNCEMENT BAR (Duplicating elements for continuous marquee loop)
  const track = document.querySelector('.announcement-track');
  if (track) {
    const items = track.innerHTML;
    // Duplicate the contents of the marquee track to ensure no gaps during transitions
    track.innerHTML = items + items + items;
  }


  // 7. STATISTICS COUNT-UP ENGINE (Intersection Observer)
  const statsSection = document.querySelector('.stats');
  const statNumbers = document.querySelectorAll('.stats-number');

  if (statNumbers.length > 0) {
    const startCountUp = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const isPercent = el.getAttribute('data-suffix') || '';
      let count = 0;
      const duration = 2000; // 2 seconds total count animation
      const stepTime = Math.max(Math.floor(duration / target), 15);

      const timer = setInterval(() => {
        count += Math.ceil(target / (duration / stepTime));
        if (count >= target) {
          el.textContent = target + isPercent;
          clearInterval(timer);
        } else {
          el.textContent = count + isPercent;
        }
      }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          statNumbers.forEach(num => startCountUp(num));
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, { threshold: 0.3 });

    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }


  // 8. PROGRAMS PREVIEW SLIDER SCROLL TRIGGERS
  const scrollWrapper = document.getElementById('programs-slider');
  const prevBtn = document.getElementById('slide-left');
  const nextBtn = document.getElementById('slide-right');

  if (scrollWrapper && prevBtn && nextBtn) {
    const getScrollAmount = () => {
      const card = scrollWrapper.querySelector('.program-card');
      const gap = parseFloat(window.getComputedStyle(scrollWrapper).gap) || 32;
      return card ? (card.offsetWidth + gap) : 360;
    };

    nextBtn.addEventListener('click', () => {
      scrollWrapper.scrollBy({
        left: getScrollAmount(),
        behavior: 'smooth'
      });
    });

    prevBtn.addEventListener('click', () => {
      scrollWrapper.scrollBy({
        left: -getScrollAmount(),
        behavior: 'smooth'
      });
    });

    // Check boundary states to style navigation buttons
    const toggleBtnStates = () => {
      const maxScroll = scrollWrapper.scrollWidth - scrollWrapper.clientWidth;
      prevBtn.style.opacity = scrollWrapper.scrollLeft <= 5 ? '0.4' : '1';
      nextBtn.style.opacity = scrollWrapper.scrollLeft >= maxScroll - 5 ? '0.4' : '1';
      prevBtn.style.pointerEvents = scrollWrapper.scrollLeft <= 5 ? 'none' : 'auto';
      nextBtn.style.pointerEvents = scrollWrapper.scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
    };

    scrollWrapper.addEventListener('scroll', toggleBtnStates);
    window.addEventListener('resize', toggleBtnStates);
    toggleBtnStates(); // Run initial status check
  }


  // 9. AUTO-SLIDING TESTIMONIAL SLIDER
  const testimonialTrack = document.getElementById('testimonial-track');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const tBulletsContainer = document.getElementById('testimonial-bullets');
  let currentTestimonial = 0;
  let testimonialInterval;

  if (testimonialSlides.length > 0 && testimonialTrack) {
    // Generate bullets
    testimonialSlides.forEach((_, index) => {
      const bullet = document.createElement('div');
      bullet.classList.add('testimonial-bullet');
      if (index === 0) bullet.classList.add('active');
      bullet.addEventListener('click', () => {
        goToTestimonial(index);
        resetTestimonialTimer();
      });
      if (tBulletsContainer) {
        tBulletsContainer.appendChild(bullet);
      }
    });

    const tBullets = document.querySelectorAll('.testimonial-bullet');

    const goToTestimonial = (index) => {
      currentTestimonial = index;
      testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;

      tBullets.forEach(bullet => bullet.classList.remove('active'));
      if (tBullets[currentTestimonial]) {
        tBullets[currentTestimonial].classList.add('active');
      }
    };

    const nextTestimonial = () => {
      let nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
      goToTestimonial(nextIndex);
    };

    const startTestimonialTimer = () => {
      testimonialInterval = setInterval(nextTestimonial, 8000); // 8 seconds per quote
    };

    const resetTestimonialTimer = () => {
      clearInterval(testimonialInterval);
      startTestimonialTimer();
    };

    startTestimonialTimer();

    // Touch swipe support on testimonials
    let startX = 0;
    let endX = 0;
    testimonialTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    testimonialTrack.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const difference = startX - endX;
      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          // Swiped left, show next
          let nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
          goToTestimonial(nextIndex);
        } else {
          // Swiped right, show previous
          let prevIndex = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
          goToTestimonial(prevIndex);
        }
        resetTestimonialTimer();
      }
    }, { passive: true });
  }


  // 10. INTERACTIVE MASONRY GALLERY LIGHTBOX POPUP
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentGalleryIndex = 0;

  if (galleryItems.length > 0 && lightbox && lightboxImg) {

    const openLightbox = (index) => {
      currentGalleryIndex = index;
      const item = galleryItems[currentGalleryIndex];
      const img = item.querySelector('img');
      const title = item.querySelector('h4');
      const desc = item.querySelector('p');

      lightboxImg.src = img.src;
      lightboxCaption.textContent = `${title ? title.textContent : ''} - ${desc ? desc.textContent : ''}`;

      lightbox.classList.add('active');
      body.style.overflow = 'hidden'; // Stop background scrolling
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      body.style.overflow = '';
    };

    const nextImage = () => {
      let nextIndex = (currentGalleryIndex + 1) % galleryItems.length;
      openLightbox(nextIndex);
    };

    const prevImage = () => {
      let prevIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(prevIndex);
    };

    // Attach click events to gallery preview items
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        openLightbox(index);
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

    // Close on clicking overlay background
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard support for accessibility
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    });
  }


  // 11. BUTTON RIPPLE EFFECT GENERATOR
  const rippleButtons = document.querySelectorAll('.btn');
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      // Calculate cursor position inside button boundaries
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      // Create ripple element
      const ripples = document.createElement('span');
      ripples.classList.add('ripple');
      ripples.style.left = `${x}px`;
      ripples.style.top = `${y}px`;

      this.appendChild(ripples);

      // Clean up ripple after animation runs
      setTimeout(() => {
        ripples.remove();
      }, 600);
    });
  });


  // 12. DYNAMIC CONTENT SMOOTH ANIMATED APPEARANCE (FADE IN ON SCROLL)
  const fadeOnScrollElements = document.querySelectorAll('.glass-card, .about-collage, .vision-card, .program-card, .fdp-card, .event-featured, .event-sidebar-card, .gallery-item, .team-card');

  if (fadeOnScrollElements.length > 0) {
    // Add transition style inline initially
    fadeOnScrollElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const scrollFadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          scrollFadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeOnScrollElements.forEach(el => {
      scrollFadeObserver.observe(el);
    });
  }

  // 13. PDF VIEWER FULLSCREEN TOGGLE
  const pdfFullscreenBtn = document.getElementById('pdf-fullscreen');
  const pdfContainer = document.getElementById('pdf-container');
  const body = document.body;

  if (pdfFullscreenBtn && pdfContainer) {
    pdfFullscreenBtn.addEventListener('click', () => {
      pdfContainer.classList.toggle('fullscreen');

      if (pdfContainer.classList.contains('fullscreen')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Exit fullscreen on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pdfContainer.classList.contains('fullscreen')) {
        pdfContainer.classList.remove('fullscreen');
        body.style.overflow = '';
      }
    });
  }

});
