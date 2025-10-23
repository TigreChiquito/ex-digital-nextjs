export default function Footer() {
    return (
        <footer className="bg-stone-900/90 backdrop-blur-md border-t-2 border-stone-800 mt-auto py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Logo */}
                    <div className="md:col-span-2 flex justify-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-teal-500 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <img
                                src="/img/utilidades/1da7323a-a0f4-4f5c-90a1-5844b22203c5.png"
                                alt="Logo Empresa"
                                className="relative w-24 h-24 rounded-full shadow-2xl ring-4 ring-orange-600/50 group-hover:ring-orange-500 group-hover:scale-110 transition-all"
                            />
                        </div>
                    </div>

                    {/* Información de la Empresa */}
                    <div className="md:col-span-8 text-center md:text-left">
                        <h5 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-teal-400 bg-clip-text text-transparent mb-3">
                            Sobre la Empresa
                        </h5>
                        <p className="text-stone-300 mb-2 text-lg">
                            Especialistas dedicados a la venta de periféricos para todo tipo de jugador.
                        </p>
                        <p className="text-stone-400 italic">
                            Tu experiencia de juego es nuestra prioridad, incluso aunque juegues en teléfonos.
                        </p>
                    </div>

                    {/* Contacto */}
                    <div className="md:col-span-2 text-center md:text-right">
                        <p className="text-stone-200 font-bold text-lg mb-2">
                            Contacto:
                        </p>
                        <a
                            href="mailto:contacto@ExDigital.cl"
                            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
                        >
                            contacto@ExDigital.cl
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t-2 border-stone-800 text-center">
                    <p className="text-stone-400">
                        © {new Date().getFullYear()} <span className="font-bold text-orange-400">Ex-Digital</span>. Todos los derechos reservados. <span>Pagina de practica</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}