// Traducción Portugués → Español para Chatwoot
(function() {
  'use strict';
  
  console.log('🇵🇹 → 🇪🇸 Traductor PT a ES activado');
  
  // Diccionario Portugués → Español
  const translations = {
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
    
    // Estados
    'Aberto': 'Abierto',
    'Resolvido': 'Resuelto',
    'Pendente': 'Pendiente',
    'Adiado': 'Pospuesto',
    'Ativo': 'Activo',
    'Fechado': 'Cerrado',
    
    // Acciones
    'Enviar': 'Enviar',
    'Responder': 'Responder',
    'Fechar': 'Cerrar',
    'Excluir': 'Eliminar',
    'Editar': 'Editar',
    'Salvar': 'Guardar',
    'Cancelar': 'Cancelar',
    'Buscar': 'Buscar',
    'Filtrar': 'Filtrar',
    'Ordenar': 'Ordenar',
    'Adicionar': 'Añadir',
    'Criar': 'Crear',
    'Atualizar': 'Actualizar',
    'Remover': 'Quitar',
    'Aplicar': 'Aplicar',
    'Limpar': 'Limpiar',
    'Redefinir': 'Reiniciar',
    
    // Mensajes
    'Nova mensagem': 'Nuevo mensaje',
    'Digite uma mensagem': 'Escribe un mensaje',
    'Mensagem enviada': 'Mensaje enviado',
    'Sem conversas': 'Sin conversaciones',
    'Sem mensagens': 'Sin mensajes',
    'Digitando...': 'Escribiendo...',
    'Nova conversa': 'Nueva conversación',
    
    // Usuario
    'Perfil': 'Perfil',
    'Sair': 'Cerrar sesión',
    'Conta': 'Cuenta',
    'Status': 'Estado',
    'Disponível': 'Disponible',
    'Ocupado': 'Ocupado',
    'Offline': 'Desconectado',
    
    // Tiempo
    'Hoje': 'Hoy',
    'Ontem': 'Ayer',
    'Semana passada': 'Semana pasada',
    'Mês passado': 'Mes pasado',
    
    // Otros
    'Carregando': 'Cargando',
    'Mais': 'Más',
    'Todos': 'Todos',
    'Nenhum': 'Ninguno',
    'Sim': 'Sí',
    'Não': 'No',
    'OK': 'Aceptar',
    'Confirmar': 'Confirmar',
    'Voltar': 'Volver',
    'Próximo': 'Siguiente',
    'Anterior': 'Anterior',
    'Enviar': 'Enviar',
    
    // Inglés también (por si Chatwoot está en inglés)
    'Inbox': 'Bandeja de Entrada',
    'Conversations': 'Conversaciones',
    'Contacts': 'Contactos',
    'Reports': 'Informes',
    'Settings': 'Configuración',
    'Help': 'Ayuda',
    'Open': 'Abierto',
    'Resolved': 'Resuelto',
    'Pending': 'Pendiente',
    'Snoozed': 'Pospuesto',
    'Send': 'Enviar',
    'Reply': 'Responder',
    'Close': 'Cerrar',
    'Delete': 'Eliminar',
    'Edit': 'Editar',
    'Save': 'Guardar',
    'Cancel': 'Cancelar',
    'Search': 'Buscar',
    'New message': 'Nuevo mensaje',
    'Type a message': 'Escribe un mensaje',
    'Message sent': 'Mensaje enviado',
    'No conversations': 'Sin conversaciones',
    'Profile': 'Perfil',
    'Logout': 'Cerrar sesión',
    'Account': 'Cuenta',
    'Loading': 'Cargando',
    'More': 'Más',
    'All': 'Todos',


     // Secciones y navegación
    'Checklist': 'Lista de Verificación',
    'Arquivos Adjuntos': 'Archivos Adjuntos',
    'Dados Adicionais': 'Datos Adicionales',
    'Campos Globais': 'Campos Globales',
    'Campos Adicionais': 'Campos Adicionales',
    'Progresso do Funil': 'Progreso del Embudo',
    'Criar Item do Kanban': 'Crear Ítem del Kanban',
    'Relatório da etapa': 'Informe de la etapa',

    // Formularios y campos
    'Prioridade': 'Prioridad',
    'Digite o valor para Prioridade': 'Escribe el valor para Prioridad',
    'Tipo serviço': 'Tipo de servicio',
    'Adicionar item +': 'Añadir ítem +',
    'Adicionar campo': 'Añadir campo',
    'Chave (name)': 'Clave (nombre)',
    'Nenhum campo global definido para este funil': 'Ningún campo global definido para este embudo',
    'Nenhum item do Kanban associado': 'Ningún ítem del Kanban asociado',
    'Definir Funil': 'Definir Embudo',
    'Salvar': 'Guardar',

    // Filtros
    'Filtrar Itens': 'Filtrar Ítems',
    'Selecionar filtro rápido': 'Seleccionar filtro rápido',
    'Filtros Salvos': 'Filtros Guardados',
    'Nome do filtro...': 'Nombre del filtro...',
    'Carregar filtro salvo': 'Cargar filtro guardado',
    'Período de Criação': 'Período de Creación',
    'Período de Agendamento': 'Período de Programación',

    // Prioridades
    'Urgente': 'Urgente',
    'Alta': 'Alta',
    'Média': 'Media',
    'Baixa': 'Baja',

    // Estados y botones
    'Aberto': 'Abierto',
    'Atual': 'Actual',
    'Etapa': 'Etapa',
    'Agente': 'Agente',
    'Aplicar Filtros': 'Aplicar Filtros',
    'Limpar': 'Limpiar',
    'Cancelar': 'Cancelar',
    'Salvar Filtro': 'Guardar Filtro',

    // Elementos del pipeline
    'Pipeline': 'Embudo',
    'General': 'General',
    'Programación': 'Programación',
    'Relações': 'Relaciones',
    'Agentes asignados al elemento': 'Agentes asignados al elemento',
    'Ofertas': 'Ofertas',
    'Atividades': 'Actividades',
    'Etapa cambiada': 'Etapa cambiada',

    // Otros textos comunes
    'Serviço': 'Servicio',
    'Produto': 'Producto',
    'Valor': 'Valor',
    'Item': 'Elemento',
    'Data limite': 'Fecha límite',
    'Nenhuma': 'Ninguna'

    
  };
  
  const attributeTranslations = {
    title: {
      'Enviar mensagem': 'Enviar mensaje',
      'Fechar conversa': 'Cerrar conversación',
      'Excluir mensagem': 'Eliminar mensaje',
      'Buscar conversas': 'Buscar conversaciones',
      'Nova conversa': 'Nueva conversación',
      'Marcar como resolvido': 'Marcar como resuelto',
      'Atribuir ao agente': 'Asignar a agente',
      'Adicionar etiqueta': 'Añadir etiqueta',
      'Send message': 'Enviar mensaje',
      'Close conversation': 'Cerrar conversación',
      'Delete message': 'Eliminar mensaje',
      'Search conversations': 'Buscar conversaciones',
      'New conversation': 'Nueva conversación',
      'Mark as resolved': 'Marcar como resuelto',
      'Assign to agent': 'Asignar a agente',
      'Add label': 'Añadir etiqueta'
    },
    placeholder: {
      'Digite uma mensagem...': 'Escribe un mensaje...',
      'Buscar': 'Buscar...',
      'Digite sua mensagem': 'Introduce tu mensaje',
      'Buscar conversas': 'Buscar conversaciones...',
      'Buscar contatos': 'Buscar contactos...',
      'Digite aqui': 'Escribe aquí',
      'Type a message...': 'Escribe un mensaje...',
      'Search': 'Buscar...',
      'Enter your message': 'Introduce tu mensaje',
      'Search conversations': 'Buscar conversaciones...',
      'Search contacts': 'Buscar contactos...',
      'Type here': 'Escribe aquí'
    }
  };
  
  function translateElement(element) {
    // Traducir texto directo
    if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
      const text = element.textContent.trim();
      if (translations[text]) {
        element.textContent = translations[text];
      }
    }
    
    // Traducir atributos
    ['title', 'placeholder', 'aria-label'].forEach(attr => {
      if (element.hasAttribute(attr)) {
        const value = element.getAttribute(attr);
        if (attributeTranslations[attr] && attributeTranslations[attr][value]) {
          element.setAttribute(attr, attributeTranslations[attr][value]);
        } else if (translations[value]) {
          element.setAttribute(attr, translations[value]);
        }
      }
    });
  }
  
  function translatePage() {
    document.querySelectorAll('body *').forEach(element => {
      translateElement(element);
    });
  }
  
  // Ejecutar cuando cargue la página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', translatePage);
  } else {
    translatePage();
  }
  
  // Observar cambios en el DOM para contenido dinámico
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          translateElement(node);
          node.querySelectorAll('*').forEach(translateElement);
        }
      });
    });
  });
  
  setTimeout(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false
    });
    console.log('🔍 Observador de traducciones PT→ES activo');
  }, 1000);
  
  // Re-traducir cada 5 segundos por si acaso
  setInterval(translatePage, 5000);
  
})();