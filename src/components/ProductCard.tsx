'use client';

import { Producto } from '@/context/CartContext';
import { ShoppingCart, Sparkles, Flame, TrendingDown } from 'lucide-react';

interface ProductCardProps {
    producto: Producto;
    onAgregar: (producto: Producto) => void;
}

export default function ProductCard({ producto, onAgregar }: ProductCardProps) {
    // Verificar si el producto tiene oferta activa y dentro del rango de fechas
    const tieneOfertaActiva = () => {
        if (!producto.oferta?.activa) return false;
        
        const hoy = new Date();
        const fechaInicio = new Date(producto.oferta.fechaInicio);
        const fechaFin = new Date(producto.oferta.fechaFin);
        
        return hoy >= fechaInicio && hoy <= fechaFin;
    };

    const enOferta = tieneOfertaActiva();
    const ahorro = enOferta && producto.oferta ? producto.oferta.precioOriginal - producto.precio : 0;

    return (
        <div className={`group bg-stone-800 rounded-3xl overflow-hidden border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in ${
            enOferta 
                ? 'border-pink-500/50 hover:border-pink-400 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40' 
                : 'border-stone-700 hover:border-orange-500 hover:shadow-orange-600/30'
        }`}>
            {/* Imagen con fondo más claro para contraste */}
            <div className="relative h-56 bg-gradient-to-br from-stone-700 via-stone-600 to-stone-700 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={producto.img}
                    alt={producto.nombre}
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                />

                {/* Badge de oferta o nuevo */}
                {enOferta ? (
                    <>
                        {/* Badge de descuento */}
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1 animate-pulse border-2 border-pink-300/50">
                            <Flame className="w-3 h-3" />
                            <span>-{producto.oferta?.descuento}%</span>
                        </div>

                        {/* Etiqueta de oferta */}
                        {producto.oferta?.etiqueta && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1 border-2 border-yellow-300/50">
                                <TrendingDown className="w-3 h-3" />
                                <span>{producto.oferta.etiqueta}</span>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1 animate-pulse-slow">
                        <Sparkles className="w-3 h-3" />
                        <span>Nuevo</span>
                    </div>
                )}
            </div>

            {/* Contenido con mejor contraste */}
            <div className="p-6 flex flex-col flex-grow bg-stone-800">
                <h3 className="text-xl font-bold text-stone-100 mb-3 line-clamp-1 group-hover:text-orange-400 transition-colors">
                    {producto.nombre}
                </h3>

                <p className="text-sm text-stone-300 mb-4 line-clamp-2 flex-grow leading-relaxed">
                    {producto.descripcion}
                </p>

                <div className="mt-auto space-y-4">
                    {/* Precio con fondo destacado */}
                    <div className={`flex flex-col bg-gradient-to-r p-4 rounded-2xl border-2 shadow-inner ${
                        enOferta 
                            ? 'from-pink-950 to-rose-950 border-pink-700/50' 
                            : 'from-stone-900 to-stone-950 border-stone-700'
                    }`}>
                        {enOferta && producto.oferta && (
                            <>
                                {/* Precio original tachado */}
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-lg text-stone-400 line-through font-medium">
                                        ${producto.oferta.precioOriginal.toLocaleString('es-CL')}
                                    </span>
                                    <span className="text-xs text-pink-300 font-bold bg-pink-900/40 px-2 py-1 rounded-full border border-pink-700/50">
                                        AHORRA ${ahorro.toLocaleString('es-CL')}
                                    </span>
                                </div>
                            </>
                        )}
                        
                        {/* Precio actual */}
                        <div className="flex items-baseline justify-between">
                            <span className={`text-3xl font-bold bg-clip-text text-transparent drop-shadow-lg ${
                                enOferta 
                                    ? 'bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400' 
                                    : 'bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400'
                            }`}>
                                ${producto.precio.toLocaleString('es-CL')}
                            </span>
                            <span className="text-xs text-stone-400 font-bold uppercase tracking-wide">CLP</span>
                        </div>
                    </div>

                    {/* Botón más visible con gradiente y sombra */}
                    <button
                        onClick={() => onAgregar(producto)}
                        className={`w-full text-white py-3.5 px-4 rounded-2xl transition-all font-bold shadow-xl flex items-center justify-center space-x-2 group-hover:scale-105 border ${
                            enOferta
                                ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 shadow-pink-500/40 hover:shadow-2xl hover:shadow-pink-500/60 border-pink-400/50'
                                : 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-700 hover:via-orange-600 hover:to-orange-700 shadow-orange-600/40 hover:shadow-2xl hover:shadow-orange-600/60 border-orange-500/50'
                        }`}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Agregar al Carrito</span>
                    </button>
                </div>
            </div>
        </div>
    );
}