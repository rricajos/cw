// Sistema de traducción para Chatwoot
(function() {
  'use strict';
  
  console.log('🌍 Sistema de traducciones cargado');
  
  // Diccionario de traducciones
  const translations = {
    // Navegación principal
    'Inbox': 'Bandeja',
    'Conversations': 'Conversaciones',
    'Contacts': 'Contactos',
    'Reports': 'Informes',
    'Settings': 'Configuración',
    'Help': 'Ayuda',
    
    // Estados
    'Open': 'Abierto',
    'Resolved': 'Resuelto',
    'Pending': 'Pendiente',
    'Snoozed': 'Pospuesto',
    
    // Acciones
    'Send': 'Enviar',
    'Reply': 'Responder',
    'Close': 'Cerrar',
    'Delete': 'Eliminar',
    'Edit': 'Editar',
    'Save': 'Guardar',
    'Cancel': 'Cancelar',
    'Search': 'Buscar',
    
    // Mensajes
    'New message': 'Nuevo mensaje',
    'Type a message': 'Escribe un mensaje',
    'Message sent': 'Mensaje enviado',
    'No conversations': 'Sin conversaciones',
    
    // Usuario
    'Profile': 'Perfil',
    'Logout': 'Cerrar sesión',
    'Account': 'Cuenta',
    
    // Otros
    'Loading': 'Cargando',
    'More': 'Más',
    'All': 'Todos'
  };
  
  // Traducciones de atributos
  const attributeTranslations = {
    title: {
      'Send message': 'Enviar mensaje',
      'Close conversation': 'Cerrar conversación',
      'Delete message': 'Eliminar mensaje',
      'Search conversations': 'Buscar conversaciones'
    },
    placeholder: {
      'Type a message...': 'Escribe un mensaje...',
      'Search': 'Buscar...',
      'Enter your message': 'Ingresa tu mensaje'
    }
  };
  
  // Función para traducir un elemento
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
  
  // Función principal de traducción
  function translatePage() {
    // Traducir todos los elementos visibles
    document.querySelectorAll('body *').forEach(element => {
      translateElement(element);
    });
  }
  
  // Ejecutar cuando el DOM esté listo
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
  
  // Iniciar observación después de un pequeño delay
  setTimeout(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false
    });
    console.log('🔍 Observador de traducciones activo');
  }, 1000);
  
  // Re-traducir cada 5 segundos (por si acaso)
  setInterval(translatePage, 5000);
  
})();