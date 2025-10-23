// 📍 UBICACIÓN: src/app/categorias/[categoria]/_components/MousesHero.tsx

// Hero específico para MOUSES con colores teal/cyan

import { Mouse, Target, Boxes, Settings } from 'lucide-react';

export default function MousesHero() {
    return (
        // Gradiente teal/cyan
        <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-stone-900 to-cyan-900 py-20 px-4">
            
            {/* Efectos de fondo */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-12">
                    
                    {/* Ícono de mouse */}
                    <div className="text-8xl mb-6 animate-bounce">🖱️</div>

                    {/* Título */}
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                            Mouses Gaming
                        </span>
                    </h1>

                    {/* Descripción */}
                    <p className="text-xl md:text-2xl text-stone-300 mb-8 max-w-3xl mx-auto">
                        Control absoluto y precisión milimétrica con sensores de última generación
                    </p>

                    {/* Features de mouses */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        
                        <div className="bg-stone-900/50 backdrop-blur-md border-2 border-teal-700 rounded-2xl p-4">
                            <Target className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                            <p className="text-sm font-bold text-stone-200">30K DPI</p>
                        </div>

                        <div className="bg-stone-900/50 backdrop-blur-md border-2 border-cyan-700 rounded-2xl p-4">
                            <Mouse className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                            <p className="text-sm font-bold text-stone-200">Ergonómico</p>
                        </div>

                        <div className="bg-stone-900/50 backdrop-blur-md border-2 border-teal-700 rounded-2xl p-4">
                            <Boxes className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                            <p className="text-sm font-bold text-stone-200">Botones Macro</p>
                        </div>

                        <div className="bg-stone-900/50 backdrop-blur-md border-2 border-cyan-700 rounded-2xl p-4">
                            <Settings className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                            <p className="text-sm font-bold text-stone-200">Personalizable</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}