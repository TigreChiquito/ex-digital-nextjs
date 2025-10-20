'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ContactoPage() {
    const { usuario, estaLogueado } = useAuth();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState('');

    // Auto-completar datos del usuario logueado
    useEffect(() => {
        if (estaLogueado() && usuario) {
            setNombre(usuario.nombre || '');
            setEmail(usuario.email || '');
        }
    }, [usuario, estaLogueado]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        // Validaciones
        if (!nombre || !email || !asunto || !mensaje) {
            setError('Por favor, completa todos los campos');
            return;
        }

        if (!email.includes('@')) {
            setError('Por favor, ingresa un email válido');
            return;
        }

        if (mensaje.length < 10) {
            setError('El mensaje debe tener al menos 10 caracteres');
            return;
        }

        // Simular envío (aquí irías a tu API)
        console.log('Mensaje enviado:', { nombre, email, asunto, mensaje });

        // Mostrar mensaje de éxito
        setEnviado(true);

        // Reset form después de 3 segundos
        setTimeout(() => {
            setNombre('');
            setEmail('');
            setAsunto('');
            setMensaje('');
            setEnviado(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                        <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-teal-400 bg-clip-text text-transparent">
                            Contáctanos
                        </span>
                    </h1>
                    <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto">
                        ¿Tienes alguna pregunta? Estamos aquí para ayudarte
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Información de Contacto */}
                    <div className="lg:col-span-1 space-y-6 animate-slide-up">
                        {/* Card de Email */}
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-stone-800 hover:border-orange-600 transition-all shadow-lg group">
                            <div className="bg-gradient-to-br from-orange-600 to-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <Mail className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-100 mb-2">Email</h3>
                            <p className="text-stone-400 mb-2">Escríbenos directamente</p>
                            <a
                                href="mailto:contacto@ExDigital.cl"
                                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors break-all"
                            >
                                contacto@ExDigital.cl
                            </a>
                        </div>

                        {/* Card de Teléfono */}
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-stone-800 hover:border-teal-600 transition-all shadow-lg group">
                            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <Phone className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-100 mb-2">Teléfono</h3>
                            <p className="text-stone-400 mb-2">Llámanos</p>
                            <a
                                href="tel:+56912345678"
                                className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
                            >
                                +56 9 1234 5678
                            </a>
                        </div>

                        {/* Card de Horario */}
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-6 border-2 border-stone-800 hover:border-purple-600 transition-all shadow-lg group">
                            <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                <Clock className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-100 mb-2">Horario</h3>
                            <p className="text-stone-400 text-sm">
                                Lunes - Viernes<br />
                                <span className="text-purple-400 font-semibold">9:00 - 18:00</span>
                            </p>
                            <p className="text-stone-400 text-sm mt-2">
                                Sábado<br />
                                <span className="text-purple-400 font-semibold">10:00 - 14:00</span>
                            </p>
                        </div>
                    </div>

                    {/* Formulario de Contacto */}
                    <div className="lg:col-span-2 animate-scale-in">
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 md:p-10 border-2 border-stone-800 shadow-2xl">
                            <div className="mb-8">
                                <h2 className="text-3xl font-black text-stone-100 mb-2">Envíanos un Mensaje</h2>
                                <p className="text-stone-400">Responderemos lo antes posible</p>
                            </div>

                            {/* Mensaje de éxito */}
                            {enviado && (
                                <div className="mb-6 bg-teal-900/50 border-2 border-teal-700 text-teal-200 px-6 py-4 rounded-2xl animate-scale-in flex items-center space-x-3">
                                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                                    <div>
                                        <p className="font-bold">¡Mensaje enviado con éxito!</p>
                                        <p className="text-sm">Te responderemos pronto</p>
                                    </div>
                                </div>
                            )}

                            {/* Error message */}
                            {error && (
                                <div className="mb-6 bg-red-900/50 border-2 border-red-700 text-red-200 px-6 py-4 rounded-2xl animate-shake">
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Mensaje informativo para usuario logueado */}
                                {estaLogueado() && !enviado && (
                                    <div className="bg-teal-900/30 border-2 border-teal-700/50 text-teal-200 px-4 py-3 rounded-2xl animate-fade-in flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                        <p className="text-sm">
                                            Hemos rellenado tus datos automáticamente. Puedes editarlos si lo necesitas.
                                        </p>
                                    </div>
                                )}

                                {/* Nombre */}
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-bold text-stone-300 mb-2 uppercase tracking-wide flex items-center space-x-2">
                                        <span>Nombre Completo</span>
                                        {estaLogueado() && usuario?.nombre && (
                                            <span className="text-xs bg-teal-900/50 text-teal-400 px-2 py-0.5 rounded-full">Auto-completado</span>
                                        )}
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                        <input
                                            type="text"
                                            id="nombre"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            disabled={enviado}
                                            className="w-full pl-12 pr-4 py-4 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-stone-300 mb-2 uppercase tracking-wide flex items-center space-x-2">
                                        <span>Email</span>
                                        {estaLogueado() && usuario?.email && (
                                            <span className="text-xs bg-teal-900/50 text-teal-400 px-2 py-0.5 rounded-full">Auto-completado</span>
                                        )}
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={enviado}
                                            className="w-full pl-12 pr-4 py-4 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                {/* Asunto */}
                                <div>
                                    <label htmlFor="asunto" className="block text-sm font-bold text-stone-300 mb-2 uppercase tracking-wide">
                                        Asunto
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                        <input
                                            type="text"
                                            id="asunto"
                                            value={asunto}
                                            onChange={(e) => setAsunto(e.target.value)}
                                            disabled={enviado}
                                            className="w-full pl-12 pr-4 py-4 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all disabled:opacity-50"
                                            placeholder="¿En qué podemos ayudarte?"
                                        />
                                    </div>
                                </div>

                                {/* Mensaje */}
                                <div>
                                    <label htmlFor="mensaje" className="block text-sm font-bold text-stone-300 mb-2 uppercase tracking-wide">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="mensaje"
                                        value={mensaje}
                                        onChange={(e) => setMensaje(e.target.value)}
                                        disabled={enviado}
                                        rows={6}
                                        className="w-full px-4 py-4 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all resize-none disabled:opacity-50"
                                        placeholder="Escribe tu mensaje aquí..."
                                    />
                                </div>

                                {/* Botón de enviar */}
                                <button
                                    type="submit"
                                    disabled={enviado}
                                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-stone-700 disabled:to-stone-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:shadow-orange-600/50 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {enviado ? (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            <span>Enviado</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Enviar Mensaje</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}