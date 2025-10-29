// 📍 UBICACIÓN: src/app/categorias/[categoria]/_components/TecladosHero.tsx

// Hero específico para TECLADOS con colores naranja/rojo

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
                </div>
            </div>
        </div>
    );
}