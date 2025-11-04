// PT → ES - Simple y compatible con frameworks (Vue, React, etc.)
(function () {
  'use strict';
  console.log('🇵🇹→🇪🇸 Traductor simple v4.0');

  // === DICCIONARIO ===
  const dict = {
    'Caixa de Entrada':'Bandeja de Entrada', 'Conversas':'Conversaciones', 
    'Contatos':'Contactos', 'Relatórios':'Informes', 'Configurações':'Configuración',
    'Ajuda':'Ayuda', 'Painel':'Panel', 'Equipe':'Equipo', 'Etiquetas':'Etiquetas',
    'Atributos':'Atributos', 'Kanban':'Kanban', 'Funis':'Embudos', 'Etapas':'Etapas',
    'Ofertas':'Ofertas', 'Modelos de mensagem':'Modelos de Mensaje',
    'Ajustes':'Ajustes', 'Dados Básicos':'Datos Básicos', 'Metas':'Metas',
    'Campos Personalizados Globais':'Campos Personalizados Globales',
    'Ativo':'Activo', 'Fechado':'Cerrado', 'Aberto':'Abierto', 'Resolvido':'Resuelto',
    'Pendente':'Pendiente', 'Adiado':'Pospuesto', 'Descartar':'Descartar',
    'Guardar':'Guardar', 'Salvar':'Guardar', 'Copiar':'Copiar', 'Editar':'Editar',
    'Excluir':'Eliminar', 'Cancelar':'Cancelar', 'Aplicar':'Aplicar',
    'Limpar':'Limpiar', 'Adicionar':'Añadir', 'Criar':'Crear',
    'Atualizar':'Actualizar', 'Remover':'Quitar', 'Buscar':'Buscar',
    'Crie uma nova etapa':'Crea una nueva etapa', 'Nome da etapa':'Nombre de la etapa',
    'Cor':'Color', 'Descrição':'Descripción', 'Descrição da etapa':'Descripción de la etapa',
    'Condições de Auto Criação':'Condiciones de Auto-Creación',
    'Contato tem tag':'El contacto tiene la etiqueta', 'Adicionar etapa':'Añadir etapa',
    'Chave (nome)':'Clave (nombre)', 'Tipo':'Tipo', 'Único':'Único',
    'Adicionar campo':'Añadir campo', 'Etapas desse funil':'Etapas de este embudo',
    'Agentes do Funil':'Agentes del Embudo', 'Modelos de Mensagem':'Modelos de Mensaje',
    'Nenhum template nesta etapa':'Ninguna plantilla en esta etapa',
    'Configure uma nova meta':'Configura una nueva meta', 'Tipo de Meta':'Tipo de Meta',
    'Taxa de Conversão':'Tasa de Conversión', 'Valor Médio':'Valor Medio',
    'Tempo Médio':'Tiempo Medio', 'Total de Conversões':'Total de Conversiones',
    'Receita Total':'Ingreso Total', 'Valor da Meta':'Valor de la Meta',
    'Descrição (opcional)':'Descripción (opcional)', 'Adicionar Meta':'Añadir Meta',
    'Relatório da etapa':'Informe de la etapa', 'Criar Ítem do Kanban':'Crear Ítem del Kanban',
    'Progresso do Funil':'Progreso del Embudo',
    'Nenhum campo global definido para este funil':'Ningún campo global definido para este embudo',
    'Nenhum item do Kanban associado':'Ningún ítem del Kanban asociado',
    'Nenhuma meta configurada ainda':'Ninguna meta configurada aún',
    'itens':'ítems', 'valor':'valor', 'Nome':'Nombre', 'Título':'Título',
    'Observações':'Observaciones', 'Data':'Fecha', 'Hora':'Hora',
    'Prioridade':'Prioridad', 'Status':'Estado', 'Detalhes':'Detalles',
    'Informações':'Información', 'Criado em':'Creado el', 'Atualizado em':'Actualizado el',
    'Criado por':'Creado por', 'Estado Ativo':'Estado Activo'
  };

  // === REGLAS SIMPLES ===
  // 1. NO tocar inputs, textareas, selects, ni nada editable
  const SKIP = 'INPUT,TEXTAREA,SELECT,OPTION,SCRIPT,STYLE,CODE,PRE'.split(',');
  
  // 2. Marcar elementos ya traducidos (evita re-traducir)
  const translated = new WeakSet();
  
  // 3. Elementos que están "esperando" a estabilizarse
  const pending = new Map();
  
  // === FUNCIÓN DE TRADUCCIÓN ===
  function translate(text) {
    if (!text || text.length < 2) return text;
    
    let result = text;
    
    // Buscar y reemplazar cada frase del diccionario
    for (const [pt, es] of Object.entries(dict)) {
      // Usar regex con límites de palabra para coincidencias exactas
      const regex = new RegExp('\\b' + pt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      result = result.replace(regex, es);
    }
    
    return result;
  }

  // === TRADUCIR UN ELEMENTO ===
  function translateElement(el) {
    // Ya traducido? → saltar
    if (translated.has(el)) return;
    
    // Es un input/textarea/select? → saltar
    if (SKIP.includes(el.tagName)) return;
    
    // Tiene atributo contenteditable? → saltar
    if (el.isContentEditable || el.hasAttribute('contenteditable')) return;
    
    // Está dentro de un formulario? → saltar (ser conservador)
    if (el.closest('form, [contenteditable], .editor, .input-wrapper')) return;
    
    try {
      // Traducir solo nodos de TEXTO directo (sin hijos HTML)
      for (const node of el.childNodes) {
        if (node.nodeType === 3) { // Text node
          const original = node.textContent;
          const translated_text = translate(original);
          
          if (translated_text !== original) {
            node.textContent = translated_text;
          }
        }
      }
      
      // Marcar como traducido
      translated.add(el);
    } catch (e) {
      // Si falla, no pasa nada
    }
  }

  // === ESCANEAR PÁGINA ===
  function scanPage() {
    // Buscar todos los elementos con texto
    const elements = document.querySelectorAll('button, a, span, div, p, h1, h2, h3, h4, h5, h6, li, td, th, label');
    
    elements.forEach(el => translateElement(el));
  }

  // === OBSERVAR CAMBIOS (con debounce) ===
  let debounceTimer;
  
  const observer = new MutationObserver(() => {
    // Cancelar timer anterior
    clearTimeout(debounceTimer);
    
    // Esperar 300ms de "calma" antes de traducir
    debounceTimer = setTimeout(() => {
      scanPage();
    }, 300);
  });

  // === INICIO ===
  function init() {
    console.log('📖 Escaneando página...');
    scanPage();
    
    // Observar cambios en el DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('✅ Traductor activo');
    console.log('💡 Para detener: __stop()');
  }

  // === COMANDO PARA DETENER ===
  window.__stop = () => {
    observer.disconnect();
    clearTimeout(debounceTimer);
    console.log('⏹️ Traductor detenido');
  };

  // Esperar a que cargue la página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 1000));
  } else {
    setTimeout(init, 1000);
  }
})();