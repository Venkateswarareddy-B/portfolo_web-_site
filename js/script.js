/* =============================================
   PORTFOLIO JAVASCRIPT
   Venkateswara Reddy | AI/ML Engineer
   ============================================= */

'use strict';

// ── Navbar scroll effect ──────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar background
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top visibility
  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link
  highlightNavLink();
});

// ── Back to top ───────────────────────────────
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Hamburger menu ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Active nav link on scroll ─────────────────
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;

    if (scrollPos >= top && scrollPos < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

// ── Scroll reveal animations ──────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children of grids
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Add reveal class and stagger delays to cards
function initReveal() {
  // Section headers
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Skill cards
  document.querySelectorAll('.skill-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = i * 80;
    revealObserver.observe(el);
  });

  // Project cards
  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = i * 100;
    revealObserver.observe(el);
  });

  // Edu cards
  document.querySelectorAll('.edu-card').forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = i * 100;
    revealObserver.observe(el);
  });

  // Timeline
  document.querySelectorAll('.timeline-card').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // About content
  document.querySelectorAll('.about-content, .about-img-wrapper').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Contact
  document.querySelectorAll('.contact-info, .contact-form').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Hero elements stagger
  const heroGreeting = document.querySelector('.hero-greeting');
  const heroName = document.querySelector('.hero-name');
  const heroRoles = document.querySelector('.hero-roles');
  const heroDesc = document.querySelector('.hero-desc');
  const heroCta = document.querySelector('.hero-cta');
  const heroSocials = document.querySelector('.hero-socials');
  const heroImage = document.querySelector('.hero-image');

  [heroGreeting, heroName, heroRoles, heroDesc, heroCta, heroSocials].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300 + i * 120);
  });

  if (heroImage) {
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'scale(0.9)';
    heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    setTimeout(() => {
      heroImage.style.opacity = '1';
      heroImage.style.transform = 'scale(1)';
    }, 600);
  }
}

// ── Typed text effect in hero ─────────────────
function typedEffect() {
  const roles = [
    'AI/ML Engineer',
    'Generative AI Developer',
    'RAG Systems Builder',
    'LLM Application Engineer',
    'Prompt Engineer'
  ];
  const greeting = document.querySelector('.hero-greeting');
  if (!greeting) return;

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingEl = document.createElement('span');
  typingEl.classList.add('typed-role');
  typingEl.style.cssText = `
    color: var(--secondary);
    font-weight: 600;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    margin-left: 8px;
    border-right: 2px solid var(--secondary);
    padding-right: 4px;
    animation: cursorBlink 0.8s step-end infinite;
  `;

  // Add cursor blink CSS
  const style = document.createElement('style');
  style.textContent = `@keyframes cursorBlink { 0%,100% { border-color: var(--secondary); } 50% { border-color: transparent; } }`;
  document.head.appendChild(style);

  greeting.textContent = '👋 Hello, I\'m — ';
  greeting.appendChild(typingEl);

  function type() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, 60);
    } else {
      typingEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentRole.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      setTimeout(type, 90);
    }
  }
  setTimeout(type, 1500);
}

// ── Smooth scroll for anchor links ───────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Contact form ──────────────────────────────
const contactForm = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !subject || !message) {
      formNote.textContent = '\u26a0\ufe0f Please fill in all fields.';
      formNote.className = 'form-note error';
      return;
    }

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';

    setTimeout(() => {
      // Open LinkedIn profile — recruiter can send a connection/message
      window.open('https://linkedin.com/in/venkateswara-reddy-bijjam', '_blank');

      formNote.textContent = '\u2705 Opening LinkedIn! Send me a message there.';
      formNote.className = 'form-note success';
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fab fa-linkedin-in"></i> Connect on LinkedIn';

      setTimeout(() => { formNote.textContent = ''; }, 6000);
    }, 900);
  });
}

// ── Footer year ───────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Cursor glow effect (desktop only) ────────
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: transform 0.1s ease;
  `;
  document.body.appendChild(cursor);
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
}

// ── Init ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  typedEffect();
  highlightNavLink();
});
