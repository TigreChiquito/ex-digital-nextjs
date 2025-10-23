// 📍 UBICACIÓN: src/utils/categoriasConfig.ts

// Este archivo contiene la configuración de cada categoría:
// - Nombre, slug (URL), descripción
// - Colores y gradientes para el diseño
// - Features (características) que se muestran en el Hero

export interface CategoriaConfig {
    nombre: string;           // Nombre completo: "Auriculares"
    slug: string;             // Para la URL: "auriculares"
    descripcion: string;      // Descripción corta
    icon: string;             // Emoji del ícono
    color: string;            // Color principal
    gradientFrom: string;     // Inicio del gradiente Tailwind
    gradientTo: string;       // Fin del gradiente Tailwind
    features: string[];       // Lista de características destacadas
}

// Configuración de las 3 categorías
export const categoriasConfig: Record<string, CategoriaConfig> = {
    // CATEGORÍA 1: Auriculares
    'Auriculares': {
        nombre: 'Auriculares',
        slug: 'auriculares',                    // URL: /categorias/auriculares
        descripcion: 'Audio premium para gaming',
        icon: '🎧',
        color: 'purple',
        gradientFrom: 'from-purple-600',        // Gradiente púrpura a rosa
        gradientTo: 'to-pink-600',
        features: [
            'Sonido envolvente 7.1',
            'Cancelación de ruido',
            'Micrófono HD',
            'Comodidad extrema'
        ]
    },

    // CATEGORÍA 2: Teclados
    'Teclados': {
        nombre: 'Teclados',
        slug: 'teclados',                       // URL: /categorias/teclados
        descripcion: 'Precisión en cada pulsación',
        icon: '⌨️',
        color: 'orange',
        gradientFrom: 'from-orange-600',        // Gradiente naranja a rojo
        gradientTo: 'to-red-600',
        features: [
            'Switches mecánicos',
            'RGB personalizable',
            'Anti-ghosting',
            'Respuesta 1ms'
        ]
    },

    // CATEGORÍA 3: Mouses
    'Mouses': {
        nombre: 'Mouses',
        slug: 'mouses',                         // URL: /categorias/mouses
        descripcion: 'Control absoluto y precisión',
        icon: '🖱️',
        color: 'teal',
        gradientFrom: 'from-teal-600',          // Gradiente teal a cyan
        gradientTo: 'to-cyan-600',
        features: [
            'Sensor 30K DPI',
            'Ergonómico',
            'Botones programables',
            'RGB dinámico'
        ]
    }
};

// FUNCIONES HELPER (ayudantes)

// Obtener configuración por slug (URL)
// Ejemplo: getConfigBySlug('teclados') → Devuelve config de Teclados
export const getConfigBySlug = (slug: string): CategoriaConfig | null => {
    return Object.values(categoriasConfig).find(c => c.slug === slug) || null;
};

// Obtener configuración por nombre de categoría
// Ejemplo: getConfigByNombre('Auriculares') → Devuelve config de Auriculares
export const getConfigByNombre = (nombre: string): CategoriaConfig | null => {
    return categoriasConfig[nombre] || null;
};