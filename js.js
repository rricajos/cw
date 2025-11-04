// PT → ES solo sobre textContent visible (sin tocar atributos/HTML interno)
(function () {
  'use strict';
  console.log('🇵🇹→🇪🇸 Traductor (solo textContent) activo');

  // --- Diccionario EXACTO (palabras/sintagmas aislados) ---
  const exactMap = new Map([
    // Navegación / secciones
    ['Caixa de Entrada','Bandeja de Entrada'],
    ['Conversas','Conversaciones'],
    ['Contatos','Contactos'],
    ['Relatórios','Informes'],
    ['Configurações','Configuración'],
    ['Ajuda','Ayuda'],
    ['Painel','Panel'],
    ['Equipe','Equipo'],
    ['Etiquetas','Etiquetas'],
    ['Atributos','Atributos'],
    ['Kanban','Kanban'],
    ['Funis','Embudos'],
    ['Etapas','Etapas'],
    ['Ofertas','Ofertas'],
    ['Modelos de mensagem','Modelos de Mensaje'],
    ['Ajustes','Ajustes'],

    // Cabeceras / bloques
    ['Dados Básicos','Datos Básicos'],
    ['Metas','Metas'],
    ['Campos Personalizados Globais','Campos Personalizados Globales'],

    // Estados / acciones comunes
    ['Ativo','Activo'],
    ['Fechado','Cerrado'],
    ['Aberto','Abierto'],
    ['Resolvido','Resuelto'],
    ['Pendente','Pendiente'],
    ['Adiado','Pospuesto'],
    ['Descartar','Descartar'],
    ['Guardar','Guardar'],
    ['Salvar','Guardar'],
    ['Copiar','Copiar'],
    ['Editar','Editar'],
    ['Excluir','Eliminar'],
    ['Cancelar','Cancelar'],
    ['Aplicar','Aplicar'],
    ['Limpar','Limpiar'],
    ['Adicionar','Añadir'],
    ['Criar','Crear'],
    ['Atualizar','Actualizar'],
    ['Remover','Quitar'],
    ['Buscar','Buscar'],

    // Formularios / campos
    ['Crie uma nova etapa','Crea una nueva etapa'],
    ['Nome da etapa','Nombre de la etapa'],
    ['Cor','Color'],
    ['Descrição','Descripción'],
    ['Descrição da etapa','Descripción de la etapa'],
    ['Condições de Auto Criação','Condiciones de Auto-Creación'],
    ['Contato tem tag','El contacto tiene la etiqueta'],
    ['Adicionar etapa','Añadir etapa'],
    ['Chave (nome)','Clave (nombre)'],
    ['Tipo','Tipo'],
    ['Único','Único'],
    ['Adicionar campo','Añadir campo'],

    // Panel derecho
    ['Etapas desse funil','Etapas de este embudo'],
    ['Agentes do Funil','Agentes del Embudo'],
    ['Modelos de Mensagem','Modelos de Mensaje'],
    ['Nenhum template nesta etapa','Ninguna plantilla en esta etapa'],

    // Metas
    ['Configure uma nova meta','Configura una nueva meta'],
    ['Tipo de Meta','Tipo de Meta'],
    ['Taxa de Conversão','Tasa de Conversión'],
    ['Valor Médio','Valor Medio'],
    ['Tempo Médio','Tiempo Medio'],
    ['Total de Conversões','Total de Conversiones'],
    ['Receita Total','Ingreso Total'],
    ['Valor da Meta','Valor de la Meta'],
    ['Descrição (opcional)','Descripción (opcional)'],
    ['Adicionar Meta','Añadir Meta'],

    // Otros frecuentes
    ['Relatório da etapa','Informe de la etapa'],
    ['Criar Ítem do Kanban','Crear Ítem del Kanban'],
    ['Progresso do Funil','Progreso del Embudo'],
    ['Nenhum campo global definido para este funil','Ningún campo global definido para este embudo'],
    ['Nenhum item do Kanban associado','Ningún ítem del Kanban asociado'],
    ['Nenhuma meta configurada ainda','Ninguna meta configurada aún'],
    ['itens','ítems'],
    ['valor','valor'] // se mantiene
  ]);

  // --- Patrones PARCIALES (frases con datos variables) ---
  const patterns = [
    { re: /\bAtualizado em\b/gi, to: 'Actualizado el' },
    { re: /\bCriado em\b/gi,     to: 'Creado el' },
    { re: /\bEstado Ativo\b/gi,  to: 'Estado Activo' }
  ];

  // --- Utilidades ---
  const SKIP_TAGS = new Set(['SCRIPT','STYLE','NOSCRIPT','IFRAME','TEXTAREA']);
  const isEditable = (el) => el && (el.isContentEditable || el.tagName === 'INPUT');

  const isVisibleNode = (node) => {
    const el = node.parentElement;
    if (!el) return false;
    if (SKIP_TAGS.has(el.tagName)) return false;
    if (isEditable(el)) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    if (!el.offsetParent && style.position !== 'fixed') return false;
    return true;
  };

  const wordBoundary = (s) => new RegExp(`(^|\\b)${s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(\\b|$)`,'gi');

  function translateText(text) {
    if (!text || !text.trim()) return text;

    let out = text;

    // Exactos con límites de palabra (respetamos mayúsculas/minúsculas básicas)
    exactMap.forEach((es, pt) => {
      out = out.replace(wordBoundary(pt), (_, a, __) => `${a}${es}`);
    });

    // Patrones parciales (mantienen el resto del contenido)
    for (const { re, to } of patterns) {
      out = out.replace(re, to);
    }

    return out;
  }

  function translateSubtree(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    for (const node of nodes) {
      if (!isVisibleNode(node)) continue;
      const before = node.nodeValue;
      const after  = translateText(before);
      if (after !== before) node.nodeValue = after;
    }
  }

  // 1) Pasada inicial solo sobre el body
  translateSubtree(document.body);

  // 2) Observar SOLO cambios de texto y nodos añadidos (sin atributos)
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'characterData') {
        const node = m.target;
        if (node.nodeType === 3 && isVisibleNode(node)) {
          const t = translateText(node.nodeValue);
          if (t !== node.nodeValue) node.nodeValue = t;
        }
      } else if (m.type === 'childList') {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 3) {
            if (isVisibleNode(node)) {
              const t = translateText(node.nodeValue);
              if (t !== node.nodeValue) node.nodeValue = t;
            }
          } else if (node.nodeType === 1) {
            translateSubtree(node);
          }
        });
      }
    }
  });

  mo.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true
  });

  console.log('🔍 Observando sólo textContent (sin atributos/clases)');
})();
