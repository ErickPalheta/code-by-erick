function typeWriter(element, text, speed = 150) {
    let i = 1; // Começa da primeira letra
    let isDeleting = false;
    const minLength = 1; // Não apaga além da primeira letra

    // Cria o cursor
    let cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s steps(1) infinite';
    cursor.style.marginLeft = '2px';
    cursor.style.fontWeight = 'normal';
    cursor.className = 'typewriter-cursor';
    
    // Adiciona o cursor ao elemento
    if (!element.querySelector('.typewriter-cursor')) {
        element.appendChild(cursor);
    }

    function updateText() {
        element.childNodes[0].textContent = text.substring(0, i);
    }

    function type() {
        if (!isDeleting && i < text.length) {
            // Digitando
            i++;
            updateText();
            setTimeout(type, speed);
        } else if (isDeleting && i > minLength) {
            // Apagando até a primeira letra
            i--;
            updateText();
            setTimeout(type, speed / 2);
        } else {
            // Inverte a direção
            isDeleting = !isDeleting;
            // Se acabou de digitar, espera 3 segundos antes de começar a apagar
            const delay = !isDeleting ? 1000 : 3000;
            setTimeout(type, delay);
        }
    }

    // Inicializa o texto e o cursor
    if (element.childNodes.length === 0) {
        element.textContent = text.substring(0, i);
        element.appendChild(cursor);
    } else {
        updateText();
    }

    type();
}

// Adiciona o CSS do cursor piscante
const style = document.createElement('style');
style.innerHTML = `
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}`;
document.head.appendChild(style);

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('h1');
    const text = title.textContent;
    typeWriter(title, text);
});
