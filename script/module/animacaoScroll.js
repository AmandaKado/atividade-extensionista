export function initAnimacaoScroll() {
  const elementosAnimados = document.querySelectorAll('.animarScroll');

  // Se não tiver nenhum elemento com a classe na página, ele não faz nada
  if (elementosAnimados.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        // isIntersecting significa que o elemento entrou na tela do usuário
        if (entry.isIntersecting) {
          // Adiciona a classe '.mostrar' que criamos no CSS
          entry.target.classList.add('mostrar');

          // Para de vigiar o elemento para a animação não repetir ao rolar pra cima
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15, // A animação dispara quando 15% do bloco aparecer na tela
    },
  );

  // Manda o observador vigiar cada elemento encontrado
  elementosAnimados.forEach((elemento) => {
    observer.observe(elemento);
  });
}
