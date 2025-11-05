// PT → ES + Hover - Eficiente v6.9
(function () {
  'use strict';
  console.log('🇵🇹→🇪🇸 Traductor Eficiente v6.9');

  // === DICCIONARIO LIMPIO (sin redundancias) ===
  const dict = {
    // Navegación
    'Caixa de Entrada':'Bandeja de Entrada',
    'Conversas':'Conversaciones',
    'Contatos':'Contactos',
    'Relatórios':'Informes',
    'Configurações':'Configuración',
    'Ajuda':'Ayuda',
    'Painel':'Panel',
    'Equipe':'Equipo',
    'Etiquetas':'Etiquetas',
    'Atributos':'Atributos',
    'Funis':'Embudos',
    'Ofertas':'Ofertas',
    
    // Lateral
    'Modelos de mensagem':'Modelos de Mensaje',
    'Modelos de m...':'Modelos de Mensaje',
    'Ajustes':'Ajustes',
    
    // Filtros
    'Filtrar ítems':'Filtrar ítems',
    'Filtros Rápidos':'Filtros Rápidos',
    'Selecionar filtro rápido':'Seleccionar filtro rápido',
    'Filtros Salvos':'Filtros Guardados',
    'Nombre do filtro':'Nombre del filtro',
    'Carregar filtro salvo':'Cargar filtro guardado',
    'Aplicar Filtros':'Aplicar Filtros',
    
    // Prioridades
    'Urgente':'Urgente',
    'Média':'Media',
    'Baixa':'Baja',
    
    // Valores
    'Mínimo':'Mínimo',
    'Máximo':'Máximo',
    'Período':'Período',
    'Periodo':'Período',
    
    // Agentes
    'Buscar agentes':'Buscar agentes',
    'Todos os agentes':'Todos los agentes',
    'Todos os canais':'Todos los canales',
    'Selecione o mês':'Seleccione el mes',
    
    // Meses (solo portugués)
    'Janeiro':'Enero',
    'Fevereiro':'Febrero',
    'Março':'Marzo',
    'Maio':'Mayo',
    'Junho':'Junio',
    'Julho':'Julio',
    'Agosto':'Agosto',
    'Setembro':'Septiembre',
    'Outubro':'Octubre',
    'Novembro':'Noviembre',
    'Dezembro':'Diciembre',
    'janeiro':'enero',
    'fevereiro':'febrero',
    'março':'marzo',
    'maio':'mayo',
    'junho':'junio',
    'julho':'julio',
    'agosto':'agosto',
    'setembro':'septiembre',
    'outubro':'octubre',
    'novembro':'noviembre',
    'dezembro':'diciembre',
    
    // Días semana completos
    'Segunda-feira':'Lunes',
    'Terça-feira':'Martes',
    'Quarta-feira':'Miércoles',
    'Quinta-feira':'Jueves',
    'Sexta-feira':'Viernes',
    'Sábado':'Sábado',
    'Sabado':'Sábado',
    'segunda-feira':'lunes',
    'terça-feira':'martes',
    'quarta-feira':'miércoles',
    'quinta-feira':'jueves',
    'sexta-feira':'viernes',
    'sábado':'sábado',
    'sabado':'sábado',
    
    // Días abreviados
    'Seg':'Lun',
    'Ter':'Mar',
    'Qua':'Mié',
    'Qui':'Jue',
    'Sex':'Vie',
    'Sáb':'Sáb',
    'Dom':'Dom',
    
    // Vistas calendario
    'Hoje':'Hoy',
    'Mês':'Mes',
    'Tarefas':'Tareas',
    
    // Filtros de tiempo
    'seg-dom':'lun-dom',
    'Último mês':'Último mes',
    'Este ano':'Este año',
    'Ítens criados nos últimos 7 dias':'Ítems creados en los últimos 7 días',
    'Ítens criados no último mês':'Ítems creados en el último mes',
    'Ítens criados hoje':'Ítems creados hoy',
    'Ítens criados neste ano':'Ítems creados en este año',
    'Ítens criados nesta semana':'Ítems creados en esta semana',
    'criados':'creados',
    'nos últimos':'en los últimos',
    'no último':'en el último',
    'hoje':'hoy',
    'neste':'en este',
    'nesta':'en esta',
    'ano':'año',
    'semana':'semana',
    'dias':'días',
    
    // Estados
    'Dados Básicos':'Datos Básicos',
    'Campos Personalizados Globais':'Campos Personalizados Globales',
    'Ativo':'Activo',
    'Fechado':'Cerrado',
    'Aberto':'Abierto',
    'Resolvido':'Resuelto',
    'Pendente':'Pendiente',
    'Adiado':'Pospuesto',
    'Estado Ativo':'Estado Activo',
    
    // Acciones
    'Salvar':'Guardar',
    'Editar':'Editar',
    'Excluir':'Eliminar',
    'Cancelar':'Cancelar',
    'Aplicar':'Aplicar',
    'Limpar':'Limpiar',
    'Adicionar':'Añadir',
    'Criar':'Crear',
    'Atualizar':'Actualizar',
    'Actualizado el':'Actualizado el',
    'Remover':'Quitar',
    'Buscar':'Buscar',
    'Buscar...':'Buscar...',
    
    // Etapas
    'Crie uma nova etapa':'Crea una nueva etapa',
    'Nome da etapa':'Nombre de la etapa',
    'Descrição da etapa':'Descripción de la etapa',
    'Condições de Auto Criação':'Condiciones de Auto-Creación',
    'Contato tem tag':'El contacto tiene la etiqueta',
    'Adicionar etapa':'Añadir etapa',
    'Etapas desse funil':'Etapas de este embudo',
    
    // Campos
    'Agentes do Funil':'Agentes del Embudo',
    'Buscar agente...':'Buscar agente...',
    'Chave (nome)':'Clave (nombre)',
    'Chave (name)':'Clave (nombre)',
    'Chave':'Clave',
    'Único':'Único',
    'Adicionar campo':'Añadir campo',
    'Campos Globais':'Campos Globales',
    'Campos Adicionais':'Campos Adicionales',
    'Dados Adicionais':'Datos Adicionales',
    
    // Modelos
    'Modelos de Mensagem':'Modelos de Mensaje',
    'Nenhum template nesta etapa':'Ninguna plantilla en esta etapa',
    
    // Metas
    'Configure uma nova meta':'Configura una nueva meta',
    'Tipo de Meta':'Tipo de Meta',
    'Taxa de Conversão':'Tasa de Conversión',
    'Valor Médio':'Valor Medio',
    'Tempo Médio':'Tiempo Medio',
    'Total de Conversões':'Total de Conversiones',
    'Receita Total':'Ingreso Total',
    'Valor da Meta':'Valor de la Meta',
    'Descrição (opcional)':'Descripción (opcional)',
    'Adicionar Meta':'Añadir Meta',
    
    // Otros
    'Relatório da etapa':'Informe de la etapa',
    'Criar Ítem do Kanban':'Crear Ítem del Kanban',
    'Progresso do Funil':'Progreso del Embudo',
    'Nenhum campo global definido para este funil':'Ningún campo global definido para este embudo',
    'Nenhum item do Kanban associado':'Ningún ítem del Kanban asociado',
    'Nenhuma meta configurada ainda':'Ninguna meta configurada aún',
    
    // Textos largos
    'Habilitar o deshabilitar este embudo. Los embudos deshabilitados no aceptarán nuevos elementos.':'Habilitar o deshabilitar este embudo. Los embudos deshabilitados no aceptarán nuevos elementos.',
    
    // Palabras comunes
    'itens':'ítems',
    'valor':'valor',
    'Nome':'Nombre',
    'Título':'Título',
    'Observações':'Observaciones',
    'Prioridade':'Prioridad',
    'Detalhes':'Detalles',
    'Informações':'Información',
    'Criado em':'Creado el',
    'Atualizado em':'Actualizado el',
    'Criado por':'Creado por',
    'Editando':'Editando',
    'Ex: Meta mensal de conversões':'Ej: Meta mensual de conversiones'
  };

  // Set de palabras en español para detección rápida
  const spanishWords = new Set([
    'conversaciones', 'bandeja', 'entrada', 'contactos', 'informes',
    'configuración', 'ayuda', 'panel', 'equipo', 'etiquetas',
    'embudos', 'ofertas', 'modelos', 'mensaje', 'filtros',
    'guardar', 'editar', 'eliminar', 'cancelar', 'aplicar',
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo',
    'creados', 'últimos', 'último', 'esta', 'este', 'hoy', 'semana', 'año'
  ]);

  const SKIP_TAGS = ['SCRIPT', 'STYLE', 'CODE', 'PRE'];
  
  // Cache de traducciones para evitar reprocesar
  const translationCache = new Map();
  
  // === TRADUCIR TEXTO OPTIMIZADO ===
  function translate(text) {
    if (!text || text.length < 2) return text;
    
    // Verificar cache
    if (translationCache.has(text)) {
      return translationCache.get(text);
    }
    
    // Detección rápida: si contiene palabras en español, probablemente no hay que traducir
    const lowerText = text.toLowerCase();
    let hasSpanish = false;
    for (const word of spanishWords) {
      if (lowerText.includes(word)) {
        hasSpanish = true;
        break;
      }
    }
    
    // Si ya está en español, no traducir
    if (hasSpanish && !lowerText.includes('janeiro') && !lowerText.includes('fevereiro')) {
      translationCache.set(text, text);
      return text;
    }
    
    let result = text;
    
    // Ordenar por longitud (más largo primero)
    const sorted = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);
    
    for (const [pt, es] of sorted) {
      // Buscar coincidencia exacta primero (más rápido)
      if (result === pt) {
        result = es;
        break;
      }
      
      // Luego buscar con regex solo si no coincidió exactamente
      if (result.includes(pt)) {
        const regex = new RegExp('\\b' + pt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
        result = result.replace(regex, es);
      }
    }
    
    // Guardar en cache
    translationCache.set(text, result);
    
    return result;
  }

  // === TRADUCIR ELEMENTO ===
  function translateElement(el) {
    if (!el || !el.tagName || SKIP_TAGS.includes(el.tagName)) return;
    
    try {
      // Traducir atributos
      ['placeholder', 'title', 'aria-label', 'data-original-title'].forEach(attr => {
        if (el.hasAttribute(attr)) {
          const original = el.getAttribute(attr);
          const translated = translate(original);
          if (translated !== original) {
            el.setAttribute(attr, translated);
          }
        }
      });
      
      // Traducir nodos de texto
      if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && !el.isContentEditable) {
        for (const node of el.childNodes) {
          if (node.nodeType === 3) {
            const original = node.textContent.trim();
            if (original) {
              const translated = translate(original);
              if (translated !== original) {
                node.textContent = translated;
              }
            }
          }
        }
      }
    } catch (e) {
      // Ignorar errores
    }
  }

  // === ESCANEAR PÁGINA (optimizado) ===
  function scanPage() {
    const all = document.querySelectorAll('*');
    
    all.forEach(el => {
      if (el.offsetParent !== null || el.tagName === 'BUTTON') {
        translateElement(el);
      }
    });
  }

  // === HOVER FORZADO ===
  function isKanbanRoute() {
    const path = window.location.pathname;
    return path.includes('/app/accounts/') && path.includes('/kanban');
  }
  
  function injectHoverCSS() {
    if (document.getElementById('force-hover-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'force-hover-styles';
    style.textContent = `
      [class*="hover"]:not(:hover),
      [class*="show-on-hover"]:not(:hover),
      .hover-show:not(:hover),
      [data-hover]:not(:hover),
      [class*="actions"]:not(:hover),
      [class*="toolbar"]:not(:hover) {
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    
    document.head.appendChild(style);
    console.log('✅ Hover forzado activo');
  }
  
  function removeHoverCSS() {
    const style = document.getElementById('force-hover-styles');
    if (style) {
      style.remove();
      console.log('🗑️ Hover desactivado');
    }
  }

  // === OBSERVADOR LIGERO ===
  let debounceTimer;
  let scanCount = 0;
  
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    
    // Delay moderado para agrupar cambios
    debounceTimer = setTimeout(() => {
      scanCount++;
      console.log(`🔄 Escaneo #${scanCount}`);
      scanPage();
      
      if (isKanbanRoute()) {
        injectHoverCSS();
      }
    }, 300);
  });

  // === CAMBIOS DE RUTA ===
  let lastUrl = location.href;
  
  function checkUrlChange() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      console.log('🔄 Ruta: ' + location.pathname);
      
      // Escaneos esenciales en cambio de ruta
      scanPage();
      setTimeout(scanPage, 200);
      setTimeout(scanPage, 600);
      
      if (isKanbanRoute()) {
        injectHoverCSS();
      } else {
        removeHoverCSS();
      }
    }
  }

  setInterval(checkUrlChange, 500);

  // === ESCANEO INTELIGENTE EN CLICKS (solo botones y links) ===
  document.addEventListener('click', (e) => {
    // Solo escanear si el click fue en un botón o link
    const target = e.target.closest('button, a, [role="button"]');
    if (target) {
      // Escaneo inmediato + backup
      setTimeout(scanPage, 0);   // Inmediato
      setTimeout(scanPage, 200); // Backup rápido
      setTimeout(scanPage, 600); // Backup para contenido lento
    }
  }, true);

  // === INICIO ULTRA-RÁPIDO ===
  function init() {
    console.log('📖 Escaneando...');
    
    // Escaneos INMEDIATOS (sin delay)
    scanPage();
    scanPage(); // Doble escaneo inmediato
    
    // Escaneos progresivos
    setTimeout(scanPage, 50);
    setTimeout(scanPage, 150);
    setTimeout(scanPage, 400);
    setTimeout(scanPage, 800);
    
    if (isKanbanRoute()) {
      injectHoverCSS();
    }
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true, // Observar cambios de atributos (ej: cuando aparecen elementos)
      attributeFilter: ['class', 'style'], // Solo class y style
    });
    
    console.log('⚡ ACTIVO (v6.6 - ULTRA-RÁPIDO)');
    console.log('💡 Detener: window.__stop()');
    console.log('💡 Escanear: window.__scan()');
    console.log('💡 Cache: window.__cache()');
  }

  // === COMANDOS ===
  window.__stop = () => {
    observer.disconnect();
    clearTimeout(debounceTimer);
    removeHoverCSS();
    console.log('⏹️ Detenido');
  };
  
  window.__scan = () => {
    console.log('🔍 Escaneando...');
    scanPage();
  };
  
  window.__cache = () => {
    console.log('📦 Cache:', translationCache.size, 'traducciones');
  };

  // Esperar carga - EJECUTAR INMEDIATAMENTE
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init); // Sin delay
  } else {
    init(); // Ejecutar inmediatamente
  }
})();