export function initMenuHamburguer() {
    const menuIcone = document.getElementById("menuHamburguer");
    const menu = document.getElementById("menu");

    menuIcone.addEventListener("click", () => {
        menu.classList.toggle("ativo");
    });

    document.addEventListener("click", (event) => {
        const clicouFora = !menu.contains(event.target) && !menuIcone.contains(event.target);
        if (clicouFora) {
            menu.classList.remove("ativo");
        }
    });
}