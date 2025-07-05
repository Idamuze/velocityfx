// script.js

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Registration Modal Logic
const modal = document.getElementById('registrationModal');
const registerBtn = document.getElementById('registerBtn');
const heroRegisterBtn = document.getElementById('heroRegisterBtn');
const closeModal = document.getElementById('closeModal');
const nextStep = document.getElementById('nextStep');
const prevStep = document.getElementById('prevStep');
const form = document.getElementById('registrationForm');

let currentStep = 1;
const totalSteps = 3;

function showModal() {
    modal.classList.add('active');
}

function hideModal() {
    modal.classList.remove('active');
    currentStep = 1;
    updateStepDisplay();
}

function updateStepDisplay() {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentStep) step.classList.add('completed');
        else if (index + 1 === currentStep) step.classList.add('active');
    });

    document.querySelectorAll('.form-step').forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 === currentStep) step.classList.add('active');
    });

    prevStep.style.display = currentStep > 1 ? 'block' : 'none';
    nextStep.textContent = currentStep === totalSteps ? 'Complete Registration' : 'Next';

    setTimeout(() => {
  const activeStep = document.querySelector('.form-step.active');
  const firstInput = activeStep?.querySelector('input, select');
  firstInput?.focus();
}, 100);

}

function validateStep(step) {
    const currentForm = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = currentForm.querySelectorAll('input, select');
    for (let input of inputs) {
        if (!input.checkValidity()) {
            input.reportValidity();
            return false;
        }
    }
    return true;
}

registerBtn?.addEventListener('click', e => { e.preventDefault(); showModal(); });
heroRegisterBtn?.addEventListener('click', e => { e.preventDefault(); showModal(); });
closeModal?.addEventListener('click', hideModal);
modal?.addEventListener('click', e => { if (e.target === modal) hideModal(); });

nextStep?.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        if (!validateStep(currentStep)) return;
        currentStep++;
        updateStepDisplay();
    } else {
        alert('Registration completed! Welcome to VelocityFX!');
        hideModal();
    }
});

prevStep?.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
});

// Auto-focus on modal open
modal?.addEventListener('transitionend', () => {
    if (modal.classList.contains('active')) {
        document.getElementById('firstName')?.focus();
    }
});

// Keyboard accessibility
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) hideModal();
});

// Password match validation
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
confirmPassword?.addEventListener('input', () => {
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity('Passwords do not match');
    } else {
        confirmPassword.setCustomValidity('');
    }
});

// Verification Code Input Navigation
const codeInputs = document.querySelectorAll('.code-input');
codeInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < codeInputs.length - 1) {
            codeInputs[index + 1].focus();
        }
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            codeInputs[index - 1].focus();
        }
    });
});

// Live Chat Logic
const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatInput = document.getElementById('chatInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');

let chatOpen = false;
const chatResponses = [
    "I'd be happy to help you with that! What specific information do you need?",
    "Our minimum deposit is $250 for a standard account.",
    "Spreads start from 0.1 pips on major pairs.",
    "24/7 customer support is available.",
    "Use our free demo account to practice.",
    "Our platform supports EAs and auto trading.",
    "We’re regulated by top-tier financial authorities.",
    "Verification takes 1–2 business days."
];

function toggleChat() {
    chatOpen = !chatOpen;
    chatWindow.classList.toggle('active', chatOpen);
    chatButton.textContent = chatOpen ? '✕' : '💬';
}

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'agent'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    typingIndicator.classList.add('active');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    typingIndicator.classList.remove('active');
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            const response = chatResponses[Math.floor(Math.random() * chatResponses.length)];
            addMessage(response);
        }, 1000 + Math.random() * 2000);
    }
}

chatButton?.addEventListener('click', toggleChat);
closeChatBtn?.addEventListener('click', toggleChat);
sendChatBtn?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// PWA Install Prompt
let deferredPrompt;
const pwaInstall = document.getElementById('pwaInstall');
const installBtn = document.getElementById('installBtn');
const dismissBtn = document.getElementById('dismissBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    pwaInstall.classList.add('show');
});

installBtn?.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Install outcome: ${outcome}`);
        deferredPrompt = null;
    }
    pwaInstall.classList.remove('show');
});

dismissBtn?.addEventListener('click', () => {
    localStorage.setItem('pwaInstallDismissed', 'true');
    pwaInstall.classList.remove('show');
});

if (localStorage.getItem('pwaInstallDismissed')) {
    pwaInstall.style.display = 'none';
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => console.log('✅ Service Worker Registered'))
      .catch(err => console.error('❌ Service Worker Registration Failed:', err));
  });
}
