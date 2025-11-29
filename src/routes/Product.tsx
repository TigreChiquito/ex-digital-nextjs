'use client';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface CreateProductRequest {
    name: string;
    value: number;
    categoryId: number;
    description: string;
    stock: number;
    discountId?: number | null;
}

export interface UpdateProductRequest extends CreateProductRequest {
    productId: number;
}

export interface ProductDto {
    productId: number;
    name: string;
    value?: number;
    price?: number;
    categoryId: number;
    categoryName?: string;
    description: string;
    stock: number;
    discountId?: number;
    discountPercentage?: number;
    primaryImage?: string;
    imageUrls?: string[];
    finalPrice?: number;
}

// obtenerProductos: realiza una llamada a la API para obtener la lista de productos
export async function obtenerProductos(): Promise<ApiResponse<ProductDto[]>> {
    try {
        const response = await fetch('https://exdigital-api-production.up.railway.app/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache'
        });

        if (!response.ok) {
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        
        if (!data.success && data.message) {
            return { success: false, message: data.message, data: [] };
        }
        
        // CORRECCIÓN CRÍTICA: Mapeo de campos del Backend (idProduct) al Frontend (productId)
        const productos = (data.data || data || []).map((p: any) => ({
            ...p,
            productId: p.idProduct, // Mapeamos idProduct a productId
            value: p.value || p.price || 0,
            primaryImage: p.primaryImage || null,
            imageUrls: p.imageUrls || []
        }));
        
        return { success: true, data: productos };
    } catch (error) {
        console.error('Error en obtenerProductos:', error);
        return { success: false, message: 'Error de conexión con la API', data: [] };
    }
}

// crearProducto: crea un nuevo producto (requiere rol ADMIN)
export async function crearProducto(producto: CreateProductRequest): Promise<ApiResponse<ProductDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch('https://exdigital-api-production.up.railway.app/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        // Mapear respuesta
        const productoCreado = data.data ? {
            ...data.data,
            productId: data.data.idProduct,
            value: data.data.value || data.data.price || 0
        } : null;

        return { success: true, data: productoCreado, message: data.message };
    } catch (error) {
        return { success: false, message: 'Error de conexión' };
    }
}

// actualizarProducto: actualiza un producto existente (requiere rol ADMIN)
export async function actualizarProducto(productId: number, producto: CreateProductRequest): Promise<ApiResponse<ProductDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        return { success: true, data: data.data, message: data.message };
    } catch (error) {
        return { success: false, message: 'Error de conexión' };
    }
}

// eliminarProducto: elimina un producto (requiere rol ADMIN)
export async function eliminarProducto(productId: number): Promise<ApiResponse<null>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        return { success: true, message: data.message };
    } catch (error) {
        return { success: false, message: 'Error de conexión' };
    }
}

// obtenerProductoPorId: obtiene un producto específico por su ID
export async function obtenerProductoPorId(productId: number): Promise<ApiResponse<ProductDto>> {
    try {
        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        
        let producto = null;
        if(data.data) {
             producto = {
                ...data.data,
                productId: data.data.idProduct,
                value: data.data.value || data.data.price || 0,
                primaryImage: data.data.primaryImage || null,
                imageUrls: data.data.imageUrls || []
            };
        }

        return { success: true, data: producto };
    } catch (error) {
        return { success: false, message: 'Error de conexión' };
    }
}

// ajustarStock: aumenta o disminuye el stock de un producto (requiere rol ADMIN)
export async function ajustarStock(productId: number, cantidad: number): Promise<ApiResponse<ProductDto>> {
    try {
        const productoActual = await obtenerProductoPorId(productId);
        if (!productoActual.success || !productoActual.data) {
            return { success: false, message: 'No se pudo obtener el producto' };
        }

        const nuevoStock = productoActual.data.stock + cantidad;
        if (nuevoStock < 0) {
            return { success: false, message: 'Stock no puede ser negativo' };
        }

        const productoActualizado: CreateProductRequest = {
            name: productoActual.data.name,
            value: productoActual.data.value || 0,
            categoryId: productoActual.data.categoryId,
            description: productoActual.data.description,
            stock: nuevoStock,
            discountId: productoActual.data.discountId || null
        };

        return await actualizarProducto(productId, productoActualizado);
    } catch (error) {
        return { success: false, message: 'Error al ajustar stock' };
    }
}