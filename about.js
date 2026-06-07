/* ==========================================================================
   ABOUT PAGE - JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. PRELOADER
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, 500);
    }
  
    // 2. MOBILE HAMBURGER MENU
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('navbar-links');
    const navbar = document.getElementById('main-navbar');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
  
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    }
  
    // 3. STICKY NAVBAR
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  
    // 4. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.fade-up, .slide-left, .slide-right');
    
    const revealOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };
  
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);
  
    revealElements.forEach(el => {
      revealOnScroll.observe(el);
    });
  
    // 5. COUNTER ANIMATION
    const counters = document.querySelectorAll('.counter');
    let counted = false;
  
    const countUpObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 2000;
          const step = Math.max(Math.floor(target / (duration / 16)), 1);
          let current = 0;
          
          const updateCounter = () => {
            current += step;
            if (current < target) {
              el.innerText = current;
              requestAnimationFrame(updateCounter);
            } else {
              el.innerText = target;
            }
          };
          updateCounter();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
  
    counters.forEach(counter => {
      countUpObserver.observe(counter);
    });
  
    // 6. RIPPLE BUTTON EFFECT
    const buttons = document.querySelectorAll('.ripple-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;
        
        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        ripples.classList.add('ripple');
        this.appendChild(ripples);
        
        setTimeout(() => {
          ripples.remove();
        }, 600);
      });
    });
  
  });
