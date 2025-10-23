// 📍 UBICACIÓN: src/app/categorias/[categoria]/_components/TecladosHero.tsx

// Hero específico para TECLADOS con colores naranja/rojo

import { Keyboard, Zap, Gauge, Sparkles } from 'lucide-react';

export default function TecladosHero() {
    return (
        // Gradiente naranja/rojo
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-900 via-stone-900 to-red-900 py-20 px-4">
            
            {/* Efectos de fondo */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-12">
                    
                    {/* Ícono de teclado */}
                    <div className="text-8xl mb-6 animate-pulse">⌨️</div>

                    {/* Título */}
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-orange-400 via-red-300 to-orange-400 bg-clip-text text-transparent">
                            Teclados Mecánicos
                        </span>
                    </h1>

                    {/* Descripción */}
                    <p className="text-xl md:text-2xl text-stone-300 mb-8 max-w-3xl mx-auto">
                        Precisión milimétrica con switches mecánicos premium y RGB personalizable
                    </p>

                    {/* Features de teclados */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        
                        <div className="bg-stone-900/50 backdrop-blur-md border-2 border-orange-700 rounded-2xl p-4">
                            <Keyboard className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                            <p className="text-sm font-bold text-stone-200">Switches Premium</p>
                        </div>

                        <div className="bg-stone-900/50 backdrop-blur-md border-2 border-red-700 rounded-2xl p-4">
                            <Sparkles className="w-8 h-8 text-red-400 mx-auto mb-2" />
                            <p className="text-sm font-bold text-stone-200">RGB Completo</p>
                        </div>

                        <div className="bg-stone-900/50 backdrop-blur-md border-2 border-orange-700 rounded-2xl p-4">
                            <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                            <p className="text-sm font-bold text-stone-200">Anti-Ghosting</p>
                        </div>

                        <div className="bg-stone-900/50 backdrop-blur-md border-2 border-red-700 rounded-2xl p-4">
                            <Gauge className="w-8 h-8 text-red-400 mx-auto mb-2" />
                            <p className="text-sm font-bold text-stone-200">Respuesta 1ms</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}