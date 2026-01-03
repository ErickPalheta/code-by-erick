// Gerenciamento de tema claro/escuro
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');
  const html = document.documentElement;
  
  // Verifica se há preferência salva ou usa o padrão (escuro)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme, themeIcon, themeText);
  
  // Adiciona listener ao botão
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeButton(newTheme, themeIcon, themeText);
    });
  }
}

function updateThemeButton(theme, icon, text) {
  if (icon && text) {
    if (theme === 'light') {
      icon.textContent = '☀️';
      text.textContent = 'Claro';
    } else {
      icon.textContent = '🌙';
      text.textContent = 'Escuro';
    }
  }
}

// Typewriter effect para o título
function typeWriter(element, text, speed = 100) {
  if (!element) return;
  
  let i = 1;
  let isDeleting = false;
  const minLength = 1;
  
  // Cria o cursor
  let cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.animation = 'blink 1s steps(1) infinite';
  cursor.style.marginLeft = '2px';
  cursor.className = 'typewriter-cursor';
  
  // Adiciona o cursor ao elemento
  if (!element.querySelector('.typewriter-cursor')) {
    element.appendChild(cursor);
  }
  
  function updateText() {
    // Para "Erick Palheta", não precisa de destaque especial
    let currentText = text.substring(0, i);
    element.innerHTML = currentText;
    
    // Mantém o cursor
    if (!element.querySelector('.typewriter-cursor')) {
      element.appendChild(cursor);
    }
  }
  
  function type() {
    if (!isDeleting && i < text.length) {
      i++;
      updateText();
      setTimeout(type, speed);
    } else if (isDeleting && i > minLength) {
      i--;
      updateText();
      setTimeout(type, speed / 2);
    } else {
      isDeleting = !isDeleting;
      const delay = !isDeleting ? 1000 : 3000;
      setTimeout(type, delay);
    }
  }
  
  // Inicializa
  if (element.childNodes.length === 0 || element.textContent.trim() === '') {
    element.textContent = text.substring(0, i);
    element.appendChild(cursor);
  } else {
    updateText();
  }
  
  type();
}

// Adiciona CSS do cursor piscante
const style = document.createElement('style');
style.innerHTML = `
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}`;
document.head.appendChild(style);

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o tema
  initTheme();
  
  // Inicializa o typewriter apenas na página inicial
  const title = document.getElementById('mainTitle');
  if (title) {
    const text = title.textContent || 'Erick Palheta';
    typeWriter(title, text);
  }
  
  // Smooth scroll para links âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
