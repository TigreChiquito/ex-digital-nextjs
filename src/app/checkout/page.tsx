'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, MapPin, User, Mail, Phone, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const regiones = [
    'Región Metropolitana de Santiago',
    'Región de Valparaíso',
    'Región del Biobío',
    'Región de La Araucanía',
    'Región de Los Lagos',
];

const comunas: { [key: string]: string[] } = {
    'Región Metropolitana de Santiago': ['Santiago', 'Maipú', 'La Florida', 'Puente Alto', 'Las Condes', 'Providencia', 'Ñuñoa'],
    'Región de Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón'],
    'Región del Biobío': ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chillán', 'Coronel'],
    'Región de La Araucanía': ['Temuco', 'Villarrica', 'Pucón', 'Angol'],
    'Región de Los Lagos': ['Puerto Montt', 'Osorno', 'Castro', 'Ancud'],
};

export default function CheckoutPage() {
    const router = useRouter();
    const { carrito, obtenerTotal, vaciarCarrito } = useCart();
    const { usuario, estaLogueado } = useAuth();

    // Estados del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [calle, setCalle] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [region, setRegion] = useState('');
    const [comuna, setComuna] = useState('');
    const [indicaciones, setIndicaciones] = useState('');
    const [error, setError] = useState('');
    const [procesando, setProcesando] = useState(false);
    const [pagoExitoso, setPagoExitoso] = useState(false);

    // Auto-completar datos del usuario
    useEffect(() => {
        if (estaLogueado() && usuario) {
            setNombre(usuario.nombre?.split(' ')[0] || '');
            setApellido(usuario.nombre?.split(' ').slice(1).join(' ') || '');
            setEmail(usuario.email || '');
        }
    }, [usuario, estaLogueado]);

    // Redirigir si el carrito está vacío (excepto si el pago fue exitoso)
    useEffect(() => {
        if (carrito.length === 0 && !pagoExitoso) {
            router.push('/carrito');
        }
    }, [carrito, router, pagoExitoso]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (!nombre || !apellido || !email || !telefono || !calle || !region || !comuna) {
            setError('Por favor, completa todos los campos obligatorios');
            return;
        }

        if (!email.includes('@')) {
            setError('Por favor, ingresa un email válido');
            return;
        }

        if (telefono.length < 8) {
            setError('Por favor, ingresa un teléfono válido');
            return;
        }

        // Simular procesamiento
        setProcesando(true);

        setTimeout(() => {
            // Randomizador 50/50
            const exito = Math.random() < 0.5;

            if (exito) {
                // PAGO EXITOSO
                setPagoExitoso(true); // Marcar como exitoso para prevenir redirección
                
                const datosCompra = {
                    cliente: { nombre, apellido, email, telefono },
                    direccion: { calle, departamento, region, comuna, indicaciones },
                    productos: carrito,
                    subtotal: total,
                    envio: envio,
                    total: totalFinal,
                    fecha: new Date().toISOString(),
                    numeroOrden: `EXD-${Date.now()}`
                };

                // Guardar datos en localStorage
                localStorage.setItem('ultimaCompra', JSON.stringify(datosCompra));

                // Vaciar carrito
                vaciarCarrito();

                // Redirigir a página de boleta con un pequeño delay
                setTimeout(() => {
                    router.push('/boleta');
                }, 100);
            } else {
                // PAGO FALLIDO
                setProcesando(false);
                setError('Error al procesar el pago. El servidor bancario no está disponible en este momento. Por favor, intenta nuevamente en unos minutos.');

                // Scroll al error
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 2000);
    };

    if (carrito.length === 0) {
        return null;
    }

    const total = obtenerTotal();
    const envio = total > 50000 ? 0 : 5000;
    const totalFinal = total + envio;

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <Link
                        href="/carrito"
                        className="inline-flex items-center space-x-2 text-stone-400 hover:text-orange-400 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Volver al carrito</span>
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-teal-400 bg-clip-text text-transparent">
                            Finalizar Compra
                        </span>
                    </h1>
                    <p className="text-stone-400 text-lg">
                        Completa tu información para procesar el pedido
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulario */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Mensaje de error */}
                            {error && (
                                <div className="bg-red-900/50 border-2 border-red-700 text-red-200 px-6 py-4 rounded-2xl animate-shake flex items-center space-x-3">
                                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                                    <p className="font-medium">{error}</p>
                                </div>
                            )}

                            {/* Información del Cliente */}
                            <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 border-2 border-stone-800 shadow-xl animate-slide-up">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="bg-gradient-to-br from-orange-600 to-orange-500 w-10 h-10 rounded-xl flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-black text-stone-100">Información del Cliente</h2>
                                </div>

                                {estaLogueado() && (
                                    <div className="bg-teal-900/30 border-2 border-teal-700/50 text-teal-200 px-4 py-3 rounded-2xl mb-6 flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <p className="text-sm">Datos auto-completados. Puedes editarlos si lo necesitas.</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-stone-300 mb-2">
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            disabled={procesando}
                                            className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-stone-300 mb-2">
                                            Apellido *
                                        </label>
                                        <input
                                            type="text"
                                            value={apellido}
                                            onChange={(e) => setApellido(e.target.value)}
                                            disabled={procesando}
                                            className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            placeholder="Tu apellido"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-stone-300 mb-2 flex items-center space-x-2">
                                            <Mail className="w-4 h-4" />
                                            <span>Correo *</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={procesando}
                                            className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            placeholder="tu@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-stone-300 mb-2 flex items-center space-x-2">
                                            <Phone className="w-4 h-4" />
                                            <span>Teléfono *</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            disabled={procesando}
                                            className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            placeholder="+56 9 1234 5678"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Dirección de Entrega */}
                            <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 border-2 border-stone-800 shadow-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="bg-gradient-to-br from-teal-600 to-cyan-600 w-10 h-10 rounded-xl flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-black text-stone-100">Dirección de Entrega</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-stone-300 mb-2">
                                            Calle *
                                        </label>
                                        <input
                                            type="text"
                                            value={calle}
                                            onChange={(e) => setCalle(e.target.value)}
                                            disabled={procesando}
                                            className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            placeholder="Ej: Av. Libertador Bernardo O'Higgins 123"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-stone-300 mb-2">
                                            Departamento (opcional)
                                        </label>
                                        <input
                                            type="text"
                                            value={departamento}
                                            onChange={(e) => setDepartamento(e.target.value)}
                                            disabled={procesando}
                                            className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            placeholder="Ej: 403"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-stone-300 mb-2">
                                                Región *
                                            </label>
                                            <select
                                                value={region}
                                                onChange={(e) => {
                                                    setRegion(e.target.value);
                                                    setComuna('');
                                                }}
                                                disabled={procesando}
                                                className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            >
                                                <option value="">Selecciona una región</option>
                                                {regiones.map(r => (
                                                    <option key={r} value={r}>{r}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-stone-300 mb-2">
                                                Comuna *
                                            </label>
                                            <select
                                                value={comuna}
                                                onChange={(e) => setComuna(e.target.value)}
                                                disabled={procesando || !region}
                                                className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            >
                                                <option value="">Selecciona una comuna</option>
                                                {region && comunas[region]?.map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-stone-300 mb-2">
                                            Indicaciones para la entrega (opcional)
                                        </label>
                                        <textarea
                                            value={indicaciones}
                                            onChange={(e) => setIndicaciones(e.target.value)}
                                            disabled={procesando}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all resize-none disabled:opacity-50"
                                            placeholder="Ej: Entregar entre 10AM y 2PM, no tiene timbre"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Botón de pago */}
                            <button
                                type="submit"
                                disabled={procesando}
                                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:from-stone-700 disabled:to-stone-700 text-white py-5 px-6 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {procesando ? (
                                    <>
                                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Procesando...</span>
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-6 h-6" />
                                        <span>Pagar ahora ${totalFinal.toLocaleString('es-CL')}</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Resumen del Pedido */}
                    <div className="lg:col-span-1">
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 border-2 border-stone-800 shadow-2xl sticky top-24 animate-scale-in">
                            <h2 className="text-2xl font-black text-stone-100 mb-6 pb-4 border-b-2 border-stone-800">
                                Resumen del Pedido
                            </h2>

                            {/* Productos */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {carrito.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3 pb-4 border-b border-stone-800">
                                        <div className="relative w-16 h-16 bg-stone-800 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.img}
                                                alt={item.nombre}
                                                fill
                                                sizes="64px"
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-stone-300 font-semibold truncate text-sm">{item.nombre}</p>
                                            <p className="text-stone-500 text-xs">Cantidad: {item.cantidad}</p>
                                        </div>
                                        <p className="text-stone-100 font-bold text-sm">
                                            ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Totales */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-stone-400">
                                    <span>Subtotal</span>
                                    <span className="text-stone-300 font-semibold">${total.toLocaleString('es-CL')}</span>
                                </div>
                                <div className="flex justify-between text-stone-400">
                                    <span>Envío</span>
                                    {envio === 0 ? (
                                        <span className="text-teal-400 font-semibold">Gratis</span>
                                    ) : (
                                        <span className="text-stone-300 font-semibold">${envio.toLocaleString('es-CL')}</span>
                                    )}
                                </div>
                                <div className="border-t-2 border-stone-800 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-stone-300 font-bold text-lg">Total</span>
                                        <span className="text-3xl font-black bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                                            ${totalFinal.toLocaleString('es-CL')}
                                        </span>
                                    </div>
                                    <p className="text-stone-500 text-xs mt-1">CLP</p>
                                </div>
                            </div>

                            {/* Info de envío */}
                            {envio === 0 && (
                                <div className="bg-teal-900/30 border border-teal-700/50 text-teal-400 px-4 py-3 rounded-xl text-sm">
                                    <p className="font-bold flex items-center space-x-2">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>¡Envío gratis!</span>
                                    </p>
                                    <p className="text-teal-300 text-xs mt-1">Por compras sobre $50.000</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}