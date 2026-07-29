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
     2. TYPING EFFECT
     ========================================================================== */
  const typingText = document.getElementById("typing-text");
  if (typingText) {
    const roles = [
      "Machine Learning Intern @ FlyRank AI",
      "Founder & Lead AI Engineer @ FALabs",
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
  }

  /* ==========================================================================
     3. THEME TOGGLE
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
     4. SCROLL ANIMATIONS & COUNTERS
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
     7. AI CHATBOT FUNCTIONALITY
     ========================================================================== */
  const chatToggleBtn = document.getElementById("chat-toggle-btn");
  const chatWindow = document.getElementById("chat-window");
  const chatCloseBtn = document.getElementById("chat-close-btn");
  const chatLogs = document.getElementById("chat-logs");
  const chatInput = document.getElementById("chat-input");
  const chatSendBtn = document.getElementById("chat-send-btn");

  // Diagnostics: log presence of chat elements
  console.debug("chatToggleBtn:", !!chatToggleBtn, "chatWindow:", !!chatWindow, "chatCloseBtn:", !!chatCloseBtn, "chatLogs:", !!chatLogs, "chatInput:", !!chatInput, "chatSendBtn:", !!chatSendBtn);

  if (chatToggleBtn && chatWindow) {
    chatToggleBtn.addEventListener("click", () => {
      chatWindow.classList.toggle("hidden");
      if (!chatWindow.classList.contains("hidden") && chatInput) {
        chatInput.focus();
      }
    });
  }

  if (chatCloseBtn && chatWindow) {
    chatCloseBtn.addEventListener("click", () => {
      chatWindow.classList.add("hidden");
    });
  }

  function getBotReply(userText) {
    const query = userText.toLowerCase();

    if (query.includes("project") || query.includes("repo") || query.includes("fingercanvas")) {
      return "Akash's featured projects include FingerCanvas (Computer Vision), AI Push-Up Analyzer, DunkinDonut Dashboard (Java), and NLP Audit of Digital Implementation.";
    } else if (query.includes("skill") || query.includes("stack") || query.includes("language")) {
      return "Akash specializes in Python, Java, C, Machine Learning, Computer Vision (MediaPipe), Data Analysis, and Git/GitHub.";
    } else if (query.includes("experience") || query.includes("job") || query.includes("work") || query.includes("falabs")) {
      return "Akash is currently an ML Intern at FlyRank AI and Founder & Lead AI Engineer at FALabs (Fyntrix AI Labs).";
    } else if (query.includes("cgpa") || query.includes("education") || query.includes("diu") || query.includes("harvard")) {
      return "Akash is pursuing B.Sc. in Software Engineering at DIU with a 3.70 CGPA and scored 95/100 in the Harvard-founded Aspire Leadership Program.";
    } else if (query.includes("contact") || query.includes("email") || query.includes("phone")) {
      return "You can reach Akash via email at arcairo5800@gmail.com or phone at +8801303704514.";
    } else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return "Hello! How can I assist you today regarding Akash's portfolio?";
    } else {
      return "Thanks for reaching out! For detailed inquiries or collaboration opportunities, feel free to drop an email at arcairo5800@gmail.com.";
    }
  }

  function sendMessage() {
    if (!chatInput || !chatLogs) {
      console.warn('Chat input or logs element missing — aborting sendMessage.');
      return;
    }

    const userText = chatInput.value.trim();
    if (!userText) return;

    // 1. Render User Message
    const userMsgDiv = document.createElement("div");
    userMsgDiv.className = "chat-msg user-msg";
    userMsgDiv.textContent = userText;
    chatLogs.appendChild(userMsgDiv);

    chatInput.value = "";
    chatLogs.scrollTop = chatLogs.scrollHeight;

    // 2. Render Bot Response
    setTimeout(() => {
      const botReply = getBotReply(userText);
      const botMsgDiv = document.createElement("div");
      botMsgDiv.className = "chat-msg bot-msg";
      botMsgDiv.textContent = botReply;
      chatLogs.appendChild(botMsgDiv);

      chatLogs.scrollTop = chatLogs.scrollHeight;
    }, 400);
  }

  if (chatSendBtn) {
    chatSendBtn.addEventListener("click", sendMessage);
  }

  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});
