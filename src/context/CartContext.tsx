'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definir tipos
export interface Producto {
    nombre: string;
    precio: number;
    img: string;
    img2?: string;
    img3?: string;
    descripcion: string;
}

export interface ProductoCarrito extends Producto {
    cantidad: number;
}

interface CartContextType {
    carrito: ProductoCarrito[];
    agregarAlCarrito: (producto: Producto, cantidad?: number) => void;
    eliminarDelCarrito: (index: number) => void;
    actualizarCantidad: (index: number, cantidad: number) => void;
    vaciarCarrito: () => void;
    obtenerTotal: () => number;
    obtenerCantidadTotal: () => number;
    isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Cargar carrito desde localStorage al montar
    useEffect(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }
        setIsLoaded(true);
    }, []);

    // Guardar en localStorage cada vez que cambia el carrito
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }, [carrito, isLoaded]);

    const agregarAlCarrito = (producto: Producto, cantidad: number = 1) => {
        setCarrito(prevCarrito => {
            const index = prevCarrito.findIndex(item => item.nombre === producto.nombre);

            if (index !== -1) {
                const nuevoCarrito = [...prevCarrito];
                nuevoCarrito[index].cantidad += cantidad;
                return nuevoCarrito;
            } else {
                return [...prevCarrito, { ...producto, cantidad }];
            }
        });
    };

    const eliminarDelCarrito = (index: number) => {
        setCarrito(prevCarrito => prevCarrito.filter((_, i) => i !== index));
    };

    const actualizarCantidad = (index: number, cantidad: number) => {
        if (cantidad >= 1 && cantidad <= 99) {
            setCarrito(prevCarrito => {
                const nuevoCarrito = [...prevCarrito];
                nuevoCarrito[index].cantidad = cantidad;
                return nuevoCarrito;
            });
        }
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const obtenerTotal = (): number => {
        return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };

    const obtenerCantidadTotal = (): number => {
        return carrito.length;
    };

    return (
        <CartContext.Provider value={{
            carrito,
            agregarAlCarrito,
            eliminarDelCarrito,
            actualizarCantidad,
            vaciarCarrito,
            obtenerTotal,
            obtenerCantidadTotal,
            isLoaded
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de CartProvider');
    }
    return context;
}