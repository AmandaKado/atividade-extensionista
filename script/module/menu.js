
export function initMenuHamburguer() {
    const botao = document.getElementById('menuHamburguer');
    const menu = document.getElementById('menu');

    botao.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!botao.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
        }
    });
}
