/**
 * Módulo: Calculadora Financeira
 * Responsável pelos cálculos de economia, validações e exibição de resultados.
 */

export function initCalculadora() {
  document.addEventListener('DOMContentLoaded', function () {
    // Seleção dos elementos de entrada e botões
    const botaoCalcular = document.querySelector('.botaoCalcular');
    const inputs = document.querySelectorAll('.mascaraDinheiro');

    // Seleção das seções de exibição de resultado
    const secaoDica = document.getElementById('mensagemDica');
    const secaoSituacoes = document.getElementById('secaoSituacoes');
    const txtValorCalculado = document.getElementById('valorCalculado');

    // Seleção das divs de cenários específicos (Critica, Neutra, Otima)
    const divCritica = document.getElementById('situacaoCritica');
    const divNeutra = document.getElementById('situacaoNeutra');
    const divOtima = document.getElementById('situacaoOtima');

    // Div de mensagem de erro do formulário
    const msgErro = document.getElementById('mensagemErroFormulario');

    /**
     * Limpa a máscara de moeda (R$) e converte o texto em um Número (Number)
     */
    function extrairNumero(textoDinheiro) {
      if (!textoDinheiro) return 0;
      // Remove tudo o que não é dígito ou vírgula e substitui vírgula por ponto
      let numeroLimpo = textoDinheiro.replace(/[^\d,]/g, '').replace(',', '.');
      return Number(numeroLimpo);
    }

    // Evento de clique no botão Gerar Sugestão
    botaoCalcular.addEventListener('click', function (e) {
      e.preventDefault();

      // Limpa mensagens de erro anteriores
      msgErro.style.display = 'none';

      // Coleta os valores numéricos dos campos
      let salario = extrairNumero(inputs[0].value);
      let gastos = extrairNumero(inputs[1].value);
      let objetivo = extrairNumero(inputs[2].value);

      // Validação de preenchimento básico
      if (salario === 0 || objetivo === 0) {
        msgErro.textContent =
          'Por favor, preencha o salário e o objetivo para calcularmos.';
        msgErro.style.display = 'block';
        return;
      }

      // Cálculos base (Prazo fixo de 24 meses)
      const meses = 24;
      const quantoEconomizarPorMes = objetivo / meses;
      const saldoMensal = salario - gastos;

      // Validação de viabilidade (Se a parcela é maior que o próprio salário)
      if (quantoEconomizarPorMes > salario) {
        const parcelaInviavel = quantoEconomizarPorMes.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        msgErro.textContent = `Objetivo inviável. Você precisaria guardar ${parcelaInviavel} por mês, o que ultrapassa sua renda atual.`;
        msgErro.style.display = 'block';
        return;
      }

      // Formatação do valor calculado para exibição em Real (BRL)
      const valorFormatado = quantoEconomizarPorMes.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      // Atualiza o texto do valor e exibe as seções de resultado
      txtValorCalculado.textContent = valorFormatado;
      secaoDica.style.display = 'block';
      secaoSituacoes.style.display = 'block';

      // Reseta a visibilidade das situações antes da nova validação
      divCritica.style.display = 'none';
      divNeutra.style.display = 'none';
      divOtima.style.display = 'none';

      // Lógica de classificação baseada no saldo disponível
      if (gastos >= salario) {
        divCritica.style.display = 'block';
      } else if (saldoMensal >= quantoEconomizarPorMes) {
        divOtima.style.display = 'block';
        // Atualiza detalhes específicos dentro da situação ótima
        document.querySelector('.valorEconomizar').textContent = valorFormatado;
        document.querySelector('.mesesEconomizar').textContent = '24 meses';
      } else {
        divNeutra.style.display = 'block';
      }

      // Rola a página suavemente até o resultado calculado
      setTimeout(function () {
        secaoDica.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });
  });
}
