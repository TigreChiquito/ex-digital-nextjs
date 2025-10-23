'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { iniciarSesion } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        // Validaciones básicas
        if (!email || !password) {
            setError('Por favor, completa todos los campos');
            return;
        }

        if (!email.includes('@')) {
            setError('Por favor, ingresa un email válido');
            return;
        }

        // Aquí normalmente harías una llamada a tu API
        // Por ahora, simulamos un login exitoso
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuarioEncontrado = usuariosGuardados.find(
            (u: { email: string; password: string; nombre: string }) => u.email === email && u.password === password
        );

        if (usuarioEncontrado) {
            iniciarSesion({ email: usuarioEncontrado.email, nombre: usuarioEncontrado.nombre });

            // Mostrar notificación de éxito
            const notification = document.createElement('div');
            notification.className = 'fixed top-24 right-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-up flex items-center space-x-3 border border-teal-500';
            notification.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div>
          <p class="font-bold">¡Bienvenido!</p>
          <p class="text-sm opacity-90">Has iniciado sesión correctamente</p>
        </div>
      `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
                router.push('/');
            }, 1500);
        } else {
            setError('Email o contraseña incorrectos');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Card del formulario */}
                <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-stone-800 overflow-hidden animate-scale-in">
                    {/* Header con gradiente */}
                    <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-8 text-center">
                        <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                            <LogIn className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2">Iniciar Sesión</h1>
                        <p className="text-white/90">Accede a tu cuenta de Ex-Digital</p>
                    </div>

                    {/* Formulario */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error message */}
                            {error && (
                                <div className="bg-red-900/50 border-2 border-red-700 text-red-200 px-4 py-3 rounded-xl animate-shake">
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-stone-300 mb-2 uppercase tracking-wide">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-stone-300 mb-2 uppercase tracking-wide">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-4 bg-stone-800 border-2 border-stone-700 rounded-2xl text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-4 focus:ring-orange-900 focus:border-orange-600 transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Botón de login */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:shadow-orange-600/50 hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                <LogIn className="w-5 h-5" />
                                <span>Iniciar Sesión</span>
                            </button>
                        </form>

                        {/* Separador */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 h-px bg-stone-700"></div>
                            <span className="px-4 text-stone-500 text-sm font-medium">O</span>
                            <div className="flex-1 h-px bg-stone-700"></div>
                        </div>

                        {/* Link a registro */}
                        <div className="text-center">
                            <p className="text-stone-400 mb-3">¿No tienes una cuenta?</p>
                            <Link
                                href="/registro"
                                className="inline-block bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white py-3 px-6 rounded-xl font-bold transition-all border-2 border-stone-700 hover:border-orange-600"
                            >
                                Crear cuenta
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Link de volver */}
                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-stone-400 hover:text-orange-400 transition-colors font-medium"
                    >
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}