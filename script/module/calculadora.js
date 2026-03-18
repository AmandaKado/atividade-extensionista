export function initCalculadora() {
  document.addEventListener('DOMContentLoaded', function () {
    const botaoCalcular = document.querySelector('.botaoCalcular');
    const inputs = document.querySelectorAll('.mascaraDinheiro');

    const secaoDica = document.getElementById('mensagemDica');
    const secaoSituacoes = document.getElementById('secaoSituacoes');
    const txtValorCalculado = document.getElementById('valorCalculado');

    const divCritica = document.getElementById('situacaoCritica');
    const divNeutra = document.getElementById('situacaoNeutra');
    const divOtima = document.getElementById('situacaoOtima');

    const msgErro = document.getElementById('mensagemErroFormulario');

    function extrairNumero(textoDinheiro) {
      if (!textoDinheiro) return 0;
      let numeroLimpo = textoDinheiro.replace(/[^\d,]/g, '').replace(',', '.');
      return Number(numeroLimpo);
    }

    botaoCalcular.addEventListener('click', function (e) {
      e.preventDefault();

      msgErro.style.display = 'none';

      let salario = extrairNumero(inputs[0].value);
      let gastos = extrairNumero(inputs[1].value);
      let objetivo = extrairNumero(inputs[2].value);

      if (salario === 0 || objetivo === 0) {
        msgErro.textContent =
          'Por favor, preencha o salário e o objetivo para calcularmos.';
        msgErro.style.display = 'block'; 
        return;
      }

      const meses = 24;
      const quantoEconomizarPorMes = objetivo / meses;
      const saldoMensal = salario - gastos;

      if (quantoEconomizarPorMes > salario) {
        const parcelaInviavel = quantoEconomizarPorMes.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        msgErro.textContent = `Objetivo inviável. Você precisaria guardar ${parcelaInviavel} por mês, o que ultrapassa sua renda atual.`;
        msgErro.style.display = 'block'; 
        return;
      }

      const valorFormatado = quantoEconomizarPorMes.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      txtValorCalculado.textContent = valorFormatado;

      secaoDica.style.display = 'block';
      secaoSituacoes.style.display = 'block';

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

      setTimeout(function () {
        secaoDica.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });
  });
}
