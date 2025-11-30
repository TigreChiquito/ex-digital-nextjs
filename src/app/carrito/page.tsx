'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, ImageOff } from 'lucide-react';
import { useState } from 'react';

// Componente interno para manejar la imagen de forma robusta
const CartItemImage = ({ src, alt }: { src: string, alt: string }) => {
    const [imgError, setImgError] = useState(false);

    // Asegurar que la ruta empiece con '/' para que sea absoluta desde la raíz
    // Si src es "img/foto.png", lo convierte en "/img/foto.png"
    // Si ya tiene "http", lo deja igual.
    let safeSrc = src;
    if (src && !src.startsWith('/') && !src.startsWith('http')) {
        safeSrc = `/${src}`;
    }

    // DEBUG: Ver en consola qué ruta exacta está intentando cargar
    // console.log(`Cargando imagen: ${safeSrc}`);

    // Si falló la carga o la URL es la del placeholder genérico, mostrar icono
    if (imgError || !safeSrc || safeSrc.includes('carrito-de-compras.png')) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-800 text-stone-500">
                <ImageOff className="w-6 h-6 opacity-50 mb-1" />
                <span className="text-[10px] opacity-50">Sin img</span>
            </div>
        );
    }

    // Usamos <img> estándar para evitar problemas de optimización de Next.js en local
    return (
        <img
            src={safeSrc}
            alt={alt}
            className="w-full h-full object-contain p-2 transition-transform group-hover:scale-105"
            onError={() => {
                console.error(`Error cargando: ${safeSrc}`);
                setImgError(true);
            }}
        />
    );
};

export default function CarritoPage() {
    // Usamos las funciones del contexto directamente
    const { carrito, eliminarDelCarrito, actualizarCantidad, obtenerTotal, vaciarCarrito } = useCart();
    
    // Calculamos el total usando la función del contexto
    const totalCalculado = obtenerTotal();

    if (carrito.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center px-4">
                <div className="bg-stone-900/90 backdrop-blur-md p-12 rounded-3xl border-2 border-stone-800 text-center shadow-2xl max-w-lg animate-fade-in">
                    <div className="bg-stone-800/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-12 h-12 text-stone-400" />
                    </div>
                    <h2 className="text-3xl font-black text-stone-100 mb-4">Tu carrito está vacío</h2>
                    <p className="text-stone-400 mb-8 text-lg">
                        ¿Aún no te decides? Explora nuestro catálogo y encuentra tu próximo upgrade.
                    </p>
                    <Link href="/productos">
                        <button className="group bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-orange-600/30 flex items-center space-x-2 mx-auto">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span>Volver a la tienda</span>
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-teal-400 bg-clip-text text-transparent">
                            Tu Carrito de Compras
                        </span>
                    </h1>
                    <p className="text-stone-400 text-xl">
                        Estás a un paso de mejorar tu setup
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-slide-up">
                    {/* Lista de Productos */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-stone-800 shadow-xl">
                            <div className="p-6 space-y-6">
                                {carrito.map((item, index) => (
                                    <div
                                        key={`${item.id}-${index}`}
                                        className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-stone-800/50 rounded-2xl border border-stone-700/50 group transition-all hover:border-stone-600 hover:bg-stone-800"
                                    >
                                        {/* Imagen Segura */}
                                        <div className="relative w-24 h-24 bg-stone-900 rounded-xl overflow-hidden flex-shrink-0 border border-stone-700">
                                            <CartItemImage src={item.img} alt={item.nombre} />
                                        </div>

                                        {/* Detalles */}
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="text-lg font-bold text-stone-100 mb-1">{item.nombre}</h3>
                                            <p className="text-sm text-orange-400 font-medium mb-2">{item.categoria}</p>
                                            <div className="text-xl font-bold text-stone-100">
                                                ${item.precio.toLocaleString('es-CL')}
                                            </div>
                                        </div>

                                        {/* Controles */}
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            {/* Cantidad */}
                                            <div className="flex items-center bg-stone-900 rounded-xl border border-stone-700 p-1">
                                                <button
                                                    onClick={() => actualizarCantidad(index, item.cantidad - 1)}
                                                    className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors disabled:opacity-50"
                                                    disabled={item.cantidad <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-bold text-stone-100">{item.cantidad}</span>
                                                <button
                                                    onClick={() => actualizarCantidad(index, item.cantidad + 1)}
                                                    className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Eliminar */}
                                            <button
                                                onClick={() => eliminarDelCarrito(index)}
                                                className="p-3 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-xl border border-transparent hover:border-red-900/50 transition-all group/delete"
                                                title="Eliminar producto"
                                            >
                                                <Trash2 className="w-5 h-5 group-hover/delete:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="px-6 py-4 bg-stone-900 border-t-2 border-stone-800 flex justify-between items-center">
                                <Link href="/productos" className="text-stone-400 hover:text-orange-400 transition-colors flex items-center space-x-2 font-medium">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Continuar comprando</span>
                                </Link>
                                <button
                                    onClick={vaciarCarrito}
                                    className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium flex items-center space-x-1 px-3 py-2 hover:bg-red-950/30 rounded-lg"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Vaciar carrito</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Resumen del Pedido */}
                    <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-stone-800 shadow-xl sticky top-24">
                            <h3 className="text-2xl font-black text-stone-100 mb-6">Resumen del Pedido</h3>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-stone-400">
                                    <span>Subtotal</span>
                                    <span>${totalCalculado.toLocaleString('es-CL')}</span>
                                </div>
                                <div className="flex justify-between text-stone-400">
                                    <span>Envío</span>
                                    <span className="text-teal-400 font-medium">Gratis</span>
                                </div>
                                <div className="pt-4 border-t-2 border-stone-800 flex justify-between items-center">
                                    <span className="text-lg font-bold text-stone-100">Total a pagar</span>
                                    <span className="text-3xl font-black bg-gradient-to-r from-orange-400 to-teal-400 bg-clip-text text-transparent">
                                        ${totalCalculado.toLocaleString('es-CL')}
                                    </span>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <button className="group w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-teal-600/30 flex items-center justify-center space-x-2 text-lg">
                                    <span>Proceder al Pago</span>
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                            <div className="mt-6 flex items-center justify-center space-x-2 text-stone-500 text-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>Compra 100% Segura</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}