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

  // 3. PARTICLES CANVAS BACKGROUND
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

  // 4. CONTACT FORM VALIDATION
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      const statusBox = document.getElementById('form-status');

      if (name && email && email.includes('@') && message && statusBox) {
        statusBox.textContent = 'Thank you! Message sent successfully.';
        statusBox.className = 'status-box success';
        contactForm.reset();
      }
    });
  }

  // 5. FEEDBACK FORM VALIDATION
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedbackText = document.getElementById('feedback-text')?.value.trim();
      const feedbackStatus = document.getElementById('feedback-status');

      if (feedbackText && feedbackStatus) {
        feedbackStatus.textContent = 'Thank you for your feedback!';
        feedbackStatus.className = 'status-box success';
        feedbackForm.reset();
      }
    });
  }

  // 6. SITE DATA AI CHATBOT
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
