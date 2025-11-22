'use client';

interface AuthResponse {
    success: boolean;
    message?: string;
    data?: {
        token: string;
        userId: string;
        name?: string;
        email?: string;
        role?: string;
    };
}

// registrarUsuario: realiza una llamada a la API para registrar un nuevo usuario
export async function registrarUsuario(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
        const response = await fetch('https://exdigital-api-production.up.railway.app/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();

        if (data.success) {
            console.log('Usuario registrado:', data.data);
            // Guardar el token para usarlo después (solo funciona en el cliente)
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('userId', data.data.userId);
                localStorage.setItem('userName', data.data.name || name);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userRole', data.data.role || 'USER');
            }
            return { success: true, data: data.data };
        } else {
            console.error('Error:', data.message);
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// loginUsuario: realiza una llamada a la API para iniciar sesión de un usuario existente
export async function loginUsuario(email: string, password: string): Promise<AuthResponse> {
    try {
        const response = await fetch('https://exdigital-api-production.up.railway.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        if (data.success) {
            console.log('✅ Usuario logueado:', data.data);
            console.log('🔑 Rol recibido:', data.data.role);
            // Guardar el token para usarlo después (solo funciona en el cliente)
            if (typeof window !== 'undefined') {
                const rol = data.data.role || 'USER';
                console.log('💾 Guardando rol en localStorage:', rol);
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('userId', data.data.userId);
                localStorage.setItem('userName', data.data.name || '');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userRole', rol);
            }
            return { success: true, data: data.data };
        } else {
            console.error('Error:', data.message);
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// obtenerUsuarioActual: obtiene los datos del usuario actual desde localStorage
export function obtenerUsuarioActual(): { name: string; email: string } | null {
    if (typeof window === 'undefined') {
        return null;
    }
    
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userName && userEmail) {
        return { name: userName, email: userEmail };
    }
    
    return null;
}

// obtenerPerfilUsuario: obtiene el perfil completo del usuario desde la API usando el token
export async function obtenerPerfilUsuario(): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch('https://exdigital-api-production.up.railway.app/api/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP al obtener perfil:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('📋 Perfil de usuario obtenido:', data);
        
        if (data.success && data.data) {
            // Actualizar el rol en localStorage
            if (data.data.role) {
                console.log('🔄 Actualizando rol a:', data.data.role);
                localStorage.setItem('userRole', data.data.role);
            }
            return { success: true, data: data.data };
        }
        
        return { success: false, message: data.message || 'Error al obtener perfil' };
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        return { success: false, message: 'Error de conexión' };
    }
}