/**
 * Módulo: Máscara de Dinheiro
 * Formata os inputs em tempo real para o padrão R$ 0,00.
 */

export function initLabelValor() {
  // Seleciona todos os campos que devem receber a formatação
  const inputsDinheiro = document.querySelectorAll('.mascaraDinheiro');

  // Segurança: Se não houver inputs com essa classe na página atual, encerra a função
  if (inputsDinheiro.length === 0) return;

  inputsDinheiro.forEach((input) => {
    // Escuta cada tecla digitada no campo
    input.addEventListener('input', (e) => {
      // Passo 1: Remove qualquer caractere que não seja um dígito numérico
      let valor = e.target.value.replace(/\D/g, '');

      // Passo 2: Se o campo for limpo pelo usuário, limpa o valor para exibir o placeholder
      if (valor === '') {
        e.target.value = '';
        return;
      }

      // Passo 3: Converte para número, divide por 100 (para centavos)
      // e aplica a formatação de moeda brasileira (BRL)
      const valorFormatado = (Number(valor) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      // Passo 4: Atualiza o valor visível no campo com a máscara R$
      e.target.value = valorFormatado;
    });
  });
}
