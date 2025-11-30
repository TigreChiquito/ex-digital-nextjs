'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, X, Tag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/context/CartContext';
import { Producto } from '@/context/CartContext';
import { obtenerProductos, ProductDto } from '@/routes/Product';
import { obtenerTodasCategorias, CategoryDto } from '@/routes/category';

export default function ProductosPage() {
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { agregarAlCarrito } = useCart();

    const [productos, setProductos] = useState<ProductDto[]>([]);
    const [categorias, setCategorias] = useState<CategoryDto[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [respProductos, respCategorias] = await Promise.all([
                    obtenerProductos(),
                    obtenerTodasCategorias()
                ]);

                if (respProductos.success && respProductos.data) {
                    setProductos(respProductos.data);
                }

                if (respCategorias.success && respCategorias.data) {
                    setCategorias(respCategorias.data);
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, []);

    const precioMinProducto = useMemo(() => 
        productos.length > 0 ? Math.min(...productos.map(p => p.value || 0)) : 0, 
        [productos]
    );
    const precioMaxProducto = useMemo(() => 
        productos.length > 0 ? Math.max(...productos.map(p => p.value || 0)) : 100000, 
        [productos]
    );

    const [searchTerm, setSearchTerm] = useState('');
    const [precioMin, setPrecioMin] = useState(0);
    const [precioMax, setPrecioMax] = useState(100000);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
    const [ordenamiento, setOrdenamiento] = useState<'menor' | 'mayor' | 'nombre' | ''>('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (productos.length > 0) {
            setPrecioMin(precioMinProducto);
            setPrecioMax(precioMaxProducto);
        }
    }, [precioMinProducto, precioMaxProducto, productos.length]);

    const handleAgregarClick = (productoDto: ProductDto) => {
        const categoria = categorias.find(c => c.categoryId === productoDto.categoryId);
        const producto: Producto = {
            id: productoDto.productId,
            nombre: productoDto.name,
            precio: productoDto.value || 0,
            categoria: categoria?.name || 'Sin categoría',
            img: productoDto.primaryImage || '/img/productos/carrito-de-compras.png',
            img2: productoDto.imageUrls?.[1] || '/img/productos/carrito-de-compras.png',
            img3: productoDto.imageUrls?.[2] || '/img/productos/carrito-de-compras.png',
            descripcion: productoDto.description,
            oferta: productoDto.discountId ? {
                activa: true,
                precioOriginal: productoDto.value || 0,
                descuento: productoDto.discountPercentage || 0,
                fechaInicio: '',
                fechaFin: '',
                etiqueta: 'Oferta'
            } : undefined
        };
        setSelectedProduct(producto);
        setIsModalOpen(true);
    };

    const handleConfirmarAgregar = (producto: Producto, cantidad: number) => {
        agregarAlCarrito(producto, cantidad);
        // ... (código de notificación se mantiene igual)
    };

    // Filtrar productos
    const productosFiltrados = productos.filter(producto => {
        const cumpleNombre = producto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.description.toLowerCase().includes(searchTerm.toLowerCase());

        const cumplePrecio = (producto.value || 0) >= precioMin && (producto.value || 0) <= precioMax;

        // FILTRO DE CATEGORÍA
        const cumpleCategoria = categoriaSeleccionada === null || Number(producto.categoryId) === Number(categoriaSeleccionada);

        return cumpleNombre && cumplePrecio && cumpleCategoria;
    });

    // Ordenar productos
    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
        if (ordenamiento === 'menor') return (a.value || 0) - (b.value || 0);
        if (ordenamiento === 'mayor') return (b.value || 0) - (a.value || 0);
        if (ordenamiento === 'nombre') return a.name.localeCompare(b.name);
        return 0;
    });

    const limpiarFiltros = () => {
        setSearchTerm('');
        setPrecioMin(precioMinProducto);
        setPrecioMax(precioMaxProducto);
        setCategoriaSeleccionada(null);
        setOrdenamiento('');
    };

    const hayFiltrosActivos = searchTerm ||
        precioMin !== precioMinProducto ||
        precioMax !== precioMaxProducto ||
        categoriaSeleccionada !== null ||
        ordenamiento;

    if (cargando) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Cargando productos...</p>
                </div>
            </div>
        );
    }

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

                {/* Filtros */}
                <div className="mb-8 animate-slide-up">
                    <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-stone-800 shadow-xl">
                        <div className="flex flex-col lg:flex-row gap-4">
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
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden bg-stone-800 hover:bg-stone-700 text-stone-300 px-6 py-3 rounded-2xl font-bold transition-all border-2 border-stone-700 hover:border-orange-600 flex items-center justify-center space-x-2"
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                                <span>Filtros</span>
                            </button>
                        </div>

                        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-6 pt-6 border-t-2 border-stone-800`}>
                            {/* CATEGORÍAS */}
                            <div className="mb-6">
                                <label className="text-sm font-bold text-stone-300 mb-3 uppercase tracking-wide flex items-center space-x-2">
                                    <Tag className="w-4 h-4" />
                                    <span>Categoría</span>
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setCategoriaSeleccionada(null)}
                                        className={`px-5 py-2 rounded-xl font-bold transition-all ${categoriaSeleccionada === null
                                                ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg'
                                                : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border-2 border-stone-700'
                                            }`}
                                    >
                                        Todas
                                    </button>
                                    {categorias.map(categoria => (
                                        <button
                                            key={categoria.categoryId}
                                            onClick={() => setCategoriaSeleccionada(categoria.categoryId)}
                                            className={`px-5 py-2 rounded-xl font-bold transition-all ${categoriaSeleccionada === categoria.categoryId
                                                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg'
                                                    : 'bg-stone-800 text-stone-400 hover:bg-stone-700 border-2 border-stone-700'
                                                }`}
                                        >
                                            {categoria.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Sliders de Precio y Ordenamiento... (se mantienen igual) */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-stone-300 mb-3 uppercase tracking-wide">Rango de Precio</label>
                                    <div className="flex items-center justify-between mb-4 text-stone-300">
                                        <span className="bg-stone-800 px-4 py-2 rounded-xl border-2 border-stone-700 font-bold">${precioMin.toLocaleString('es-CL')}</span>
                                        <span>—</span>
                                        <span className="bg-stone-800 px-4 py-2 rounded-xl border-2 border-stone-700 font-bold">${precioMax.toLocaleString('es-CL')}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <input type="range" min={precioMinProducto} max={precioMaxProducto} step="500" value={precioMin} onChange={(e) => setPrecioMin(Math.min(Number(e.target.value), precioMax - 500))} className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer slider-orange" />
                                        <input type="range" min={precioMinProducto} max={precioMaxProducto} step="500" value={precioMax} onChange={(e) => setPrecioMax(Math.max(Number(e.target.value), precioMin + 500))} className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer slider-teal" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-300 mb-3 uppercase tracking-wide">Ordenar Por</label>
                                    <select value={ordenamiento} onChange={(e) => setOrdenamiento(e.target.value as '' | 'menor' | 'mayor' | 'nombre')} className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 focus:outline-none focus:ring-4 focus:ring-orange-900">
                                        <option value="">Sin ordenar</option>
                                        <option value="menor">Precio: Menor a Mayor</option>
                                        <option value="mayor">Precio: Mayor a Menor</option>
                                        <option value="nombre">Nombre: A-Z</option>
                                    </select>
                                    <button onClick={limpiarFiltros} disabled={!hayFiltrosActivos} className="w-full mt-4 bg-red-900/50 hover:bg-red-800/70 disabled:bg-stone-800 text-red-400 disabled:text-stone-600 px-6 py-3 rounded-2xl font-bold transition-all border-2 border-red-800 disabled:border-stone-700 flex items-center justify-center space-x-2">
                                        <X className="w-5 h-5" /> <span>Limpiar Filtros</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid de Productos */}
                {productosOrdenados.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {productosOrdenados.map((productoDto) => {
                            const categoria = categorias.find(c => c.categoryId === productoDto.categoryId);
                            const producto: Producto = {
                                id: productoDto.productId,
                                nombre: productoDto.name,
                                precio: productoDto.value || 0,
                                categoria: categoria?.name || 'Sin categoría',
                                img: productoDto.primaryImage || '/img/productos/carrito-de-compras.png',
                                img2: productoDto.imageUrls?.[1] || '/img/productos/carrito-de-compras.png',
                                img3: productoDto.imageUrls?.[2] || '/img/productos/carrito-de-compras.png',
                                descripcion: productoDto.description,
                                oferta: productoDto.discountId ? {
                                    activa: true,
                                    precioOriginal: productoDto.value || 0,
                                    descuento: productoDto.discountPercentage || 0,
                                    fechaInicio: '',
                                    fechaFin: '',
                                    etiqueta: 'Oferta'
                                } : undefined
                            };
                            return (
                                <ProductCard
                                    key={productoDto.productId}
                                    producto={producto}
                                    onAgregar={() => handleAgregarClick(productoDto)}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-12 border-2 border-stone-800 shadow-2xl max-w-md mx-auto">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-stone-100 mb-4">No se encontraron productos</h3>
                            <p className="text-stone-400 mb-6">Intenta ajustar los filtros o realizar una búsqueda diferente</p>
                            <button onClick={limpiarFiltros} className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 text-white px-8 py-3 rounded-xl font-bold">Limpiar Filtros</button>
                        </div>
                    </div>
                )}
            </div>

            <ProductModal producto={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmarAgregar} />
        </div>
    );
}