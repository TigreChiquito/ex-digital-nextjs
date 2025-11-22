'use client';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

interface OrderItemRequest {
    productId: number;
    quantity: number;
}

interface CreateOrderRequest {
    userId: number;
    paymentMethod: string;
    shippingAddress: string;
    notes?: string;
    items: OrderItemRequest[];
}

interface OrderItemDto {
    orderItemId: number;
    productId: number;
    productName?: string;
    quantity: number;
    price: number;
    subtotal: number;
}

interface OrderDto {
    orderId: number;
    orderNumber: string;
    userId: number;
    userName?: string;
    userEmail?: string;
    status: string;
    total: number;
    paymentMethod: string;
    shippingAddress: string;
    notes?: string;
    items: OrderItemDto[];
    createdAt: string;
    updatedAt?: string;
}

// obtenerTodasOrdenes: obtiene todas las órdenes (requiere rol ADMIN)
export async function obtenerTodasOrdenes(): Promise<ApiResponse<OrderDto[]>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch('https://exdigital-api-production.up.railway.app/api/orders', {
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
        console.log('Órdenes obtenidas:', data);
        return { success: true, data: data.data || data };
    } catch (error) {
        console.error('Error al obtener órdenes:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// obtenerOrdenesPorUsuario: obtiene órdenes de un usuario específico (ADMIN o propio usuario)
export async function obtenerOrdenesPorUsuario(userId: number): Promise<ApiResponse<OrderDto[]>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/orders/user/${userId}`, {
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
        console.log('Órdenes del usuario obtenidas:', data);
        return { success: true, data: data.data || data };
    } catch (error) {
        console.error('Error al obtener órdenes del usuario:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// obtenerMisOrdenes: obtiene las órdenes del usuario autenticado
export async function obtenerMisOrdenes(): Promise<ApiResponse<OrderDto[]>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch('https://exdigital-api-production.up.railway.app/api/orders/my-orders', {
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
        console.log('Mis órdenes obtenidas:', data);
        return { success: true, data: data.data || data };
    } catch (error) {
        console.error('Error al obtener mis órdenes:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// obtenerOrdenesPorEstado: obtiene órdenes filtradas por estado (requiere rol ADMIN)
export async function obtenerOrdenesPorEstado(status: string): Promise<ApiResponse<OrderDto[]>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/orders/status/${status}`, {
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
        console.log('Órdenes por estado obtenidas:', data);
        return { success: true, data: data.data || data };
    } catch (error) {
        console.error('Error al obtener órdenes por estado:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// obtenerOrdenPorId: obtiene una orden específica por su ID (usuario debe ser propietario o ADMIN)
export async function obtenerOrdenPorId(orderId: number): Promise<ApiResponse<OrderDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/orders/${orderId}`, {
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
        console.log('Orden obtenida:', data);
        return { success: true, data: data.data };
    } catch (error) {
        console.error('Error al obtener orden:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// obtenerOrdenPorNumero: obtiene una orden por su número de orden (usuario debe ser propietario o ADMIN)
export async function obtenerOrdenPorNumero(orderNumber: string): Promise<ApiResponse<OrderDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/orders/order-number/${orderNumber}`, {
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
        console.log('Orden obtenida por número:', data);
        return { success: true, data: data.data };
    } catch (error) {
        console.error('Error al obtener orden por número:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// crearOrden: crea una nueva orden (usuario debe crear para sí mismo, excepto ADMIN)
export async function crearOrden(orden: CreateOrderRequest): Promise<ApiResponse<OrderDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        console.log('Creando orden:', orden);

        const response = await fetch('https://exdigital-api-production.up.railway.app/api/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orden)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Orden creada:', data);
        return { success: true, data: data.data, message: data.message };
    } catch (error) {
        console.error('Error al crear orden:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// actualizarEstadoOrden: actualiza el estado de una orden (requiere rol ADMIN)
export async function actualizarEstadoOrden(orderId: number, status: string): Promise<ApiResponse<OrderDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        console.log('Actualizando estado de orden:', orderId, status);

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/orders/${orderId}/status?status=${encodeURIComponent(status)}`, {
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
        console.log('Estado de orden actualizado:', data);
        return { success: true, data: data.data, message: data.message };
    } catch (error) {
        console.error('Error al actualizar estado de orden:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

export type { 
    ApiResponse, 
    CreateOrderRequest, 
    OrderItemRequest,
    OrderDto, 
    OrderItemDto 
};
