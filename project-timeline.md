# 📸 Seguimiento del Proyecto: Web App de Galería y Compra de Fotos

## ✅ Introducción y Objetivos
- [x] Documentación de la introducción del proyecto
- [x] Definición de objetivos generales

## 🧩 Requisitos Funcionales

### 1. Gestión de Fotografías

#### Backend
- [ ] API para subida masiva de hasta 1000 fotos:
  - [ ] Endpoint para subir lotes de 50 fotos
  - [ ] Sistema de cola para procesar subidas grandes
  - [ ] Manejo de errores por lote
  - [ ] Barra de progreso en tiempo real
  - [ ] Reintentos automáticos en caso de fallo
- [ ] Procesamiento y optimización de imágenes
- [ ] Sistema de almacenamiento y respaldo
- [ ] Endpoints para CRUD de imágenes
- [ ] Lógica de categorización:
  - [ ] Fotógrafo
  - [ ] Fecha y Hora 
  - [ ] Tags/Etiquetas
  - [ ] Álbum (lugar)
  - [ ] Cantidad de personas
- [ ] Generación de versiones reducidas y marca de agua
- [ ] Manejo de tipos de imágenes (digitales/Kodaks)

#### Frontend
- [x] UI para subida masiva con drag & drop
- [ ] Interfaz de edición y eliminación de imagenes
- [x] Filtros y búsqueda por categorías
- [x] Visor de imágenes en alta calidad
- [x] Preview de versiones reducidas
- [ ] Selector de mejoras:
  - [ ] Marcos
  - [ ] Álbum
  - [ ] Tamaños
- [ ] Indicadores de tipo (digital/Kodak)

### 2. Compra y Descarga

#### Frontend
- [ ] Carrito de compras:
  - [ ] UI para selección múltiple de fotos
  - [ ] Vista previa de fotos seleccionadas
  - [ ] Contador de items
  - [ ] Cálculo de subtotal
  - [ ] Botón de checkout
- [ ] Integración de pagos en UI:
  - [ ] Formulario de datos de pago
  - [ ] Selector de método de pago
  - [ ] Manejo de errores visuales
  - [ ] Loading states
- [ ] Interfaz de descarga:
  - [ ] Lista de fotos compradas
  - [ ] Botón de descarga individual/masiva
  - [ ] Progreso de descarga
- [ ] Panel de licencias y términos
- [ ] Formulario de envío físico:
  - [ ] Datos de envío
  - [ ] Calculadora de costos
  - [ ] Tracking

#### Backend
- [ ] API Carrito:
  - [ ] CRUD de items
  - [ ] Cálculo de precios
  - [ ] Validaciones de stock
  - [ ] Persistencia en DB
- [ ] Integración pagos:
  - [ ] SDK Mercado Pago
  - [ ] SDK Stripe  
  - [ ] SDK PayPal
  - [ ] Webhooks y callbacks
  - [ ] Manejo de errores
- [ ] Sistema de descargas:
  - [ ] Generación de links seguros
  - [ ] Control de acceso
  - [ ] Rate limiting
  - [ ] Compresión de archivos
- [ ] Gestión de licencias:
  - [ ] Generación
  - [ ] Validación
  - [ ] Almacenamiento
- [ ] Sistema de envíos:
  - [ ] Integración carriers
  - [ ] Cálculo de costos
  - [ ] Tracking
- [ ] Emails transaccionales:
  - [ ] Templates
  - [ ] Cola de envío
  - [ ] Tracking de estados
  - [ ] Reintentos

### 3. Perfil de Fotógrafos

#### Fase 1: Autenticación Básica
Frontend:
- [ ] Formulario de login
- [ ] Formulario de registro
- [ ] Pantalla recuperación contraseña
- [ ] Validaciones de formularios
- [ ] Manejo de errores UI

Backend:
- [ ] Endpoints auth (login/registro)
- [ ] Validación y sanitización
- [ ] JWT/Session management
- [ ] Email de verificación
- [ ] Reset password flow

#### Fase 2: OAuth  
Frontend:
- [ ] Botones OAuth providers
- [ ] Flow de vinculación cuentas
- [ ] UI estados de auth

Backend:
- [ ] Integración Google OAuth
- [ ] Integración Facebook OAuth
- [ ] Manejo de tokens OAuth
- [ ] Vinculación con cuentas existentes

#### Fase 3: Historial y Favoritos
Frontend:
- [ ] Vista historial compras
- [ ] Vista historial descargas
- [ ] UI favoritos y listas
- [ ] Modal crear/editar listas
- [ ] Compartir vía redes

Backend:
- [ ] CRUD historial
- [ ] CRUD favoritos/listas
- [ ] Endpoints compartir
- [ ] Cache de historiales
- [ ] Indexación búsquedas

#### Fase 4: Estadísticas Básicas
Frontend:
- [ ] Dashboard principal
- [ ] Gráficos fotos subidas/vendidas
- [ ] Display % ventas
- [ ] Filtros de fecha

Backend:
- [ ] Agregación métricas básicas
- [ ] Cálculo % ventas
- [ ] Cache de estadísticas
- [ ] Endpoints tiempo real

#### Fase 5: Estadísticas Avanzadas  
Frontend:
- [ ] Gráficos descuentos
- [ ] Vista ingresos detallada
- [ ] Exportar a CSV/PDF
- [ ] Filtros avanzados

Backend:
- [ ] Cálculos financieros
- [ ] Agregación datos avanzada  
- [ ] Generación reportes
- [ ] API exportación

### 4. Gestión Económica
- [ ] Balance de caja (mensual, por fecha)
- [ ] Registro de ingresos/egresos:
  - [ ] Bruto
  - [ ] Neto
  - [ ] Kodaks
- [ ] Reportes financieros
- [ ] Configuraciones:
  - [ ] % de ventas
  - [ ] Horario de cierre
  - [ ] Aceptar/pagar fotógrafos

### 5. Backoffice
- [ ] Edición de:
  - [ ] Logo
  - [ ] Título
  - [ ] Copyright
  - [ ] Redes sociales
  - [ ] Horario de atención

### 6. Extras
- [ ] Recompensas/descuentos por frecuencia
- [ ] Marca de agua con WhatsApp, Instagram y mail
- [ ] Protección DDOS y seguridad en pasarelas

## 🖥️ Vistas y UI

### Comercio
- [ ] Configurar:
  - [ ] Datos generales del local
  - [ ] Logos / nombre / URL / redes
  - [ ] Datos fiscales (factura, CBU, alias)
  - [ ] Pasarelas (MP, PayPal, Transbank)
  - [ ] Multimoneda / idioma

### LOG
- [ ] Métricas de uso y estado (CPU, RAM, disco)
- [ ] Métricas de debug

### Panel (Fotógrafo/Admin)
- [ ] Estadísticas por fotógrafo
- [ ] % de ventas
- [ ] Totales: bruto, kodak, digital, neto
- [ ] Panel por día / álbum / lugar

### Home
- [x] Logo AquaFoto
- [x] Álbumes destacados (corazón, tirolesa, tsunami, etc.)

### Complementos
- [ ] Gestión de productos impresos
- [ ] Crear/comprar complementos

### Cupones
- [ ] Crear cupones de descuento

### Estadísticas (Admin)
- [ ] Selección por fecha
- [ ] Totales: web vs comercio
- [ ] Totales por tipo de foto
- [ ] Estadísticas individuales de fotógrafos

### Pedidos
- [ ] Listado de pedidos
- [ ] Detalle: pago, mail, teléfono, fotos (digitales / impresas)

### Subida de Fotos
- [x] Selección de álbum
- [ ] Fotógrafo
- [x] Tags
- [x] Archivos a subir

### Cajas
- [ ] Reemplazar planilla Excel
- [ ] Exportar PDF
- [ ] Guardar en Drive

### Usuarios y Roles
- [ ] Administrador (acceso total)
- [ ] Vendedor (cajas / pedidos)
- [ ] Fotógrafo (fotos / panel / estadísticas)
- [ ] Cajero (caja / pedidos)
- [ ] Cliente (pedidos personales)

## 🔒 Requisitos No Funcionales
- [ ] Escalabilidad
- [ ] Seguridad (descargas + pagos)
- [x] Rendimiento (carga rápida)
- [x] Accesibilidad (responsive, UX clara)

---

> 💡 **Nota:** Cada funcionalidad deberá incluir tests unitarios/integración antes de marcarse como completada.
