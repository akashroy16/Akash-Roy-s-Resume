window.addEventListener('DOMContentLoaded', () => {

  // 1. DAY / NIGHT TOGGLE
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  if (themeBtn && themeIcon && themeText) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
      themeText.textContent = isLight ? 'Night Mode' : 'Day Mode';
    });
  }

  // 2. DYNAMIC TYPING EFFECT
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const roles = [
      "Software Engineering Student",
      "AI & Data Science Enthusiast",
      "Machine Learning Engineer",
      "Competitive Programmer"
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

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }
    type();
  }

  // 3. ANIMATED METRICS COUNTER (AUTORUN ON LOAD & SCROLL)
  const counters = document.querySelectorAll('.counter');
  let counterAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isFloat = target % 1 !== 0;
      let count = 0;
      const duration = 1500;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          counter.innerText = isFloat ? target.toFixed(2) : target + '+';
          clearInterval(timer);
        } else {
          counter.innerText = isFloat ? count.toFixed(2) : Math.ceil(count);
        }
      }, stepTime);
    });
  }

  function checkAndRunCounters() {
    const metricsSection = document.getElementById('metrics');
    if (metricsSection && !counterAnimated) {
      const rect = metricsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        runCounters();
        counterAnimated = true;
      }
    }
  }

  checkAndRunCounters();
  window.addEventListener('scroll', checkAndRunCounters);

  // 4. INTERACTIVE PROJECT FILTER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const categories = item.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          item.classList.remove('hidden-project');
        } else {
          item.classList.add('hidden-project');
        }
      });
    });
  });

  // 5. COPY EMAIL TO CLIPBOARD TOOLTIP
  const copyBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');

  if (copyBtn && copyTooltip) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('arcairo5800@gmail.com').then(() => {
        copyTooltip.style.display = 'inline-block';
        setTimeout(() => {
          copyTooltip.style.display = 'none';
        }, 2000);
      });
    });
  }

  // 6. PARTICLES CANVAS BACKGROUND
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        const isLight = document.body.classList.contains('light-theme');
        ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(0, 216, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.body.classList.contains('light-theme');
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = isLight 
              ? `rgba(2, 132, 199, ${1 - dist / 120})` 
              : `rgba(0, 216, 255, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 7. CONTACT FORM EMAIL SENDER (EmailJS Integration)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusBox = document.getElementById('form-status');
      const submitBtn = document.getElementById('contact-submit-btn');

      if (submitBtn) submitBtn.textContent = 'Sending...';

      // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with EmailJS keys
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
        .then(() => {
          if (statusBox) {
            statusBox.textContent = 'Message sent to Akash\'s email successfully!';
            statusBox.className = 'status-box success';
          }
          contactForm.reset();
          if (submitBtn) submitBtn.textContent = 'Send Message';
        }, (error) => {
          if (statusBox) {
            statusBox.textContent = 'Failed to send message. Please try again.';
            statusBox.className = 'status-box error';
          }
          if (submitBtn) submitBtn.textContent = 'Send Message';
        });
    });
  }

  // 8. GLOBAL REALTIME FEEDBACK SYSTEM (Firebase)
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.database();
    const feedbackRef = db.ref('feedbacks');

    const feedbackForm = document.getElementById('feedback-form');
    const feedbackList = document.getElementById('feedback-list');

    // RENDER FEEDBACK CARDS
    if (feedbackList) {
      feedbackRef.on('value', (snapshot) => {
        feedbackList.innerHTML = '';
        const data = snapshot.val();
        
        if (data) {
          const feedbackArray = Object.values(data).reverse();
          
          feedbackArray.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'feedback-card';
            
            const timeFormatted = item.timestamp 
              ? new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
              : 'Recently';

            card.innerHTML = `
              <div class="feedback-header">
                <div class="feedback-user-info">
                  <div class="feedback-avatar">
                    <i class="fas fa-user"></i>
                  </div>
                  <span class="feedback-author">${escapeHtml(item.name || 'Anonymous')}</span>
                </div>
                <span class="feedback-time"><i class="far fa-clock"></i> ${timeFormatted}</span>
              </div>
              <p class="feedback-text">${escapeHtml(item.text)}</p>
            `;
            feedbackList.appendChild(card);
          });
        } else {
          feedbackList.innerHTML = '<p class="meta" style="text-align:center;">No feedback yet. Be the first to leave one!</p>';
        }
      });
    }

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('feedback-name')?.value.trim() || 'Anonymous';
        const textInput = document.getElementById('feedback-text')?.value.trim();
        const statusBox = document.getElementById('feedback-status');

        if (textInput) {
          feedbackRef.push({
            name: nameInput,
            text: textInput,
            timestamp: Date.now()
          }, (error) => {
            if (error) {
              if (statusBox) {
                statusBox.textContent = 'Error posting feedback. Please check Firebase configuration.';
                statusBox.className = 'status-box error';
              }
            } else {
              if (statusBox) {
                statusBox.textContent = 'Feedback posted publicly below!';
                statusBox.className = 'status-box success';
              }
              feedbackForm.reset();
            }
          });
        }
      });
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }

  // 9. SITE DATA AI CHATBOT
  const siteKnowledge = {
    about: "Akash Roy is a Software Engineering student at Daffodil International University with a CGPA of 3.70. Passionate about Python, Java, Data Science, Machine Learning, and complex problem solving.",
    education: "Akash is pursuing a B.Sc. in Software Engineering at Daffodil International University (CGPA 3.70, May 2024 - Dec 2028). Completed the Harvard-founded Aspire Leadership Program with a 95/100 grade.",
    experience: "1. Machine Learning Intern at FlyRank AI (Jun 2026 - Present).\n2. Founder & Lead AI Engineer at FALabs - Fyntrix AI Labs (May 2026 - Present).\n3. Executive Member at DIU Software Engineering Club.\n4. Member at SQATC-DIU.",
    projects: "1. FingerCanvas (MediaPipe hand tracking whiteboard).\n2. AI-Powered Push-Up Analyzer & Counter.\n3. DunkinDonut Dashboard (Java OOP GUI).\n4. NLP Audit of Digital Implementation.",
    skills: "Python, Java, C Programming, Machine Learning, Data Science & Analysis, Git & GitHub.",
    contact: "Email: arcairo5800@gmail.com | Phone: +8801303704514 | Location: Savar, Dhaka, Bangladesh.",
    certifications: "1. Ethics of AI (University of Helsinki)\n2. Software Development for Enterprise Systems (Open University)\n3. Diploma in GDPR & Data Protection (Alison)."
  };

  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatInput = document.getElementById('chat-input');
  const chatLogs = document.getElementById('chat-logs');

  if (chatToggleBtn && chatWindow && chatCloseBtn && chatSendBtn && chatInput && chatLogs) {
    chatToggleBtn.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
    chatCloseBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));

    function generateResponse(query) {
      const q = query.toLowerCase();
      if (q.includes('hello') || q.includes('hi') || q.includes('hey')) return "Hello! Ask me about Akash's skills, projects, work experience, CGPA, certifications, or contact details!";
      if (q.includes('about') || q.includes('who is')) return siteKnowledge.about;
      if (q.includes('cgpa') || q.includes('education') || q.includes('university')) return siteKnowledge.education;
      if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('falabs')) return siteKnowledge.experience;
      if (q.includes('project') || q.includes('fingercanvas') || q.includes('push-up')) return siteKnowledge.projects;
      if (q.includes('skill') || q.includes('python') || q.includes('java')) return siteKnowledge.skills;
      if (q.includes('certificate') || q.includes('gdpr') || q.includes('helsinki')) return siteKnowledge.certifications;
      if (q.includes('contact') || q.includes('email') || q.includes('phone')) return siteKnowledge.contact;
      return "I can answer queries regarding Akash's background. Try asking about his 'projects', 'education', 'skills', 'experience', or 'contact details'.";
    }

    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;

      const userMsg = document.createElement('div');
      userMsg.className = 'chat-msg user-msg';
      userMsg.textContent = text;
      chatLogs.appendChild(userMsg);

      chatInput.value = '';
      chatLogs.scrollTop = chatLogs.scrollHeight;

      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot-msg';
        botMsg.innerText = generateResponse(text);
        chatLogs.appendChild(botMsg);
        chatLogs.scrollTop = chatLogs.scrollHeight;
      }, 300);
    }

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
  }

});        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }
    type();
  }

  // 3. ANIMATED METRICS COUNTER
  const counters = document.querySelectorAll('.counter');
  let counterAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const isFloat = target % 1 !== 0;
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = isFloat ? count.toFixed(2) : Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = isFloat ? target.toFixed(2) : target + '+';
        }
      };
      updateCount();
    });
  }

  window.addEventListener('scroll', () => {
    const metricsSection = document.getElementById('metrics');
    if (metricsSection && !counterAnimated) {
      const pos = metricsSection.getBoundingClientRect();
      if (pos.top < window.innerHeight && pos.bottom >= 0) {
        runCounters();
        counterAnimated = true;
      }
    }
  });

  // 4. INTERACTIVE PROJECT FILTER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const categories = item.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          item.classList.remove('hidden-project');
        } else {
          item.classList.add('hidden-project');
        }
      });
    });
  });

  // 5. COPY EMAIL TO CLIPBOARD TOOLTIP
  const copyBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');

  if (copyBtn && copyTooltip) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('arcairo5800@gmail.com').then(() => {
        copyTooltip.style.display = 'inline-block';
        setTimeout(() => {
          copyTooltip.style.display = 'none';
        }, 2000);
      });
    });
  }

  // 6. PARTICLES CANVAS BACKGROUND
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        const isLight = document.body.classList.contains('light-theme');
        ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(0, 216, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.body.classList.contains('light-theme');
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = isLight 
              ? `rgba(2, 132, 199, ${1 - dist / 120})` 
              : `rgba(0, 216, 255, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 7. CONTACT FORM EMAIL SENDER (EmailJS Integration)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusBox = document.getElementById('form-status');
      const submitBtn = document.getElementById('contact-submit-btn');

      if (submitBtn) submitBtn.textContent = 'Sending...';

      // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with EmailJS keys
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
        .then(() => {
          if (statusBox) {
            statusBox.textContent = 'Message sent to Akash\'s email successfully!';
            statusBox.className = 'status-box success';
          }
          contactForm.reset();
          if (submitBtn) submitBtn.textContent = 'Send Message';
        }, (error) => {
          if (statusBox) {
            statusBox.textContent = 'Failed to send message. Please try again.';
            statusBox.className = 'status-box error';
          }
          if (submitBtn) submitBtn.textContent = 'Send Message';
        });
    });
  }

  // 8. GLOBAL REALTIME FEEDBACK SYSTEM (Firebase)
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.database();
    const feedbackRef = db.ref('feedbacks');

    const feedbackForm = document.getElementById('feedback-form');
    const feedbackList = document.getElementById('feedback-list');

    // RENDER FEEDBACK CARDS
    if (feedbackList) {
      feedbackRef.on('value', (snapshot) => {
        feedbackList.innerHTML = '';
        const data = snapshot.val();
        
        if (data) {
          const feedbackArray = Object.values(data).reverse();
          
          feedbackArray.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'feedback-card';
            
            const timeFormatted = item.timestamp 
              ? new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
              : 'Recently';

            card.innerHTML = `
              <div class="feedback-header">
                <div class="feedback-user-info">
                  <div class="feedback-avatar">
                    <i class="fas fa-user"></i>
                  </div>
                  <span class="feedback-author">${escapeHtml(item.name || 'Anonymous')}</span>
                </div>
                <span class="feedback-time"><i class="far fa-clock"></i> ${timeFormatted}</span>
              </div>
              <p class="feedback-text">${escapeHtml(item.text)}</p>
            `;
            feedbackList.appendChild(card);
          });
        } else {
          feedbackList.innerHTML = '<p class="meta" style="text-align:center;">No feedback yet. Be the first to leave one!</p>';
        }
      });
    }

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('feedback-name')?.value.trim() || 'Anonymous';
        const textInput = document.getElementById('feedback-text')?.value.trim();
        const statusBox = document.getElementById('feedback-status');

        if (textInput) {
          feedbackRef.push({
            name: nameInput,
            text: textInput,
            timestamp: Date.now()
          }, (error) => {
            if (error) {
              if (statusBox) {
                statusBox.textContent = 'Error posting feedback. Please check Firebase configuration.';
                statusBox.className = 'status-box error';
              }
            } else {
              if (statusBox) {
                statusBox.textContent = 'Feedback posted publicly below!';
                statusBox.className = 'status-box success';
              }
              feedbackForm.reset();
            }
          });
        }
      });
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }

  // 9. SITE DATA AI CHATBOT
  const siteKnowledge = {
    about: "Akash Roy is a Software Engineering student at Daffodil International University with a CGPA of 3.70. Passionate about Python, Java, Data Science, Machine Learning, and complex problem solving.",
    education: "Akash is pursuing a B.Sc. in Software Engineering at Daffodil International University (CGPA 3.70, May 2024 - Dec 2028). Completed the Harvard-founded Aspire Leadership Program with a 95/100 grade.",
    experience: "1. Machine Learning Intern at FlyRank AI (Jun 2026 - Present).\n2. Founder & Lead AI Engineer at FALabs - Fyntrix AI Labs (May 2026 - Present).\n3. Executive Member at DIU Software Engineering Club.\n4. Member at SQATC-DIU.",
    projects: "1. FingerCanvas (MediaPipe hand tracking whiteboard).\n2. AI-Powered Push-Up Analyzer & Counter.\n3. DunkinDonut Dashboard (Java OOP GUI).\n4. NLP Audit of Digital Implementation.",
    skills: "Python, Java, C Programming, Machine Learning, Data Science & Analysis, Git & GitHub.",
    contact: "Email: arcairo5800@gmail.com | Phone: +8801303704514 | Location: Savar, Dhaka, Bangladesh.",
    certifications: "1. Ethics of AI (University of Helsinki)\n2. Software Development for Enterprise Systems (Open University)\n3. Diploma in GDPR & Data Protection (Alison)."
  };

  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatInput = document.getElementById('chat-input');
  const chatLogs = document.getElementById('chat-logs');

  if (chatToggleBtn && chatWindow && chatCloseBtn && chatSendBtn && chatInput && chatLogs) {
    chatToggleBtn.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
    chatCloseBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));

    function generateResponse(query) {
      const q = query.toLowerCase();
      if (q.includes('hello') || q.includes('hi') || q.includes('hey')) return "Hello! Ask me about Akash's skills, projects, work experience, CGPA, certifications, or contact details!";
      if (q.includes('about') || q.includes('who is')) return siteKnowledge.about;
      if (q.includes('cgpa') || q.includes('education') || q.includes('university')) return siteKnowledge.education;
      if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('falabs')) return siteKnowledge.experience;
      if (q.includes('project') || q.includes('fingercanvas') || q.includes('push-up')) return siteKnowledge.projects;
      if (q.includes('skill') || q.includes('python') || q.includes('java')) return siteKnowledge.skills;
      if (q.includes('certificate') || q.includes('gdpr') || q.includes('helsinki')) return siteKnowledge.certifications;
      if (q.includes('contact') || q.includes('email') || q.includes('phone')) return siteKnowledge.contact;
      return "I can answer queries regarding Akash's background. Try asking about his 'projects', 'education', 'skills', 'experience', or 'contact details'.";
    }

    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;

      const userMsg = document.createElement('div');
      userMsg.className = 'chat-msg user-msg';
      userMsg.textContent = text;
      chatLogs.appendChild(userMsg);

      chatInput.value = '';
      chatLogs.scrollTop = chatLogs.scrollHeight;

      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot-msg';
        botMsg.innerText = generateResponse(text);
        chatLogs.appendChild(botMsg);
        chatLogs.scrollTop = chatLogs.scrollHeight;
      }, 300);
    }

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
  }

});        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }
    type();
  }

  // 3. ANIMATED METRICS COUNTER
  const counters = document.querySelectorAll('.counter');
  let counterAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const isFloat = target % 1 !== 0;
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = isFloat ? count.toFixed(2) : Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = isFloat ? target.toFixed(2) : target + '+';
        }
      };
      updateCount();
    });
  }

  window.addEventListener('scroll', () => {
    const metricsSection = document.getElementById('metrics');
    if (metricsSection && !counterAnimated) {
      const pos = metricsSection.getBoundingClientRect();
      if (pos.top < window.innerHeight && pos.bottom >= 0) {
        runCounters();
        counterAnimated = true;
      }
    }
  });

  // 4. INTERACTIVE PROJECT FILTER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const categories = item.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          item.classList.remove('hidden-project');
        } else {
          item.classList.add('hidden-project');
        }
      });
    });
  });

  // 5. COPY EMAIL TO CLIPBOARD TOOLTIP
  const copyBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');

  if (copyBtn && copyTooltip) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('arcairo5800@gmail.com').then(() => {
        copyTooltip.style.display = 'inline-block';
        setTimeout(() => {
          copyTooltip.style.display = 'none';
        }, 2000);
      });
    });
  }

  // 6. PARTICLES CANVAS BACKGROUND
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        const isLight = document.body.classList.contains('light-theme');
        ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(0, 216, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 50; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.body.classList.contains('light-theme');
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = isLight 
              ? `rgba(2, 132, 199, ${1 - dist / 120})` 
              : `rgba(0, 216, 255, ${1 - dist / 120})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 7. CONTACT FORM EMAIL SENDER (EmailJS Integration)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusBox = document.getElementById('form-status');
      const submitBtn = document.getElementById('contact-submit-btn');

      if (submitBtn) submitBtn.textContent = 'Sending...';

      // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with EmailJS keys
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
        .then(() => {
          if (statusBox) {
            statusBox.textContent = 'Message sent to Akash\'s email successfully!';
            statusBox.className = 'status-box success';
          }
          contactForm.reset();
          if (submitBtn) submitBtn.textContent = 'Send Message';
        }, (error) => {
          if (statusBox) {
            statusBox.textContent = 'Failed to send message. Please try again.';
            statusBox.className = 'status-box error';
          }
          if (submitBtn) submitBtn.textContent = 'Send Message';
        });
    });
  }

  // 8. GLOBAL REALTIME FEEDBACK SYSTEM (Firebase)
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.database();
    const feedbackRef = db.ref('feedbacks');

    const feedbackForm = document.getElementById('feedback-form');
    const feedbackList = document.getElementById('feedback-list');

    if (feedbackList) {
      feedbackRef.on('value', (snapshot) => {
        feedbackList.innerHTML = '';
        const data = snapshot.val();
        
        if (data) {
          const feedbackArray = Object.values(data).reverse();
          feedbackArray.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'feedback-item';
            card.innerHTML = `
              <div class="feedback-author">${escapeHtml(item.name)}</div>
              <p>${escapeHtml(item.text)}</p>
            `;
            feedbackList.appendChild(card);
          });
        } else {
          feedbackList.innerHTML = '<p class="meta" style="text-align:center;">No feedback yet. Be the first to leave one!</p>';
        }
      });
    }

    if (feedbackForm) {
      feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('feedback-name')?.value.trim() || 'Anonymous';
        const textInput = document.getElementById('feedback-text')?.value.trim();
        const statusBox = document.getElementById('feedback-status');

        if (textInput) {
          feedbackRef.push({
            name: nameInput,
            text: textInput,
            timestamp: Date.now()
          }, (error) => {
            if (error) {
              if (statusBox) {
                statusBox.textContent = 'Error posting feedback. Please check Firebase rules.';
                statusBox.className = 'status-box error';
              }
            } else {
              if (statusBox) {
                statusBox.textContent = 'Feedback posted publicly!';
                statusBox.className = 'status-box success';
              }
              feedbackForm.reset();
            }
          });
        }
      });
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }

  // 9. SITE DATA AI CHATBOT
  const siteKnowledge = {
    about: "Akash Roy is a Software Engineering student at Daffodil International University with a CGPA of 3.70. Passionate about Python, Java, Data Science, Machine Learning, and complex problem solving.",
    education: "Akash is pursuing a B.Sc. in Software Engineering at Daffodil International University (CGPA 3.70, May 2024 - Dec 2028). Completed the Harvard-founded Aspire Leadership Program with a 95/100 grade.",
    experience: "1. Machine Learning Intern at FlyRank AI (Jun 2026 - Present).\n2. Founder & Lead AI Engineer at FALabs - Fyntrix AI Labs (May 2026 - Present).\n3. Executive Member at DIU Software Engineering Club.\n4. Member at SQATC-DIU.",
    projects: "1. FingerCanvas (MediaPipe hand tracking whiteboard).\n2. AI-Powered Push-Up Analyzer & Counter.\n3. DunkinDonut Dashboard (Java OOP GUI).\n4. NLP Audit of Digital Implementation.",
    skills: "Python, Java, C Programming, Machine Learning, Data Science & Analysis, Git & GitHub.",
    contact: "Email: arcairo5800@gmail.com | Phone: +8801303704514 | Location: Savar, Dhaka, Bangladesh.",
    certifications: "1. Ethics of AI (University of Helsinki)\n2. Software Development for Enterprise Systems (Open University)\n3. Diploma in GDPR & Data Protection (Alison)."
  };

  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatInput = document.getElementById('chat-input');
  const chatLogs = document.getElementById('chat-logs');

  if (chatToggleBtn && chatWindow && chatCloseBtn && chatSendBtn && chatInput && chatLogs) {
    chatToggleBtn.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
    chatCloseBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));

    function generateResponse(query) {
      const q = query.toLowerCase();
      if (q.includes('hello') || q.includes('hi') || q.includes('hey')) return "Hello! Ask me about Akash's skills, projects, work experience, CGPA, certifications, or contact details!";
      if (q.includes('about') || q.includes('who is')) return siteKnowledge.about;
      if (q.includes('cgpa') || q.includes('education') || q.includes('university')) return siteKnowledge.education;
      if (q.includes('experience') || q.includes('job') || q.includes('work') || q.includes('falabs')) return siteKnowledge.experience;
      if (q.includes('project') || q.includes('fingercanvas') || q.includes('push-up')) return siteKnowledge.projects;
      if (q.includes('skill') || q.includes('python') || q.includes('java')) return siteKnowledge.skills;
      if (q.includes('certificate') || q.includes('gdpr') || q.includes('helsinki')) return siteKnowledge.certifications;
      if (q.includes('contact') || q.includes('email') || q.includes('phone')) return siteKnowledge.contact;
      return "I can answer queries regarding Akash's background. Try asking about his 'projects', 'education', 'skills', 'experience', or 'contact details'.";
    }

    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;

      const userMsg = document.createElement('div');
      userMsg.className = 'chat-msg user-msg';
      userMsg.textContent = text;
      chatLogs.appendChild(userMsg);

      chatInput.value = '';
      chatLogs.scrollTop = chatLogs.scrollHeight;

      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot-msg';
        botMsg.innerText = generateResponse(text);
        chatLogs.appendChild(botMsg);
        chatLogs.scrollTop = chatLogs.scrollHeight;
      }, 300);
    }

    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
  }

});
