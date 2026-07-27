window.addEventListener('DOMContentLoaded', () => {

  // 1. DAY / NIGHT TOGGLE FUNCTIONALITY
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      
      if (isLight) {
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Night Mode';
      } else {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Day Mode';
      }
    });
  }

  // 2. CONTACT FORM VALIDATION
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      const nameErr = document.getElementById('name-error');
      const emailErr = document.getElementById('email-error');
      const messageErr = document.getElementById('message-error');
      const statusBox = document.getElementById('form-status');
      
      nameErr.textContent = '';
      emailErr.textContent = '';
      messageErr.textContent = '';
      
      let valid = true;

      if (!name) {
        nameErr.textContent = 'Name is required.';
        valid = false;
      }

      if (!email || !email.includes('@')) {
        emailErr.textContent = 'Valid email required.';
        valid = false;
      }

      if (!message) {
        messageErr.textContent = 'Message is required.';
        valid = false;
      }

      if (valid) {
        statusBox.textContent = 'Thank you! Message sent successfully.';
        statusBox.className = 'status-box success';
        contactForm.reset();
      }
    });
  }

  // 3. FEEDBACK FORM
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fbStatus = document.getElementById('feedback-status');
      fbStatus.textContent = 'Feedback submitted. Thank you!';
      fbStatus.className = 'status-box success';
      document.getElementById('feedback-text').value = '';
    });
  }

  // 4. SITE DATA KNOWLEDGE-BASE AI CHATBOT
  const siteKnowledge = {
    about: "Akash Roy is a Software Engineering student at Daffodil International University with a CGPA of 3.70. He is passionate about Python, Java, Data Science, Machine Learning, and complex problem solving.",
    education: "Akash is pursuing a B.Sc. in Software Engineering at Daffodil International University (CGPA 3.70, May 2024 - Dec 2028). He also completed the Harvard-founded Aspire Leadership Program with a 95/100 grade.",
    experience: "1. Machine Learning Intern at FlyRank AI (Jun 2026 - Present, Remote).\n2. Founder & Lead AI Engineer at FALabs - Fyntrix AI Labs (May 2026 - Present, Dhaka).\n3. Executive Member at DIU Software Engineering Club.\n4. Member at SQATC-DIU.",
    projects: "1. FingerCanvas (MediaPipe hand tracking digital whiteboard).\n2. AI-Powered Push-Up Analyzer & Counter.\n3. DunkinDonut Dashboard (Java OOP GUI project).\n4. NLP Audit of Digital Implementation.",
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

  if (chatToggleBtn && chatWindow) {
    chatToggleBtn.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
    chatCloseBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));

    function generateResponse(query) {
      const q = query.toLowerCase();
      
      if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
        return "Hello! I am Akash's AI Assistant. Ask me about his skills, projects, work experience, CGPA, certifications, or contact details!";
      }
      if (q.includes('about') || q.includes('who is')) {
        return siteKnowledge.about;
      }
      if (q.includes('cgpa') || q.includes('education') || q.includes('university') || q.includes('study') || q.includes('degree')) {
        return siteKnowledge.education;
      }
      if (q.includes('experience') || q.includes('job') || q.includes('intern') || q.includes('work') || q.includes('falabs') || q.includes('flyrank')) {
        return siteKnowledge.experience;
      }
      if (q.includes('project') || q.includes('fingercanvas') || q.includes('push-up') || q.includes('dunkin') || q.includes('nlp')) {
        return siteKnowledge.projects;
      }
      if (q.includes('skill') || q.includes('python') || q.includes('java') || q.includes('c') || q.includes('machine learning')) {
        return siteKnowledge.skills;
      }
      if (q.includes('certificate') || q.includes('certification') || q.includes('helsinki') || q.includes('gdpr')) {
        return siteKnowledge.certifications;
      }
      if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('address') || q.includes('reach')) {
        return siteKnowledge.contact;
      }

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
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

});
