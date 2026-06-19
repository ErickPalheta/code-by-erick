// Portfolio 2026 — animações (reveal on scroll, glow das stacks, terminal)
(function () {
  'use strict';

  /* ===== Reveal on scroll ===== */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach(function (el) { el.style.opacity = '1'; });
      return;
    }
    els.forEach(function (el) {
      var d = el.getAttribute('data-reveal') || '0';
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.filter = 'blur(10px)';
      el.style.transition =
        'opacity .9s cubic-bezier(.16,1,.3,1) ' + d + 'ms, ' +
        'transform .9s cubic-bezier(.16,1,.3,1) ' + d + 'ms, ' +
        'filter .9s cubic-bezier(.16,1,.3,1) ' + d + 'ms';
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'none';
          en.target.style.filter = 'none';
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ===== Stacks acendem na cor da marca quando entram na zona central ===== */
  function initStackGlow() {
    var els = Array.prototype.slice.call(document.querySelectorAll('.stk'));
    if (!('IntersectionObserver' in window) || els.length === 0) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var on = en.isIntersecting;
        var clr = en.target.getAttribute('data-clr') || '#f2f2f2';
        var glow = en.target.getAttribute('data-glow') || 'rgba(255,255,255,0.25)';
        en.target.style.color = on ? clr : '#d4d4d4';
        en.target.style.textShadow = on ? '0 0 20px ' + glow : 'none';
      });
    }, { rootMargin: '-22% 0px -22% 0px', threshold: 0 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ===== Terminal animado ===== */
  function initTerminal() {
    var body = document.getElementById('terminal');
    var logoEl = document.getElementById('termLogo');
    if (!body) return;

    var timers = [];
    function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }

    var PROMPT =
      '<span style="color:#58a6ff;font-weight:700">erick</span>' +
      '<span style="color:#6e7681">@</span>' +
      '<span style="color:#3fb950;font-weight:700">portfolio</span>' +
      '<span style="color:#6e7681">:</span>' +
      '<span style="color:#3fb950">~</span>' +
      '<span style="color:#c9d1d9;margin:0 8px 0 4px">$</span>';
    var HL = function (s) { return '<span style="color:#3fb950;font-weight:600">' + s + '</span>'; };

    var steps = [
      { type: 'cmd', text: 'whoami' },
      { type: 'out', html: HL('Erick Palheta') + ' <span style="color:#6e7681">—</span> Desenvolvedor Backend' },
      { type: 'gap' },
      { type: 'cmd', text: 'cat sobre.txt' },
      { type: 'out', html: 'Sou estudante de ' + HL('Ciência da Computação') + ' e desenvolvedor\nbackend com foco em ' + HL('Java') + ', ' + HL('Python') + ' e ' + HL('Spring Boot') + '\npara criação de sistemas e ' + HL('APIs REST') + '.' },
      { type: 'out', html: '\nTenho experiência com ' + HL('MySQL') + ', ' + HL('PostgreSQL') + ', ' + HL('Git') + ' e ' + HL('GitHub') + ',\ne desenvolvo soluções em servidores ' + HL('Linux') + ' (Ubuntu Server, Debian),\nutilizando ' + HL('Proxmox') + ', ' + HL('Zabbix') + ', ' + HL('Grafana') + ' e ' + HL('Cloud AWS') + '.\nTambém possuo conhecimentos em redes de computadores.' },
      { type: 'gap' },
      { type: 'cmd', text: 'echo $STATUS' },
      { type: 'out', html: 'Aprimorando algoritmos no ' + HL('LeetCode') + ' | Buscando oportunidades' },
      { type: 'gap' },
      { type: 'cursor' }
    ];

    function cursorEl() {
      var c = document.createElement('span');
      c.setAttribute('style', 'display:inline-block;width:8px;height:1.1em;background:#58a6ff;margin-left:2px;vertical-align:text-bottom;animation:blinkCur 1s steps(1) infinite');
      return c;
    }
    function addPromptLine() {
      var div = document.createElement('div');
      div.setAttribute('style', 'display:flex;align-items:baseline;flex-wrap:wrap');
      div.innerHTML = PROMPT;
      body.appendChild(div);
      return div;
    }
    function addOut(html) {
      var div = document.createElement('div');
      div.setAttribute('style', 'color:#b1bac4;margin:2px 0 8px;white-space:pre-wrap;word-break:break-word');
      div.innerHTML = html;
      body.appendChild(div);
    }
    function typeCmd(line, text, cb) {
      var span = document.createElement('span');
      span.style.color = '#c9d1d9';
      var cur = cursorEl();
      line.appendChild(span);
      line.appendChild(cur);
      var i = 0;
      function tick() {
        if (i < text.length) {
          span.textContent += text[i++];
          later(tick, 48 + Math.random() * 32);
        } else {
          cur.remove();
          if (cb) later(cb, 180);
        }
      }
      tick();
    }
    function run(i) {
      if (i >= steps.length) return;
      var s = steps[i];
      var next = function () { run(i + 1); };
      if (s.type === 'cmd') typeCmd(addPromptLine(), s.text, next);
      else if (s.type === 'out') { addOut(s.html); later(next, 60); }
      else if (s.type === 'gap') { var d = document.createElement('div'); d.style.height = '7px'; body.appendChild(d); later(next, 30); }
      else if (s.type === 'cursor') addPromptLine().appendChild(cursorEl());
    }

    if (!('IntersectionObserver' in window)) {
      if (logoEl) { logoEl.style.opacity = '0.92'; logoEl.style.transform = 'scale(1)'; }
      run(0);
      return;
    }
    var termObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        termObs.disconnect();
        if (logoEl) later(function () { logoEl.style.opacity = '0.92'; logoEl.style.transform = 'scale(1)'; }, 500);
        later(function () { run(0); }, 350);
      }
    }, { threshold: 0.2 });
    termObs.observe(body);
  }

  function init() {
    initReveal();
    initStackGlow();
    initTerminal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
