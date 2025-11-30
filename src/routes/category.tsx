'use client';

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface CreateCategoryRequest {
    name: string;
    description: string;
}

export interface CategoryDto {
    categoryId: number; // El frontend usará este nombre
    idCategories?: number; // El backend envía este
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
            },
            mode: 'cors',
            cache: 'no-cache'
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error HTTP:', response.status, errorText);
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        
        // CORRECCIÓN CRÍTICA: Mapeo de idCategories -> categoryId
        const categorias = (data.data || data || []).map((c: CategoryDto) => ({
            ...c,
            categoryId: c.idCategories, // Mapeamos el campo del backend al del frontend
        }));

        console.log('Categorías normalizadas:', categorias);
        return { success: true, data: categorias };
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
            return { success: false, message: `Error del servidor: ${response.status}` };
        }

        const data = await response.json();
        
        // Mapeo para un solo objeto
        let categoria = null;
        if (data.data) {
            categoria = {
                ...data.data,
                categoryId: data.data.idCategories
            };
        }

        return { success: true, data: categoria };
    } catch (error) {
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

        const response = await fetch('https://exdigital-api-production.up.railway.app/api/categories', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
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

// actualizarCategoria: actualiza una categoría existente (requiere rol ADMIN)
export async function actualizarCategoria(categoryId: number, categoria: CreateCategoryRequest): Promise<ApiResponse<CategoryDto>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
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

// eliminarCategoria: elimina una categoría (requiere rol ADMIN)
export async function eliminarCategoria(categoryId: number): Promise<ApiResponse<void>> {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return { success: false, message: 'No hay token de autenticación' };
        }

        const response = await fetch(`https://exdigital-api-production.up.railway.app/api/categories/${categoryId}`, {
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

export type { ApiResponse };