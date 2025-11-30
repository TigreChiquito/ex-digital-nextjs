'use client';

import { Producto } from '@/context/CartContext';
import { ShoppingCart, Sparkles, Flame, TrendingDown, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
    producto: Producto;
    onAgregar: (producto: Producto) => void;
}

export default function ProductCard({ producto, onAgregar }: ProductCardProps) {
    const [imgError, setImgError] = useState(false);
    
    // Detectar si estamos usando la imagen fallback del backend o si falló la carga
    const mostrarFallback = imgError || !producto.img || producto.img.includes('carrito-de-compras.png');

    const tieneOfertaActiva = () => {
        if (!producto.oferta?.activa) return false;
        const hoy = new Date();
        const fechaInicio = new Date(producto.oferta.fechaInicio);
        const fechaFin = new Date(producto.oferta.fechaFin);
        return hoy >= fechaInicio && hoy <= fechaFin;
    };

    const enOferta = tieneOfertaActiva();

    return (
        <div className={`group bg-stone-800 rounded-3xl overflow-hidden border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in ${
            enOferta ? 'border-pink-500/50 hover:border-pink-400' : 'border-stone-700 hover:border-orange-500'
        }`}>
            {/* Imagen */}
            <div className="relative h-56 w-full bg-gradient-to-br from-stone-700 via-stone-600 to-stone-700 overflow-hidden flex items-center justify-center">
                {!mostrarFallback ? (
                    <Image
                        src={producto.img}
                        alt={producto.nombre}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                        onError={() => setImgError(true)}
                        priority={true} // Carga rápida
                    />
                ) : (
                    // Fallback Elegante
                    <div className="flex flex-col items-center justify-center text-stone-500 opacity-50">
                        <ImageIcon className="w-12 h-12 mb-2" />
                        <span className="text-xs font-medium">Sin Imagen</span>
                    </div>
                )}
                
                {/* Badges se mantienen igual */}
                {enOferta ? (
                    <div className="absolute top-4 right-4 bg-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 animate-pulse z-10">
                        <Flame className="w-3 h-3" /><span>-{producto.oferta?.descuento}%</span>
                    </div>
                ) : (
                    <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 z-10">
                        <Sparkles className="w-3 h-3" /><span>Nuevo</span>
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="p-6 flex flex-col flex-grow bg-stone-800">
                <h3 className="text-xl font-bold text-stone-100 mb-2 line-clamp-1">{producto.nombre}</h3>
                <p className="text-sm text-stone-300 mb-4 line-clamp-2 flex-grow">{producto.descripcion}</p>
                
                <div className="mt-auto">
                    <div className="flex items-baseline justify-between mb-4">
                        <span className="text-2xl font-bold text-orange-400">
                            ${producto.precio.toLocaleString('es-CL')}
                        </span>
                        <span className="text-xs text-stone-500 font-bold">CLP</span>
                    </div>
                    <button
                        onClick={() => onAgregar(producto)}
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:to-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-orange-500/20"
                    >
                        <ShoppingCart className="w-5 h-5" /> Agregar
                    </button>
                </div>
            </div>
        </div>
    );
}