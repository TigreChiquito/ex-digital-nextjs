'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CheckCircle, Package, MapPin, Calendar, CreditCard, Mail, Phone, Home } from 'lucide-react';
import Link from 'next/link';

interface DatosCompra {
    cliente: {
        nombre: string;
        apellido: string;
        email: string;
        telefono: string;
    };
    direccion: {
        calle: string;
        departamento: string;
        region: string;
        comuna: string;
        indicaciones: string;
    };
    productos: Array<{
        nombre: string;
        precio: number;
        cantidad: number;
        img: string;
    }>;
    subtotal: number;
    envio: number;
    total: number;
    fecha: string;
    numeroOrden: string;
}

export default function BoletaPage() {
    const router = useRouter();
    const { vaciarCarrito } = useCart();
    const [datosCompra, setDatosCompra] = useState<DatosCompra | null>(null);

    useEffect(() => {
        // Obtener datos de la compra
        const datos = localStorage.getItem('ultimaCompra');
        
        if (!datos) {
            // Si no hay datos, redirigir al inicio
            router.push('/');
            return;
        }

        setDatosCompra(JSON.parse(datos));

        // Vaciar el carrito solo una vez
        vaciarCarrito();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Solo ejecutar una vez al montar el componente

    if (!datosCompra) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    const fechaFormateada = new Date(datosCompra.fecha).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Animación de éxito */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-6 animate-bounce-slow shadow-2xl shadow-green-600/50">
                        <CheckCircle className="w-16 h-16 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4">
                        <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                            ¡Compra Exitosa!
                        </span>
                    </h1>
                    <p className="text-stone-400 text-xl mb-2">
                        Tu pedido ha sido procesado correctamente
                    </p>
                    <p className="text-stone-500">
                        Recibirás un email de confirmación en breve
                    </p>
                </div>

                {/* Boleta */}
                <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl border-2 border-stone-800 shadow-2xl overflow-hidden animate-slide-up">
                    {/* Header de la boleta */}
                    <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-teal-600 p-8 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-3xl font-black">EX DIGITAL</h2>
                                <p className="text-white/90 text-sm">Tecnología y Gaming</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white/90 text-sm">Orden N°</p>
                                <p className="text-2xl font-bold">{datosCompra.numeroOrden}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 text-white/90">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{fechaFormateada}</span>
                        </div>
                    </div>

                    {/* Contenido de la boleta */}
                    <div className="p-8 space-y-8">
                        {/* Datos del cliente */}
                        <div>
                            <h3 className="text-xl font-bold text-stone-100 mb-4 flex items-center space-x-2">
                                <div className="bg-orange-600 w-8 h-8 rounded-lg flex items-center justify-center">
                                    <Package className="w-4 h-4 text-white" />
                                </div>
                                <span>Información del Cliente</span>
                            </h3>
                            <div className="bg-stone-800/50 rounded-2xl p-6 space-y-3">
                                <p className="text-stone-300">
                                    <strong className="text-stone-100">Nombre:</strong> {datosCompra.cliente.nombre} {datosCompra.cliente.apellido}
                                </p>
                                <p className="text-stone-300 flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-orange-400" />
                                    <span><strong className="text-stone-100">Email:</strong> {datosCompra.cliente.email}</span>
                                </p>
                                <p className="text-stone-300 flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-orange-400" />
                                    <span><strong className="text-stone-100">Teléfono:</strong> {datosCompra.cliente.telefono}</span>
                                </p>
                            </div>
                        </div>

                        {/* Dirección de envío */}
                        <div>
                            <h3 className="text-xl font-bold text-stone-100 mb-4 flex items-center space-x-2">
                                <div className="bg-teal-600 w-8 h-8 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-white" />
                                </div>
                                <span>Dirección de Envío</span>
                            </h3>
                            <div className="bg-stone-800/50 rounded-2xl p-6 space-y-2">
                                <p className="text-stone-300">
                                    <strong className="text-stone-100">Calle:</strong> {datosCompra.direccion.calle}
                                </p>
                                {datosCompra.direccion.departamento && (
                                    <p className="text-stone-300">
                                        <strong className="text-stone-100">Depto:</strong> {datosCompra.direccion.departamento}
                                    </p>
                                )}
                                <p className="text-stone-300">
                                    <strong className="text-stone-100">Comuna:</strong> {datosCompra.direccion.comuna}
                                </p>
                                <p className="text-stone-300">
                                    <strong className="text-stone-100">Región:</strong> {datosCompra.direccion.region}
                                </p>
                                {datosCompra.direccion.indicaciones && (
                                    <p className="text-stone-300 mt-3 pt-3 border-t border-stone-700">
                                        <strong className="text-stone-100">Indicaciones:</strong> {datosCompra.direccion.indicaciones}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Productos */}
                        <div>
                            <h3 className="text-xl font-bold text-stone-100 mb-4 flex items-center space-x-2">
                                <div className="bg-cyan-600 w-8 h-8 rounded-lg flex items-center justify-center">
                                    <CreditCard className="w-4 h-4 text-white" />
                                </div>
                                <span>Productos</span>
                            </h3>
                            <div className="bg-stone-800/50 rounded-2xl p-6 space-y-4">
                                {datosCompra.productos.map((producto, index) => (
                                    <div 
                                        key={index} 
                                        className="flex items-center space-x-4 pb-4 border-b border-stone-700 last:border-0 last:pb-0"
                                    >
                                        <div className="w-16 h-16 bg-stone-700 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={producto.img}
                                                alt={producto.nombre}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-stone-100 font-semibold">{producto.nombre}</p>
                                            <p className="text-stone-400 text-sm">Cantidad: {producto.cantidad}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-stone-100 font-bold">
                                                ${(producto.precio * producto.cantidad).toLocaleString('es-CL')}
                                            </p>
                                            <p className="text-stone-500 text-xs">
                                                ${producto.precio.toLocaleString('es-CL')} c/u
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Totales */}
                        <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl p-6 border-2 border-stone-700">
                            <div className="space-y-3">
                                <div className="flex justify-between text-stone-300">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${datosCompra.subtotal.toLocaleString('es-CL')}</span>
                                </div>
                                <div className="flex justify-between text-stone-300">
                                    <span>Envío</span>
                                    {datosCompra.envio === 0 ? (
                                        <span className="font-semibold text-teal-400">Gratis</span>
                                    ) : (
                                        <span className="font-semibold">${datosCompra.envio.toLocaleString('es-CL')}</span>
                                    )}
                                </div>
                                <div className="border-t-2 border-stone-700 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-stone-100 font-bold text-xl">Total Pagado</span>
                                        <span className="text-3xl font-black bg-gradient-to-r from-orange-400 to-teal-400 bg-clip-text text-transparent">
                                            ${datosCompra.total.toLocaleString('es-CL')}
                                        </span>
                                    </div>
                                    <p className="text-stone-500 text-xs text-right mt-1">CLP</p>
                                </div>
                            </div>
                        </div>

                        {/* Información adicional */}
                        <div className="bg-green-900/20 border-2 border-green-700/50 text-green-200 px-6 py-4 rounded-2xl">
                            <p className="font-bold text-green-100 mb-2">Estado del pedido:</p>
                            <p className="text-sm">Tu pedido está siendo preparado y será enviado en las próximas 24-48 horas hábiles. Recibirás un correo con el código de seguimiento.</p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-stone-950 p-8 border-t-2 border-stone-800">
                        <Link
                            href="/"
                            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-4 px-6 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                        >
                            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Volver al Inicio</span>
                        </Link>
                        <p className="text-center text-stone-500 text-sm mt-4">
                            Gracias por tu compra en EX Digital
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
