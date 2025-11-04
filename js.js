// Traducción PT → ES para Omnia/Chatwoot (soporta coincidencias parciales)
// Pegar tal cual en la consola o cargar como userscript.
(function () {
  'use strict';

  console.log('🇵🇹→🇪🇸 Traductor PT→ES (parcial/atributos) activo');

  // --- Config opcional ---
  const CONFIG = {
    convertCurrency: false,  // si true: 'R$' → '€'
    observe: true            // observar DOM dinámico
  };

  // --- Diccionario EXACTO (palabras/etiquetas sueltas) ---
  const exactMap = {
    // Navegación
    'Caixa de Entrada': 'Bandeja de Entrada',
    'Conversas': 'Conversaciones',
    'Contatos': 'Contactos',
    'Relatórios': 'Informes',
    'Configurações': 'Configuración',
    'Ajuda': 'Ayuda',
    'Painel': 'Panel',
    'Equipe': 'Equipo',
    'Etiquetas': 'Etiquetas',
    'Atributos': 'Atributos',
    'Kanban': 'Kanban',
    'Funis': 'Embudos',
    'Etapas': 'Etapas',
    'Ofertas': 'Ofertas',
    'Modelos de mensagem': 'Modelos de Mensaje',
    'Ajustes': 'Ajustes',

    // Cabeceras y secciones
    'Dados Básicos': 'Datos Básicos',
    'Metas': 'Metas',
    'Campos Personalizados Globais': 'Campos Personalizados Globales',

    // Estados
    'Ativo': 'Activo',
    'Fechado': 'Cerrado',
    'Aberto': 'Abierto',
    'Resolvido': 'Resuelto',
    'Pendente': 'Pendiente',
    'Adiado': 'Pospuesto',

    // Acciones
    'Descartar': 'Descartar',
    'Guardar': 'Guardar',
    'Salvar': 'Guardar',
    'Copiar': 'Copiar',
    'Editar': 'Editar',
    'Excluir': 'Eliminar',
    'Cancelar': 'Cancelar',
    'Aplicar': 'Aplicar',
    'Limpar': 'Limpiar',
    'Adicionar': 'Añadir',
    'Criar': 'Crear',
    'Atualizar': 'Actualizar',
    'Remover': 'Quitar',
    'Buscar': 'Buscar',

    // Formularios
    'Nome da etapa': 'Nombre de la etapa',
    'Crie uma nova etapa': 'Crea una nueva etapa',
    'Cor': 'Color',
    'Descrição': 'Descripción',
    'Descrição da etapa': 'Descripción de la etapa',
    'Condições de Auto Criação': 'Condiciones de Auto-Creación',
    'Contato tem tag': 'El contacto tiene la etiqueta',
    'Adicionar etapa': 'Añadir etapa',
    'Chave (nome)': 'Clave (nombre)',
    'Tipo': 'Tipo',
    'Único': 'Único',
    'Adicionar campo': 'Añadir campo',

    // Metas
    'Configure uma nova meta': 'Configura una nueva meta',
    'Tipo de Meta': 'Tipo de Meta',
    'Taxa de Conversão': 'Tasa de Conversión',
    'Valor Médio': 'Valor Medio',
    'Tempo Médio': 'Tiempo Medio',
    'Total de Conversões': 'Total de Conversiones',
    'Receita Total': 'Ingreso Total',
    'Valor da Meta': 'Valor de la Meta',
    'Descrição (opcional)': 'Descripción (opcional)',
    'Adicionar Meta': 'Añadir Meta',

    // Panel derecho
    'Etapas desse funil': 'Etapas de este embudo',
    'Agentes do Funil': 'Agentes del Embudo',
    'Modelos de Mensagem': 'Modelos de Mensaje',
    'Nenhum template nesta etapa': 'Ninguna plantilla en esta etapa',

    // Placeholders vistos
    'Buscar agente...': 'Buscar agente...'
  };

  // --- FRASES/PATRONES (coincidencia parcial, con variables) ---
  // Cada entrada es un regex global/insensible que reemplaza manteniendo el resto del texto.
  const patternMap = [
    // Fechas con prefijo
    { re: /\bAtualizado em\b/gi, to: 'Actualizado el' },
    { re: /\bCriado em\b/gi,     to: 'Creado el' },

    // Varios de la interfaz
    { re: /\bEstado Ativo\b/gi,                     to: 'Estado Activo' },
    { re: /\bEtapa\b/gi,                            to: 'Etapa' },
    { re: /\bAgente\b/gi,                           to: 'Agente' },
    { re: /\bRelatório da etapa\b/gi,               to: 'Informe de la etapa' },
    { re: /\bCriar Ítem do Kanban\b/gi,             to: 'Crear Ítem del Kanban' },
    { re: /\bProgresso do Funil\b/gi,               to: 'Progreso del Embudo' },
    { re: /\bNenhum campo global definido para este funil\b/gi,
      to: 'Ningún campo global definido para este embudo' },
    { re: /\bNenhum item do Kanban associado\b/gi,
      to: 'Ningún ítem del Kanban asociado' },
    { re: /\bNenhuma meta configurada ainda\b/gi,
      to: 'Ninguna meta configurada aún' },
    { re: /\bAdicione metas para acompanhar o desempenho do funil\b/gi,
      to: 'Añade metas para seguir el rendimiento del embudo' },

    // Mini tarjetas (lista de etapa)
    { re: /\bitens\b/gi, to: 'ítems' },
    { re: /\bvalor\b/gi, to: 'valor' },

    // Inglés por si aparece
    { re: /\bUpdated on\b/gi, to: 'Actualizado el' },
    { re: /\bCreated on\b/gi, to: 'Creado el' }
  ];

  // --- Atributos (exactos o parciales) ---
  const attributeMaps = {
    title: {
      'Enviar mensagem': 'Enviar mensaje',
      'Fechar conversa': 'Cerrar conversación',
      'Excluir mensagem': 'Eliminar mensaje',
      'Buscar conversas': 'Buscar conversaciones',
      'Nova conversa': 'Nueva conversación',
      'Marcar como resolvido': 'Marcar como resuelto',
      'Atribuir ao agente': 'Asignar a agente',
      'Adicionar etiqueta': 'Añadir etiqueta'
    },
    placeholder: {
      'Digite uma mensagem...': 'Escribe un mensaje...',
      'Buscar': 'Buscar...',
      'Digite sua mensagem': 'Introduce tu mensaje',
      'Buscar conversas': 'Buscar conversaciones...',
      'Buscar contatos': 'Buscar contactos...',
      'Digite aqui': 'Escribe aquí',
      'Buscar agente...': 'Buscar agente...'
    },
    'aria-label': {
      'Buscar': 'Buscar',
      'Fechar': 'Cerrar'
    }
  };

  // Utilidades
  const isSkippable = (node) =>
    node.parentElement &&
    (node.parentElement.isContentEditable ||
     ['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE', 'TEXTAREA'].includes(node.parentElement.tagName));

  const wordBoundary = (str) =>
    new RegExp(`(^|\\b)${escapeRegex(str)}(\\b|$)`, 'gi');

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Reemplaza texto de un nodo con exactos + patrones, respetando texto variable
  function translateTextContent(text) {
    let out = text;

    // 1) Exactos con límites de palabra
    for (const [pt, es] of Object.entries(exactMap)) {
      out = out.replace(wordBoundary(pt), (m, p1, p2) => `${p1}${es}${p2}`);
    }

    // 2) Patrones (parciales)
    for (const { re, to } of patternMap) {
      out = out.replace(re, to);
    }

    // 3) Moneda (opcional)
    if (CONFIG.convertCurrency) {
      out = out.replace(/\bR\$\s?/g, '€ ');
    }

    return out;
  }

  function translateAttributes(el) {
    ['title', 'placeholder', 'aria-label'].forEach((attr) => {
      const val = el.getAttribute && el.getAttribute(attr);
      if (!val) return;

      // Exacto
      const map = attributeMaps[attr] || {};
      if (map[val]) {
        el.setAttribute(attr, map[val]);
        return;
      }

      // Parcial mediante patrones
      let newVal = val;
      for (const [pt, es] of Object.entries(exactMap)) {
        newVal = newVal.replace(wordBoundary(pt), (m, p1, p2) => `${p1}${es}${p2}`);
      }
      for (const { re, to } of patternMap) {
        newVal = newVal.replace(re, to);
      }
      if (CONFIG.convertCurrency) {
        newVal = newVal.replace(/\bR\$\s?/g, '€ ');
      }
      if (newVal !== val) el.setAttribute(attr, newVal);
    });
  }

  // Recorre nodos de texto con TreeWalker para no tocar inputs/HTML
  function translateSubtree(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const toProcess = [];
    let node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue || isSkippable(node)) continue;
      toProcess.push(node);
    }
    for (const textNode of toProcess) {
      const translated = translateTextContent(textNode.nodeValue);
      if (translated !== textNode.nodeValue) textNode.nodeValue = translated;
    }

    // Atributos en elementos del subárbol
    if (root.nodeType === 1) translateAttributes(root);
    if (root.querySelectorAll) {
      root.querySelectorAll('*').forEach(translateAttributes);
    }
  }

  // 1ª pasada inmediata
  translateSubtree(document.body);

  // Observador para cambios dinámicos
  if (CONFIG.observe) {
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.addedNodes.forEach((n) => {
            if (n.nodeType === 1) translateSubtree(n);
            else if (n.nodeType === 3 && !isSkippable(n)) {
              const t = translateTextContent(n.nodeValue);
              if (t !== n.nodeValue) n.nodeValue = t;
            }
          });
        } else if (m.type === 'attributes') {
          translateAttributes(m.target);
        }
      }
    });
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['title', 'placeholder', 'aria-label']
    });
    console.log('🔍 Observador PT→ES enganchado');
  }
})();
