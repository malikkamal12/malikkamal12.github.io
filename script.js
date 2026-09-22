/* ===================================================
   script.js — Portfolio interactivity
   =================================================== */

/* ─── Navbar scroll style ─────────────────────────── */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  navbar.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Mobile hamburger ────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ─── Active nav link on scroll ───────────────────── */
const sections = document.querySelectorAll('section[id]');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id   = entry.target.id;
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) link.classList.toggle('active', entry.isIntersecting);
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => observer.observe(s));

/* ─── Typewriter effect ───────────────────────────── */
const roles  = ['Data Analyst', 'ML Enthusiast', 'Data Mining Specialist', 'NLP Researcher'];
const el     = document.getElementById('typewriter');
let ri = 0, ci = 0, deleting = false;

function type() {
  const current = roles[ri];
  if (!deleting) {
    el.textContent = current.slice(0, ++ci);
    if (ci === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    el.textContent = current.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 55 : 95);
}
type();

/* ─── Skill bars animate on scroll ───────────────── */
const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.classList.add('animated');
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));

/* ─── Reveal on scroll ────────────────────────────── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Add reveal class to cards and major elements
const revealSelectors = [
  '.glass-card',
  '.timeline-item',
  '.edu-card',
  '.section-header',
  '.about-grid',
  '.contact-item',
  '.availability-badge'
];

revealSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings
    if (i % 2 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
    revealObserver.observe(el);
  });
});

/* ─── Contact form (client-side simulation) ───────── */
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');
const btn  = document.getElementById('btn-send');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  btn.disabled = true;
  btn.textContent = 'Sending…';
  note.style.color = 'var(--text-secondary)';
  note.textContent = '';

  // Simulate async send (replace with real fetch/emailjs call)
  await new Promise(r => setTimeout(r, 1400));

  const name = document.getElementById('cf-name').value.trim();
  if (name) {
    note.style.color = 'var(--accent)';
    note.textContent = `✓ Thanks ${name}! Malik will get back to you within 24 hours.`;
    form.reset();
  } else {
    note.style.color = '#f87171';
    note.textContent = 'Please fill in all required fields.';
  }

  btn.disabled = false;
  btn.textContent = 'Send Message →';
});

/* ─── Smooth scroll for all anchor links ──────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
