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
- [ ] Filtros y búsqueda por categorías
- [ ] Visor de imágenes en alta calidad
- [ ] Preview de versiones reducidas
- [ ] Selector de mejoras:
  - [ ] Marcos
  - [ ] Álbum
  - [ ] Tamaños
- [ ] Indicadores de tipo (digital/Kodak)

### 2. Compra y Descarga
- [ ] Carrito de compras con selección múltiple
- [ ] Integración de pagos: Mercado Pago / Stripe / PayPal
- [ ] Descarga de imágenes tras compra
- [ ] Control de licencias
- [ ] Envío de fotografías físicas
- [ ] Mail con factura e imágenes
  - [ ] Validación de pasos: enviado > recibido > abierto

### 3. Perfil de Fotógrafos
- [ ] Registro/login con OAuth y credenciales tradicionales
- [ ] Historial de compras y descargas
- [ ] Favoritos y listas personalizadas
- [ ] Panel de estadísticas:
  - [ ] Fotos subidas / vendidas
  - [ ] % de ventas
  - [ ] Descuento promedio
  - [ ] Totales (bruto, neto, kodaks)

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
- [ ] Logo AquaFoto
- [ ] Álbumes destacados (corazón, tirolesa, tsunami, etc.)

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
- [ ] Selección de álbum
- [ ] Fotógrafo
- [ ] Tags
- [ ] Archivos a subir

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
- [ ] Rendimiento (carga rápida)
- [ ] Accesibilidad (responsive, UX clara)

---

> 💡 **Nota:** Cada funcionalidad deberá incluir tests unitarios/integración antes de marcarse como completada.
