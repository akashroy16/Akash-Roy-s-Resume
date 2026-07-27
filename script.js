// Ensure code runs after DOM is ready
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

  // 4. AI CHATBOT FUNCTIONALITY
  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatInput = document.getElementById('chat-input');
  const chatLogs = document.getElementById('chat-logs');

  if (chatToggleBtn && chatWindow) {
    chatToggleBtn.addEventListener('click', () => {
      chatWindow.classList.toggle('hidden');
    });

    chatCloseBtn.addEventListener('click', () => {
      chatWindow.classList.add('hidden');
    });

    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;

      // User Message
      const userMsg = document.createElement('div');
      userMsg.className = 'chat-msg user-msg';
      userMsg.textContent = text;
      chatLogs.appendChild(userMsg);

      chatInput.value = '';
      chatLogs.scrollTop = chatLogs.scrollHeight;

      // Response Logic
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-msg bot-msg';
        
        const q = text.toLowerCase();
        if (q.includes('hello') || q.includes('hi')) {
          botMsg.textContent = "Hello! Ask me about Akash's skills, projects, email, or education!";
        } else if (q.includes('project') || q.includes('github') || q.includes('code')) {
          botMsg.textContent = "Akash built FingerCanvas, AI Push-Up Analyzer, DunkinDonut Dashboard, and NLP Audit tools!";
        } else if (q.includes('skill') || q.includes('python') || q.includes('java')) {
          botMsg.textContent = "Akash specializes in Python, Java, Machine Learning, Data Science, and Computer Vision!";
        } else if (q.includes('cgpa') || q.includes('grade') || q.includes('university') || q.includes('education')) {
          botMsg.textContent = "Akash studies Software Engineering at Daffodil International University with CGPA 3.70!";
        } else if (q.includes('email') || q.includes('contact') || q.includes('phone')) {
          botMsg.textContent = "Reach out to Akash at arcairo5800@gmail.com or +8801303704514.";
        } else {
          botMsg.textContent = "I'm Akash's bot assistant! Feel free to ask about his projects, skills, email, or education.";
        }

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
