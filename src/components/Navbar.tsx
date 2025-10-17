'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
    const { obtenerCantidadTotal } = useCart();
    const { usuario, cerrarSesion, estaLogueado } = useAuth();

    const cantidadProductos = obtenerCantidadTotal();

    const handleCerrarSesion = () => {
        cerrarSesion();
        setShowUserMenu(false);
    };

    return (
        <div className="w-full py-4 px-4">
            <nav className="bg-stone-900/90 backdrop-blur-md shadow-2xl rounded-3xl max-w-7xl mx-auto border-2 border-stone-800 glow-orange">
                <div className="px-6">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-orange-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <img
                                    src="/img/utilidades/1da7323a-a0f4-4f5c-90a1-5844b22203c5.png"
                                    alt="Logo"
                                    className="relative w-14 h-14 rounded-full ring-2 ring-orange-600 group-hover:ring-orange-500 transition-all group-hover:scale-110 shadow-lg"
                                />
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            <Link
                                href="/"
                                className="text-stone-300 hover:text-orange-400 font-semibold transition-all px-4 py-2 rounded-xl hover:bg-stone-800"
                            >
                                Inicio
                            </Link>
                            <Link
                                href="/productos"
                                className="text-stone-300 hover:text-orange-400 font-semibold transition-all px-4 py-2 rounded-xl hover:bg-stone-800"
                            >
                                Productos
                            </Link>
                            <Link
                                href="/nosotros"
                                className="text-stone-300 hover:text-orange-400 font-semibold transition-all px-4 py-2 rounded-xl hover:bg-stone-800"
                            >
                                Nosotros
                            </Link>
                            <Link
                                href="/blog"
                                className="text-stone-300 hover:text-orange-400 font-semibold transition-all px-4 py-2 rounded-xl hover:bg-stone-800"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/contacto"
                                className="text-stone-300 hover:text-orange-400 font-semibold transition-all px-4 py-2 rounded-xl hover:bg-stone-800"
                            >
                                Contacto
                            </Link>

                            {/* Separador */}
                            <div className="h-8 w-px bg-stone-700 mx-2"></div>

                            {/* Carrito */}
                            <Link
                                href="/carrito"
                                className="relative text-stone-300 hover:text-teal-400 transition-all hover:scale-110 p-2"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {cantidadProductos > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-stone-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse">
                                        {cantidadProductos}
                                    </span>
                                )}
                            </Link>

                            {/* Usuario */}
                            {estaLogueado() ? (
                                <div className="relative ml-2">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 text-stone-300 hover:text-orange-400 transition-all bg-stone-800/50 px-4 py-2 rounded-xl hover:bg-stone-800 backdrop-blur-sm border border-stone-700"
                                    >
                                        <User className="w-5 h-5" />
                                        <span className="text-sm font-semibold">{usuario?.nombre || usuario?.email}</span>
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-stone-900 rounded-2xl shadow-2xl py-2 z-50 border-2 border-stone-700 animate-scale-in">
                                            <button
                                                onClick={handleCerrarSesion}
                                                className="w-full px-4 py-2 text-left text-red-400 hover:bg-stone-800 flex items-center space-x-2 transition-colors rounded-xl mx-1"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span className="font-medium">Cerrar Sesión</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-stone-300 hover:text-orange-400 font-semibold transition-all px-4 py-2 rounded-xl hover:bg-stone-800 ml-2"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/registro"
                                        className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-5 py-2 rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all font-bold shadow-lg hover:shadow-xl hover:scale-105"
                                    >
                                        Registro
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-stone-300 hover:text-orange-400 transition-colors hover:scale-110 bg-stone-800/50 p-2 rounded-xl backdrop-blur-sm border border-stone-700"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden pb-4 space-y-2 border-t border-stone-800 pt-4 animate-slide-up">
                            <Link
                                href="/"
                                className="block py-3 px-4 text-stone-300 hover:text-orange-400 hover:bg-stone-800 rounded-xl transition-colors font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                Inicio
                            </Link>
                            <Link
                                href="/productos"
                                className="block py-3 px-4 text-stone-300 hover:text-orange-400 hover:bg-stone-800 rounded-xl transition-colors font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                Productos
                            </Link>
                            <Link
                                href="/nosotros"
                                className="block py-3 px-4 text-stone-300 hover:text-orange-400 hover:bg-stone-800 rounded-xl transition-colors font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                Nosotros
                            </Link>
                            <Link
                                href="/blog"
                                className="block py-3 px-4 text-stone-300 hover:text-orange-400 hover:bg-stone-800 rounded-xl transition-colors font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                href="/contacto"
                                className="block py-3 px-4 text-stone-300 hover:text-orange-400 hover:bg-stone-800 rounded-xl transition-colors font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                Contacto
                            </Link>
                            <Link
                                href="/carrito"
                                className="block py-3 px-4 text-stone-300 hover:text-teal-400 hover:bg-stone-800 rounded-xl transition-colors font-semibold"
                                onClick={() => setIsOpen(false)}
                            >
                                Carrito ({cantidadProductos})
                            </Link>

                            {estaLogueado() ? (
                                <>
                                    <div className="py-3 px-4 text-stone-200 font-bold bg-stone-800 rounded-xl backdrop-blur-sm border border-stone-700">
                                        {usuario?.nombre || usuario?.email}
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleCerrarSesion();
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-left py-3 px-4 text-red-400 hover:bg-stone-800 rounded-xl transition-colors font-semibold"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block py-3 px-4 text-stone-300 hover:text-orange-400 hover:bg-stone-800 rounded-xl transition-colors font-semibold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/registro"
                                        className="block py-3 px-4 text-white bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 rounded-xl transition-all text-center font-bold shadow-lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Registro
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}