'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, Tag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/context/CartContext';
import { productos, categorias } from '@/data/productos';
import { Producto } from '@/context/CartContext';

export default function ProductosPage() {
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { agregarAlCarrito } = useCart();

    // Calcular precio mínimo y máximo de todos los productos
    const precioMinProducto = useMemo(() => Math.min(...productos.map(p => p.precio)), []);
    const precioMaxProducto = useMemo(() => Math.max(...productos.map(p => p.precio)), []);

    // Estados para filtros y búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [precioMin, setPrecioMin] = useState(precioMinProducto);
    const [precioMax, setPrecioMax] = useState(precioMaxProducto);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('');
    const [ordenamiento, setOrdenamiento] = useState<'menor' | 'mayor' | 'nombre' | ''>('');
    const [showFilters, setShowFilters] = useState(false);

    const handleAgregarClick = (producto: Producto) => {
        setSelectedProduct(producto);
        setIsModalOpen(true);
    };

    const handleConfirmarAgregar = (producto: Producto, cantidad: number) => {
        agregarAlCarrito(producto, cantidad);

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

    // Filtrar productos
    const productosFiltrados = productos.filter(producto => {
        const cumpleNombre = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

        const cumplePrecio = producto.precio >= precioMin && producto.precio <= precioMax;

        const cumpleCategoria = categoriaSeleccionada === '' || producto.categoria === categoriaSeleccionada;

        return cumpleNombre && cumplePrecio && cumpleCategoria;
    });

    // Ordenar productos
    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
        if (ordenamiento === 'menor') return a.precio - b.precio;
        if (ordenamiento === 'mayor') return b.precio - a.precio;
        if (ordenamiento === 'nombre') return a.nombre.localeCompare(b.nombre);
        return 0;
    });

    const limpiarFiltros = () => {
        setSearchTerm('');
        setPrecioMin(precioMinProducto);
        setPrecioMax(precioMaxProducto);
        setCategoriaSeleccionada('');
        setOrdenamiento('');
    };

    const hayFiltrosActivos = searchTerm ||
        precioMin !== precioMinProducto ||
        precioMax !== precioMaxProducto ||
        categoriaSeleccionada ||
        ordenamiento;

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                        <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-teal-400 bg-clip-text text-transparent">
                            Nuestros Productos
                        </span>
                    </h1>
                    <p className="text-stone-400 text-xl md:text-2xl">
                        Encuentra el equipo perfecto para tu setup
                    </p>
                </div>

                {/* Barra de búsqueda y filtros */}
                <div className="mb-8 animate-slide-up">
                    <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-stone-800 shadow-xl">
                        <div className="flex flex-col lg:flex-row gap-4">
                            {/* Búsqueda */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar productos..."
                                    className="w-full pl-12 pr-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all"
                                />
                            </div>

                            {/* Botón de filtros (mobile) */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden bg-stone-800 hover:bg-stone-700 text-stone-300 px-6 py-3 rounded-2xl font-bold transition-all border-2 border-stone-700 hover:border-orange-600 flex items-center justify-center space-x-2"
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                                <span>Filtros</span>
                            </button>
                        </div>

                        {/* Filtros (siempre visible en desktop, toggle en mobile) */}
                        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-6 pt-6 border-t-2 border-stone-800`}>
                            {/* Categorías */}
                            <div className="mb-6">
                                <label className="text-sm font-bold text-stone-300 mb-3 uppercase tracking-wide flex items-center space-x-2">
                                    <Tag className="w-4 h-4" />
                                    <span>Categoría</span>
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setCategoriaSeleccionada('')}
                                        className={`px-5 py-2 rounded-xl font-bold transition-all ${categoriaSeleccionada === ''
                                                ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg'
                                                : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border-2 border-stone-700'
                                            }`}
                                    >
                                        Todas
                                    </button>
                                    {categorias.map(categoria => (
                                        <button
                                            key={categoria}
                                            onClick={() => setCategoriaSeleccionada(categoria)}
                                            className={`px-5 py-2 rounded-xl font-bold transition-all ${categoriaSeleccionada === categoria
                                                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                                                    : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border-2 border-stone-700'
                                                }`}
                                        >
                                            {categoria}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Slider de Precio */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-stone-300 mb-3 uppercase tracking-wide">
                                        Rango de Precio
                                    </label>

                                    {/* Valores actuales */}
                                    <div className="flex items-center justify-between mb-4 text-stone-300">
                                        <span className="bg-stone-800 px-4 py-2 rounded-xl border-2 border-stone-700 font-bold">
                                            ${precioMin.toLocaleString('es-CL')}
                                        </span>
                                        <span className="text-stone-500">—</span>
                                        <span className="bg-stone-800 px-4 py-2 rounded-xl border-2 border-stone-700 font-bold">
                                            ${precioMax.toLocaleString('es-CL')}
                                        </span>
                                    </div>

                                    {/* Sliders */}
                                    <div className="space-y-4">
                                        {/* Slider Mínimo */}
                                        <div>
                                            <label className="text-xs text-stone-500 mb-1 block">Precio Mínimo</label>
                                            <input
                                                type="range"
                                                min={precioMinProducto}
                                                max={precioMaxProducto}
                                                step="500"
                                                value={precioMin}
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);
                                                    setPrecioMin(Math.min(value, precioMax - 500));
                                                }}
                                                className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer slider-orange"
                                            />
                                        </div>

                                        {/* Slider Máximo */}
                                        <div>
                                            <label className="text-xs text-stone-500 mb-1 block">Precio Máximo</label>
                                            <input
                                                type="range"
                                                min={precioMinProducto}
                                                max={precioMaxProducto}
                                                step="500"
                                                value={precioMax}
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);
                                                    setPrecioMax(Math.max(value, precioMin + 500));
                                                }}
                                                className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer slider-teal"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Ordenamiento */}
                                <div>
                                    <label className="block text-sm font-bold text-stone-300 mb-3 uppercase tracking-wide">
                                        Ordenar Por
                                    </label>
                                    <select
                                        value={ordenamiento}
                                        onChange={(e) => setOrdenamiento(e.target.value as any)}
                                        className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all"
                                    >
                                        <option value="">Sin ordenar</option>
                                        <option value="menor">Precio: Menor a Mayor</option>
                                        <option value="mayor">Precio: Mayor a Menor</option>
                                        <option value="nombre">Nombre: A-Z</option>
                                    </select>

                                    {/* Botón Limpiar */}
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

                {/* Resultados */}
                <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
                    <p className="text-stone-400">
                        Mostrando <span className="text-orange-400 font-bold">{productosOrdenados.length}</span> de{' '}
                        <span className="text-stone-300 font-bold">{productos.length}</span> productos
                    </p>

                    {hayFiltrosActivos && (
                        <div className="bg-orange-900/30 border border-orange-700/50 text-orange-400 px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2">
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>Filtros activos</span>
                        </div>
                    )}
                </div>

                {/* Grid de Productos */}
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
                    <div className="text-center py-20 animate-fade-in">
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

            {/* Modal de Producto */}
            <ProductModal
                producto={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmarAgregar}
            />
        </div>
    );
}