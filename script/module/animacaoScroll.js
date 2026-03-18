/**
 * Módulo: Animação ao Rolar (Scroll)
 * Responsável por detectar a entrada de elementos na tela e disparar transições CSS.
 */

export function initAnimacaoScroll() {
  // Seleciona todos os elementos que possuem a classe de animação
  const elementosAnimados = document.querySelectorAll('.animarScroll');

  // Segurança: Se não houver elementos com essa classe na página, encerra a função
  if (elementosAnimados.length === 0) return;

  // Configuração do Observador de Interseção
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // Verifica se o elemento entrou na área visível do usuário
        if (entry.isIntersecting) {
          // Adiciona a classe '.mostrar' definida no seu CSS para iniciar a transição
          entry.target.classList.add('mostrar');

          // Importante: Para de observar o elemento após a primeira exibição
          // Isso evita que a animação se repita e economiza recursos do navegador
          observer.unobserve(entry.target);
        }
      });
    },
    {
      // Define que a animação dispara quando 15% do elemento estiver visível
      threshold: 0.15,
    },
  );

  // Itera por cada elemento encontrado e inicia o monitoramento (vigília)
  elementosAnimados.forEach((elemento) => {
    observer.observe(elemento);
  });
}
