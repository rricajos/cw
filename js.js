// PT → ES (solo textContent), seguro para vistas pesadas (Kanban)
(function () {
  'use strict';
  console.log('🇵🇹→🇪🇸 Traductor ligero (idle + lotes)');

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
    ['Condições de Auto Criação','Condiciones de Auto-Creación'], ['Contato tem tag','El contacto tiene la etiqueta'],
    ['Adicionar etapa','Añadir etapa'], ['Chave (nome)','Clave (nombre)'], ['Tipo','Tipo'], ['Único','Único'],
    ['Adicionar campo','Añadir campo'], ['Etapas desse funil','Etapas de este embudo'],
    ['Agentes do Funil','Agentes del Embudo'], ['Modelos de Mensagem','Modelos de Mensaje'],
    ['Nenhum template nesta etapa','Ninguna plantilla en esta etapa'],
    ['Configure uma nova meta','Configura una nueva meta'], ['Tipo de Meta','Tipo de Meta'],
    ['Taxa de Conversão','Tasa de Conversión'], ['Valor Médio','Valor Medio'], ['Tempo Médio','Tiempo Medio'],
    ['Total de Conversões','Total de Conversiones'], ['Receita Total','Ingreso Total'],
    ['Valor da Meta','Valor de la Meta'], ['Descrição (opcional)','Descripción (opcional)'],
    ['Adicionar Meta','Añadir Meta'], ['Relatório da etapa','Informe de la etapa'],
    ['Criar Ítem do Kanban','Crear Ítem del Kanban'], ['Progresso do Funil','Progreso del Embudo'],
    ['Nenhum campo global definido para este funil','Ningún campo global definido para este embudo'],
    ['Nenhum item do Kanban associado','Ningún ítem del Kanban asociado'],
    ['Nenhuma meta configurada ainda','Ninguna meta configurada aún'],
    ['itens','ítems'], ['valor','valor']
  ]);

  // --- Patrones parciales (datos variables) ---
  const patterns = [
    { re: /\bAtualizado em\b/gi, to: 'Actualizado el' },
    { re: /\bCriado em\b/gi,     to: 'Creado el' },
    { re: /\bEstado Ativo\b/gi,  to: 'Estado Activo' }
  ];

  // --- Utilidades ---
  const SKIP = new Set(['SCRIPT','STYLE','NOSCRIPT','IFRAME','TEXTAREA']);
  const isEditable = (el) => el && (el.isContentEditable || el.tagName === 'INPUT');
  const wb = (s) => new RegExp(`(^|\\b)${s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}(\\b|$)`,'gi');

  function translateText(t){
    if(!t || !t.trim()) return t;
    let out = t;
    exact.forEach((es,pt)=>{ out = out.replace(wb(pt), (_,a)=> a+es); });
    for(const {re,to} of patterns) out = out.replace(re,to);
    return out;
  }

  const queue = new Set();
  let scheduled = false;
  const CHUNK = 400; // nodos por lote

  function scheduleProcess(){
    if(scheduled) return;
    scheduled = true;
    (window.requestIdleCallback || window.requestAnimationFrame)(processQueue);
  }

  function processQueue(){
    scheduled = false;
    let count = 0;
    for(const node of queue){
      queue.delete(node);
      if(node.nodeType !== 3) continue;
      const el = node.parentElement;
      if(!el || SKIP.has(el.tagName) || isEditable(el)) continue;
      const before = node.nodeValue;
      const after = translateText(before);
      if(after !== before) node.nodeValue = after;
      if(++count >= CHUNK){
        scheduleProcess(); // seguir en el siguiente idle/frame
        break;
      }
    }
  }

  function scan(root){
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let n; while((n = walker.nextNode())) queue.add(n);
    scheduleProcess();
  }

  // --- Arranque tras carga (evita competir con la hidratación del Kanban) ---
  function start(){
    // Limita el ámbito al contenedor principal si existe
    const root =
      document.querySelector('#app, main, [role="main"], .app, .layout, .container') || document.body;
    scan(root);

    const mo = new MutationObserver((muts)=>{
      for(const m of muts){
        if(m.type === 'childList'){
          m.addedNodes.forEach((node)=>{
            if(node.nodeType === 3){ queue.add(node); }
            else if(node.nodeType === 1){ scan(node); }
          });
        }
      }
      scheduleProcess();
    });

    mo.observe(root, { subtree:true, childList:true }); // sin characterData
    // Kill switch
    window.__ptes_stop = ()=>{ mo.disconnect(); queue.clear(); console.log('⏹️ Traducción detenida'); };
    console.log('🔍 Observando (solo childList). Kill-switch: __ptes_stop()');
  }

  if(document.readyState === 'complete') {
    setTimeout(start, 500); // pequeña gracia post-load
  } else {
    window.addEventListener('load', ()=> setTimeout(start, 500), { once:true });
  }
})();
