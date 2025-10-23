'use client';

import Link from 'next/link';
import { Users, Truck, Shield, Target, Heart, Zap, CheckCircle } from 'lucide-react';

export default function NosotrosPage() {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-5xl">
                {/* Header */}
                <header className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-teal-400 bg-clip-text text-transparent">
                            Acerca de Nosotros
                        </span>
                    </h1>
                    <p className="text-stone-400 text-xl md:text-2xl">
                        Tu tienda confiable de periféricos gaming y tecnología
                    </p>
                </header>

                {/* ¿Quiénes Somos? */}
                <section className="mb-16 animate-slide-up">
                    <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-stone-800 shadow-2xl">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-gradient-to-br from-orange-600 to-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-black text-stone-100">¿Quiénes Somos?</h2>
                        </div>

                        <div className="space-y-4 text-stone-300 leading-relaxed text-lg">
                            <p>
                                Somos una tienda especializada en periféricos para gaming y computación, dedicada a ofrecer productos de alta calidad para jugadores y entusiastas de la tecnología.
                            </p>
                            <p>
                                Desde 2018, nos hemos enfocado en brindar una experiencia de compra confiable, con productos originales de las mejores marcas y un servicio al cliente excepcional.
                            </p>
                            <p>
                                Nuestro equipo está formado por gamers apasionados que entienden las necesidades de la comunidad y pueden asesorarte para encontrar el equipo perfecto para tu setup.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ¿Por Qué Elegirnos? */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-4">
                            ¿Por Qué Elegirnos?
                        </h2>
                        <p className="text-stone-400 text-lg">
                            Lo que nos hace diferentes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Value 1 */}
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 border-2 border-stone-800 hover:border-orange-600 transition-all shadow-lg group animate-scale-in">
                            <div className="bg-gradient-to-br from-orange-600 to-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Target className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-100 mb-3 flex items-center space-x-2">
                                <span>🎮</span>
                                <span>Especialización Gaming</span>
                            </h3>
                            <p className="text-stone-400">
                                Conocemos el mundo gaming y seleccionamos solo los mejores productos para cada tipo de jugador.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 border-2 border-stone-800 hover:border-teal-600 transition-all shadow-lg group animate-scale-in" style={{ animationDelay: '0.1s' }}>
                            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-100 mb-3 flex items-center space-x-2">
                                <span>✅</span>
                                <span>Productos Originales</span>
                            </h3>
                            <p className="text-stone-400">
                                Trabajamos directamente con distribuidores oficiales para garantizar la autenticidad de todos nuestros productos.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 border-2 border-stone-800 hover:border-blue-600 transition-all shadow-lg group animate-scale-in" style={{ animationDelay: '0.2s' }}>
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Truck className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-100 mb-3 flex items-center space-x-2">
                                <span>🚚</span>
                                <span>Envío Rápido</span>
                            </h3>
                            <p className="text-stone-400">
                                Procesamos y enviamos tu pedido en 24-48 horas para que recibas tu equipo lo antes posible.
                            </p>
                        </div>

                        {/* Value 4 */}
                        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 border-2 border-stone-800 hover:border-purple-600 transition-all shadow-lg group animate-scale-in" style={{ animationDelay: '0.3s' }}>
                            <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-stone-100 mb-3 flex items-center space-x-2">
                                <span>🛡️</span>
                                <span>Garantía Oficial</span>
                            </h3>
                            <p className="text-stone-400">
                                Todos nuestros productos incluyen garantía del fabricante y soporte técnico personalizado.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Nuestro Compromiso */}
                <section className="mb-16 animate-fade-in">
                    <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-stone-800 shadow-2xl">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 w-12 h-12 rounded-2xl flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-black text-stone-100">Nuestro Compromiso</h2>
                        </div>

                        <div className="space-y-4 text-stone-300 leading-relaxed text-lg">
                            <p>
                                Nos comprometemos a ofrecerte la mejor experiencia de compra posible. Desde la selección de productos hasta el servicio post-venta, trabajamos para que tengas total confianza en tu compra.
                            </p>
                            <p>
                                Si tienes alguna duda sobre compatibilidad, instalación o cualquier aspecto técnico, nuestro equipo de soporte está aquí para ayudarte.
                            </p>
                            <p>
                                Tu satisfacción es nuestra prioridad, y trabajamos todos los días para mantener la confianza que has depositado en nosotros.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <div className="text-center animate-scale-in">
                    <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-teal-600 rounded-3xl p-12 shadow-2xl border-2 border-orange-500/50">
                        <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Zap className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            ¿Listo para mejorar tu setup?
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Explora nuestro catálogo y encuentra el equipo perfecto para ti
                        </p>
                        <Link
                            href="/productos"
                            className="inline-block bg-white text-orange-600 px-10 py-5 rounded-2xl font-black text-xl hover:bg-stone-100 transition-all shadow-2xl hover:scale-105"
                        >
                            Ver Productos
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        );
    }