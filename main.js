/* ═══════════════════════════════════════════════════════ */
/* MasTECH Innovations — Shared JavaScript               */
/* ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile Menu Toggle ───────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const bar1 = document.getElementById('bar1');
  const bar2 = document.getElementById('bar2');
  const bar3 = document.getElementById('bar3');
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
    if (mobileMenu) mobileMenu.classList.toggle('open', menuOpen);
    if (mobileOverlay) mobileOverlay.classList.toggle('hidden', !menuOpen);

    if (menuOpen) {
      if (bar1) { bar1.style.transform = 'rotate(45deg) translate(5px, 5px)'; bar1.style.background = '#00f0ff'; }
      if (bar2) bar2.style.opacity = '0';
      if (bar3) { bar3.style.transform = 'rotate(-45deg) translate(5px, -5px)'; bar3.style.width = '1.5rem'; bar3.style.background = '#00f0ff'; }
      document.body.style.overflow = 'hidden';
    } else {
      if (bar1) { bar1.style.transform = ''; bar1.style.background = ''; }
      if (bar2) bar2.style.opacity = '1';
      if (bar3) { bar3.style.transform = ''; bar3.style.width = '1rem'; bar3.style.background = ''; }
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => { if (menuOpen) toggleMenu(); });
  });


  // ─── Navbar Scroll Effect ─────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('shadow-lg', 'shadow-black/20');
      navbar.style.borderBottomColor = 'rgba(0,240,255,0.08)';
    } else {
      navbar.classList.remove('shadow-lg', 'shadow-black/20');
      navbar.style.borderBottomColor = 'rgba(255,255,255,0.05)';
    }
  });


  // ─── Scroll Reveal Animation ──────────────────────────
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
  }


  // ─── Stats Counter Animation ──────────────────────────
  const statValues = document.querySelectorAll('.stat-value');
  if (statValues.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          let current = 0;
          const increment = target / 60;
          const suffix = el.dataset.suffix || '+';
          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              el.textContent = target + suffix;
              clearInterval(counter);
            } else {
              el.textContent = Math.floor(current) + suffix;
            }
          }, 25);
          statsObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statValues.forEach(el => statsObserver.observe(el));
  }


  // ─── Smooth scroll for anchor links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ─── Particle Background (Home only) ──────────────────
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      const hero = document.getElementById('home');
      if (hero) {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
      }
    }

    function createParticles() {
      particles = [];
      const count = Math.min(60, Math.floor(canvas.width / 20));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });
  }


  // ─── Terminal Typing Effect (Home only) ────────────────
  const typedText = document.getElementById('typed-text');
  const terminalOutput = document.getElementById('terminal-output');
  if (typedText && terminalOutput) {
    const command = 'mastech deploy --full-stack';
    let charIndex = 0;
    function typeChar() {
      if (charIndex < command.length) {
        typedText.textContent += command[charIndex];
        charIndex++;
        setTimeout(typeChar, 60 + Math.random() * 40);
      } else {
        setTimeout(() => {
          terminalOutput.style.display = 'block';
          terminalOutput.style.opacity = '0';
          terminalOutput.style.transform = 'translateY(10px)';
          terminalOutput.style.transition = 'all 0.5s ease-out';
          requestAnimationFrame(() => {
            terminalOutput.style.opacity = '1';
            terminalOutput.style.transform = 'translateY(0)';
          });
        }, 500);
      }
    }
    setTimeout(typeChar, 1200);
  }

});


// ─── Accordion Toggle (global function) ─────────────────
function toggleAccordion(trigger) {
  const content = trigger.nextElementSibling;
  const icon = trigger.querySelector('.accordion-icon');
  const isOpen = content.classList.contains('open');
  document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
  document.querySelectorAll('.accordion-icon').forEach(i => i.style.transform = '');
  if (!isOpen) {
    content.classList.add('open');
    icon.style.transform = 'rotate(45deg)';
  }
}


// ─── Contact Form Handler (global function) ─────────────
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const success = document.getElementById('form-success');
  if (success) {
    success.classList.remove('hidden');
    form.reset();
    setTimeout(() => success.classList.add('hidden'), 5000);
  }
}
