export function initLabelValor() {

  document.addEventListener('DOMContentLoaded', function () {
    // Seleciona todos os inputs que têm a classe 'mascaraDinheiro'
    const inputsDinheiro = document.querySelectorAll('.mascaraDinheiro');

    inputsDinheiro.forEach((input) => {
      input.addEventListener('input', function (e) {
        // Pega o que foi digitado e remove tudo o que não for número
        let valor = e.target.value.replace(/\D/g, '');

        // Se o usuário apagar tudo, deixa a caixa vazia
        if (valor === '') {
          e.target.value = '';
          return;
        }

        // Formata para o padrão de dinheiro do Brasil
        valor = (Number(valor) / 100).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        // Devolve o valor formatado para a caixinha
        e.target.value = valor;
      });
    });
  });

}