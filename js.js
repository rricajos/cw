// PT → ES + Forzar :hover - Script combinado v6.0
(function () {
  'use strict';
  console.log('🇵🇹→🇪🇸 Traductor + Hover forzado v6.0');

  // === DICCIONARIO ===
  const dict = {
    // Navegación principal
    'Caixa de Entrada':'Bandeja de Entrada', 'Mi bandeja de entrada':'Mi bandeja de entrada',
    'Conversas':'Conversaciones', 'Conversaciones':'Conversaciones',
    'Contatos':'Contactos', 'Relatórios':'Informes', 'Configurações':'Configuración',
    'Ajuda':'Ayuda', 'Painel':'Panel', 'Equipe':'Equipo', 'Etiquetas':'Etiquetas',
    'Atributos':'Atributos', 'Kanban':'Kanban', 'Funis':'Embudos', 'Embudos':'Embudos',
    'Etapas':'Etapas', 'Ofertas':'Ofertas',
    
    // Sección lateral
    'Modelos de mensagem':'Modelos de Mensaje', 'Modelos de m...':'Modelos de Mensaje',
    'Ajustes':'Ajustes', 'Informes':'Informes',
    
    // Filtros
    'Filtrar ítems':'Filtrar ítems', 'Filtros Rápidos':'Filtros Rápidos',
    'Selecionar filtro rápido':'Seleccionar filtro rápido',
    'Filtros Salvos':'Filtros Guardados', 'Nombre do filtro':'Nombre del filtro',
    'Carregar filtro salvo':'Cargar filtro guardado',
    'Aplicar Filtros':'Aplicar Filtros',
    
    // Prioridades
    'Urgente':'Urgente', 'Alta':'Alta', 'Média':'Media', 'Baixa':'Baja',
    
    // Valores y rangos
    'Mínimo':'Mínimo', 'Máximo':'Máximo', 'Período':'Período', 'Periodo':'Período',
    
    // Agentes y canales
    'Agente':'Agente', 'Buscar agentes':'Buscar agentes',
    'Todos os agentes':'Todos los agentes', 'Todos os canais':'Todos los canales',
    'Selecione o mês':'Seleccione el mes',
    
    // Meses del año
    'Janeiro':'Enero', 'Fevereiro':'Febrero', 'Março':'Marzo', 'Abril':'Abril',
    'Maio':'Mayo', 'Junho':'Junio', 'Julho':'Julio', 'Agosto':'Agosto',
    'Setembro':'Septiembre', 'Outubro':'Octubre', 'Novembro':'Noviembre', 'Dezembro':'Diciembre',
    'janeiro':'enero', 'fevereiro':'febrero', 'março':'marzo', 'abril':'abril',
    'maio':'mayo', 'junho':'junio', 'julho':'julio', 'agosto':'agosto',
    'setembro':'septiembre', 'outubro':'octubre', 'novembro':'noviembre', 'dezembro':'diciembre',
    
    // Días de la semana completos
    'Domingo':'Domingo', 'Segunda':'Lunes', 'Segunda-feira':'Lunes',
    'Terça':'Martes', 'Terça-feira':'Martes',
    'Quarta':'Miércoles', 'Quarta-feira':'Miércoles',
    'Quinta':'Jueves', 'Quinta-feira':'Jueves',
    'Sexta':'Viernes', 'Sexta-feira':'Viernes',
    'Sábado':'Sábado', 'Sabado':'Sábado',
    'domingo':'domingo', 'segunda':'lunes', 'segunda-feira':'lunes',
    'terça':'martes', 'terça-feira':'martes',
    'quarta':'miércoles', 'quarta-feira':'miércoles',
    'quinta':'jueves', 'quinta-feira':'jueves',
    'sexta':'viernes', 'sexta-feira':'viernes',
    'sábado':'sábado', 'sabado':'sábado',
    
    // Días de la semana abreviados (3 letras)
    'Dom':'Dom', 'Seg':'Lun', 'Ter':'Mar', 'Qua':'Mié', 'Qui':'Jue', 'Sex':'Vie', 'Sáb':'Sáb',
    
    // Vistas de calendario
    'Agenda':'Agenda', 'Semana':'Semana', 'Hoy':'Hoy', 'Hoje':'Hoy',
    'Mes':'Mes', 'Mês':'Mes', 'Dia':'Día', 'Lista':'Lista',
    'Tarefas':'Tareas',
    
    // Estados y formularios
    'Dados Básicos':'Datos Básicos', 'Metas':'Metas',
    'Campos Personalizados Globais':'Campos Personalizados Globales',
    'Ativo':'Activo', 'Fechado':'Cerrado', 'Aberto':'Abierto', 'Resolvido':'Resuelto',
    'Pendente':'Pendiente', 'Adiado':'Pospuesto', 'Descartar':'Descartar',
    'Estado Activo':'Estado Activo', 'Estado Ativo':'Estado Activo',
    
    // Acciones
    'Guardar':'Guardar', 'Salvar':'Guardar', 'Copiar':'Copiar', 'Editar':'Editar',
    'Excluir':'Eliminar', 'Cancelar':'Cancelar', 'Aplicar':'Aplicar',
    'Limpar':'Limpiar', 'Adicionar':'Añadir', 'Criar':'Crear',
    'Atualizar':'Actualizar', 'Actualizado el':'Actualizado el',
    'Remover':'Quitar', 'Buscar':'Buscar', 'Buscar...':'Buscar...',
    
    // Etapas
    'Crie uma nova etapa':'Crea una nueva etapa', 'Nome da etapa':'Nombre de la etapa',
    'Cor':'Color', 'Descrição':'Descripción', 'Descrição da etapa':'Descripción de la etapa',
    'Condições de Auto Criação':'Condiciones de Auto-Creación',
    'Contato tem tag':'El contacto tiene la etiqueta', 'Adicionar etapa':'Añadir etapa',
    'Etapas desse funil':'Etapas de este embudo',
    
    // Agentes y campos
    'Agentes do Funil':'Agentes del Embudo', 'Buscar agente...':'Buscar agente...',
    'Chave (nome)':'Clave (nombre)', 'Chave (name)':'Clave (nombre)',
    'Chave':'Clave',
    'Tipo':'Tipo', 'Único':'Único', 'Adicionar campo':'Añadir campo',
    'Añadir campo':'Añadir campo', 'Campos Globais':'Campos Globales',
    'Campos Adicionais':'Campos Adicionales', 'Dados Adicionais':'Datos Adicionales',
    'Campos Globales':'Campos Globales', 'Campos Adicionales':'Campos Adicionales',
    
    // Modelos de mensaje
    'Modelos de Mensagem':'Modelos de Mensaje',
    'Nenhum template nesta etapa':'Ninguna plantilla en esta etapa',
    
    // Metas
    'Configure uma nova meta':'Configura una nueva meta', 'Tipo de Meta':'Tipo de Meta',
    'Taxa de Conversão':'Tasa de Conversión', 'Valor Médio':'Valor Medio',
    'Tempo Médio':'Tiempo Medio', 'Total de Conversões':'Total de Conversiones',
    'Receita Total':'Ingreso Total', 'Valor da Meta':'Valor de la Meta',
    'Descrição (opcional)':'Descripción (opcional)', 'Adicionar Meta':'Añadir Meta',
    
    // Otros textos
    'Relatório da etapa':'Informe de la etapa', 'Criar Ítem do Kanban':'Crear Ítem del Kanban',
    'Progresso do Funil':'Progreso del Embudo', 'Tag':'Etiqueta',
    'Nenhum campo global definido para este funil':'Ningún campo global definido para este embudo',
    'Nenhum item do Kanban associado':'Ningún ítem del Kanban asociado',
    'Nenhuma meta configurada ainda':'Ninguna meta configurada aún',
    'Ningún campo global definido para este embudo':'Ningún campo global definido para este embudo',
    
    // Textos descriptivos largos
    'Habilitar o deshabilitar este embudo':'Habilitar o deshabilitar este embudo',
    'Los embudos deshabilitados no aceptarán nuevos elementos':'Los embudos deshabilitados no aceptarán nuevos elementos',
    'Habilitar o deshabilitar este embudo. Los embudos deshabilitados no aceptarán nuevos elementos.':'Habilitar o deshabilitar este embudo. Los embudos deshabilitados no aceptarán nuevos elementos.',
    
    // Palabras comunes
    'itens':'ítems', 'valor':'valor', 'Nome':'Nombre', 'Título':'Título',
    'Observações':'Observaciones', 'Data':'Fecha', 'Hora':'Hora',
    'Prioridade':'Prioridad', 'Status':'Estado', 'Detalhes':'Detalles',
    'Informações':'Información', 'Criado em':'Creado el', 'Atualizado em':'Actualizado el',
    'Criado por':'Creado por', 'Editando':'Editando',
    'Ex: Meta mensal de conversões':'Ej: Meta mensual de conversiones',
    
    // Tabs y elementos nuevos
    'General':'General', 'Pipeline':'Pipeline', 'Asignación':'Asignación',
    'Programación':'Programación', 'Relaciones':'Relaciones'
  };

  // === NO TOCAR ESTOS ELEMENTOS ===
  const SKIP_TAGS = ['SCRIPT', 'STYLE', 'CODE', 'PRE'];
  
  // === TRADUCIR TEXTO ===
  function translate(text) {
    if (!text || text.length < 2) return text;
    
    let result = text;
    
    // Ordenar por longitud (más largo primero) para evitar traducciones parciales
    const sorted = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);
    
    for (const [pt, es] of sorted) {
      // Regex con límites de palabra
      const regex = new RegExp('\\b' + pt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      result = result.replace(regex, es);
    }
    
    return result;
  }

  // === TRADUCIR ELEMENTO COMPLETO ===
  function translateElement(el) {
    // Saltar elementos no válidos
    if (!el || !el.tagName) return;
    if (SKIP_TAGS.includes(el.tagName)) return;
    
    try {
      // 1. TRADUCIR ATRIBUTOS (placeholder, title, aria-label)
      ['placeholder', 'title', 'aria-label', 'data-original-title'].forEach(attr => {
        if (el.hasAttribute(attr)) {
          const original = el.getAttribute(attr);
          const translated = translate(original);
          if (translated !== original) {
            el.setAttribute(attr, translated);
          }
        }
      });
      
      // 2. TRADUCIR NODOS DE TEXTO (sin tocar inputs/textareas editables)
      if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && !el.isContentEditable) {
        for (const node of el.childNodes) {
          if (node.nodeType === 3) { // Text node
            const original = node.textContent;
            const translated = translate(original);
            
            if (translated !== original) {
              node.textContent = translated;
            }
          }
        }
      }
    } catch (e) {
      // Ignorar errores
    }
  }

  // === ESCANEAR TODA LA PÁGINA ===
  function scanPage() {
    // Buscar TODOS los elementos visibles
    const all = document.querySelectorAll('*');
    
    all.forEach(el => {
      // Solo traducir elementos visibles
      if (el.offsetParent !== null || el.tagName === 'BUTTON') {
        translateElement(el);
      }
    });
  }

  // === FORZAR ESTILOS HOVER ===
  function isKanbanRoute() {
    const path = window.location.pathname;
    return path.includes('/app/accounts/') && path.includes('/kanban');
  }
  
  function injectHoverCSS() {
    if (document.getElementById('force-hover-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'force-hover-styles';
    style.textContent = `
      /* Forzar visibilidad de elementos que aparecen en hover */
      [class*="hover"]:not(:hover),
      [class*="show-on-hover"]:not(:hover),
      .hover-show:not(:hover),
      [data-hover]:not(:hover) {
        opacity: 1 !important;
        visibility: visible !important;
      }
      
      /* Botones de acción que aparecen en hover */
      [class*="actions"]:not(:hover),
      [class*="toolbar"]:not(:hover),
      [class*="menu"]:not(:hover) {
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    
    document.head.appendChild(style);
    console.log('✅ CSS hover forzado');
  }
  
  function removeHoverCSS() {
    const style = document.getElementById('force-hover-styles');
    if (style) style.remove();
  }

  // === OBSERVADOR CON DEBOUNCE ===
  let debounceTimer;
  let scanCount = 0;
  
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    
    // Escanear después de 300ms de calma
    debounceTimer = setTimeout(() => {
      scanCount++;
      console.log(`🔄 Escaneo #${scanCount}`);
      scanPage();
      
      // Revisar hover en cada escaneo
      if (isKanbanRoute()) {
        injectHoverCSS();
      }
    }, 300);
  });

  // === DETECTAR CAMBIOS DE RUTA (Vue Router) ===
  let lastUrl = location.href;
  
  function checkUrlChange() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      console.log('🔄 Cambio de ruta detectado');
      
      // Escanear después de que Vue renderice
      setTimeout(scanPage, 800);
      setTimeout(scanPage, 1500);
      
      // Gestionar hover CSS
      if (isKanbanRoute()) {
        injectHoverCSS();
      } else {
        removeHoverCSS();
      }
    }
  }

  // Revisar URL cada 500ms
  setInterval(checkUrlChange, 500);

  // === FORZAR RE-ESCANEO EN CLICKS (para modales y cambios de vista) ===
  document.addEventListener('click', () => {
    setTimeout(scanPage, 400);
    setTimeout(scanPage, 800);
  }, true);

  // === INICIO ===
  function init() {
    console.log('📖 Escaneando página inicial...');
    
    // Escaneos progresivos (Vue tarda en renderizar)
    setTimeout(scanPage, 300);
    setTimeout(scanPage, 700);
    setTimeout(scanPage, 1200);
    setTimeout(scanPage, 2000);
    setTimeout(scanPage, 3000);
    
    // Activar hover si estamos en Kanban
    if (isKanbanRoute()) {
      injectHoverCSS();
    }
    
    // Observar cambios continuos
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
    });
    
    console.log('✅ Traductor + Hover activo (v6.0)');
    console.log('💡 Para detener: window.__stop()');
    console.log('💡 Para escanear: window.__scan()');
  }

  // === COMANDOS ===
  window.__stop = () => {
    observer.disconnect();
    clearTimeout(debounceTimer);
    removeHoverCSS();
    console.log('⏹️ Traductor y hover detenidos');
  };
  
  window.__scan = () => {
    console.log('🔍 Forzando escaneo...');
    scanPage();
  };

  // Esperar a que cargue
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 800));
  } else {
    setTimeout(init, 800);
  }
})();