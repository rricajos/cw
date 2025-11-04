// PT → ES - VERSIÓN SEGURA para formularios dinámicos
(function () {
  'use strict';
  console.log('🇵🇹→🇪🇸 Traductor seguro v3.0 (anti-crash)');

  // --- Diccionario exacto ---
  const exact = new Map([
    ['Caixa de Entrada','Bandeja de Entrada'], ['Conversas','Conversaciones'], ['Contatos','Contactos'],
    ['Relatórios','Informes'], ['Configurações','Configuración'], ['Ajuda','Ayuda'], ['Painel','Panel'],
    ['Equipe','Equipo'], ['Etiquetas','Etiquetas'], ['Atributos','Atributos'], ['Kanban','Kanban'],
    ['Funis','Embudos'], ['Etapas','Etapas'], ['Ofertas','Ofertas'], ['Modelos de mensagem','Modelos de Mensaje'],
    ['Ajustes','Ajustes'], ['Dados Básicos','Datos Básicos'], ['Metas','Metas'],
    ['Campos Personalizados Globais','Campos Personalizados Globales'], ['Ativo','Activo'],
    ['Fechado','Cerrado'], ['Aberto','Abierto'], ['Resolvido','Resuelto'], ['Pendente','Pendiente'],
    ['Adiado','Pospuesto'], ['Descartar','Descartar'], ['Guardar','Guardar'], ['Salvar','Guardar'],
    ['Copiar','Copiar'], ['Editar','Editar'], ['Excluir','Eliminar'], ['Cancelar','Cancelar'],
    ['Aplicar','Aplicar'], ['Limpar','Limpiar'], ['Adicionar','Añadir'], ['Criar','Crear'],
    ['Atualizar','Actualizar'], ['Remover','Quitar'], ['Buscar','Buscar'],
    ['Crie uma nova etapa','Crea una nueva etapa'], ['Nome da etapa','Nombre de la etapa'],
    ['Cor','Color'], ['Descrição','Descripción'], ['Descrição da etapa','Descripción de la etapa'],
    ['Condições de Auto Criação','Condiciones de Auto-Creación'], 
    ['Contato tem tag','El contacto tiene la etiqueta'],
    ['Adicionar etapa','Añadir etapa'], ['Chave (nome)','Clave (nombre)'], ['Tipo','Tipo'], 
    ['Único','Único'], ['Adicionar campo','Añadir campo'], ['Etapas desse funil','Etapas de este embudo'],
    ['Agentes do Funil','Agentes del Embudo'], ['Modelos de Mensagem','Modelos de Mensaje'],
    ['Nenhum template nesta etapa','Ninguna plantilla en esta etapa'],
    ['Configure uma nova meta','Configura una nueva meta'], ['Tipo de Meta','Tipo de Meta'],
    ['Taxa de Conversão','Tasa de Conversión'], ['Valor Médio','Valor Medio'], 
    ['Tempo Médio','Tiempo Medio'], ['Total de Conversões','Total de Conversiones'], 
    ['Receita Total','Ingreso Total'], ['Valor da Meta','Valor de la Meta'], 
    ['Descrição (opcional)','Descripción (opcional)'], ['Adicionar Meta','Añadir Meta'], 
    ['Relatório da etapa','Informe de la etapa'], ['Criar Ítem do Kanban','Crear Ítem del Kanban'], 
    ['Progresso do Funil','Progreso del Embudo'],
    ['Nenhum campo global definido para este funil','Ningún campo global definido para este embudo'],
    ['Nenhum item do Kanban associado','Ningún ítem del Kanban asociado'],
    ['Nenhuma meta configurada ainda','Ninguna meta configurada aún'],
    ['itens','ítems'], ['valor','valor'],
    // Agregados comunes
    ['Nome','Nombre'], ['Título','Título'], ['Observações','Observaciones'],
    ['Data','Fecha'], ['Hora','Hora'], ['Prioridade','Prioridad'],
    ['Status','Estado'], ['Detalhes','Detalles'], ['Informações','Información']
  ]);

  // --- Patrones parciales ---
  const patterns = [
    { re: /\bAtualizado em\b/gi, to: 'Actualizado el' },
    { re: /\bCriado em\b/gi,     to: 'Creado el' },
    { re: /\bEstado Ativo\b/gi,  to: 'Estado Activo' },
    { re: /\bCriado por\b/gi,    to: 'Creado por' }
  ];

  // --- LISTA NEGRA: Elementos que NUNCA deben traducirse ---
  const SKIP_TAGS = new Set([
    'SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'TEXTAREA', 
    'INPUT', 'SELECT', 'OPTION', 'CODE', 'PRE'
  ]);

  const SKIP_CLASSES = [
    'input', 'form-control', 'form-input', 'text-input',
    'select', 'dropdown', 'autocomplete', 'editor',
    'contenteditable', 'editable', 'code-editor'
  ];

  const SKIP_PARENTS = [
    'form', '.modal', '.dialog', '.popup', '.overlay',
    '[role="dialog"]', '[role="form"]', '[contenteditable]',
    '.form-group', '.input-group', '.field-wrapper'
  ];

  // --- Detectar si un elemento es editable o está en contexto editable ---
  function isInEditableContext(el) {
    if (!el || !el.parentElement) return false;
    
    // 1. Verificar el elemento mismo
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (el.isContentEditable) return true;
    if (el.hasAttribute('contenteditable')) return true;
    
    // 2. Verificar clases sospechosas
    const classList = el.classList?.value || '';
    if (SKIP_CLASSES.some(cls => classList.includes(cls))) return true;
    
    // 3. Verificar ancestros (hasta 5 niveles)
    let parent = el;
    let depth = 0;
    while (parent && depth < 5) {
      // Tags específicas
      if (SKIP_TAGS.has(parent.tagName)) return true;
      
      // Atributos
      if (parent.hasAttribute('contenteditable')) return true;
      if (parent.getAttribute('role') === 'textbox') return true;
      
      // Clases
      const pClassList = parent.classList?.value || '';
      if (SKIP_CLASSES.some(cls => pClassList.includes(cls))) return true;
      
      // Selectores específicos
      for (const selector of SKIP_PARENTS) {
        try {
          if (parent.matches?.(selector)) return true;
        } catch (e) {
          // Selector inválido, ignorar
        }
      }
      
      parent = parent.parentElement;
      depth++;
    }
    
    return false;
  }

  // --- Detectar si hay un modal/formulario abierto ---
  function hasActiveModal() {
    return !!(
      document.querySelector('.modal.show, .modal.active, .dialog.open, [role="dialog"]') ||
      document.querySelector('.overlay.active, .popup.show, .drawer.open')
    );
  }

  // --- Verificar si el nodo sigue en el DOM ---
  function isNodeConnected(node) {
    return node && node.parentElement && document.contains(node);
  }

  // --- Traducir texto ---
  const wb = (s) => new RegExp(`(^|\\b)${s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(\\b|$)`,'gi');
  
  function translateText(t) {
    if (!t || !t.trim()) return t;
    let out = t;
    
    // Traducciones exactas
    exact.forEach((es, pt) => {
      out = out.replace(wb(pt), (_, a) => a + es);
    });
    
    // Patrones
    for (const {re, to} of patterns) {
      out = out.replace(re, to);
    }
    
    return out;
  }

  // --- Sistema de cola con procesamiento seguro ---
  const queue = new Set();
  let scheduled = false;
  let paused = false;
  const CHUNK = 200; // Reducido para ser más conservador

  function scheduleProcess() {
    if (scheduled || paused) return;
    scheduled = true;
    (window.requestIdleCallback || setTimeout)(() => processQueue(), 16);
  }

  function processQueue() {
    scheduled = false;
    
    // PAUSAR si hay modal/formulario activo
    if (hasActiveModal()) {
      console.log('⏸️  Traducción pausada (modal activo)');
      setTimeout(() => {
        paused = false;
        scheduleProcess();
      }, 500);
      paused = true;
      return;
    }
    
    let count = 0;
    const processed = new Set();
    
    for (const node of queue) {
      queue.delete(node);
      
      // Verificaciones de seguridad
      if (processed.has(node)) continue;
      if (node.nodeType !== 3) continue;
      if (!isNodeConnected(node)) continue;
      
      const el = node.parentElement;
      if (!el) continue;
      
      // VERIFICACIÓN CRÍTICA: Contexto editable
      if (isInEditableContext(el)) continue;
      
      try {
        const before = node.nodeValue;
        if (!before || before.length > 500) continue; // Ignorar textos muy largos
        
        const after = translateText(before);
        if (after !== before && isNodeConnected(node)) {
          node.nodeValue = after;
          processed.add(node);
        }
      } catch (e) {
        // Silenciosamente ignorar errores
        console.warn('⚠️ Error al traducir nodo:', e.message);
      }
      
      if (++count >= CHUNK) {
        scheduleProcess();
        break;
      }
    }
  }

  // --- Escanear nodos de texto ---
  function scan(root) {
    if (!root || !root.ownerDocument) return;
    
    try {
      const walker = document.createTreeWalker(
        root, 
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const el = node.parentElement;
            return (el && !isInEditableContext(el)) 
              ? NodeFilter.FILTER_ACCEPT 
              : NodeFilter.FILTER_REJECT;
          }
        }
      );
      
      let n;
      while ((n = walker.nextNode())) {
        queue.add(n);
      }
      
      scheduleProcess();
    } catch (e) {
      console.warn('⚠️ Error al escanear:', e.message);
    }
  }

  // --- Observer con protección ---
  let mutationCount = 0;
  let lastReset = Date.now();
  const MAX_MUTATIONS_PER_SECOND = 500;

  function handleMutations(muts) {
    mutationCount += muts.length;
    
    // Protección contra loops infinitos
    const now = Date.now();
    if (now - lastReset > 1000) {
      if (mutationCount > MAX_MUTATIONS_PER_SECOND) {
        console.warn('⚠️ Demasiadas mutaciones, pausando 2s...');
        paused = true;
        setTimeout(() => { paused = false; mutationCount = 0; }, 2000);
        return;
      }
      mutationCount = 0;
      lastReset = now;
    }
    
    if (paused) return;
    
    for (const m of muts) {
      if (m.type !== 'childList') continue;
      
      m.addedNodes.forEach((node) => {
        try {
          if (node.nodeType === 3) {
            const el = node.parentElement;
            if (el && !isInEditableContext(el)) {
              queue.add(node);
            }
          } else if (node.nodeType === 1 && !isInEditableContext(node)) {
            // Esperar un poco antes de escanear nuevos elementos grandes
            setTimeout(() => scan(node), 100);
          }
        } catch (e) {
          // Ignorar errores
        }
      });
    }
    
    scheduleProcess();
  }

  // --- Inicialización ---
  function start() {
    const root = document.querySelector('#app, main, [role="main"], .layout') || document.body;
    
    console.log('🚀 Escaneando página inicial...');
    scan(root);

    const mo = new MutationObserver(handleMutations);
    mo.observe(root, { 
      subtree: true, 
      childList: true,
      // NO observar characterData para evitar conflictos
    });

    // Kill switches
    window.__ptes_stop = () => { 
      mo.disconnect(); 
      queue.clear(); 
      paused = true;
      console.log('⏹️ Traductor DETENIDO'); 
    };
    
    window.__ptes_resume = () => {
      paused = false;
      scheduleProcess();
      console.log('▶️  Traductor REANUDADO');
    };
    
    window.__ptes_status = () => {
      console.log(`📊 Estado: ${paused ? 'PAUSADO' : 'ACTIVO'} | Cola: ${queue.size} nodos`);
    };

    console.log('✅ Traductor activo | Comandos: __ptes_stop(), __ptes_resume(), __ptes_status()');
  }

  // Esperar a que la página esté lista
  if (document.readyState === 'complete') {
    setTimeout(start, 800); // Más tiempo para evitar conflictos iniciales
  } else {
    window.addEventListener('load', () => setTimeout(start, 800), { once: true });
  }
})();