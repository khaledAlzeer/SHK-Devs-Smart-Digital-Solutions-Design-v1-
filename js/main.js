// =============================
// Progress Bar — tracks scroll position
// =============================
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
});


// =============================
// Navbar — scroll effect + active link + section label
// =============================
const navbar       = document.getElementById('navbar');
const sectionLabel = document.getElementById('section-label');
const sections     = document.querySelectorAll('section[id]');
const navLinks     = document.querySelectorAll('.nav-links a[data-section]');

/* Maps section IDs to the monospace label shown in the navbar */
const sectionNames = {
  home:         '— Home',
  about:        '— About',
  team:         '— Team',
  services:     '— Services',
  portfolio:    '— Portfolio',
  blog:         '— Blog',
  testimonials: '— Testimonials',
  faq:          '— FAQ',
  contact:      '— Contact'
};

window.addEventListener('scroll', () => {
  /* Toggle frosted glass background after 60px */
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  /* Detect which section is in viewport and highlight its nav link */
  let currentSection = 'home';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === currentSection) {
      link.classList.add('active');
    }
  });

  /* Update the monospace section label in the navbar */
  sectionLabel.textContent = sectionNames[currentSection] || '';
});


// =============================
// Fade-in on Scroll — IntersectionObserver
// =============================
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

/* Hero section elements animate immediately on page load */
document.querySelectorAll('#home .fade-in').forEach(el => {
  setTimeout(() => el.classList.add('visible'), 100);
});

/* All other sections use IntersectionObserver */
fadeElements.forEach(el => {
  if (!el.closest('#home')) observer.observe(el);
});


// =============================
// Hamburger Menu — mobile toggle
// =============================
function toggleMenu() {
  const ham  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  ham.classList.toggle('open');
  menu.classList.toggle('open');
}

function closeMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
}


// =============================
// Modal — custom alert dialog
// =============================
function showModal(icon, title, msg) {
  document.getElementById('modal-icon').textContent  = icon;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-msg').textContent   = msg;
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

/* Close modal when clicking the backdrop */
document.getElementById('modal-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});


// =============================
// Alert Functions — Hero section buttons
// =============================
function servicesAlert() {
  showModal('🚀', 'Explore Services', 'Discover all the services SHK Devs offers — from web development to AI-powered solutions. Scroll down to learn more!');
}

function portfolioAlert() {
  showModal('💼', 'Our Portfolio', 'Check out our GitHub profiles to explore all of our projects and open-source contributions!');
}

function contactAlert() {
  showModal('📬', 'Get in Touch', 'We\'d love to hear from you! Use the contact form below or reach us directly at contact@shkdevs.com');
}


// =============================
// Alert Functions — About section
// =============================
function discoverAlert() {
  showModal('✨', 'Discover Our Services', 'SHK Devs offers a wide range of digital services. Explore the Services section to find the perfect solution for your needs!');
}


// =============================
// Alert Functions — Team section
// =============================
function teamAlert() {
  showModal('👥', 'Connect with Our Team', 'Reach out to Khaled or Heba directly via their LinkedIn, GitHub, or Email links on their profile cards!');
}


// =============================
// Alert Functions — Services section
// =============================
function solutionsAlert() {
  showModal('💡', 'All Solutions', 'From Web Development to AI & Data Analysis, SHK Devs has the expertise to bring your vision to life. Contact us to get started!');
}


// =============================
// Alert Functions — Contact section
// =============================
function startProjectAlert() {
  showModal('🎯', 'Start a Project', 'Ready to build something amazing? Fill out the contact form or email us at contact@shkdevs.com to kick things off!');
}

function contactTeamAlert() {
  showModal('🤝', 'Contact Our Team', 'Get in touch with our team directly. You can reach us via email at contact@shkdevs.com or through the form below.');
}

function quoteAlert() {
  showModal('💰', 'Get a Quote', 'Fill out the contact form with your project details and we\'ll send you a personalized quote within 24 hours!');
}


// =============================
// Alert Functions — Testimonials + CTA buttons
// =============================
function ctaContactAlert() {
  showModal('📩', 'Contact Us', 'Use the contact form or reach us at contact@shkdevs.com — we\'re ready to help build your next project!');
}


// =============================
// Alert Functions — FAQ section
// =============================
function faqContactAlert() {
  showModal('❓', 'Still Have Questions?', 'Feel free to reach out! Email us at contact@shkdevs.com or fill out the contact form and we\'ll get back to you promptly.');
}


// =============================
// Alert Functions — Form submission success
// =============================
function sendMessageAlert() {
  showModal('✅', 'Message Sent!', 'Thank you for reaching out! We\'ll get back to you within 24 hours.');
}


// =============================
// Blog — Read More / Read Less Toggle
// =============================
function toggleBlog(id, btn) {
  const full   = document.getElementById('blog-full-' + id);
  const isOpen = full.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  /* Update button text while preserving the arrow span */
  btn.childNodes[0].textContent = isOpen ? 'Read less ' : 'Read more ';
}


// =============================
// FAQ — Accordion Toggle
// =============================
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  item.classList.toggle('open');
}


// =============================
// Contact Form — Validation + Submission
// =============================
function handleFormSubmit(e) {
  e.preventDefault();

  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();

  /* Require name, email, and message */
  if (!name || !email || !message) {
    showModal('⚠️', 'Missing Fields', 'Please fill in all required fields: Name, Email, and Message.');
    return;
  }

  sendMessageAlert();
  document.getElementById('contact-form').reset();
}


// =============================
// Dynamic Copyright Year
// =============================
document.getElementById('copyright-year').textContent = new Date().getFullYear();