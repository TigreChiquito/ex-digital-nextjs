// 📍 UBICACIÓN: src/app/categorias/[categoria]/_components/MousesHero.tsx

// Hero específico para MOUSES con colores teal/cyan

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
                </div>
            </div>
        </div>
    );
}