'use client';

// registrarUsuario: realiza una llamada a la API para registrar un nuevo usuario
export async function registrarUsuario(name: string, email: string, password: string) {
    try {
        const response = await fetch('http://exdigital-api-production.up.railway.app/api/auth/register', {
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

        const data = await response.json();

        if (data.success) {
            console.log('Usuario registrado:', data.data);
            // Guardar el token para usarlo después (solo funciona en el cliente)
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('userId', data.data.userId);
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
export async function loginUsuario(email: string, password: string) {
    try {
        const response = await fetch('http://exdigital-api-production.up.railway.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        if (data.success) {
            console.log('Usuario logueado:', data.data);
            // Guardar el token para usarlo después (solo funciona en el cliente)
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('userId', data.data.userId);
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