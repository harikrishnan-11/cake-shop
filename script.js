document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header shrink + shadow on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
    backToTop.classList.toggle('show', window.scrollY > 700);
  };

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');
  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Animated stat counters (in Our Story section) ---------- */
  const stats = document.querySelectorAll('.stat');
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const numEl = el.querySelector('.stat-num');
      let start = 0;
      const duration = 1400;
      const startTime = performance.now();
      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        numEl.textContent = Math.round(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      statIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  stats.forEach(el => statIO.observe(el));

  /* ---------- Bestsellers horizontal scroll buttons ---------- */
  const track = document.getElementById('bestsellerTrack');
  document.getElementById('scrollLeft').addEventListener('click', () => {
    track.scrollBy({ left: -280, behavior: 'smooth' });
  });
  document.getElementById('scrollRight').addEventListener('click', () => {
    track.scrollBy({ left: 280, behavior: 'smooth' });
  });

  /* ---------- Gallery lightbox ---------- */
  const galleryImgs = document.querySelectorAll('.gallery-img');
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `<button class="lightbox-close" aria-label="Close">&times;</button><img alt="">`;
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector('img');

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  const closeLightbox = () => lightbox.classList.remove('open');
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Testimonial carousel ---------- */
  const testimonials = document.querySelectorAll('.testimonial');
  const dotsWrap = document.getElementById('testimonialDots');
  let activeIndex = 0;
  let testimonialTimer;

  testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTestimonial(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('button');

  function showTestimonial(index) {
    testimonials[activeIndex].classList.remove('active');
    dots[activeIndex].classList.remove('active');
    activeIndex = index;
    testimonials[activeIndex].classList.add('active');
    dots[activeIndex].classList.add('active');
  }

  function nextTestimonial() {
    showTestimonial((activeIndex + 1) % testimonials.length);
  }

  function startTestimonialTimer() {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(nextTestimonial, 5500);
  }
  startTestimonialTimer();
  dots.forEach(dot => dot.addEventListener('click', startTestimonialTimer));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.accordion-panel').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact form (demo submit) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  });

  const footerForm = document.getElementById('footerForm');
  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = footerForm.querySelector('input');
    input.value = 'Subscribed!';
    setTimeout(() => { input.value = ''; }, 2500);
  });

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
});