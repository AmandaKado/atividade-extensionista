/**
 * Módulo: Menu Hamburguer
 * Responsável pela abertura, fechamento e controle do menu mobile.
 */

export function initMenuHamburguer() {
    // Seleção dos elementos do DOM
    const menuIcone = document.getElementById('menuHamburguer');
    const menu = document.getElementById('menu');

    // Segurança: Verifica se os elementos existem na página antes de executar
    if (!menuIcone || !menu) return;

    // Evento 1: Abre ou fecha o menu ao clicar no ícone de hambúrguer
    menuIcone.addEventListener('click', (event) => {
        // Impede que o clique no ícone "suba" para o document e feche o menu imediatamente
        event.stopPropagation();
        menu.classList.toggle('ativo');
    });

    // Evento 2: Fecha o menu automaticamente ao detectar clique fora dele
    document.addEventListener('click', (event) => {
        // Verifica se o alvo do clique está dentro do menu ou é o ícone
        const isClickInsideMenu = menu.contains(event.target);
        const isClickOnIcon = menuIcone.contains(event.target);

        // Se o clique for fora de ambos, remove a classe de visibilidade
        if (!isClickInsideMenu && !isClickOnIcon) {
            menu.classList.remove('ativo');
        }
    });
}
