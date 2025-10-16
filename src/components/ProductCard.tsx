'use client';

import { Producto } from '@/context/CartContext';

interface ProductCardProps {
    producto: Producto;
    onAgregar: (producto: Producto) => void;
}

export default function ProductCard({ producto, onAgregar }: ProductCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
            {/* Imagen */}
            <div className="relative h-48 bg-gray-100">
                <img
                    src={producto.img}
                    alt={producto.nombre}
                    className="w-full h-full object-contain p-4"
                />
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {producto.nombre}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                    {producto.descripcion}
                </p>

                <div className="mt-auto">
                    <p className="text-2xl font-bold text-blue-600 mb-3">
                        ${producto.precio.toLocaleString('es-CL')}
                    </p>

                    <button
                        onClick={() => onAgregar(producto)}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
}