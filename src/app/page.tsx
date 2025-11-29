'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Carousel from '@/components/Carousel';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { useCart } from '@/context/CartContext';
import { Producto } from '@/context/CartContext';
import { obtenerProductos, ProductDto } from '@/routes/Product';
import { obtenerTodasCategorias, CategoryDto } from '@/routes/category';
import { Sparkles, Zap, Shield, Heart, Flame, ArrowRight } from 'lucide-react';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { agregarAlCarrito } = useCart();
  const [productos, setProductos] = useState<ProductDto[]>([]);
  const [categorias, setCategorias] = useState<CategoryDto[]>([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [respProductos, respCategorias] = await Promise.all([
          obtenerProductos(),
          obtenerTodasCategorias()
        ]);
        if (respProductos.success && respProductos.data) {
          setProductos(respProductos.data);
        }
        if (respCategorias.success && respCategorias.data) {
          setCategorias(respCategorias.data);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    cargarDatos();
  }, []);

  // Verificar si hay productos en oferta activa (con descuento)
  const productosEnOferta = productos.filter(producto => producto.discountId !== null && producto.discountId !== undefined);

  const handleAgregarClick = (productoDto: ProductDto) => {
    const categoria = categorias.find(c => c.categoryId === productoDto.categoryId);
    const producto: Producto = {
      id: productoDto.productId,
      nombre: productoDto.name,
      precio: productoDto.value || 0,
      categoria: categoria?.name || 'Sin categoría',
      // CORRECCIÓN: Usar imagen de la DB o un fallback válido que SÍ existe
      img: productoDto.primaryImage || '/img/productos/carrito-de-compras.png', 
      img2: productoDto.imageUrls?.[1] || '/img/productos/carrito-de-compras.png',
      img3: productoDto.imageUrls?.[2] || '/img/productos/carrito-de-compras.png',
      descripcion: productoDto.description,
      oferta: productoDto.discountId ? {
        activa: true,
        precioOriginal: productoDto.value || 0,
        descuento: productoDto.discountPercentage || 0,
        fechaInicio: '',
        fechaFin: '',
        etiqueta: 'Oferta'
      } : undefined
    };
    setSelectedProduct(producto);
    setIsModalOpen(true);
  };

  const handleConfirmarAgregar = (producto: Producto, cantidad: number) => {
    agregarAlCarrito(producto, cantidad);

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

      {/* Banner de ofertas */}
      {productosEnOferta.length > 0 && (
        <div className="py-8 px-4">
          <div className="container mx-auto">
            <Link href="/ofertas" className="block">
              <div className="relative bg-gradient-to-r from-pink-900 via-rose-900 to-orange-900 rounded-3xl p-8 md:p-12 border-2 border-pink-700 hover:border-pink-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-600/40 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <Flame className="w-16 h-16 md:w-20 md:h-20 text-pink-300 animate-pulse" />
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                        ¡Ofertas de Primavera!
                      </h2>
                      <p className="text-pink-200 text-lg md:text-xl">
                        Hasta {Math.max(...productosEnOferta.map(p => p.discountPercentage || 0))}% de descuento en productos seleccionados
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end space-y-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-3 rounded-full font-black text-xl animate-bounce border-2 border-yellow-300/50">
                      {productosEnOferta.length} PRODUCTOS
                    </div>
                    <div className="flex items-center space-x-2 text-white font-bold group-hover:translate-x-2 transition-transform">
                      <span>Ver todas las ofertas</span>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Sección de características */}
      <div className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative bg-stone-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-stone-800 hover:border-orange-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-600/20 group">
              <div className="relative bg-gradient-to-br from-orange-600 to-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg glow-orange">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="relative text-xl font-bold text-stone-100 mb-2">Productos Premium</h3>
              <p className="relative text-stone-400">Calidad garantizada en cada compra</p>
            </div>
            {/* Otros items de características... */}
            <div className="relative bg-stone-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-stone-800 hover:border-teal-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/20 group">
                <div className="relative bg-gradient-to-br from-teal-500 to-cyan-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg glow-teal">
                    <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="relative text-xl font-bold text-stone-100 mb-2">Alto Rendimiento</h3>
                <p className="relative text-stone-400">Tecnología de última generación</p>
            </div>
            <div className="relative bg-stone-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-stone-800 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 group">
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="relative text-xl font-bold text-stone-100 mb-2">Garantía Total</h3>
                <p className="relative text-stone-400">Compra 100% protegida</p>
            </div>
            <div className="relative bg-stone-900/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-stone-800 hover:border-pink-500 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/20 group">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productos.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl p-12 border-2 border-stone-800 inline-block">
                <p className="text-stone-400 text-xl mb-4">⏳ Cargando productos...</p>
                <p className="text-stone-500 text-sm">Si no cargan, verifica la conexión con el servidor.</p>
              </div>
            </div>
          ) : (
            productos.map((productoDto) => {
              const categoria = categorias.find(c => c.categoryId === productoDto.categoryId);
              // Transformar DTO a modelo de vista
              const producto: Producto = {
                id: productoDto.productId, // Ahora productId estará definido gracias al fix en Product.tsx
                nombre: productoDto.name,
                precio: productoDto.value || 0,
                categoria: categoria?.name || 'Sin categoría',
                // Usar imagen dinámica o fallback
                img: productoDto.primaryImage || '/img/productos/carrito-de-compras.png', 
                img2: productoDto.imageUrls?.[1] || '/img/productos/carrito-de-compras.png',
                img3: productoDto.imageUrls?.[2] || '/img/productos/carrito-de-compras.png',
                descripcion: productoDto.description,
                oferta: productoDto.discountId ? {
                  activa: true,
                  precioOriginal: productoDto.value || 0,
                  descuento: productoDto.discountPercentage || 0,
                  fechaInicio: '',
                  fechaFin: '',
                  etiqueta: 'Oferta'
                } : undefined
              };
              return (
                <ProductCard
                  key={productoDto.productId} // Ahora esto será único y definido
                  producto={producto}
                  onAgregar={() => handleAgregarClick(productoDto)}
                />
              );
            })
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-24 animate-fade-in">
          <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-teal-600 rounded-3xl p-12 md:p-16 shadow-2xl overflow-hidden border-2 border-orange-500/50 glow-orange">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-300 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center">
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 glow-warm">
                ¿No encuentras lo que buscas?
              </h3>
              <p className="text-white/95 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Contáctanos y te ayudaremos a encontrar el periférico perfecto para ti
              </p>
              <Link href="/contacto">
                <button className="bg-white text-orange-600 px-10 py-5 rounded-2xl font-black text-xl hover:bg-stone-100 transition-all shadow-2xl hover:scale-105 border-2 border-white/20">
                  Contactar Ahora
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        producto={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmarAgregar}
      />
    </div>
  );
}