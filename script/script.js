/**
 * SPARK FIN - Arquivo Principal (Main)
 * Responsável por importar e inicializar todos os módulos do site.
 */

import { initCalculadora } from './module/calculadora.js';
import { initMenuHamburguer } from './module/menu.js';
import { initLabelValor } from './module/labelValor.js';
import { initAnimacaoScroll } from './module/animacaoScroll.js';

// Inicializa o Menu Mobile (Hambúrguer)
initMenuHamburguer();

// Inicializa a Lógica da Calculadora Financeira
initCalculadora();

// Inicializa a Máscara de Moeda (R$) nos campos de input
initLabelValor();

// Inicializa as Animações de Surgimento ao rolar a página (Scroll)
initAnimacaoScroll();
