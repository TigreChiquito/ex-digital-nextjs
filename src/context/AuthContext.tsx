'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definir tipos
export interface Usuario {
    nombre?: string;
    email: string;
    password?: string;
}

interface AuthContextType {
    usuario: Usuario | null;
    iniciarSesion: (datosUsuario: Usuario) => void;
    cerrarSesion: () => void;
    estaLogueado: () => boolean;
    isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuarioLogueado');
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            if (usuario) {
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
            } else {
                localStorage.removeItem('usuarioLogueado');
            }
        }
    }, [usuario, isLoaded]);

    const iniciarSesion = (datosUsuario: Usuario) => {
        setUsuario(datosUsuario);
    };

    const cerrarSesion = () => {
        setUsuario(null);
    };

    const estaLogueado = (): boolean => {
        return usuario !== null;
    };

    return (
        <AuthContext.Provider value={{
            usuario,
            iniciarSesion,
            cerrarSesion,
            estaLogueado,
            isLoaded
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
}