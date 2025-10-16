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
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            src="/img/utilidades/1da7323a-a0f4-4f5c-90a1-5844b22203c5.png"
                            alt="Logo"
                            className="w-12 h-12"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                            Inicio
                        </Link>
                        <Link href="/productos" className="text-gray-700 hover:text-blue-600 transition">
                            Productos
                        </Link>
                        <Link href="/nosotros" className="text-gray-700 hover:text-blue-600 transition">
                            Nosotros
                        </Link>
                        <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition">
                            Blog
                        </Link>
                        <Link href="/contacto" className="text-gray-700 hover:text-blue-600 transition">
                            Contacto
                        </Link>

                        {/* Carrito */}
                        <Link href="/carrito" className="relative text-gray-700 hover:text-blue-600 transition">
                            <ShoppingCart className="w-6 h-6" />
                            {cantidadProductos > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cantidadProductos}
                                </span>
                            )}
                        </Link>

                        {/* Usuario */}
                        {estaLogueado() ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                                >
                                    <User className="w-6 h-6" />
                                    <span className="text-sm">{usuario?.nombre || usuario?.email}</span>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                        <button
                                            onClick={handleCerrarSesion}
                                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Cerrar Sesión</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
                                    Login
                                </Link>
                                <Link
                                    href="/registro"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Registro
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <Link
                            href="/"
                            className="block py-2 text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/productos"
                            className="block py-2 text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Productos
                        </Link>
                        <Link
                            href="/nosotros"
                            className="block py-2 text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Nosotros
                        </Link>
                        <Link
                            href="/blog"
                            className="block py-2 text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contacto"
                            className="block py-2 text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Contacto
                        </Link>
                        <Link
                            href="/carrito"
                            className="block py-2 text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Carrito ({cantidadProductos})
                        </Link>

                        {estaLogueado() ? (
                            <>
                                <div className="py-2 text-gray-700 font-medium">
                                    {usuario?.nombre || usuario?.email}
                                </div>
                                <button
                                    onClick={() => {
                                        handleCerrarSesion();
                                        setIsOpen(false);
                                    }}
                                    className="block w-full text-left py-2 text-red-600"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block py-2 text-gray-700 hover:text-blue-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/registro"
                                    className="block py-2 text-gray-700 hover:text-blue-600"
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
    );
}