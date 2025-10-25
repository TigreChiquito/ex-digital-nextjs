# 🛒 EX Digital - E-commerce Next.js

Tienda en línea de productos tecnológicos (gaming) desarrollada con Next.js 15, React 19, TypeScript y Tailwind CSS.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Rutas Disponibles](#rutas-disponibles)
- [Sistema de Ofertas](#sistema-de-ofertas)
- [Validaciones del Sistema](#validaciones-del-sistema)
- [Testing](#testing)
- [Licencia](#licencia)

## ✨ Características

### Funcionalidades Principales
- 🛍️ Carrito de compras funcional con Context API
- 🔐 Sistema completo de autenticación (login/registro)
  - Validación de dominios de email permitidos
  - Protección de rutas (redirección automática)
  - Persistencia con localStorage
- 📱 Diseño mobile-first totalmente responsivo
- 🎨 Tema oscuro moderno con Tailwind CSS v4
- 🖼️ Optimización de imágenes (formato AVIF)
- ⚡ Turbopack para desarrollo ultrarrápido (Next.js 15)
- 📝 Sistema de blog con modales interactivos
- 📦 Categorización de productos (Teclados, Mouses, Auriculares)

### Sistema de Ofertas 🔥
- 🌸 **Ofertas de Primavera** con paleta de colores estacional
- 🏷️ Badges dinámicos de descuento en productos
- 💰 Visualización de precio original tachado y ahorro
- 📅 Sistema automático por fechas (activa/desactiva ofertas)
- 🎯 Página dedicada `/ofertas` con filtros y ordenamiento
- 🔍 Filtros por porcentaje de descuento (20%, 30%, 50%+)
- ⏰ Contador de días restantes
- 🎭 Botón condicional en navbar (solo aparece con ofertas activas)

### Proceso de Compra
- 🎲 Sistema de pago con randomización 50/50 (éxito/fallo)
- 🧾 Página de boleta con detalles completos de la compra
- 📊 Estadísticas en tiempo real de productos en oferta
- 🔄 Persistencia de última compra en localStorage

### Testing & Calidad
- ✅ Suite completa de 26 tests E2E con Selenium (100% éxito)
- 🔍 Tests automatizados de autenticación
- 📝 Validación exhaustiva de formularios
- 🚀 Desplegado en producción: [exdigital.vercel.app](https://exdigital.vercel.app)

## 🚀 Tecnologías

- **Framework:** Next.js 15.5.5
- **UI Library:** React 19.1.0
- **Lenguaje:** TypeScript 5
- **Estilos:** Tailwind CSS 4
- **Iconos:** Lucide React
- **Linting:** ESLint 9

## 📁 Estructura del Proyecto

```
ex-digital-nextjs/
├── public/                          # Archivos estáticos
│   └── img/                         # Imágenes del proyecto
│       ├── productos/               # Imágenes de productos
│       ├── carrucel/                # Imágenes del carrusel
│       ├── blog/                    # Imágenes del blog
│       └── utilidades/              # Imágenes varias
│
├── src/                             # Código fuente
│   ├── app/                         # App Router (sistema de rutas)
│   │   ├── layout.tsx               # Layout principal (envuelve toda la app)
│   │   ├── page.tsx                 # Página de inicio (/) - Banner de ofertas
│   │   ├── globals.css              # Estilos globales (Tailwind v4 + animaciones)
│   │   │
│   │   ├── productos/               # Ruta /productos
│   │   │   └── page.tsx             # Catálogo con filtros y búsqueda
│   │   │
│   │   ├── categorias/              # Rutas dinámicas /categorias/:slug
│   │   │   └── [categoria]/         # Filtrado por categoría
│   │   │       └── page.tsx         # Productos por categoría
│   │   │
│   │   ├── ofertas/                 # Ruta /ofertas 🆕
│   │   │   └── page.tsx             # Página dedicada de ofertas de primavera
│   │   │
│   │   ├── nosotros/                # Ruta /nosotros
│   │   │   └── page.tsx             # Información de la empresa
│   │   │
│   │   ├── blog/                    # Ruta /blog
│   │   │   └── page.tsx             # Artículos con modales interactivos
│   │   │
│   │   ├── contacto/                # Ruta /contacto
│   │   │   └── page.tsx             # Formulario de contacto validado
│   │   │
│   │   ├── carrito/                 # Ruta /carrito
│   │   │   └── page.tsx             # Carrito de compras
│   │   │
│   │   ├── checkout/                # Ruta /checkout
│   │   │   └── page.tsx             # Proceso de pago (randomización 50/50)
│   │   │
│   │   ├── boleta/                  # Ruta /boleta 🆕
│   │   │   └── page.tsx             # Recibo de compra exitosa
│   │   │
│   │   ├── login/                   # Ruta /login
│   │   │   └── page.tsx             # Inicio de sesión
│   │   │
│   │   └── registro/                # Ruta /registro
│   │       └── page.tsx             # Registro de usuarios
│   │
│   ├── components/                  # Componentes reutilizables
│   │   ├── Navbar.tsx               # Barra de navegación con dropdown
│   │   ├── Footer.tsx               # Pie de página
│   │   ├── ProductCard.tsx          # Tarjeta de producto con badges de oferta
│   │   ├── ProductModal.tsx         # Modal de detalles del producto
│   │   └── Carousel.tsx             # Carrusel de imágenes
│   │
│   ├── context/                     # Context API (estado global)
│   │   ├── CartContext.tsx          # Carrito + interfaz de ofertas
│   │   └── AuthContext.tsx          # Autenticación
│   │
│   ├── data/                        # Datos estáticos
│   │   └── productos.ts             # Array de productos con ofertas
│   │
│   ├── utils/                       # Utilidades 🆕
│   │   └── categoriasConfig.ts      # Configuración de categorías
│   │
│   └── tests/                       # Tests automatizados
│       ├── test_auth.py             # Suite de 26 tests E2E
│       ├── config.py                # Configuración de tests
│       ├── usuarios_test.csv        # Casos de prueba
│       ├── run_tests.bat            # Script Windows
│       ├── run_tests.sh             # Script Linux/Mac
│       ├── requirements.txt         # Dependencias Python
│       └── README.md                # Documentación de tests
│
├── .gitignore                       # Archivos ignorados por Git
├── package.json                     # Dependencias y scripts
├── package-lock.json                # Lock de dependencias
├── tsconfig.json                    # Configuración TypeScript
├── tailwind.config.ts               # Configuración Tailwind CSS
├── postcss.config.mjs               # Configuración PostCSS
├── next.config.ts                   # Configuración Next.js
├── eslint.config.mjs                # Configuración ESLint
└── README.md                        # Este archivo
```

## 📝 Explicación Detallada

### 1. **`public/`** - Archivos Públicos
Contiene todos los archivos estáticos accesibles directamente desde el navegador.
- **`img/`**: Todas las imágenes del proyecto (productos, carrusel, blog, etc.)
- Se accede con rutas como `/img/productos/producto1.avif`

### 2. **`src/app/`** - App Router
Sistema de enrutamiento basado en carpetas de Next.js 15.
- Cada carpeta representa una ruta
- `page.tsx` define el contenido de cada ruta
- `layout.tsx` envuelve todas las páginas con componentes comunes (Navbar, Footer)
- **Protección de rutas:** `/login` y `/registro` redirigen automáticamente si hay sesión activa
- **Rutas dinámicas:** `/categorias/[categoria]` para filtrar productos por categoría
- **Nuevas rutas:**
  - `/ofertas` - Página dedicada de ofertas con filtros y ordenamiento
  - `/boleta` - Recibo de compra exitosa con detalles completos

### 3. **`src/components/`** - Componentes Reutilizables
Componentes de React que se usan en múltiples páginas:
- **Navbar**: Navegación con dropdown de categorías (desktop hover, mobile desplegable)
- **Footer**: Pie de página con información de contacto
- **ProductCard**: Tarjeta con badges de oferta, precios tachados y descuentos
- **ProductModal**: Modal para seleccionar cantidad antes de agregar al carrito
- **Carousel**: Carrusel de imágenes destacadas en página principal

### 4. **`src/context/`** - Estado Global
Manejo del estado global con Context API:
- **CartContext**: 
  - Gestiona productos en el carrito
  - Define interfaz `Producto` con soporte para ofertas
  - Propiedades de oferta: activa, precioOriginal, descuento, fechas, etiqueta
- **AuthContext**: Maneja autenticación con localStorage

### 5. **`src/data/`** - Datos Estáticos
- **productos.ts**: Array con 15 productos (8 teclados, 5 auriculares, 2 mouses)
  - Incluye productos con ofertas activas
  - Estructura: nombre, precio, categoría, imágenes (img, img2, img3), descripción, oferta opcional

### 6. **`src/utils/`** - Utilidades
- **categoriasConfig.ts**: Configuración de categorías (nombre, slug, icono, descripción)

### 7. **`src/tests/`** - Tests Automatizados
Suite completa de pruebas E2E con Selenium:
- **test_auth.py**: Suite principal con 26 tests de autenticación
- **config.py**: Configuración centralizada (URL, timeouts)
- **usuarios_test.csv**: 26 casos de prueba (15 registro + 11 login)
- **run_tests.bat**: Script de ejecución para Windows
- **run_tests.sh**: Script de ejecución para Linux/Mac
- **requirements.txt**: Dependencias Python (selenium, webdriver-manager)

## 🔧 Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/TigreChiquito/ex-digital-nextjs.git
cd ex-digital-nextjs
```

2. **Instalar dependencias:**
```bash
npm install
```

## 🎮 Uso

### Modo Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción
```bash
npm run build
```

### Iniciar Producción
```bash
npm start
```

### Linting
```bash
npm run lint
```

## 🗺️ Rutas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con carrusel, banner de ofertas y productos destacados |
| `/productos` | Catálogo completo con filtros por categoría y búsqueda por nombre |
| `/categorias/teclados` | Productos de la categoría Teclados |
| `/categorias/mouses` | Productos de la categoría Mouses |
| `/categorias/auriculares` | Productos de la categoría Auriculares |
| `/ofertas` 🆕 | Página dedicada de ofertas de primavera con filtros y ordenamiento |
| `/nosotros` | Información sobre la empresa, misión y valores |
| `/blog` | Artículos con modales interactivos y contenido HTML enriquecido |
| `/contacto` | Formulario de contacto con validación y auto-completado |
| `/carrito` | Carrito de compras con gestión de productos y totales |
| `/checkout` | Proceso de pago con randomización 50/50 (éxito/fallo) |
| `/boleta` 🆕 | Recibo de compra exitosa con detalles completos |
| `/login` | Inicio de sesión con validación de credenciales |
| `/registro` | Registro de nuevos usuarios (dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com) |

## 🎁 Sistema de Ofertas

### Características del Sistema
- **🌸 Tema Primaveral**: Paleta de colores rosa, rosa claro, naranja y amarillo
- **📅 Automatización por Fechas**: Las ofertas se activan/desactivan automáticamente según el rango de fechas
- **🏷️ Badges Dinámicos**: Los productos con oferta muestran:
  - Badge de descuento (-X%) con animación pulse
  - Etiqueta personalizable ("Oferta de Primavera")
  - Precio original tachado
  - Precio actual destacado con gradiente
  - Ahorro total calculado
- **🎨 Estilo Visual**:
  - Borde rosa brillante en cards con oferta
  - Botones con gradiente rosa para productos en oferta
  - Sombras y efectos hover mejorados
  - Botón condicional en navbar (solo visible con ofertas activas)

### Página de Ofertas (`/ofertas`)
#### Funcionalidades:
- ✅ **Filtros por descuento**: 20%, 30%, 50% o más
- ✅ **Ordenamiento múltiple**:
  - Por mayor/menor descuento
  - Por precio (más bajo/alto)
- ✅ **Estadísticas en tiempo real**:
  - Total de productos en oferta
  - Descuento máximo disponible
  - Días restantes de las ofertas
- ✅ **Contador de días**: Muestra tiempo restante con animación
- ✅ **Diseño responsive**: Grid adaptativo (1 col mobile, 4 cols desktop)
- ✅ **Banner promocional**: En página principal cuando hay ofertas activas

### Estructura de Oferta en Productos
```typescript
oferta?: {
  activa: boolean;           // Control manual de activación
  precioOriginal: number;    // Precio antes del descuento
  descuento: number;         // Porcentaje de descuento (ej: 25, 30)
  fechaInicio: string;       // Fecha inicio formato "YYYY-MM-DD"
  fechaFin: string;          // Fecha fin formato "YYYY-MM-DD"
  etiqueta?: string;         // Texto personalizado (ej: "Oferta de Primavera")
}
```

### Productos con Ofertas Activas (Octubre-Noviembre 2025)
- **CA-9011379** (Auriculares): 25% OFF - $10.000 → $7.500
- **G213** (Teclado): 30% OFF - $15.000 → $10.500
- **VIRTUOSO MAX** (Auriculares): 30% OFF - $11.500 → $8.050

## 🔒 Validaciones del Sistema

### Registro de Usuarios
- ✅ Nombre completo requerido (mínimo 3 caracteres)
- ✅ Email con dominios válidos: `@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`
- ✅ Contraseña mínima de 6 caracteres
- ✅ Confirmación de contraseña (deben coincidir)
- ✅ Verificación de email no duplicado
- ✅ Redirección automática a `/` si ya hay sesión activa

### Login de Usuarios
- ✅ Validación de email registrado
- ✅ Verificación de contraseña correcta
- ✅ Redirección automática a `/` si ya hay sesión activa
- ✅ Persistencia de sesión en localStorage

### Formulario de Contacto
- ✅ Todos los campos requeridos
- ✅ Validación de formato de email
- ✅ Mensaje mínimo 10 caracteres
- ✅ Mensaje máximo 500 caracteres
- ✅ Auto-completado para usuarios logueados (nombre y email)

### Proceso de Checkout
- ✅ Validación de carrito no vacío
- ✅ Campos requeridos: nombre, dirección, ciudad, región, email, teléfono
- ✅ Validación de formato de email y teléfono
- ✅ Sistema de pago con randomización 50/50:
  - ✅ **Éxito**: Guarda compra, vacía carrito, redirige a `/boleta`
  - ❌ **Fallo**: Muestra error, mantiene productos en carrito
- ✅ Prevención de bucles infinitos con flag `pagoExitoso`

### Sistema de Ofertas
- ✅ Verificación automática de fechas (fecha inicio ≤ hoy ≤ fecha fin)
- ✅ Verificación de flag `activa === true`
- ✅ Botón de ofertas en navbar solo visible con ofertas activas
- ✅ Banner promocional en home solo con ofertas activas
- ✅ Cálculo automático de ahorro y descuentos

## 🧪 Testing

El proyecto incluye una suite completa de **26 tests automatizados E2E** con Selenium para validar el sistema de autenticación.

### Ejecutar Tests

```bash
# Windows
cd src/tests
.\run_tests.bat

# Linux/Mac
cd src/tests
./run_tests.sh
```

**Opción 2: Ejecución Manual**
```bash
cd src/tests
python test_auth.py
```

### Configuración de Tests

Los tests están configurados para ejecutarse contra **producción**:
```
URL: https://exdigital.vercel.app
```

Para testear en desarrollo local (`http://localhost:3000`), edita `config.py`:
```python
BASE_URL = "http://localhost:3000"
```

### Suite de Tests (26 casos de prueba)

#### Tests de Registro (15 casos)
- ✅ Registro válido con `@duoc.cl`
- ✅ Registro válido con `@profesor.duoc.cl`
- ✅ Registro válido con `@gmail.com`
- ❌ Dominios no permitidos (`@hotmail.com`, `@yahoo.com`)
- ❌ Contraseña muy corta (< 6 caracteres)
- ❌ Contraseñas no coinciden
- ❌ Email sin formato válido
- ❌ Campos vacíos
- ❌ Usuario ya registrado

#### Tests de Login (11 casos)
- ✅ Login con credenciales correctas (5 usuarios)
- ❌ Usuario no registrado
- ❌ Contraseña incorrecta
- ❌ Email sin formato válido
- ❌ Campos vacíos
- ❌ Case sensitivity en email

### Estructura de Tests
```
src/tests/
├── test_auth.py           # Suite principal de 26 tests
├── config.py              # Configuración (URL, timeouts, delays)
├── usuarios_test.csv      # Datos de prueba
├── requirements.txt       # selenium>=4.15.0, webdriver-manager>=4.0.0
├── run_tests.bat          # Script de ejecución Windows
├── run_tests.sh           # Script de ejecución Linux/Mac
├── README.md              # Documentación detallada
└── CHANGELOG_TESTS.md     # Historial de cambios
```

### Resultado Esperado
```
============================================================
RESUMEN DE TESTS
============================================================
Total de tests: 26
[OK] Exitosos: 26
[ERROR] Fallidos: 0
Porcentaje de éxito: 100.0%
============================================================
```

### Características de los Tests
- 🔄 Limpieza automática de localStorage entre tests
- 🔐 Cierre de sesión mediante UI antes de cada test
- ⏱️ Timeouts y esperas explícitas configurables
- 📊 CSV con casos de prueba fácilmente extensibles
- 🎯 Validación de redirecciones y protección de rutas
- 📝 Logs detallados de cada operación

Para más información sobre los tests, consulta [src/tests/README.md](src/tests/README.md)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
