/**
 * Módulo: Menu Hamburguer
 * Responsável pela abertura, fechamento e controle do menu mobile.
 */

export function initMenuHamburguer() {
    const menuIcone = document.getElementById('menuHamburguer');
    const menu = document.getElementById('menu');

    // Verifica se os elementos existem na página antes de rodar o código
    if (!menuIcone || !menu) return;

    // Abre/Fecha o menu ao clicar no ícone de hambúrguer
    menuIcone.addEventListener('click', (event) => {
        // impede que o clique no ícone seja detectado pelo fechar ao clicar fora
        event.stopPropagation();
        menu.classList.toggle('ativo');
    });

    // Fecha o menu automaticamente ao clicar em qualquer lugar fora dele
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnIcon = menuIcone.contains(event.target);

        if (!isClickInsideMenu && !isClickOnIcon) {
            menu.classList.remove('ativo');
        }
    });
}
