export function initCalculadora() {
  // Aguarda a página carregar
  document.addEventListener('DOMContentLoaded', function () {
    // --- LÓGICA DA MÁSCARA DE DINHEIRO (Pode manter a sua aqui se estiver em outro lugar) ---

    // --- NOVA LÓGICA DA CALCULADORA ---

    // Seleciona o botão direto pela classe, já que removemos a tag <a>
    const botaoCalcular = document.querySelector('.botaoCalcular');
    const inputs = document.querySelectorAll('.mascaraDinheiro');

    // Elementos que vamos mostrar/esconder na tela
    const secaoDica = document.getElementById('mensagemDica');
    const secaoSituacoes = document.getElementById('secaoSituacoes');
    const txtValorCalculado = document.getElementById('valorCalculado');

    const divCritica = document.getElementById('situacaoCritica');
    const divNeutra = document.getElementById('situacaoNeutra');
    const divOtima = document.getElementById('situacaoOtima');

    // Função auxiliar para transformar "R$ 1.500,00" em número 1500.00
    function extrairNumero(textoDinheiro) {
      if (!textoDinheiro) return 0;
      let numeroLimpo = textoDinheiro.replace(/[^\d,]/g, '').replace(',', '.');
      return Number(numeroLimpo);
    }

    // Ação de clique no botão
    botaoCalcular.addEventListener('click', function (e) {
      e.preventDefault(); // Evita que a página recarregue ao clicar

      // 1. Pega os valores digitados
      let salario = extrairNumero(inputs[0].value);
      let gastos = extrairNumero(inputs[1].value);
      let objetivo = extrairNumero(inputs[2].value);

      // Se algum valor estiver zerado, avisa o usuário
      if (salario === 0 || objetivo === 0) {
        alert('Por favor, preencha o salário e o objetivo para calcular.');
        return;
      }

      // 2. Faz a matemática
      const meses = 24; // 2 anos
      const quantoEconomizarPorMes = objetivo / meses;
      const saldoMensal = salario - gastos;

      // 3. Formata o resultado para R$ para exibir na tela
      const valorFormatado = quantoEconomizarPorMes.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      // Atualiza o textão inicial
      txtValorCalculado.textContent = valorFormatado;

      // 4. Mostra as seções que estavam escondidas primeiro
      secaoDica.style.display = 'block';
      secaoSituacoes.style.display = 'block';

      // Esconde todas as situações primeiro para resetar
      divCritica.style.display = 'none';
      divNeutra.style.display = 'none';
      divOtima.style.display = 'none';

      // 5. Decide qual situação mostrar com base nas regras do negócio
      if (gastos >= salario) {
        divCritica.style.display = 'block';
      } else if (saldoMensal >= quantoEconomizarPorMes) {
        divOtima.style.display = 'block';
        document.querySelector('.valorEconomizar').textContent = valorFormatado;
        document.querySelector('.mesesEconomizar').textContent = '24 meses';
      } else {
        divNeutra.style.display = 'block';
      }

      // 6. A MÁGICA DO SCROLL (Com o atraso de 100ms para funcionar!)
      setTimeout(function () {
        secaoDica.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    });
  });
}
