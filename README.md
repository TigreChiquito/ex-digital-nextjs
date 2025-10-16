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
│   │   ├── globals.css              # Estilos globales
│   │   │
│   │   ├── productos/               # Ruta /productos
│   │   │   └── page.tsx
│   │   │
│   │   ├── nosotros/                # Ruta /nosotros
│   │   │   └── page.tsx
│   │   │
│   │   ├── blog/                    # Ruta /blog
│   │   │   └── page.tsx
│   │   │
│   │   ├── contacto/                # Ruta /contacto
│   │   │   └── page.tsx
│   │   │
│   │   ├── carrito/                 # Ruta /carrito
│   │   │   └── page.tsx
│   │   │
│   │   ├── login/                   # Ruta /login
│   │   │   └── page.tsx
│   │   │
│   │   └── registro/                # Ruta /registro
│   │       └── page.tsx
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
│   └── data/                        # Datos estáticos
│       └── productos.ts             # Array de productos
│
├── .gitignore                       # Archivos ignorados por Git
├── package.json                     # Dependencias y scripts
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
| `/` | Página de inicio con productos destacados |
| `/productos` | Catálogo completo de productos |
| `/nosotros` | Información sobre la empresa |
| `/blog` | Artículos y noticias |
| `/contacto` | Formulario de contacto |
| `/carrito` | Carrito de compras |
| `/login` | Inicio de sesión |
| `/registro` | Registro de nuevos usuarios |

## 🌐 Despliegue

### Despliegue en Vercel (Recomendado)

1. Sube tu repositorio a GitHub
2. Importa tu proyecto en [Vercel](https://vercel.com/new)
3. Vercel detectará automáticamente Next.js y configurará el build
4. ¡Listo! Tu sitio estará en línea

### Otras Opciones
- **Netlify**: Soporte completo para Next.js
- **Railway**: Despliegue sencillo con soporte SSR
- **AWS Amplify**: Solución escalable de Amazon

## 📚 Recursos de Aprendizaje

- [Documentación de Next.js](https://nextjs.org/docs)
- [Tutorial Interactivo de Next.js](https://nextjs.org/learn)
- [Documentación de React](https://react.dev)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 👨‍💻 Desarrollo

Este proyecto utiliza:
- **Turbopack**: Para builds más rápidos en desarrollo
- **ESLint**: Para mantener código consistente
- **TypeScript**: Para prevenir errores con tipado estático

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

Desarrollado con ❤️ usando Next.js
