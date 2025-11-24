# Conversation Manager - Documentation

## Descripción
El `ConversationManager` es un singleton que gestiona el historial de conversaciones del chatbot Arthur, incluyendo almacenamiento persistente, exportación e importación de datos.

## Características

### 🔄 Patrón Singleton
- Una sola instancia en toda la aplicación
- Gestión centralizada de datos de conversación
- Thread-safe implementation

### 💾 Almacenamiento Persistente
- Guarda automáticamente en `localStorage`
- Recupera conversaciones al recargar la página
- Manejo de errores robusto

### 📊 Tracking de Mensajes
Cada mensaje incluye:
- `id`: Identificador único del mensaje
- `timestamp`: Marca de tiempo exacta
- `sender`: 'user' o 'bot'
- `content`: Contenido del mensaje
- `type`: 'text' o 'audio'

### 📈 Estadísticas de Conversación
- Número total de mensajes
- Mensajes por usuario/bot
- Duración de la sesión
- Última actividad

### 💾 Exportación/Importación
- Descarga automática en formato JSON
- Importación de conversaciones previas
- Validación de estructura de datos

## Uso

### Inicialización
```typescript
import { ConversationManager } from './service/conversation-manager.service';

const manager = ConversationManager.getInstance();
```

### Agregar Mensajes
```typescript
// Mensaje de usuario
const messageId = manager.addMessage('user', 'Hola, ¿cómo estás?', 'text');

// Respuesta del bot
manager.addMessage('bot', '¡Hola! Estoy bien, gracias.', 'text');

// Mensaje de audio
manager.addMessage('user', 'Transcripción del audio', 'audio');
```

### Obtener Datos
```typescript
// Obtener todos los mensajes
const messages = manager.getMessages();

// Obtener datos completos de la conversación
const conversation = manager.getConversationData();

// Obtener estadísticas
const stats = manager.getConversationStats();
```

### Buscar y Modificar
```typescript
// Buscar mensaje por ID
const message = manager.getMessageById('msg_123...');

// Actualizar contenido de mensaje
manager.updateMessage('msg_123...', 'Nuevo contenido');

// Eliminar mensaje
manager.deleteMessage('msg_123...');
```

### Exportar/Importar
```typescript
// Exportar como string JSON
const jsonData = manager.exportConversation();

// Descargar archivo
manager.downloadConversation('mi_conversacion.json');

// Importar datos
const success = manager.importConversation(jsonData);
```

### Gestión de Conversación
```typescript
// Limpiar conversación actual
manager.clearConversation();

// Recargar datos desde archivo
manager.reload_data();

// Verificar si está cargado
const isLoaded = manager.is_loaded();
```

## Componente de Descarga

### Integración
El componente `DownloadConversationComponent` se puede agregar fácilmente:

```html
<app-download-conversation></app-download-conversation>
```

### Funcionalidades
- Botón de descarga con icono SVG
- Notificaciones de éxito/error
- Estadísticas opcionales
- Diseño responsivo

## Estructura del JSON Exportado

```json
{
  "sessionId": "conv_1732464000000_abc123",
  "startTime": 1732464000000,
  "lastActivity": 1732464120000,
  "messages": [
    {
      "id": "msg_1732464010000_xyz789",
      "timestamp": 1732464010000,
      "sender": "user",
      "content": "Mensaje del usuario",
      "type": "text"
    }
  ],
  "metadata": {
    "userAgent": "Mozilla/5.0...",
    "language": "es-ES",
    "timezone": "America/New_York"
  },
  "stats": {
    "totalMessages": 4,
    "userMessages": 2,
    "botMessages": 2,
    "duration": 120000,
    "lastActivity": 1732464120000
  },
  "exportDate": "2024-11-24T15:20:00.000Z"
}
```

## Integración con Componentes Existentes

### Bar Component
Ya integrado para registrar automáticamente:
- Mensajes de texto del usuario
- Respuestas del bot
- Mensajes de error
- (Futuro: Mensajes de voz)

### Próximas Integraciones
- Reconocimiento de voz
- Notificaciones push
- Análisis de sentimientos
- Backup automático

## Beneficios

1. **Persistencia**: Las conversaciones no se pierden al recargar
2. **Análisis**: Datos estructurados para análisis posterior
3. **Backup**: Fácil exportación e importación
4. **Debugging**: Timestamps exactos para debugging
5. **UX**: Continuidad en la experiencia del usuario
6. **Compliance**: Registros detallados para auditoría

## Consideraciones de Privacidad

- Los datos se almacenan localmente en el navegador
- No se envían a servidores externos automáticamente
- El usuario controla cuándo exportar sus datos
- Posibilidad de limpiar datos en cualquier momento

## Casos de Uso

1. **Estudiantes**: Revisar conversaciones de estudio previas
2. **Desarrollo**: Debugging y testing de respuestas
3. **Análisis**: Patrones de uso y mejoras
4. **Backup**: Conservar conversaciones importantes
5. **Migración**: Transferir datos entre dispositivos