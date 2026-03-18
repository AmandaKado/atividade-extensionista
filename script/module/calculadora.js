/**
 * Módulo: Calculadora Financeira
 * Lógica de cálculo, validação de metas e exibição de resultados.
 */

export function initCalculadora() {
  const botaoCalcular = document.querySelector('.botaoCalcular');
  const inputs = document.querySelectorAll('.mascaraDinheiro');

  // Elementos de exibição de resultado
  const secaoDica = document.getElementById('mensagemDica');
  const secaoSituacoes = document.getElementById('secaoSituacoes');
  const txtValorCalculado = document.getElementById('valorCalculado');
  const msgErro = document.getElementById('mensagemErroFormulario');

  // Divs de situações específicas
  const divCritica = document.getElementById('situacaoCritica');
  const divNeutra = document.getElementById('situacaoNeutra');
  const divOtima = document.getElementById('situacaoOtima');

  // Sai da função se o botão não existir na página atual
  if (!botaoCalcular) return;

  /**
   * Converte o texto da máscara (R$ 1.500,00) em um número puro (1500.00)
   */
  function extrairNumero(textoDinheiro) {
    if (!textoDinheiro) return 0;
    let numeroLimpo = textoDinheiro.replace(/[^\d,]/g, '').replace(',', '.');
    return Number(numeroLimpo);
  }

  botaoCalcular.addEventListener('click', (e) => {
    e.preventDefault();

    // Reseta o estado inicial (esconde erros e resultados anteriores)
    msgErro.style.display = 'none';
    secaoDica.style.display = 'none';
    secaoSituacoes.style.display = 'none';

    // 1. Captação de valores
    const salario = extrairNumero(inputs[0].value);
    const gastos = extrairNumero(inputs[1].value);
    const objetivo = extrairNumero(inputs[2].value);

    // 2. Validação básica (Campos vazios)
    if (salario === 0 || objetivo === 0) {
      msgErro.textContent =
        'Por favor, preencha o salário e o objetivo para calcularmos.';
      msgErro.style.display = 'block';
      return;
    }

    // 3. Cálculos Base (Prazo fixo de 2 anos)
    const meses = 24;
    const quantoEconomizarPorMes = objetivo / meses;
    const saldoMensal = salario - gastos;

    // 4. Validação Avançada (Objetivo Inviável)
    if (quantoEconomizarPorMes > salario) {
      const parcelaInviavel = quantoEconomizarPorMes.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      msgErro.textContent = `Objetivo inviável. Você precisaria guardar ${parcelaInviavel} por mês, o que ultrapassa sua renda atual.`;
      msgErro.style.display = 'block';
      return;
    }

    // 5. Exibição do Valor Calculado
    const valorFormatado = quantoEconomizarPorMes.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    txtValorCalculado.textContent = valorFormatado;
    secaoDica.style.display = 'block';
    secaoSituacoes.style.display = 'block';

    // 6. Lógica de Classificação da Situação
    divCritica.style.display = 'none';
    divNeutra.style.display = 'none';
    divOtima.style.display = 'none';

    if (gastos >= salario) {
      divCritica.style.display = 'block';
    } else if (saldoMensal >= quantoEconomizarPorMes) {
      divOtima.style.display = 'block';
      document.querySelector('.valorEconomizar').textContent = valorFormatado;
      document.querySelector('.mesesEconomizar').textContent = '24 meses';
    } else {
      divNeutra.style.display = 'block';
    }

    // 7. Scroll suave até o resultado
    setTimeout(() => {
      secaoDica.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  });
}
