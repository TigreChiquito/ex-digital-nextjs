export default function Footer() {
    return (
        <footer className="bg-stone-300 border-t border-stone-400 mt-auto py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Logo */}
                    <div className="md:col-span-2 flex justify-center">
                        <img
                            src="/img/utilidades/1da7323a-a0f4-4f5c-90a1-5844b22203c5.png"
                            alt="Logo Empresa"
                            className="w-20 h-20 rounded-full shadow-lg"
                        />
                    </div>

                    {/* Información de la Empresa */}
                    <div className="md:col-span-8 text-center md:text-left">
                        <h5 className="text-xl font-bold text-gray-800 mb-2">
                            Sobre la Empresa
                        </h5>
                        <p className="text-gray-700 mb-1">
                            Especialistas dedicados a la venta de periféricos para todo tipo de jugador.
                        </p>
                        <p className="text-gray-600 italic text-sm">
                            Tu experiencia de juego es nuestra prioridad, incluso aunque juegues en teléfonos.
                        </p>
                    </div>

                    {/* Contacto */}
                    <div className="md:col-span-2 text-center md:text-right">
                        <p className="text-gray-800 font-semibold">
                            Contacto:
                        </p>
                        <p className="text-gray-700">
                            contacto@ExDigital.cl
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 pt-6 border-t border-stone-400 text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} Ex-Digital. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}