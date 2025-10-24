# 🛒 EX Digital - E-commerce Next.js

Tienda en línea de productos tecnológicos desarrollada con Next.js 15, React 19, TypeScript y Tailwind CSS.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Rutas Disponibles](#rutas-disponibles)
- [Validaciones del Sistema](#validaciones-del-sistema)
- [Testing](#testing)
- [Licencia](#licencia)

## ✨ Características

- Diseño moderno y responsivo con Tailwind CSS v4
- Carrito de compras funcional con Context API
- Sistema completo de autenticación (login/registro)
  - Validación de dominios de email permitidos
  - Protección de rutas (redirección automática)
  - Persistencia con localStorage
- Diseño mobile-first totalmente responsivo
- Optimización con Turbopack (Next.js 15)
- Gestión optimizada de imágenes (formato AVIF)
- Tipado estático con TypeScript
- Enrutamiento basado en carpetas (App Router)
- Suite completa de 26 tests E2E con Selenium (100% éxito)
- Desplegado en producción: [exdigital.vercel.app](https://exdigital.vercel.app)

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
│   │   ├── page.tsx                 # Página de inicio (/)
│   │   ├── globals.css              # Estilos globales (Tailwind v4)
│   │   │
│   │   ├── productos/               # Ruta /productos
│   │   │   └── page.tsx             # Catálogo de productos con filtros
│   │   │
│   │   ├── nosotros/                # Ruta /nosotros
│   │   │   └── page.tsx             # Información de la empresa
│   │   │
│   │   ├── blog/                    # Ruta /blog
│   │   │   └── page.tsx             # Artículos y novedades
│   │   │
│   │   ├── contacto/                # Ruta /contacto
│   │   │   └── page.tsx             # Formulario de contacto
│   │   │
│   │   ├── carrito/                 # Ruta /carrito
│   │   │   └── page.tsx             # Carrito de compras
│   │   │
│   │   ├── checkout/                # Ruta /checkout
│   │   │   └── page.tsx             # Proceso de pago
│   │   │
│   │   ├── login/                   # Ruta /login
│   │   │   └── page.tsx             # Inicio de sesión
│   │   │
│   │   └── registro/                # Ruta /registro
│   │       └── page.tsx             # Registro de usuarios
│   │
│   ├── components/                  # Componentes reutilizables
│   │   ├── Navbar.tsx               # Barra de navegación
│   │   ├── Footer.tsx               # Pie de página
│   │   ├── ProductCard.tsx          # Tarjeta de producto
│   │   ├── ProductModal.tsx         # Modal de producto
│   │   └── Carousel.tsx             # Carrusel de imágenes
│   │
│   ├── context/                     # Context API (estado global)
│   │   ├── CartContext.tsx          # Manejo del carrito de compras
│   │   └── AuthContext.tsx          # Manejo de autenticación
│   │
│   ├── data/                        # Datos estáticos
│   │   └── productos.ts             # Array de productos
│   │
│   └── tests/                       # Tests automatizados
│       ├── testSelenium.py          # Tests E2E con Selenium
│       ├── run_tests.py             # Script para ejecutar tests
│       └── usuarios_test.csv        # Datos de prueba (usuarios)
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

### 3. **`src/components/`** - Componentes Reutilizables
Componentes de React que se usan en múltiples páginas:
- **Navbar**: Navegación principal con enlaces, carrito y autenticación
- **Footer**: Pie de página con información de contacto
- **ProductCard**: Tarjeta individual de producto
- **ProductModal**: Modal para ver detalles del producto
- **Carousel**: Carrusel de imágenes destacadas

### 4. **`src/context/`** - Estado Global
Manejo del estado global con Context API:
- **CartContext**: Gestiona productos en el carrito, agregar/eliminar items
- **AuthContext**: Maneja el estado de autenticación del usuario (localStorage)

### 5. **`src/data/`** - Datos Estáticos
- **productos.ts**: Array con información de todos los productos (nombre, precio, imagen, descripción)

### 6. **`src/tests/`** - Tests Automatizados
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
| `/` | Página de inicio con productos destacados y carrusel |
| `/productos` | Catálogo completo de productos con filtros y búsqueda |
| `/nosotros` | Información sobre la empresa y valores |
| `/blog` | Artículos y novedades principales |
| `/contacto` | Formulario de contacto con validación |
| `/carrito` | Carrito de compras con gestión de productos |
| `/checkout` | Proceso de pago y finalización de compra |
| `/login` | Inicio de sesión de usuarios registrados |
| `/registro` | Registro de nuevos usuarios (dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com) |

## 🔒 Validaciones del Sistema

### Registro de Usuarios
- ✅ Nombre completo requerido
- ✅ Email con dominios válidos: `@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`
- ✅ Contraseña mínima de 6 caracteres
- ✅ Confirmación de contraseña
- ✅ Verificación de email no duplicado

### Formulario de Contacto
- ✅ Todos los campos requeridos
- ✅ Validación de formato de email
- ✅ Mensaje mínimo 10 caracteres
- ✅ Mensaje máximo 500 caracteres
- ✅ Auto-completado para usuarios logueados

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
