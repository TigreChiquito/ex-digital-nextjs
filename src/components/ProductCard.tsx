'use client';

import { Producto } from '@/context/CartContext';
import { ShoppingCart, Sparkles } from 'lucide-react';

interface ProductCardProps {
    producto: Producto;
    onAgregar: (producto: Producto) => void;
}

export default function ProductCard({ producto, onAgregar }: ProductCardProps) {
    return (
        <div className="group bg-stone-800 rounded-3xl overflow-hidden border-2 border-stone-700 hover:border-orange-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-600/30 animate-fade-in">
            {/* Imagen con fondo más claro para contraste */}
            <div className="relative h-56 bg-gradient-to-br from-stone-700 via-stone-600 to-stone-700 overflow-hidden">
                <img
                    src={producto.img}
                    alt={producto.nombre}
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                />

                {/* Badge flotante con glow más visible */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1 animate-pulse-slow">
                    <Sparkles className="w-3 h-3" />
                    <span>Nuevo</span>
                </div>
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
                    <div className="flex items-baseline justify-between bg-gradient-to-r from-stone-900 to-stone-950 p-4 rounded-2xl border-2 border-stone-700 shadow-inner">
                        <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                            ${producto.precio.toLocaleString('es-CL')}
                        </span>
                        <span className="text-xs text-stone-400 font-bold uppercase tracking-wide">CLP</span>
                    </div>

                    {/* Botón más visible con gradiente y sombra */}
                    <button
                        onClick={() => onAgregar(producto)}
                        className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white py-3.5 px-4 rounded-2xl hover:from-orange-700 hover:via-orange-600 hover:to-orange-700 transition-all font-bold shadow-xl shadow-orange-600/40 hover:shadow-2xl hover:shadow-orange-600/60 flex items-center justify-center space-x-2 group-hover:scale-105 border border-orange-500/50"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Agregar al Carrito</span>
                    </button>
                </div>
            </div>
        </div>
    );
}