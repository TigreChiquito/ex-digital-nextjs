'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, X, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CarritoPage() {
    const { carrito, eliminarDelCarrito, actualizarCantidad, obtenerTotal, vaciarCarrito } = useCart();
    const [confirmandoEliminar, setConfirmandoEliminar] = useState<number | null>(null);
    const [confirmandoVaciar, setConfirmandoVaciar] = useState(false);

    const handleDecrease = (index: number, cantidadActual: number) => {
        if (cantidadActual > 1) {
            actualizarCantidad(index, cantidadActual - 1);
        }
    };

    const handleIncrease = (index: number, cantidadActual: number) => {
        if (cantidadActual < 99) {
            actualizarCantidad(index, cantidadActual + 1);
        }
    };

    const handleClickEliminar = (index: number) => {
        setConfirmandoEliminar(index);
    };

    const handleConfirmarEliminar = (index: number) => {
        eliminarDelCarrito(index);
        setConfirmandoEliminar(null);
    };

    const handleCancelarEliminar = () => {
        setConfirmandoEliminar(null);
    };

    const handleClickVaciar = () => {
        setConfirmandoVaciar(true);
    };

    const handleConfirmarVaciar = () => {
        vaciarCarrito();
        setConfirmandoVaciar(false);
    };

    const handleCancelarVaciar = () => {
        setConfirmandoVaciar(false);
    };

    // Si el carrito está vacío
    if (carrito.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-12">
                <div className="text-center max-w-md animate-fade-in">
                    <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-12 border-2 border-stone-800 shadow-2xl">
                        <div className="bg-stone-800 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-16 h-16 text-stone-600" />
                        </div>
                        <h2 className="text-3xl font-black text-stone-100 mb-4">
                            Tu carrito está vacío
                        </h2>
                        <p className="text-stone-400 mb-8 text-lg">
                            ¡Agrega algunos productos increíbles a tu carrito!
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Continuar Comprando</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-teal-400 bg-clip-text text-transparent">
                            Mi Carrito
                        </span>
                    </h1>
                    <p className="text-stone-400 text-lg">
                        Tienes {carrito.length} {carrito.length === 1 ? 'producto' : 'productos'} en tu carrito
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Lista de productos */}
                    <div className="lg:col-span-2 space-y-4 animate-slide-up">
                        {carrito.map((item, index) => (
                            <div
                                key={index}
                                className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-stone-800 hover:border-stone-700 transition-all shadow-lg group"
                            >
                                <div className="flex flex-col sm:flex-row gap-6">
                                    {/* Imagen del producto */}
                                    <div className="flex-shrink-0">
                                        <div className="relative w-full sm:w-32 h-32 bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl overflow-hidden border-2 border-stone-700">
                                            <Image
                                                src={item.img}
                                                alt={item.nombre}
                                                fill
                                                sizes="(max-width: 640px) 100vw, 128px"
                                                className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Info del producto */}
                                    <div className="flex-grow">
                                        <h3 className="text-xl font-bold text-stone-100 mb-2 group-hover:text-orange-400 transition-colors">
                                            {item.nombre}
                                        </h3>
                                        <p className="text-stone-400 text-sm mb-3 line-clamp-2">
                                            {item.descripcion}
                                        </p>

                                        {/* Precio unitario */}
                                        <div className="flex items-center space-x-2 mb-4">
                                            <span className="text-stone-500 text-sm">Precio:</span>
                                            <span className="text-orange-400 font-bold text-lg">
                                                ${item.precio.toLocaleString('es-CL')}
                                            </span>
                                        </div>

                                        {/* Controles de cantidad y eliminar */}
                                        <div className="flex flex-wrap items-center gap-4">
                                            {/* Cantidad */}
                                            <div className="flex items-center space-x-3 bg-stone-800 rounded-2xl p-2 border-2 border-stone-700">
                                                <button
                                                    onClick={() => handleDecrease(index, item.cantidad)}
                                                    disabled={item.cantidad <= 1}
                                                    className="bg-stone-700 hover:bg-stone-600 disabled:bg-stone-800 disabled:cursor-not-allowed text-orange-400 p-2 rounded-xl transition-all"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-stone-100 font-bold w-12 text-center">
                                                    {item.cantidad}
                                                </span>
                                                <button
                                                    onClick={() => handleIncrease(index, item.cantidad)}
                                                    disabled={item.cantidad >= 99}
                                                    className="bg-stone-700 hover:bg-stone-600 disabled:bg-stone-800 disabled:cursor-not-allowed text-orange-400 p-2 rounded-xl transition-all"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Subtotal */}
                                            <div className="bg-stone-800 px-4 py-2 rounded-2xl border-2 border-stone-700">
                                                <span className="text-stone-500 text-sm mr-2">Subtotal:</span>
                                                <span className="text-stone-100 font-bold text-lg">
                                                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                                                </span>
                                            </div>

                                            {/* Botones de eliminar con confirmación */}
                                            <div className="ml-auto">
                                                {confirmandoEliminar === index ? (
                                                    <div className="flex items-center space-x-2 animate-scale-in">
                                                        <button
                                                            onClick={() => handleConfirmarEliminar(index)}
                                                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl transition-all flex items-center space-x-1 px-3"
                                                            title="Confirmar eliminación"
                                                        >
                                                            <Check className="w-4 h-4" />
                                                            <span className="text-sm font-bold">Sí</span>
                                                        </button>
                                                        <button
                                                            onClick={handleCancelarEliminar}
                                                            className="bg-stone-700 hover:bg-stone-600 text-stone-300 p-2 rounded-xl transition-all flex items-center space-x-1 px-3"
                                                            title="Cancelar"
                                                        >
                                                            <X className="w-4 h-4" />
                                                            <span className="text-sm font-bold">No</span>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => handleClickEliminar(index)}
                                                        className="bg-red-900/50 hover:bg-red-800/70 text-red-400 hover:text-red-300 p-2 rounded-xl transition-all border-2 border-red-800 hover:border-red-700"
                                                        title="Eliminar producto"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Botón vaciar carrito con confirmación */}
                        <div>
                            {confirmandoVaciar ? (
                                <div className="bg-stone-900/90 backdrop-blur-md rounded-2xl p-6 border-2 border-red-800 animate-scale-in">
                                    <p className="text-stone-200 font-bold mb-4 text-center">
                                        ¿Estás seguro de vaciar todo el carrito?
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleConfirmarVaciar}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center space-x-2"
                                        >
                                            <Check className="w-5 h-5" />
                                            <span>Sí, vaciar</span>
                                        </button>
                                        <button
                                            onClick={handleCancelarVaciar}
                                            className="flex-1 bg-stone-700 hover:bg-stone-600 text-stone-300 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center space-x-2"
                                        >
                                            <X className="w-5 h-5" />
                                            <span>Cancelar</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={handleClickVaciar}
                                    className="w-full bg-stone-800 hover:bg-stone-700 text-red-400 hover:text-red-300 py-3 px-6 rounded-2xl font-bold transition-all border-2 border-stone-700 hover:border-red-800 flex items-center justify-center space-x-2"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    <span>Vaciar Carrito</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Resumen del pedido */}
                    <div className="lg:col-span-1">
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 border-2 border-stone-800 shadow-2xl sticky top-24 animate-scale-in">
                            <h2 className="text-2xl font-black text-stone-100 mb-6 pb-4 border-b-2 border-stone-800">
                                Resumen del Pedido
                            </h2>

                            {/* Detalles */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-stone-400">
                                    <span>Productos ({carrito.length})</span>
                                    <span className="text-stone-300 font-semibold">
                                        ${obtenerTotal().toLocaleString('es-CL')}
                                    </span>
                                </div>
                                <div className="flex justify-between text-stone-400">
                                    <span>Envío</span>
                                    <span className="text-teal-400 font-semibold">Gratis</span>
                                </div>
                                <div className="border-t-2 border-stone-800 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-stone-300 font-bold text-lg">Total</span>
                                        <span className="text-3xl font-black bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                                            ${obtenerTotal().toLocaleString('es-CL')}
                                        </span>
                                    </div>
                                    <p className="text-stone-500 text-xs mt-1">CLP</p>
                                </div>
                            </div>

                            {/* Botón de compra */}
                            <Link
                                href="/checkout"
                                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:shadow-teal-600/50 hover:scale-105 flex items-center justify-center space-x-2 mb-4"
                            >
                                <CreditCard className="w-5 h-5" />
                                <span>Proceder al Pago</span>
                            </Link>

                            {/* Botón continuar comprando */}
                            <Link
                                href="/"
                                className="block w-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white py-3 px-6 rounded-2xl font-bold text-center transition-all border-2 border-stone-700 hover:border-orange-600"
                            >
                                Continuar Comprando
                            </Link>

                            {/* Garantías */}
                            <div className="mt-6 pt-6 border-t-2 border-stone-800 space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="bg-teal-600/20 p-2 rounded-lg">
                                        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-stone-300 font-semibold text-sm">Envío Gratis</p>
                                        <p className="text-stone-500 text-xs">En compras sobre $50.000</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="bg-orange-600/20 p-2 rounded-lg">
                                        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-stone-300 font-semibold text-sm">Compra Segura</p>
                                        <p className="text-stone-500 text-xs">100% protegida</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}