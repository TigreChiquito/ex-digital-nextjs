'use client';

import { useState, useMemo } from 'react';
import { productos } from '@/data/productos';
import { useCart } from '@/context/CartContext';
import { Producto } from '@/context/CartContext';
import { Flame, TrendingDown, Clock, ArrowLeft, Filter } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';

export default function OfertasPage() {
    const { agregarAlCarrito } = useCart();
    const [filtroDescuento, setFiltroDescuento] = useState<string>('todos');
    const [ordenar, setOrdenar] = useState<string>('descuento-mayor');
    const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAgregarClick = (producto: Producto) => {
        setSelectedProduct(producto);
        setIsModalOpen(true);
    };

    const handleConfirmarAgregar = (producto: Producto, cantidad: number) => {
        agregarAlCarrito(producto, cantidad);

        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-up flex items-center space-x-3 border border-pink-500';
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

    // Filtrar productos en oferta activa
    const productosEnOferta = useMemo(() => {
        const hoy = new Date();
        
        return productos.filter(producto => {
            if (!producto.oferta?.activa) return false;
            
            const fechaInicio = new Date(producto.oferta.fechaInicio);
            const fechaFin = new Date(producto.oferta.fechaFin);
            
            // Verificar que la oferta esté dentro del rango de fechas
            return hoy >= fechaInicio && hoy <= fechaFin;
        });
    }, []);

    // Filtrar por descuento
    const productosFiltrados = useMemo(() => {
        let filtrados = [...productosEnOferta];

        // Aplicar filtro de descuento
        if (filtroDescuento === '20') {
            filtrados = filtrados.filter(p => (p.oferta?.descuento || 0) >= 20);
        } else if (filtroDescuento === '30') {
            filtrados = filtrados.filter(p => (p.oferta?.descuento || 0) >= 30);
        } else if (filtroDescuento === '50') {
            filtrados = filtrados.filter(p => (p.oferta?.descuento || 0) >= 50);
        }

        // Ordenar
        if (ordenar === 'descuento-mayor') {
            filtrados.sort((a, b) => (b.oferta?.descuento || 0) - (a.oferta?.descuento || 0));
        } else if (ordenar === 'descuento-menor') {
            filtrados.sort((a, b) => (a.oferta?.descuento || 0) - (b.oferta?.descuento || 0));
        } else if (ordenar === 'precio-menor') {
            filtrados.sort((a, b) => a.precio - b.precio);
        } else if (ordenar === 'precio-mayor') {
            filtrados.sort((a, b) => b.precio - a.precio);
        }

        return filtrados;
    }, [productosEnOferta, filtroDescuento, ordenar]);

    // Calcular días restantes para la oferta
    const calcularDiasRestantes = () => {
        if (productosEnOferta.length === 0) return 0;
        const fechaFin = new Date(productosEnOferta[0].oferta!.fechaFin);
        const hoy = new Date();
        const diffTime = fechaFin.getTime() - hoy.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const diasRestantes = calcularDiasRestantes();

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header con animación */}
                <div className="mb-12 animate-fade-in">
                    <Link
                        href="/productos"
                        className="inline-flex items-center space-x-2 text-stone-400 hover:text-orange-400 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Volver a productos</span>
                    </Link>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center space-x-3 mb-4">
                            <Flame className="w-12 h-12 text-pink-400 animate-pulse" />
                            <h1 className="text-4xl md:text-6xl font-black">
                                <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                                    ¡Ofertas de Primavera!
                                </span>
                            </h1>
                            <Flame className="w-12 h-12 text-pink-400 animate-pulse" />
                        </div>
                        <p className="text-stone-400 text-xl mb-4">
                            Aprovecha descuentos de hasta {Math.max(...productosEnOferta.map(p => p.oferta?.descuento || 0))}% en productos seleccionados
                        </p>

                        {/* Contador de tiempo */}
                        {diasRestantes > 0 && (
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-2 border-pink-400 text-pink-300 px-6 py-3 rounded-full animate-pulse-slow backdrop-blur-sm">
                                <Clock className="w-5 h-5" />
                                <span className="font-bold">
                                    {diasRestantes === 1 ? '¡Último día!' : `Quedan ${diasRestantes} días`}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 text-white text-center shadow-2xl hover:scale-105 transition-transform">
                            <TrendingDown className="w-10 h-10 mx-auto mb-3" />
                            <p className="text-4xl font-black mb-2">{productosEnOferta.length}</p>
                            <p className="text-white/90">Productos en oferta</p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-400 to-orange-400 rounded-3xl p-6 text-white text-center shadow-2xl hover:scale-105 transition-transform">
                            <Flame className="w-10 h-10 mx-auto mb-3" />
                            <p className="text-4xl font-black mb-2">Hasta {Math.max(...productosEnOferta.map(p => p.oferta?.descuento || 0))}%</p>
                            <p className="text-white/90">Descuento máximo</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl p-6 text-white text-center shadow-2xl hover:scale-105 transition-transform">
                            <Clock className="w-10 h-10 mx-auto mb-3" />
                            <p className="text-4xl font-black mb-2">{diasRestantes}</p>
                            <p className="text-white/90">Días restantes</p>
                        </div>
                    </div>

                    {/* Filtros y Ordenamiento */}
                    <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-800/30 shadow-xl">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Filtro por descuento */}
                            <div className="flex items-center space-x-3">
                                <Filter className="w-5 h-5 text-pink-400" />
                                <label className="text-stone-300 font-semibold">Descuento mínimo:</label>
                                <select
                                    value={filtroDescuento}
                                    onChange={(e) => setFiltroDescuento(e.target.value)}
                                    className="bg-stone-800 border-2 border-pink-700/50 text-stone-100 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                                >
                                    <option value="todos">Todos</option>
                                    <option value="20">20% o más</option>
                                    <option value="30">30% o más</option>
                                    <option value="50">50% o más</option>
                                </select>
                            </div>

                            {/* Ordenar */}
                            <div className="flex items-center space-x-3">
                                <label className="text-stone-300 font-semibold">Ordenar por:</label>
                                <select
                                    value={ordenar}
                                    onChange={(e) => setOrdenar(e.target.value)}
                                    className="bg-stone-800 border-2 border-pink-700/50 text-stone-100 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                                >
                                    <option value="descuento-mayor">Mayor descuento</option>
                                    <option value="descuento-menor">Menor descuento</option>
                                    <option value="precio-menor">Precio más bajo</option>
                                    <option value="precio-mayor">Precio más alto</option>
                                </select>
                            </div>

                            {/* Contador de resultados */}
                            <div className="text-stone-400 text-sm">
                                Mostrando <span className="text-pink-400 font-bold">{productosFiltrados.length}</span> productos
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid de productos */}
                {productosFiltrados.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {productosFiltrados.map((producto, index) => (
                            <div key={producto.nombre} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                <ProductCard
                                    producto={producto}
                                    onAgregar={handleAgregarClick}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-12 border-2 border-stone-800 inline-block">
                            <TrendingDown className="w-20 h-20 text-stone-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-stone-300 mb-2">No hay ofertas disponibles</h2>
                            <p className="text-stone-500">Cambia los filtros o vuelve más tarde</p>
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
