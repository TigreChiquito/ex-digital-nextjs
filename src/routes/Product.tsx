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
    value?: number; // Puede venir como value
    price?: number; // O como price
    categoryId: number;
    categoryName?: string;
    description: string;
    stock: number;
    discountId?: number;
    discountPercentage?: number;
}

// obtenerProductos: realiza una llamada a la API para obtener la lista de productos
export async function obtenerProductos(): Promise<ApiResponse<ProductDto[]>> {
    try {
        console.log('Iniciando petición a la API...');
        const response = await fetch('https://exdigital-api-production.up.railway.app/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'no-cache'
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
        
        // Si hay error en los datos, mostrar mensaje más claro
        if (!data.success && data.message) {
            console.error('Error de la API:', data.message);
            // Extraer mensaje más legible del error SQL
            let errorMsg = data.message;
            if (errorMsg.includes('column') && errorMsg.includes('does not exist')) {
                errorMsg = 'Error en el backend: La base de datos necesita actualización. Contacte al administrador.';
            }
            return { success: false, message: errorMsg, data: [] };
        }
        
        // Normalizar los datos: asegurar que cada producto tenga 'value'
        const productos = (data.data || data || []).map((p: ProductDto) => ({
            ...p,
            value: p.value || p.price || 0
        }));
        
        console.log('Productos normalizados:', productos);
        return { success: true, data: productos };
    } catch (error) {
        console.error('Error en obtenerProductos:', error);
        console.error('Error completo:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
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

        console.log('Creando producto:', producto);

        const response = await fetch('https://exdigital-api-production.up.railway.app/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Producto creado:', data);
        return { success: true, data: data.data, message: data.message };
    } catch (error) {
        console.error('Error al crear producto:', error);
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

        console.log('Actualizando producto:', productId, producto);

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Producto actualizado:', data);
        return { success: true, data: data.data, message: data.message };
    } catch (error) {
        console.error('Error al actualizar producto:', error);
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

        console.log('Eliminando producto:', productId);

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/products/${productId}`, {
            method: 'DELETE',
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
        console.log('Producto eliminado:', data);
        return { success: true, message: data.message };
    } catch (error) {
        console.error('Error al eliminar producto:', error);
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
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Producto obtenido:', data);
        return { success: true, data: data.data };
    } catch (error) {
        console.error('Error al obtener producto:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// ajustarStock: aumenta o disminuye el stock de un producto (requiere rol ADMIN)
export async function ajustarStock(productId: number, cantidad: number): Promise<ApiResponse<ProductDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        console.log(`Ajustando stock del producto ${productId}: ${cantidad > 0 ? '+' : ''}${cantidad}`);

        // Primero obtener el producto actual
        const productoActual = await obtenerProductoPorId(productId);
        if (!productoActual.success || !productoActual.data) {
            return { success: false, message: 'No se pudo obtener el producto' };
        }

        // Calcular el nuevo stock
        const nuevoStock = productoActual.data.stock + cantidad;
        if (nuevoStock < 0) {
            return { success: false, message: 'Stock no puede ser negativo' };
        }

        // Actualizar el producto con el nuevo stock
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
        console.error('Error al ajustar stock:', error);
        return { success: false, message: 'Error al ajustar stock' };
    }
}