// Sistema de traducción PT → ES para Chatwoot
(function() {
  'use strict';
  
  console.log('🇵🇹 → 🇪🇸 Traduciendo de Portugués a Español');
  
  // Diccionario PT → ES
  const translations = {
    // Navegación
    'Caixa de Entrada': 'Bandeja de Entrada',
    'Conversas': 'Conversaciones',
    'Contatos': 'Contactos',
    'Relatórios': 'Informes',
    'Configurações': 'Configuración',
    'Ajuda': 'Ayuda',
    'Inbox': 'Bandeja de Entrada',
    'Conversations': 'Conversaciones',
    'Contacts': 'Contactos',
    'Reports': 'Informes',
    'Settings': 'Configuración',
    'Help': 'Ayuda',
    
    // Estados
    'Aberto': 'Abierto',
    'Resolvido': 'Resuelto',
    'Pendente': 'Pendiente',
    'Adiado': 'Pospuesto',
    'Open': 'Abierto',
    'Resolved': 'Resuelto',
    'Pending': 'Pendiente',
    'Snoozed': 'Pospuesto',
    
    // Acciones
    'Enviar': 'Enviar',
    'Responder': 'Responder',
    'Fechar': 'Cerrar',
    'Excluir': 'Eliminar',
    'Editar': 'Editar',
    'Salvar': 'Guardar',
    'Cancelar': 'Cancelar',
    'Buscar': 'Buscar',
    'Send': 'Enviar',
    'Reply': 'Responder',
    'Close': 'Cerrar',
    'Delete': 'Eliminar',
    'Edit': 'Editar',
    'Save': 'Guardar',
    'Cancel': 'Cancelar',
    'Search': 'Buscar',
    
    // Mensajes
    'Nova mensagem': 'Nuevo mensaje',
    'Digite uma mensagem': 'Escribe un mensaje',
    'Mensagem enviada': 'Mensaje enviado',
    'Sem conversas': 'Sin conversaciones',
    'New message': 'Nuevo mensaje',
    'Type a message': 'Escribe un mensaje',
    'Message sent': 'Mensaje enviado',
    'No conversations': 'Sin conversaciones',
    
    // Usuario
    'Perfil': 'Perfil',
    'Sair': 'Cerrar sesión',
    'Conta': 'Cuenta',
    'Profile': 'Perfil',
    'Logout': 'Cerrar sesión',
    'Account': 'Cuenta',
    
    // Otros
    'Carregando': 'Cargando',
    'Mais': 'Más',
    'Todos': 'Todos',
    'Loading': 'Cargando',
    'More': 'Más',
    'All': 'Todos'
  };
  
  const attributeTranslations = {
    title: {
      'Enviar mensagem': 'Enviar mensaje',
      'Fechar conversa': 'Cerrar conversación',
      'Excluir mensagem': 'Eliminar mensaje',
      'Buscar conversas': 'Buscar conversaciones',
      'Send message': 'Enviar mensaje',
      'Close conversation': 'Cerrar conversación',
      'Delete message': 'Eliminar mensaje',
      'Search conversations': 'Buscar conversaciones'
    },
    placeholder: {
      'Digite uma mensagem...': 'Escribe un mensaje...',
      'Buscar': 'Buscar...',
      'Digite sua mensagem': 'Introduce tu mensaje',
      'Type a message...': 'Escribe un mensaje...',
      'Search': 'Buscar...',
      'Enter your message': 'Introduce tu mensaje'
    }
  };
  
  function translateElement(element) {
    if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
      const text = element.textContent.trim();
      if (translations[text]) {
        element.textContent = translations[text];
      }
    }
    
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
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', translatePage);
  } else {
    translatePage();
  }
  
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
    console.log('🔍 Observador PT→ES activo');
  }, 1000);
  
  setInterval(translatePage, 5000);
  
})();