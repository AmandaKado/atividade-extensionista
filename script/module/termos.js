export function initTermos() {
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalTermos');
    const btnAceitar = document.getElementById('btnAceitarTermos');

    if (localStorage.getItem('termosAceitos') === 'true') {
      modal.classList.add('modal-escondido');
    }

    btnAceitar.addEventListener('click', () => {
      localStorage.setItem('termosAceitos', 'true');
      modal.classList.add('modal-escondido');
    });
  });
}
