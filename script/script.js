/**
 * SPARK FIN - Arquivo Principal (Main)
 * Responsável por importar e inicializar todos os módulos do site.
 */

// Importação dos módulos específicos
import { initCalculadora } from './module/calculadora.js';
import { initMenuHamburguer } from './module/menu.js';
import { initLabelValor } from './module/labelValor.js';
import { initAnimacaoScroll } from './module/animacaoScroll.js';
import { initTermos } from './module/termos.js';

// --- Inicialização das Funcionalidades ---

// Ativa o comportamento do menu mobile (abrir/fechar)
initMenuHamburguer();

// Ativa a lógica de cálculos e validações da calculadora
initCalculadora();

// Ativa a formatação em tempo real de moeda (R$) nos inputs
initLabelValor();

// Ativa o observador de scroll para disparar animações de entrada
initAnimacaoScroll();

// Ativa a exibição do modal de termos de uso e o armazenamento da aceitação
initTermos();
