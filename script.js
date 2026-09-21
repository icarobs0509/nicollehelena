/* =========================================================
   Dra. Nicole Helena - Psicóloga
   Script principal do site.
   Responsável por:
   1. Menu mobile (abrir/fechar)
   2. Animação de entrada da lista "O que te trouxe até aqui"
   3. Validação e feedback do formulário de contato
   4. Ano dinâmico no rodapé
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. MENU MOBILE ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    // fecha o menu ao clicar em qualquer link (útil no mobile)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });

    // fecha o menu se a pessoa clicar fora dele
    document.addEventListener('click', (event) => {
      const clicouFora = !menu.contains(event.target) && !menuToggle.contains(event.target);
      if (clicouFora) {
        menu.classList.remove('open');
      }
    });
  }

  /* ---------- 2. ANIMAÇÃO DA LISTA DE MOTIVOS ---------- */
  const motivos = document.querySelectorAll('.motivos-lista li');

  if (motivos.length) {
    // Se o navegador não suportar IntersectionObserver, mostra tudo direto
    if (!('IntersectionObserver' in window)) {
      motivos.forEach(item => item.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // pequeno atraso entre um item e outro, para um efeito "cascata"
            const indiceNaLista = Array.from(motivos).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, indiceNaLista * 90);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2
      });

      motivos.forEach(item => observer.observe(item));
    }
  }

  /* ---------- 3. FORMULÁRIO DE CONTATO ---------- */
  const form = document.getElementById('formContato');
  const feedback = document.getElementById('feedback');

  if (form && feedback) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nome || !email || !mensagem) {
        mostrarFeedback('Por favor, preencha nome, e-mail e mensagem.', true);
        return;
      }

      if (!emailValido) {
        mostrarFeedback('Digite um e-mail válido.', true);
        return;
      }

      // Aqui, em um site real, os dados seriam enviados para um servidor
      // (fetch, EmailJS, Formspree, etc). Como é um projeto didático,
      // apenas simulamos o envio com sucesso.
      mostrarFeedback('Mensagem enviada! Retorno em breve.', false);
      form.reset();
    });
  }

  function mostrarFeedback(texto, erro) {
    feedback.textContent = texto;
    feedback.classList.toggle('erro', erro);
    feedback.style.display = 'block';

    // some sozinho depois de alguns segundos
    clearTimeout(mostrarFeedback._timer);
    mostrarFeedback._timer = setTimeout(() => {
      feedback.style.display = 'none';
    }, 5000);
  }

  /* ---------- 4. ANO NO RODAPÉ ---------- */
  const anoSpan = document.getElementById('ano');
  if (anoSpan) {
    anoSpan.textContent = new Date().getFullYear();
  }

});