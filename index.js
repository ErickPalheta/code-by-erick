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

// Função para esconder a tela de loading
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    // Aguarda um tempo mínimo para garantir que o conteúdo carregou
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      // Remove o elemento do DOM após a animação
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 800); // Tempo mínimo de exibição do loading
  }
}

// ─── Terminal "Sobre mim" ───────────────────────────────
function initTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  const PROMPT =
    '<span class="t-user">erick</span>' +
    '<span class="t-at">@</span>' +
    '<span class="t-host">portfolio</span>' +
    '<span class="t-colon">:</span>' +
    '<span class="t-path">~</span>' +
    '<span class="t-dollar">$</span>';

  const steps = [
    { type: 'cmd',    text: 'whoami' },
    { type: 'out',    html: '<span class="t-hl">Erick Palheta</span> <span class="t-dim">—</span> Desenvolvedor Backend' },
    { type: 'gap' },

    { type: 'cmd',    text: 'cat sobre.txt' },
    { type: 'out',    html: 'Sou estudante de <span class="t-hl">Ciência da Computação</span> e desenvolvedor\nbackend com foco em <span class="t-hl">Java</span>, <span class="t-hl">Python</span> e <span class="t-hl">Spring Boot</span>\npara criação de sistemas e <span class="t-hl">APIs REST</span>.' },
    { type: 'out',    html: '\nTenho experiência com <span class="t-hl">MySQL</span>, <span class="t-hl">PostgreSQL</span>, <span class="t-hl">Git</span> e <span class="t-hl">GitHub</span>,\ne desenvolvo soluções em servidores <span class="t-hl">Linux</span> (Ubuntu Server, Debian),\nutilizando <span class="t-hl">Proxmox</span>, <span class="t-hl">Zabbix</span>, <span class="t-hl">Grafana</span> e <span class="t-hl">Cloud AWS</span>.\nTambém possuo conhecimentos em redes de computadores.' },
    { type: 'gap' },

    { type: 'cmd',    text: 'echo $STATUS' },
    { type: 'out',    html: 'Aprimorando algoritmos no <span class="t-hl">LeetCode</span> | Buscando oportunidades 🚀' },
    { type: 'gap' },

    { type: 'cursor' },
  ];

  function addPromptLine() {
    const div = document.createElement('div');
    div.className = 't-line';
    div.innerHTML = PROMPT;
    body.appendChild(div);
    return div;
  }

  function typeCmd(line, text, cb) {
    const span = document.createElement('span');
    span.className = 't-cmd';
    const cur = document.createElement('span');
    cur.className = 't-cursor';
    line.appendChild(span);
    line.appendChild(cur);

    let i = 0;
    function tick() {
      if (i < text.length) {
        span.textContent += text[i++];
        setTimeout(tick, 55 + Math.random() * 35);
      } else {
        cur.remove();
        if (cb) setTimeout(cb, 180);
      }
    }
    tick();
  }

  function addOut(html) {
    const div = document.createElement('div');
    div.className = 't-output';
    div.innerHTML = html;
    body.appendChild(div);
  }

  function run(i) {
    if (i >= steps.length) return;
    const s = steps[i];
    const next = () => run(i + 1);

    if (s.type === 'cmd') {
      typeCmd(addPromptLine(), s.text, next);
    } else if (s.type === 'out') {
      addOut(s.html);
      setTimeout(next, 60);
    } else if (s.type === 'gap') {
      const div = document.createElement('div');
      div.style.height = '0.4rem';
      body.appendChild(div);
      setTimeout(next, 30);
    } else if (s.type === 'cursor') {
      const line = addPromptLine();
      const cur = document.createElement('span');
      cur.className = 't-cursor';
      line.appendChild(cur);
    }
  }

  // Inicia quando a seção entrar na viewport
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      setTimeout(() => run(0), 300);
    }
  }, { threshold: 0.25 });

  observer.observe(body);
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa o tema
  initTheme();

  // Inicializa o terminal "Sobre mim"
  initTerminal();
  
  // Esconde a tela de loading quando tudo estiver carregado
  if (document.readyState === 'complete') {
    hideLoadingScreen();
  } else {
    window.addEventListener('load', hideLoadingScreen);
  }
  
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
