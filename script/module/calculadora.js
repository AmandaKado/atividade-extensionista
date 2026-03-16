export function initCalculadora() {
  // Aguarda a página carregar
  document.addEventListener('DOMContentLoaded', function () {
    // --- CÓDIGO DA MÁSCARA DE DINHEIRO (Mantenha o que você já tem aqui) ---
    // ... seu código anterior que formata os inputs ...

    // --- NOVA LÓGICA DA CALCULADORA ---

    const botaoCalcular = document.querySelector('.botaoCalcular button');
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
      // Remove tudo que não for número ou vírgula, depois troca a vírgula por ponto
      let numeroLimpo = textoDinheiro.replace(/[^\d,]/g, '').replace(',', '.');
      return Number(numeroLimpo);
    }

    // Ação de clique no botão
    botaoCalcular.addEventListener('click', function (e) {
      e.preventDefault(); // Evita que a página recarregue ao clicar no link

      // 1. Pega os valores digitados (sabendo que a ordem é Salário [0], Gastos [1], Objetivo [2])
      let salario = extrairNumero(inputs[0].value);
      let gastos = extrairNumero(inputs[1].value);
      let objetivo = extrairNumero(inputs[2].value);

      // Se algum valor estiver zerado, avisa o usuário (opcional)
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

      // Mostra as seções que estavam escondidas
      secaoDica.style.display = 'block';
      secaoSituacoes.style.display = 'block';

      // Esconde todas as situações primeiro para resetar
      divCritica.style.display = 'none';
      divNeutra.style.display = 'none';
      divOtima.style.display = 'none';

      // 4. Decide qual situação mostrar com base nas regras do negócio
      if (gastos >= salario) {
        // Se gasta mais do que ganha (ou igual)
        divCritica.style.display = 'block';
      } else if (saldoMensal >= quantoEconomizarPorMes) {
        // Se o que sobra do salário paga a meta confortavelmente
        divOtima.style.display = 'block';

        // Preenche as variáveis do texto da situação Ótima
        document.querySelector('.valorEconomizar').textContent = valorFormatado;
        document.querySelector('.mesesEconomizar').textContent = '24 meses';
      } else {
        // Se sobra dinheiro, mas não é suficiente para a meta
        divNeutra.style.display = 'block';
      }
    });
  });
}
