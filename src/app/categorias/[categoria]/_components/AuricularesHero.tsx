// 📍 UBICACIÓN: src/app/categorias/[categoria]/_components/AuricularesHero.tsx

// Este es el Hero (cabecera grande) que aparece SOLO en la página de Auriculares
// Tiene fondo púrpura/rosa y muestra features específicas de auriculares

import { Volume2, Headphones, Radio, Mic } from 'lucide-react';

export default function AuricularesHero() {
    return (
        // Contenedor principal con gradiente púrpura/rosa
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-stone-900 to-pink-900 py-20 px-4">
            
            {/* Efectos de fondo animados (círculos difuminados) */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
            </div>

            {/* Contenido principal */}
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-12">
                    
                    {/* Ícono grande animado */}
                    <div className="text-8xl mb-6 animate-bounce">🎧</div>

                    {/* Título con gradiente */}
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                            Auriculares Gaming
                        </span>
                    </h1>

                    {/* Descripción */}
                    <p className="text-xl md:text-2xl text-stone-300 mb-8 max-w-3xl mx-auto">
                        Sumérgete en audio de alta fidelidad con cancelación de ruido y comodidad excepcional
                    </p>
                </div>
            </div>
        </div>
    );
}