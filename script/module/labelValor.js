/**
 * Módulo: Máscara de Dinheiro
 * Formata os inputs em tempo real para o padrão R$ 0,00.
 */

export function initLabelValor() {
  const inputsDinheiro = document.querySelectorAll('.mascaraDinheiro');

  // Se não houver inputs com essa classe na página, encerra a função
  if (inputsDinheiro.length === 0) return;

  inputsDinheiro.forEach((input) => {
    input.addEventListener('input', (e) => {
      // Remove tudo o que não for número
      let valor = e.target.value.replace(/\D/g, '');

      // Se o campo estiver vazio, mantém vazio para mostrar o placeholder
      if (valor === '') {
        e.target.value = '';
        return;
      }

      // Transforma os números em decimal (divindindo por 100) e formata como Moeda Brasileira
      const valorFormatado = (Number(valor) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      // Devolve o valor formatado para o campo
      e.target.value = valorFormatado;
    });
  });
}
