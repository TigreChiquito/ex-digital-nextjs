'use client';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

interface CreateCategoryRequest {
    name: string;
    description: string;
}

interface CategoryDto {
    categoryId: number;
    name: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

// obtenerTodasCategorias: obtiene todas las categorías (público)
export async function obtenerTodasCategorias(): Promise<ApiResponse<CategoryDto[]>> {
    try {
        const response = await fetch('https://exdigital-api-production.up.railway.app/api/categories', {
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
        console.log('Categorías obtenidas:', data);
        return { success: true, data: data.data || data };
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// obtenerCategoriaPorId: obtiene una categoría específica por su ID (público)
export async function obtenerCategoriaPorId(categoryId: number): Promise<ApiResponse<CategoryDto>> {
    try {
        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/categories/${categoryId}`, {
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
        console.log('Categoría obtenida:', data);
        return { success: true, data: data.data };
    } catch (error) {
        console.error('Error al obtener categoría:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// crearCategoria: crea una nueva categoría (requiere rol ADMIN)
export async function crearCategoria(categoria: CreateCategoryRequest): Promise<ApiResponse<CategoryDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        console.log('Creando categoría:', categoria);

        const response = await fetch('https://exdigital-api-production.up.railway.app/api/categories', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Categoría creada:', data);
        return { success: true, data: data.data, message: data.message };
    } catch (error) {
        console.error('Error al crear categoría:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// actualizarCategoria: actualiza una categoría existente (requiere rol ADMIN)
export async function actualizarCategoria(categoryId: number, categoria: CreateCategoryRequest): Promise<ApiResponse<CategoryDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        console.log('Actualizando categoría:', categoryId, categoria);

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        console.log('Categoría actualizada:', data);
        return { success: true, data: data.data, message: data.message };
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

// eliminarCategoria: elimina una categoría (requiere rol ADMIN)
export async function eliminarCategoria(categoryId: number): Promise<ApiResponse<void>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        console.log('Eliminando categoría:', categoryId);

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/categories/${categoryId}`, {
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
        console.log('Categoría eliminada:', data);
        return { success: true, message: data.message };
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        return { success: false, message: 'Error de conexión' };
    }
}

export type { ApiResponse, CreateCategoryRequest, CategoryDto };
