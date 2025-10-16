'use client';

import { useState } from 'react';
import Carousel from '@/components/Carousel';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/context/CartContext';
import { productos } from '@/data/productos';
import { Producto } from '@/context/CartContext';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { agregarAlCarrito } = useCart();

  const handleAgregarClick = (producto: Producto) => {
    setSelectedProduct(producto);
    setIsModalOpen(true);
  };

  const handleConfirmarAgregar = (producto: Producto, cantidad: number) => {
    agregarAlCarrito(producto, cantidad);
    
    // Mostrar notificación (opcional)
    alert(`${producto.nombre} agregado al carrito (x${cantidad})`);
  };

  return (
    <div>
      {/* Carrusel */}
      <Carousel />

      {/* Sección de Productos */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Nuestros Productos
        </h2>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((producto, index) => (
            <ProductCard
              key={index}
              producto={producto}
              onAgregar={handleAgregarClick}
            />
          ))}
        </div>
      </div>

      {/* Modal de Producto */}
      <ProductModal
        producto={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmarAgregar}
      />
    </div>
  );
}