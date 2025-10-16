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
            <nav className="bg-zinc-700/80 backdrop-blur-md shadow-xl rounded-2xl max-w-7xl mx-auto border border-white/10">
                <div className="px-6">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <img
                                src="/img/utilidades/1da7323a-a0f4-4f5c-90a1-5844b22203c5.png"
                                alt="Logo"
                                className="w-12 h-12 rounded-full ring-2 ring-white/20 hover:ring-white/40 transition-all hover:scale-110"
                            />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Link href="/" className="text-white/90 hover:text-white font-medium transition-colors hover:drop-shadow-lg">
                                Inicio
                            </Link>
                            <Link href="/productos" className="text-white/90 hover:text-white font-medium transition-colors hover:drop-shadow-lg">
                                Productos
                            </Link>
                            <Link href="/nosotros" className="text-white/90 hover:text-white font-medium transition-colors hover:drop-shadow-lg">
                                Nosotros
                            </Link>
                            <Link href="/blog" className="text-white/90 hover:text-white font-medium transition-colors hover:drop-shadow-lg">
                                Blog
                            </Link>
                            <Link href="/contacto" className="text-white/90 hover:text-white font-medium transition-colors hover:drop-shadow-lg">
                                Contacto
                            </Link>

                            {/* Carrito */}
                            <Link href="/carrito" className="relative text-white/90 hover:text-white transition-colors hover:scale-110">
                                <ShoppingCart className="w-6 h-6" />
                                {cantidadProductos > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                                        {cantidadProductos}
                                    </span>
                                )}
                            </Link>

                            {/* Usuario */}
                            {estaLogueado() ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 text-white/90 hover:text-white transition-all bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 border border-white/10"
                                    >
                                        <User className="w-5 h-5" />
                                        <span className="text-sm font-medium">{usuario?.nombre || usuario?.email}</span>
                                    </button>

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-zinc-800/90 backdrop-blur-md rounded-lg shadow-2xl py-2 z-50 border border-white/10 animate-scale-in">
                                            <button
                                                onClick={handleCerrarSesion}
                                                className="w-full px-4 py-2 text-left text-red-400 hover:bg-white/10 flex items-center space-x-2 transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Cerrar Sesión</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-white/90 hover:text-white font-medium transition-colors hover:drop-shadow-lg"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/registro"
                                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105"
                                    >
                                        Registro
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-white hover:text-white/80 transition-colors hover:scale-110 bg-white/10 p-2 rounded-lg backdrop-blur-sm"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="md:hidden pb-4 space-y-2 border-t border-white/10 pt-4 animate-slide-up">
                            <Link
                                href="/"
                                className="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Inicio
                            </Link>
                            <Link
                                href="/productos"
                                className="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Productos
                            </Link>
                            <Link
                                href="/nosotros"
                                className="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Nosotros
                            </Link>
                            <Link
                                href="/blog"
                                className="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link
                                href="/contacto"
                                className="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Contacto
                            </Link>
                            <Link
                                href="/carrito"
                                className="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Carrito ({cantidadProductos})
                            </Link>

                            {estaLogueado() ? (
                                <>
                                    <div className="py-2 px-4 text-white font-medium bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                                        {usuario?.nombre || usuario?.email}
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleCerrarSesion();
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-left py-2 px-4 text-red-400 hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block py-2 px-4 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors backdrop-blur-sm"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/registro"
                                        className="block py-2 px-4 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all text-center font-medium shadow-lg"
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