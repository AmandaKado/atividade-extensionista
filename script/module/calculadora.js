export function initCalculadora() {
  const btnGerar = document.querySelector('.botaoGerador button');
  const inputs = document.querySelectorAll('.inputsBlocos input');

  // Seleciona o H1 onde o valor calculado será exibido (atualmente R$ 1000 no HTML)
  const displayValorCalculado = document.querySelector(
    'main section:nth-of-type(2) h1',
  );

  const feedbacks = {
    critica: {
      h1: document.querySelector('.tituloSituacao:nth-of-type(1)'),
      p: document.querySelector('.tituloSituacao:nth-of-type(1) + p'),
      img: document.querySelector('.iconeTriste'),
    },
    neutra: {
      h1: document.querySelector('.tituloSituacao:nth-of-type(2)'),
      p: document.querySelector('.tituloSituacao:nth-of-type(2) + p'),
      img: document.querySelector('.iconeNeutra'),
    },
    otima: {
      h1: document.querySelector('.tituloSituacao:nth-of-type(3)'),
      p: document.querySelector('.tituloSituacao:nth-of-type(3) + p'),
      img: document.querySelector('.iconeFeliz'),
    },
  };

  if (!btnGerar) return;

  btnGerar.addEventListener('click', (e) => {
    e.preventDefault();
    const salario = parseFloat(inputs[0].value) || 0;
    const gastos = parseFloat(inputs[1].value) || 0;
    const objetivoTotal = parseFloat(inputs[2].value) || 0;
    const valorMensalNecessario = objetivoTotal / 24;
    const saldoDisponivel = salario - gastos;

    if (displayValorCalculado) {
      displayValorCalculado.innerText = valorMensalNecessario.toLocaleString(
        'pt-BR',
        {
          style: 'currency',
          currency: 'BRL',
        },
      );
    }

    // Limpa feedbacks anteriores
    Object.values(feedbacks).forEach((f) => {
      if (f.h1) f.h1.style.display = 'none';
      if (f.p) f.p.style.display = 'none';
      if (f.img) f.img.style.display = 'none';
    });

    // 4. Lógica de exibição baseada na viabilidade do plano
    if (saldoDisponivel < 0) {
      exibir(feedbacks.critica);
    } else if (saldoDisponivel < valorMensalNecessario) {
      // Se sobra dinheiro, mas não o suficiente para a meta de 5 anos
      exibir(feedbacks.neutra);
    } else {
      // Se a sobra mensal cobre ou supera a meta de 5 anos
      exibir(feedbacks.otima);
    }
  });

  function exibir(elemento) {
    if (!elemento.h1) return;
    elemento.h1.style.display = 'block';
    elemento.p.style.display = 'block';
    elemento.img.style.display = 'block';
    elemento.h1.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
