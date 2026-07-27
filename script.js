document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. MOVING PARTICLES BACKGROUND
     ========================================================================== */
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];
  const particleCount = 45;

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

  /* ==========================================================================
     2. TYPING EFFECT
     ========================================================================== */
  const typingText = document.getElementById("typing-text");
  const roles = [
    "Machine Learning Intern @ FlyRank AI",
    "Founder @ FALabs (Fyntrix AI Labs)",
    "Software Engineering Student @ DIU",
    "Harvard ALP 2026 Graduate"
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

  /* ==========================================================================
     3. THEME TOGGLE (DAY / NIGHT)
     ========================================================================== */
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeText = document.getElementById("theme-text");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    themeIcon.className = isLight ? "fas fa-moon" : "fas fa-sun";
    themeText.textContent = isLight ? "Night Mode" : "Day Mode";
  });

  /* ==========================================================================
     4. SCROLL ANIMATION & COUNTER TRIGGER
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
     5. PROJECT CATEGORY FILTERING
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
        if (filter === "all" || categories.includes(filter)) {
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
        copyTooltip.style.display = "inline";
        setTimeout(() => { copyTooltip.style.display = "none"; }, 2000);
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
      formStatus.style.color = "#00d8ff";
      formStatus.textContent = "Sending message...";

      // Replace service & template ID with your own EmailJS identifiers if configured
      setTimeout(() => {
        formStatus.style.color = "#10b981";
        formStatus.textContent = "Message sent successfully!";
        contactForm.reset();
      }, 1000);
    });
  }

  /* ==========================================================================
     8. AI CHATBOT INTERACTION
     ========================================================================== */
  const chatToggleBtn = document.getElementById("chat-toggle-btn");
  const chatWindow = document.getElementById("chat-window");
  const chatCloseBtn = document.getElementById("chat-close-btn");
  const chatSendBtn = document.getElementById("chat-send-btn");
  const chatInput = document.getElementById("chat-input");
  const chatLogs = document.getElementById("chat-logs");

  if (chatToggleBtn) {
    chatToggleBtn.addEventListener("click", () => chatWindow.classList.toggle("hidden"));
    chatCloseBtn.addEventListener("click", () => chatWindow.classList.add("hidden"));

    const handleChat = () => {
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

    chatSendBtn.addEventListener("click", handleChat);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleChat();
    });

    function appendMessage(msg, className) {
      const msgDiv = document.createElement("div");
      msgDiv.className = `chat-msg ${className}`;
      msgDiv.textContent = msg;
      chatLogs.appendChild(msgDiv);
      chatLogs.scrollTop = chatLogs.scrollHeight;
    }
  }
});
