// 📍 UBICACIÓN: src/app/categorias/[categoria]/not-found.tsx

// Esta página se muestra cuando alguien intenta acceder a una categoría que NO existe
// Ejemplo: /categorias/laptops (no existe) → Muestra este 404

import Link from 'next/link';
import { Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="text-center max-w-2xl">
                
                {/* Ícono grande */}
                <div className="text-9xl mb-8 animate-bounce">🔍</div>
                
                {/* Número 404 con gradiente */}
                <h1 className="text-5xl md:text-7xl font-black mb-6">
                    <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                        404
                    </span>
                </h1>

                {/* Título */}
                <h2 className="text-3xl md:text-4xl font-bold text-stone-200 mb-4">
                    Categoría no encontrada
                </h2>

                {/* Descripción */}
                <p className="text-lg text-stone-400 mb-8">
                    Lo sentimos, la categoría que buscas no existe o ha sido movida.
                </p>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    
                    {/* Botón: Ir al inicio */}
                    <Link
                        href="/"
                        className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all font-bold shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
                    >
                        <Home className="w-5 h-5" />
                        <span>Ir al Inicio</span>
                    </Link>

                    {/* Botón: Ver productos */}
                    <Link
                        href="/productos"
                        className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-8 py-4 rounded-xl transition-all font-bold border-2 border-stone-700 hover:border-orange-600 flex items-center justify-center space-x-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span>Ver Productos</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}