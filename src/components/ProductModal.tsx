'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react';
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

    useEffect(() => {
        if (isOpen) {
            setCantidad(1);
            setCurrentImage(0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
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
            {/* Overlay oscuro */}
            <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-scale-in">
                <div className="bg-stone-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-stone-800">
                    {/* Header con gradiente */}
                    <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-orange-500 flex justify-between items-center p-6 z-10 border-b-2 border-orange-700">
                        <h2 className="text-2xl font-bold text-white">{producto.nombre}</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white/20 transition-colors p-2 rounded-xl"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-8 bg-stone-900">
                        {/* Carrusel de Imágenes */}
                        <div className="relative mb-8">
                            <div className="relative h-80 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950 rounded-3xl overflow-hidden border-2 border-stone-800">
                                <img
                                    src={imagenes[currentImage]}
                                    alt={producto.nombre}
                                    className="w-full h-full object-contain p-8"
                                />

                                {imagenes.length > 1 && (
                                    <>
                                        {/* Botón Anterior */}
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-800/90 hover:bg-stone-700 p-3 rounded-2xl transition-all shadow-xl hover:scale-110 border-2 border-stone-700"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-orange-400" />
                                        </button>

                                        {/* Botón Siguiente */}
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-800/90 hover:bg-stone-700 p-3 rounded-2xl transition-all shadow-xl hover:scale-110 border-2 border-stone-700"
                                        >
                                            <ChevronRight className="w-5 h-5 text-orange-400" />
                                        </button>

                                        {/* Indicadores */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                            {imagenes.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImage(index)}
                                                    className={`transition-all rounded-full ${index === currentImage
                                                            ? 'w-8 h-2 bg-gradient-to-r from-orange-600 to-orange-500 glow-orange'
                                                            : 'w-2 h-2 bg-stone-600 hover:bg-stone-500'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-2">Descripción</h3>
                            <p className="text-stone-300 leading-relaxed text-lg">{producto.descripcion}</p>
                        </div>

                        {/* Precio con fondo oscuro */}
                        <div className="mb-8 p-6 bg-gradient-to-r from-stone-800 to-stone-900 rounded-2xl border-2 border-stone-700">
                            <div className="flex items-baseline justify-between">
                                <div>
                                    <p className="text-sm text-stone-400 font-bold uppercase tracking-wide mb-1">Precio</p>
                                    <p className="text-5xl font-black bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                                        ${producto.precio.toLocaleString('es-CL')}
                                    </p>
                                </div>
                                <span className="text-sm text-stone-500 font-bold uppercase tracking-wide">CLP</span>
                            </div>
                        </div>

                        {/* Selector de Cantidad */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-stone-300 mb-3 uppercase tracking-wide">
                                Cantidad:
                            </label>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleDecrease}
                                    disabled={cantidad <= 1}
                                    className="bg-stone-800 hover:bg-stone-700 disabled:bg-stone-900 disabled:cursor-not-allowed text-orange-400 p-4 rounded-2xl transition-all hover:scale-110 disabled:hover:scale-100 shadow-md border-2 border-stone-700"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>

                                <input
                                    type="number"
                                    value={cantidad}
                                    readOnly
                                    className="w-24 text-center border-2 border-stone-700 rounded-2xl py-4 font-black text-2xl text-stone-100 bg-stone-800"
                                />

                                <button
                                    onClick={handleIncrease}
                                    disabled={cantidad >= 99}
                                    className="bg-stone-800 hover:bg-stone-700 disabled:bg-stone-900 disabled:cursor-not-allowed text-orange-400 p-4 rounded-2xl transition-all hover:scale-110 disabled:hover:scale-100 shadow-md border-2 border-stone-700"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>

                                <div className="flex-1 text-right">
                                    <p className="text-sm text-stone-400 font-bold uppercase">Subtotal</p>
                                    <p className="text-3xl font-black text-stone-100">
                                        ${(producto.precio * cantidad).toLocaleString('es-CL')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-stone-900/95 backdrop-blur-sm flex flex-col sm:flex-row gap-3 p-6 border-t-2 border-stone-800">
                        <button
                            onClick={handleConfirm}
                            className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-5 px-6 rounded-2xl transition-all font-bold text-lg shadow-xl hover:shadow-orange-600/50 flex items-center justify-center space-x-2 hover:scale-105"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Agregar al Carrito</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="sm:flex-none bg-stone-800 hover:bg-stone-700 text-stone-300 py-5 px-8 rounded-2xl transition-all font-bold text-lg border-2 border-stone-700"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}