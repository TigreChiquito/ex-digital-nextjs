'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definir tipos
export interface Usuario {
    nombre?: string;
    email: string;
    password?: string;
    rol?: string;
}

interface AuthContextType {
    usuario: Usuario | null;
    iniciarSesion: (datosUsuario: Usuario) => void;
    cerrarSesion: () => void;
    estaLogueado: () => boolean;
    esAdmin: () => boolean;
    isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuarioLogueado');
        if (usuarioGuardado) {
            const user = JSON.parse(usuarioGuardado);
            // Sincronizar con el rol guardado en localStorage
            const userRole = localStorage.getItem('userRole');
            if (userRole && !user.rol) {
                user.rol = userRole;
            }
            setUsuario(user);
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

    const esAdmin = (): boolean => {
        if (usuario === null) {
            console.log('❌ esAdmin: Usuario es null');
            return false;
        }
        
        // Verificar rol desde localStorage (viene de la API)
        const userRole = localStorage.getItem('userRole');
        console.log('🔍 Verificando admin:', { 
            usuarioRol: usuario.rol, 
            localStorageRole: userRole,
            email: usuario.email 
        });
        
        if (userRole && userRole.toUpperCase() === 'ADMIN') {
            console.log('✅ Es admin por localStorage');
            return true;
        }
        
        // Verificar rol en el objeto usuario
        if (usuario.rol && usuario.rol.toUpperCase() === 'ADMIN') {
            console.log('✅ Es admin por objeto usuario');
            return true;
        }
        
        // Fallback: lista de emails con permisos de admin (por si acaso)
        const adminEmails = ['admin@duoc.cl', 'admin@gmail.com', 'profesor@duoc.cl'];
        if (adminEmails.includes(usuario.email.toLowerCase())) {
            console.log('✅ Es admin por email en lista');
            return true;
        }
        
        console.log('❌ No es admin');
        return false;
    };

    return (
        <AuthContext.Provider value={{
            usuario,
            iniciarSesion,
            cerrarSesion,
            estaLogueado,
            esAdmin,
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