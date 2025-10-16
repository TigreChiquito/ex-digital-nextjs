'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { Producto } from '@/context/CartContext';

interface ProductModalProps {
    producto: Producto | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (producto: Producto, cantidad: number) => void;
}

export default function ProductModal({ producto, isOpen, onClose, onConfirm }: ProductModalProps) {
    const [cantidad, setCantidad] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);

    // Resetear cantidad cuando se abre el modal
    useEffect(() => {
        if (isOpen) {
            setCantidad(1);
            setCurrentImage(0);
        }
    }, [isOpen]);

    if (!isOpen || !producto) return null;

    const imagenes = [producto.img, producto.img2, producto.img3].filter(Boolean) as string[];

    const handleDecrease = () => {
        if (cantidad > 1) setCantidad(cantidad - 1);
    };

    const handleIncrease = () => {
        if (cantidad < 99) setCantidad(cantidad + 1);
    };

    const handleConfirm = () => {
        onConfirm(producto, cantidad);
        onClose();
    };

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % imagenes.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold text-gray-800">{producto.nombre}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {/* Carrusel de Imágenes */}
                        <div className="relative mb-6">
                            <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={imagenes[currentImage]}
                                    alt={producto.nombre}
                                    className="w-full h-full object-contain p-4"
                                />

                                {imagenes.length > 1 && (
                                    <>
                                        {/* Botón Anterior */}
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 p-2 rounded-full transition"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>

                                        {/* Botón Siguiente */}
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 p-2 rounded-full transition"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>

                                        {/* Indicadores */}
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                                            {imagenes.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImage(index)}
                                                    className={`w-2 h-2 rounded-full transition ${index === currentImage ? 'bg-blue-600' : 'bg-gray-400'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Descripción */}
                        <p className="text-gray-600 mb-4">{producto.descripcion}</p>

                        {/* Precio */}
                        <p className="text-3xl font-bold text-blue-600 mb-6">
                            ${producto.precio.toLocaleString('es-CL')}
                        </p>

                        {/* Selector de Cantidad */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cantidad:
                            </label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={handleDecrease}
                                    disabled={cantidad <= 1}
                                    className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 p-2 rounded-lg transition"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>

                                <input
                                    type="number"
                                    value={cantidad}
                                    readOnly
                                    className="w-20 text-center border border-gray-300 rounded-lg py-2 font-semibold"
                                />

                                <button
                                    onClick={handleIncrease}
                                    disabled={cantidad >= 99}
                                    className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 p-2 rounded-lg transition"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex space-x-3 p-4 border-t">
                        <button
                            onClick={handleConfirm}
                            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            Agregar al Carrito
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition font-medium"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}