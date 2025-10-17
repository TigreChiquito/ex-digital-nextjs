'use client';

import { useState } from 'react';
import Carousel from '@/components/Carousel';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/context/CartContext';
import { productos } from '@/data/productos';
import { Producto } from '@/context/CartContext';
import { Sparkles, Zap, Shield, Heart } from 'lucide-react';

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

    // Notificación elegante oscura
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-up flex items-center space-x-3 border border-teal-500';
    notification.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <div>
        <p class="font-bold">${producto.nombre}</p>
        <p class="text-sm opacity-90">Agregado al carrito (x${cantidad})</p>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Carrusel con contenedor */}
      <div className="w-full">
        <Carousel />
      </div>

      {/* Sección de características - Estilo oscuro y acogedor */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Característica 1 */}
            <div className="relative bg-stone-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-stone-800 hover:border-orange-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-600/20 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-orange-600 to-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg glow-orange">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="relative text-xl font-bold text-stone-100 mb-2">Productos Premium</h3>
              <p className="relative text-stone-400">Calidad garantizada en cada compra</p>
            </div>

            {/* Característica 2 */}
            <div className="relative bg-stone-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-stone-800 hover:border-teal-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/20 group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-teal-500 to-cyan-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg glow-teal">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="relative text-xl font-bold text-stone-100 mb-2">Alto Rendimiento</h3>
              <p className="relative text-stone-400">Tecnología de última generación</p>
            </div>

            {/* Característica 3 */}
            <div className="relative bg-stone-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-stone-800 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="relative text-xl font-bold text-stone-100 mb-2">Garantía Total</h3>
              <p className="relative text-stone-400">Compra 100% protegida</p>
            </div>

            {/* Característica 4 */}
            <div className="relative bg-stone-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-stone-800 hover:border-pink-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20 group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-pink-500 to-rose-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="relative text-xl font-bold text-stone-100 mb-2">Atención Premium</h3>
              <p className="relative text-stone-400">Soporte dedicado 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Productos */}
      <div className="container mx-auto px-4 py-20">
        {/* Header minimalista oscuro */}
        <div className="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-teal-400 bg-clip-text text-transparent glow-warm">
              Nuestros Productos
            </span>
          </h2>
          <p className="text-stone-400 text-xl md:text-2xl leading-relaxed">
            Descubre nuestra selección de periféricos gaming de alta calidad
          </p>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.map((producto, index) => (
            <ProductCard
              key={index}
              producto={producto}
              onAgregar={handleAgregarClick}
            />
          ))}
        </div>

        {/* CTA Section oscura */}
        <div className="mt-24 animate-fade-in">
          <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-teal-600 rounded-3xl p-12 md:p-16 shadow-2xl overflow-hidden border-2 border-orange-500/50 glow-orange">
            {/* Patrón de fondo */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-300 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-yellow-300 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 glow-warm">
                ¿No encuentras lo que buscas?
              </h3>
              <p className="text-white/95 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Contáctanos y te ayudaremos a encontrar el periférico perfecto para ti
              </p>
              <button className="bg-white text-orange-600 px-10 py-5 rounded-2xl font-black text-xl hover:bg-stone-100 transition-all shadow-2xl hover:scale-105 border-2 border-white/20">
                Contactar Ahora
              </button>
            </div>
          </div>
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