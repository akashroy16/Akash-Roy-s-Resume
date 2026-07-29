document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. MOVING PARTICLES BACKGROUND
     ========================================================================== */
  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 216, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ==========================================================================
     2. TYPING EFFECT WITH BLINKING CURSOR
     ========================================================================== */
  const typingText = document.getElementById("typing-text");
  if (typingText) {
    const roles = [
      "Machine Learning Intern @ FlyRank AI",
      "Founder @ FALabs (Fyntrix AI Labs)",
      "Software Engineering Student @ DIU",
      "Harvard ALP Graduate"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 500;
      }

      setTimeout(type, delay);
    }
    type();
  }

  /* ==========================================================================
     3. DAY AND NIGHT MODE TOGGLE
     ========================================================================== */
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeText = document.getElementById("theme-text");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");
      
      if (themeIcon) {
        themeIcon.className = isLight ? "fas fa-moon" : "fas fa-sun";
      }
      if (themeText) {
        themeText.textContent = isLight ? "Night Mode" : "Day Mode";
      }
    });
  }

  /* ==========================================================================
     4. SCROLL FADE-IN & COUNTER ANIMATION
     ========================================================================== */
  const fadeElements = document.querySelectorAll(".fade-in");
  const counters = document.querySelectorAll(".counter");
  let animatedCounters = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        
        if (entry.target.id === "metrics" && !animatedCounters) {
          animatedCounters = true;
          counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const isDecimal = target % 1 !== 0;
            let current = 0;
            const increment = target / 50;

            const updateCount = () => {
              current += increment;
              if (current < target) {
                counter.innerText = isDecimal ? current.toFixed(2) : Math.ceil(current);
                setTimeout(updateCount, 30);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
          });
        }
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));

  /* ==========================================================================
     5. PROJECT FILTERS
     ========================================================================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      projectItems.forEach(item => {
        const categories = item.getAttribute("data-category");
        if (filter === "all" || (categories && categories.includes(filter))) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  /* ==========================================================================
     6. COPY EMAIL BUTTON
     ========================================================================== */
  const copyBtn = document.getElementById("copy-email-btn");
  const copyTooltip = document.getElementById("copy-tooltip");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("arcairo5800@gmail.com").then(() => {
        if (copyTooltip) {
          copyTooltip.style.display = "inline";
          setTimeout(() => { copyTooltip.style.display = "none"; }, 2000);
        }
      });
    });
  }

  /* ==========================================================================
     7. RECENT 10 FEEDBACKS TRACKING (LOCALSTORAGE)
     ========================================================================== */
  const feedbackForm = document.getElementById("feedback-form");
  const feedbackNameInput = document.getElementById("feedback-name");
  const feedbackTextInput = document.getElementById("feedback-text");
  const feedbackStatus = document.getElementById("feedback-status");
  const feedbackList = document.getElementById("feedback-list");

  // Prevent HTML injection (XSS protection)
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Load and render recent feedback entries
  function loadFeedback() {
    if (!feedbackList) return;

    let storedFeedbacks = [];
    try {
      storedFeedbacks = JSON.parse(localStorage.getItem("portfolio_feedbacks") || "[]");
    } catch (e) {
      storedFeedbacks = [];
    }

    feedbackList.innerHTML = "";

    // If empty, leave a neutral placeholder
    if (storedFeedbacks.length === 0) {
      feedbackList.innerHTML = `<p style="text-align: center; color: var(--text-muted, #888); font-size: 0.9rem; padding: 1rem 0;">No feedback yet. Be the first to leave one!</p>`;
      return;
    }

    // Keep only the 10 most recent entries
    const recentFeedbacks = storedFeedbacks.slice(0, 10);

    recentFeedbacks.forEach(data => {
      const card = document.createElement("div");
      
      // Basic styling guaranteed to be visible even if CSS classes fail
      card.style.background = "var(--bg-secondary, rgba(255, 255, 255, 0.05))";
      card.style.border = "1px solid var(--border-color, rgba(255, 255, 255, 0.1))";
      card.style.borderRadius = "8px";
      card.style.padding = "1rem";
      card.style.marginBottom = "1rem";

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h4 style="color: var(--accent-color, #00d8ff); font-weight: 600; margin: 0;">${escapeHTML(data.name)}</h4>
          <span style="font-size: 0.75rem; color: var(--text-muted, #aaa);">${data.date}</span>
        </div>
        <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-color, #fff); margin: 0;">${escapeHTML(data.message)}</p>
      `;

      feedbackList.appendChild(card);
    });
  }

  // Handle new feedback submission
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const authorName = feedbackNameInput ? feedbackNameInput.value.trim() || "Anonymous Visitor" : "Anonymous Visitor";
      const messageText = feedbackTextInput ? feedbackTextInput.value.trim() : "";

      if (!messageText) return;

      const newFeedback = {
        name: authorName,
        message: messageText,
        date: new Date().toLocaleDateString()
      };

      let storedFeedbacks = [];
      try {
        storedFeedbacks = JSON.parse(localStorage.getItem("portfolio_feedbacks") || "[]");
      } catch (e) {
        storedFeedbacks = [];
      }

      // Prepend new feedback to top
      storedFeedbacks.unshift(newFeedback);

      // Keep only top 10 in storage
      if (storedFeedbacks.length > 10) {
        storedFeedbacks = storedFeedbacks.slice(0, 10);
      }

      localStorage.setItem("portfolio_feedbacks", JSON.stringify(storedFeedbacks));

      if (feedbackStatus) {
        feedbackStatus.style.color = "#10b981";
        feedbackStatus.textContent = "Thank you! Your feedback has been posted.";
      }

      feedbackForm.reset();
      loadFeedback();

      setTimeout(() => {
        if (feedbackStatus) feedbackStatus.textContent = "";
      }, 3000);
    });
  }

  // Load feedback immediately when script loads
  loadFeedback();
});
