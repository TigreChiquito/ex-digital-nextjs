# 🛒 EX Digital - E-commerce Next.js

Tienda en línea de productos tecnológicos desarrollada con Next.js 15, React 19, TypeScript y Tailwind CSS.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Rutas Disponibles](#rutas-disponibles)
- [Despliegue](#despliegue)

## ✨ Características

- 🎨 Diseño moderno y responsivo con Tailwind CSS
- 🛍️ Carrito de compras funcional con Context API
- 🔐 Sistema de autenticación (login/registro)
- 📱 Diseño mobile-first
- ⚡ Optimización con Turbopack
- 🖼️ Gestión optimizada de imágenes
- 🎯 Tipado estático con TypeScript
- 🔄 Enrutamiento basado en carpetas (App Router)

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

### 3. **`src/components/`** - Componentes Reutilizables
Componentes de React que se usan en múltiples páginas:
- **Navbar**: Navegación principal con enlaces y carrito
- **Footer**: Pie de página con información de contacto
- **ProductCard**: Tarjeta individual de producto
- **ProductModal**: Modal para ver detalles del producto
- **Carousel**: Carrusel de imágenes destacadas

### 4. **`src/context/`** - Estado Global
Manejo del estado global con Context API:
- **CartContext**: Gestiona productos en el carrito, agregar/eliminar items
- **AuthContext**: Maneja el estado de autenticación del usuario

### 5. **`src/data/`** - Datos Estáticos
- **productos.ts**: Array con información de todos los productos (nombre, precio, imagen, descripción)

### 6. **`src/tests/`** - Tests Automatizados
Suite de pruebas para validar funcionalidad:
- **testSelenium.py**: Tests end-to-end con Selenium WebDriver
  - Test de registro de usuario
  - Test de inicio de sesión
- **run_tests.py**: Script para ejecutar todos los tests de forma secuencial
- **usuarios_test.csv**: Conjunto de datos de prueba con casos de éxito y fallo

## 🧪 Testing

### Ejecutar Tests de Selenium

**Requisitos previos:**
```bash
pip install selenium
```

**Ejecutar test individual:**
```bash
python src/tests/testSelenium.py
```

**Ejecutar todos los tests:**
```bash
python src/tests/run_tests.py
```

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

