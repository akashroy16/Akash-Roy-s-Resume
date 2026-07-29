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
     7. FIREBASE REALTIME FEEDBACK TRACKING
     ========================================================================== */
  // Initialize Firebase (Replace values below with your Firebase Console config)
  const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  // Prevent double initialization errors
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const database = firebase.database();
  const feedbackRef = database.ref("feedbacks");

  const feedbackForm = document.getElementById("feedback-form");
  const feedbackNameInput = document.getElementById("feedback-name");
  const feedbackTextInput = document.getElementById("feedback-text");
  const feedbackStatus = document.getElementById("feedback-status");
  const feedbackList = document.getElementById("feedback-list");

  // A. Submit Feedback to Firebase
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const authorName = feedbackNameInput.value.trim() || "Anonymous Visitor";
      const messageText = feedbackTextInput.value.trim();

      if (!messageText) return;

      const newFeedback = {
        name: authorName,
        message: messageText,
        timestamp: Date.now()
      };

      feedbackRef.push(newFeedback)
        .then(() => {
          if (feedbackStatus) {
            feedbackStatus.style.color = "#10b981";
            feedbackStatus.textContent = "Thank you! Your feedback has been submitted.";
          }
          feedbackForm.reset();
          setTimeout(() => {
            if (feedbackStatus) feedbackStatus.textContent = "";
          }, 3000);
        })
        .catch((error) => {
          console.error("Firebase Error: ", error);
          if (feedbackStatus) {
            feedbackStatus.style.color = "#ef4444";
            feedbackStatus.textContent = "Error submitting feedback. Check Firebase config!";
          }
        });
    });
  }

  // B. Listen for New Feedback and Render Dynamically
  if (feedbackList) {
    feedbackRef.on("child_added", (snapshot) => {
      const data = snapshot.val();
      
      const card = document.createElement("div");
      card.className = "card";
      card.style.marginBottom = "1rem";

      const dateStr = data.timestamp ? new Date(data.timestamp).toLocaleDateString() : "Just now";

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <h4 style="color: var(--accent-color); font-weight: 600;">${escapeHTML(data.name)}</h4>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${dateStr}</span>
        </div>
        <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-color);">${escapeHTML(data.message)}</p>
      `;

      // Insert newest feedback at the top
      feedbackList.prepend(card);
    });
  }

  // Helper to prevent HTML injection (XSS protection)
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
});
