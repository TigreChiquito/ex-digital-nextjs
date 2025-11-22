'use client';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

interface CreateDiscountRequest {
    name: string;
    discount: number;
    startDate: string;
    endDate: string;
    description: string;
}

interface DiscountDto {
    discountId: number;
    name: string;
    discount: number;
    startDate: string;
    endDate: string;
    description: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// obtenerTodosDescuentos: obtiene todos los descuentos (requiere rol ADMIN)
export async function obtenerTodosDescuentos(): Promise<ApiResponse<DiscountDto[]>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch('https://exdigital-api-production.up.railway.app/api/discounts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Descuentos obtenidos:', data);
        return { success: true, data: data.data || data };
    } catch (error) {
        console.error('Error al obtener descuentos:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// obtenerDescuentosActivos: obtiene solo los descuentos activos (público)
export async function obtenerDescuentosActivos(): Promise<ApiResponse<DiscountDto[]>> {
    try {
        const response = await fetch('https://exdigital-api-production.up.railway.app/api/discounts/active', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Descuentos activos obtenidos:', data);
        return { success: true, data: data.data || data };
    } catch (error) {
        console.error('Error al obtener descuentos activos:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// obtenerDescuentoPorId: obtiene un descuento específico por su ID (público)
export async function obtenerDescuentoPorId(discountId: number): Promise<ApiResponse<DiscountDto>> {
    try {
        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/discounts/${discountId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Descuento obtenido:', data);
        return { success: true, data: data.data };
    } catch (error) {
        console.error('Error al obtener descuento:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// crearDescuento: crea un nuevo descuento (requiere rol ADMIN)
export async function crearDescuento(descuento: CreateDiscountRequest): Promise<ApiResponse<DiscountDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        console.log('Creando descuento:', descuento);

        const response = await fetch('https://exdigital-api-production.up.railway.app/api/discounts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(descuento)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Descuento creado:', data);
        return { success: true, data: data.data, message: data.message };
    } catch (error) {
        console.error('Error al crear descuento:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// actualizarDescuento: actualiza un descuento existente (requiere rol ADMIN)
export async function actualizarDescuento(discountId: number, descuento: CreateDiscountRequest): Promise<ApiResponse<DiscountDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        console.log('Actualizando descuento:', discountId, descuento);

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/discounts/${discountId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(descuento)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Descuento actualizado:', data);
        return { success: true, data: data.data, message: data.message };
    } catch (error) {
        console.error('Error al actualizar descuento:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// activarDescuento: activa un descuento (requiere rol ADMIN)
export async function activarDescuento(discountId: number): Promise<ApiResponse<void>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        console.log('Activando descuento:', discountId);

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/discounts/${discountId}/activate`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Descuento activado:', data);
        return { success: true, message: data.message };
    } catch (error) {
        console.error('Error al activar descuento:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// desactivarDescuento: desactiva un descuento (requiere rol ADMIN)
export async function desactivarDescuento(discountId: number): Promise<ApiResponse<void>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        console.log('Desactivando descuento:', discountId);

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/discounts/${discountId}/deactivate`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Descuento desactivado:', data);
        return { success: true, message: data.message };
    } catch (error) {
        console.error('Error al desactivar descuento:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

export type { ApiResponse, CreateDiscountRequest, DiscountDto };
