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
     7. CONTACT FORM SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formStatus) {
        formStatus.style.color = "#00d8ff";
        formStatus.textContent = "Sending message...";
      }

      setTimeout(() => {
        if (formStatus) {
          formStatus.style.color = "#10b981";
          formStatus.textContent = "Message sent successfully!";
        }
        contactForm.reset();
      }, 1000);
    });
  }

  /* ==========================================================================
     8. DIRECT FEEDBACK FORM SUBMISSION & REAL-TIME LIST RENDER
     ========================================================================== */
  const feedbackForm = document.getElementById("feedback-form");

  if (feedbackForm) {
    feedbackForm.onsubmit = function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("feedback-name");
      const textInput = document.getElementById("feedback-text");
      const statusBox = document.getElementById("feedback-status");
      const listContainer = document.getElementById("feedback-list");

      const nameVal = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "Anonymous Visitor";
      const textVal = textInput ? textInput.value.trim() : "";

      if (!textVal) return false;

      // Create and style new feedback card
      const card = document.createElement("div");
      card.className = "card visible";
      card.style.cssText = "max-width: 650px; margin: 0 auto 1rem auto; padding: 1.2rem; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 8px;";

      const dateStr = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h4 style="color: var(--accent-color); font-size: 1.05rem;"><i class="fas fa-user-circle"></i> ${escapeHTML(nameVal)}</h4>
          <span style="font-size: 0.8rem; color: var(--text-muted);"><i class="far fa-clock"></i> ${dateStr}</span>
        </div>
        <p style="line-height: 1.5; color: var(--text-color); font-size: 0.95rem;">${escapeHTML(textVal)}</p>
      `;

      if (listContainer) {
        listContainer.prepend(card);
      }

      if (statusBox) {
        statusBox.style.color = "#10b981";
        statusBox.textContent = "Thank you! Your feedback has been published below.";
      }

      feedbackForm.reset();
      return false;
    };
  }

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

  /* ==========================================================================
     9. AI CHATBOT INTERACTION
     ========================================================================== */
  const chatToggleBtn = document.getElementById("chat-toggle-btn");
  const chatWindow = document.getElementById("chat-window");
  const chatCloseBtn = document.getElementById("chat-close-btn");
  const chatSendBtn = document.getElementById("chat-send-btn");
  const chatInput = document.getElementById("chat-input");
  const chatLogs = document.getElementById("chat-logs");

  if (chatToggleBtn && chatWindow) {
    chatToggleBtn.addEventListener("click", () => chatWindow.classList.toggle("hidden"));
    if (chatCloseBtn) {
      chatCloseBtn.addEventListener("click", () => chatWindow.classList.add("hidden"));
    }

    const handleChat = () => {
      if (!chatInput) return;
      const text = chatInput.value.trim();
      if (!text) return;

      appendMessage(text, "user-msg");
      chatInput.value = "";

      setTimeout(() => {
        const query = text.toLowerCase();
        let reply = "I can tell you about Akash's projects, internship at FlyRank AI, CGPA (3.70), leadership at Harvard ALP, or contact information!";

        if (query.includes("cgpa") || query.includes("grade") || query.includes("education")) {
          reply = "Akash is pursuing a B.Sc. in Software Engineering at Daffodil International University with a 3.70 CGPA. He also scored 95/100 in the Harvard-founded Aspire Leadership Program!";
        } else if (query.includes("project") || query.includes("fingercanvas")) {
          reply = "Akash has created interactive projects including FingerCanvas (webcam gesture whiteboard), AI Push-Up Analyzer, DunkinDonut Dashboard, and NLP Audit tools.";
        } else if (query.includes("experience") || query.includes("intern") || query.includes("job")) {
          reply = "Akash is currently an ML Intern at FlyRank AI and Founder & Lead AI Engineer at FALabs (Fyntrix AI Labs).";
        } else if (query.includes("contact") || query.includes("email") || query.includes("phone")) {
          reply = "You can reach Akash via email at arcairo5800@gmail.com or phone at +8801303704514.";
        } else if (query.includes("certif")) {
          reply = "Akash holds 79 professional certifications including Ethics of AI (University of Helsinki) and Enterprise Systems (Open University). You can view certificate copies directly in the Certifications section!";
        }

        appendMessage(reply, "bot-msg");
      }, 600);
    };

    if (chatSendBtn) chatSendBtn.addEventListener("click", handleChat);
    if (chatInput) {
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleChat();
      });
    }

    function appendMessage(msg, className) {
      if (!chatLogs) return;
      const msgDiv = document.createElement("div");
      msgDiv.className = `chat-msg ${className}`;
      msgDiv.textContent = msg;
      chatLogs.appendChild(msgDiv);
      chatLogs.scrollTop = chatLogs.scrollHeight;
    }
  }
});
