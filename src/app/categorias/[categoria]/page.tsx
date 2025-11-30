'use client';

import { useState, useMemo, use, useEffect } from 'react';
import { Search, SlidersHorizontal, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/context/CartContext';
import { Producto } from '@/context/CartContext';
import { getConfigBySlug } from '@/utils/categoriasConfig';
import { obtenerProductos, ProductDto } from '@/routes/Product';
import { obtenerTodasCategorias, CategoryDto } from '@/routes/category';

import AuricularesHero from './_components/AuricularesHero';
import TecladosHero from './_components/TecladosHero';
import MousesHero from './_components/MousesHero';

type TipoOrdenamiento = '' | 'menor' | 'mayor' | 'nombre';

export default function CategoriaPage({ params }: { params: Promise<{ categoria: string }> }) {
    const { categoria } = use(params);
    const config = getConfigBySlug(categoria);

    if (!config) {
        notFound();
    }

    const HeroComponents: Record<string, React.ComponentType> = {
        'auriculares': AuricularesHero,
        'teclados': TecladosHero,
        'mouses': MousesHero,
    };

    const HeroComponent = HeroComponents[categoria];

    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { agregarAlCarrito } = useCart();

    const [productos, setProductos] = useState<ProductDto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [categoriaActual, setCategoriaActual] = useState<CategoryDto | null>(null);

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
                    // BUSQUEDA FLEXIBLE
                    const cat = respCategorias.data.find(c => 
                        c.name.trim().toLowerCase().includes(config.nombre.toLowerCase()) ||
                        config.nombre.toLowerCase().includes(c.name.trim().toLowerCase())
                    );
                    setCategoriaActual(cat || null);
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, [config.nombre]);

    // Filtrar productos
    const productosCategoria = useMemo(() => {
        if (!categoriaActual) return [];
        return productos.filter(p => Number(p.categoryId) === Number(categoriaActual.categoryId));
    }, [productos, categoriaActual]);

    // ... (El resto de la lógica de precios y filtros se mantiene igual) ...
    // Solo asegúrate de que el renderizado use `producto.primaryImage`

    // (Código abreviado para ahorrar espacio, copia el resto del return del archivo original y asegúrate de usar el mapeo de imágenes abajo)
    
    // Al mapear los productos para el renderizado:
    // const producto: Producto = {
    //     ...
    //     img: productoDto.primaryImage || '/img/productos/carrito-de-compras.png',
    //     img2: productoDto.imageUrls?.[1] || '/img/productos/carrito-de-compras.png',
    //     ...
    // };

    // Si necesitas el archivo completo dímelo, pero con copiar la lógica de useEffect y productosCategoria debería bastar si ya aplicaste el fix en category.tsx
    
    // Aquí está el return completo para evitar dudas:
    const precioMinProducto = useMemo(() => 
        productosCategoria.length > 0 ? Math.min(...productosCategoria.map(p => p.value || 0)) : 0, 
        [productosCategoria]
    );
    const precioMaxProducto = useMemo(() => 
        productosCategoria.length > 0 ? Math.max(...productosCategoria.map(p => p.value || 0)) : 100000, 
        [productosCategoria]
    );

    const [searchTerm, setSearchTerm] = useState('');
    const [precioMin, setPrecioMin] = useState(precioMinProducto);
    const [precioMax, setPrecioMax] = useState(precioMaxProducto);
    const [ordenamiento, setOrdenamiento] = useState<TipoOrdenamiento>('');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setPrecioMin(precioMinProducto);
        setPrecioMax(precioMaxProducto);
    }, [precioMinProducto, precioMaxProducto]);

    const handleAgregarClick = (productoDto: ProductDto) => {
        const producto: Producto = {
            id: productoDto.productId,
            nombre: productoDto.name,
            precio: productoDto.value || 0,
            categoria: categoriaActual?.name || config.nombre,
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

    const productosFiltrados = productosCategoria.filter(producto => {
        const cumpleNombre = producto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.description.toLowerCase().includes(searchTerm.toLowerCase());
        const cumplePrecio = (producto.value || 0) >= precioMin && (producto.value || 0) <= precioMax;
        return cumpleNombre && cumplePrecio;
    });

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
        setOrdenamiento('');
    };

    const hayFiltrosActivos = searchTerm ||
        precioMin !== precioMinProducto ||
        precioMax !== precioMaxProducto ||
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
        <div className="min-h-screen">
            <div className="container mx-auto max-w-7xl px-4 pt-8">
                <Link href="/productos" className="inline-flex items-center text-stone-400 hover:text-orange-400 transition-colors space-x-2 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Volver a todos los productos</span>
                </Link>
            </div>

            {HeroComponent && <HeroComponent />}

            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="mb-8">
                    <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-stone-800 shadow-xl">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={`Buscar ${config.nombre.toLowerCase()}...`} className="w-full pl-12 pr-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900" />
                            </div>
                            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden bg-stone-800 hover:bg-stone-700 text-stone-300 px-6 py-3 rounded-2xl font-bold border-2 border-stone-700 flex items-center justify-center space-x-2">
                                <SlidersHorizontal className="w-5 h-5" /> <span>Filtros</span>
                            </button>
                        </div>

                        <div className={`${showFilters ? 'block' : 'hidden'} lg:block mt-6 pt-6 border-t-2 border-stone-800`}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                    <select value={ordenamiento} onChange={(e) => setOrdenamiento(e.target.value as TipoOrdenamiento)} className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 focus:outline-none focus:ring-4 focus:ring-orange-900">
                                        <option value="">Sin ordenar</option>
                                        <option value="menor">Precio: Menor a Mayor</option>
                                        <option value="mayor">Precio: Mayor a Menor</option>
                                        <option value="nombre">Nombre: A-Z</option>
                                    </select>
                                    <button onClick={limpiarFiltros} disabled={!hayFiltrosActivos} className="w-full mt-4 bg-red-900/50 hover:bg-red-800/70 disabled:bg-stone-800 text-red-400 disabled:text-stone-600 px-6 py-3 rounded-2xl font-bold border-2 border-red-800 disabled:border-stone-700 flex items-center justify-center space-x-2">
                                        <X className="w-5 h-5" /> <span>Limpiar Filtros</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
                    <p className="text-stone-400">Mostrando <span className="text-orange-400 font-bold">{productosOrdenados.length}</span> de <span className="text-stone-300 font-bold">{productosCategoria.length}</span> productos</p>
                    {hayFiltrosActivos && <div className="bg-orange-900/30 border border-orange-700/50 text-orange-400 px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2"><SlidersHorizontal className="w-4 h-4" /> <span>Filtros activos</span></div>}
                </div>

                {productosOrdenados.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {productosOrdenados.map((productoDto) => {
                            const producto: Producto = {
                                id: productoDto.productId,
                                nombre: productoDto.name,
                                precio: productoDto.value || 0,
                                categoria: categoriaActual?.name || config.nombre,
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
                                <ProductCard key={productoDto.productId} producto={producto} onAgregar={() => handleAgregarClick(productoDto)} />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-12 border-2 border-stone-800 shadow-2xl max-w-md mx-auto">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-stone-100 mb-4">No se encontraron productos</h3>
                            <p className="text-stone-400 mb-6">Intenta ajustar los filtros o realizar una búsqueda diferente</p>
                            <button onClick={limpiarFiltros} className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105">Limpiar Filtros</button>
                        </div>
                    </div>
                )}
            </div>

            <ProductModal producto={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmarAgregar} />
        </div>
    );
}