// 📍 UBICACIÓN: src/app/categorias/[categoria]/page.tsx

// PÁGINA DINÁMICA que se renderiza según la categoría en la URL
// Ejemplo: /categorias/teclados → params.categoria = 'teclados'

'use client';

import { useState, useMemo, use } from 'react';
import { Search, SlidersHorizontal, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/context/CartContext';
import { productos } from '@/data/productos';
import { Producto } from '@/context/CartContext';
import { getConfigBySlug } from '@/utils/categoriasConfig';

// Importar los 3 componentes Hero
import AuricularesHero from './_components/AuricularesHero';
import TecladosHero from './_components/TecladosHero';
import MousesHero from './_components/MousesHero';

// Tipo para el ordenamiento
type TipoOrdenamiento = '' | 'menor' | 'mayor' | 'nombre';

export default function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
    // 1️⃣ Obtener el slug de la URL (ej: 'teclados')
    const { categoria } = use(params);
    
    // 2️⃣ Buscar la configuración de esa categoría
    const config = getConfigBySlug(categoria);

    // 3️⃣ Si no existe la categoría, mostrar 404
    if (!config) {
        notFound(); // Redirige a not-found.tsx
    }

    // 4️⃣ Seleccionar el Hero correcto según la categoría
    const HeroComponents: Record<string, React.ComponentType> = {
        'auriculares': AuricularesHero,  // URL: /categorias/auriculares → Hero Púrpura
        'teclados': TecladosHero,        // URL: /categorias/teclados → Hero Naranja
        'mouses': MousesHero,            // URL: /categorias/mouses → Hero Teal
    };

    const HeroComponent = HeroComponents[categoria];

    // 5️⃣ Estados para el modal y carrito
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { agregarAlCarrito } = useCart();

    // 6️⃣ FILTRAR productos solo de esta categoría
    // Ejemplo: Si estamos en /categorias/teclados, solo muestra productos con categoria: "Teclados"
    const productosCategoria = productos.filter(p => p.categoria === config.nombre);

    // 7️⃣ Calcular precios mín/máx de los productos de esta categoría
    const precioMinProducto = useMemo(() => 
        Math.min(...productosCategoria.map(p => p.precio)), 
        [productosCategoria]
    );
    const precioMaxProducto = useMemo(() => 
        Math.max(...productosCategoria.map(p => p.precio)), 
        [productosCategoria]
    );

    // 8️⃣ Estados para filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [precioMin, setPrecioMin] = useState(precioMinProducto);
    const [precioMax, setPrecioMax] = useState(precioMaxProducto);
    const [ordenamiento, setOrdenamiento] = useState<TipoOrdenamiento>('');
    const [showFilters, setShowFilters] = useState(false);

    // 9️⃣ Handlers (funciones que manejan eventos)
    const handleAgregarClick = (producto: Producto) => {
        setSelectedProduct(producto);
        setIsModalOpen(true);
    };

    const handleConfirmarAgregar = (producto: Producto, cantidad: number) => {
        agregarAlCarrito(producto, cantidad);

        // Mostrar notificación temporal
        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-up flex items-center space-x-3 border border-teal-500';
        notification.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div>
                <p class="font-bold">${producto.nombre}</p>
                <p class="text-sm opacity-90">Agregado al carrito (x${cantidad})</p>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    };

    // 🔟 Lógica de filtrado
    const productosFiltrados = productosCategoria.filter(producto => {
        const cumpleNombre = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const cumplePrecio = producto.precio >= precioMin && producto.precio <= precioMax;
        return cumpleNombre && cumplePrecio;
    });

    // 1️⃣1️⃣ Lógica de ordenamiento
    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
        if (ordenamiento === 'menor') return a.precio - b.precio;
        if (ordenamiento === 'mayor') return b.precio - a.precio;
        if (ordenamiento === 'nombre') return a.nombre.localeCompare(b.nombre);
        return 0;
    });

    // 1️⃣2️⃣ Limpiar filtros
    const limpiarFiltros = () => {
        setSearchTerm('');
        setPrecioMin(precioMinProducto);
        setPrecioMax(precioMaxProducto);
        setOrdenamiento('');
    };

    const hayFiltrosActivos = searchTerm ||
        precioMin !== precioMinProducto ||
        precioMax !== precioMaxProducto ||
        ordenamiento;

    // 1️⃣3️⃣ RENDERIZADO (lo que se muestra en pantalla)
    return (
        <div className="min-h-screen">
            {/* Breadcrumb: Volver a productos */}
            <div className="container mx-auto max-w-7xl px-4 pt-8">
                <Link 
                    href="/productos" 
                    className="inline-flex items-center text-stone-400 hover:text-orange-400 transition-colors space-x-2 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver a todos los productos</span>
                </Link>
            </div>

            {/* Hero dinámico (cambia según categoría) */}
            {HeroComponent && <HeroComponent />}

            <div className="container mx-auto max-w-7xl px-4 py-12">
                {/* Barra de búsqueda y filtros (igual que en /productos) */}
                <div className="mb-8">
                    <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-stone-800 shadow-xl">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Búsqueda */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={`Buscar ${config.nombre.toLowerCase()}...`}
                                    className="w-full pl-12 pr-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all"
                                />
                            </div>

                            {/* Botón filtros mobile */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden bg-stone-800 hover:bg-stone-700 text-stone-300 px-6 py-3 rounded-2xl font-bold transition-all border-2 border-stone-700 hover:border-orange-600 flex items-center justify-center space-x-2"
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                                <span>Filtros</span>
                            </button>
                        </div>

                        {/* Panel de filtros */}
                        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-6 pt-6 border-t-2 border-stone-800`}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Sliders de precio */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-stone-300 mb-3 uppercase tracking-wide">
                                        Rango de Precio
                                    </label>
                                    <div className="flex items-center justify-between mb-4 text-stone-300">
                                        <span className="bg-stone-800 px-4 py-2 rounded-xl border-2 border-stone-700 font-bold">
                                            ${precioMin.toLocaleString('es-CL')}
                                        </span>
                                        <span className="text-stone-500">—</span>
                                        <span className="bg-stone-800 px-4 py-2 rounded-xl border-2 border-stone-700 font-bold">
                                            ${precioMax.toLocaleString('es-CL')}
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        <input
                                            type="range"
                                            min={precioMinProducto}
                                            max={precioMaxProducto}
                                            step="500"
                                            value={precioMin}
                                            onChange={(e) => setPrecioMin(Math.min(Number(e.target.value), precioMax - 500))}
                                            className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer slider-orange"
                                        />
                                        <input
                                            type="range"
                                            min={precioMinProducto}
                                            max={precioMaxProducto}
                                            step="500"
                                            value={precioMax}
                                            onChange={(e) => setPrecioMax(Math.max(Number(e.target.value), precioMin + 500))}
                                            className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer slider-teal"
                                        />
                                    </div>
                                </div>

                                {/* Ordenamiento */}
                                <div>
                                    <label className="block text-sm font-bold text-stone-300 mb-3 uppercase tracking-wide">
                                        Ordenar Por
                                    </label>
                                    <select
                                        value={ordenamiento}
                                        onChange={(e) => setOrdenamiento(e.target.value as TipoOrdenamiento)}
                                        className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all"
                                    >
                                        <option value="">Sin ordenar</option>
                                        <option value="menor">Precio: Menor a Mayor</option>
                                        <option value="mayor">Precio: Mayor a Menor</option>
                                        <option value="nombre">Nombre: A-Z</option>
                                    </select>

                                    {/* Botón limpiar filtros */}
                                    <button
                                        onClick={limpiarFiltros}
                                        disabled={!hayFiltrosActivos}
                                        className="w-full mt-4 bg-red-900/50 hover:bg-red-800/70 disabled:bg-stone-800 disabled:cursor-not-allowed text-red-400 disabled:text-stone-600 px-6 py-3 rounded-2xl font-bold transition-all border-2 border-red-800 disabled:border-stone-700 flex items-center justify-center space-x-2"
                                    >
                                        <X className="w-5 h-5" />
                                        <span>Limpiar Filtros</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contador de resultados */}
                <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
                    <p className="text-stone-400">
                        Mostrando <span className="text-orange-400 font-bold">{productosOrdenados.length}</span> de{' '}
                        <span className="text-stone-300 font-bold">{productosCategoria.length}</span> productos
                    </p>
                    {hayFiltrosActivos && (
                        <div className="bg-orange-900/30 border border-orange-700/50 text-orange-400 px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2">
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>Filtros activos</span>
                        </div>
                    )}
                </div>

                {/* Grid de productos */}
                {productosOrdenados.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {productosOrdenados.map((producto, index) => (
                            <ProductCard
                                key={index}
                                producto={producto}
                                onAgregar={handleAgregarClick}
                            />
                        ))}
                    </div>
                ) : (
                    // Mensaje cuando no hay resultados
                    <div className="text-center py-20">
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-12 border-2 border-stone-800 shadow-2xl max-w-md mx-auto">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-stone-100 mb-4">
                                No se encontraron productos
                            </h3>
                            <p className="text-stone-400 mb-6">
                                Intenta ajustar los filtros o realizar una búsqueda diferente
                            </p>
                            <button
                                onClick={limpiarFiltros}
                                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de producto */}
            <ProductModal
                producto={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmarAgregar}
            />
        </div>
    );
}