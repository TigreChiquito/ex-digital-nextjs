'use client';

import { Calendar, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

const blogPosts = [
    {
        id: 1,
        title: 'Se Acercan Las Rebajas De Verano',
        description: '¡El verano ya está a la vuelta de la esquina y con él llegan las mejores ofertas! Prepárate para disfrutar de descuentos imperdibles en productos seleccionados que harán de tu temporada veraniega una experiencia única. Muy pronto podrás aprovechar promociones exclusivas en nuestra tienda online.',
        image: '/img/blog/20210820013113.jpg',
        date: 'Diciembre 2025',
        gradient: 'from-orange-600 to-yellow-600',
        fullContent: `
            <h3 class="text-2xl font-bold mb-4 text-orange-400">¡Las mejores rebajas del año!</h3>
            <p class="mb-4">El verano 2025 trae consigo las ofertas más esperadas del año. Durante todo el mes de diciembre, encontrarás descuentos de hasta el <strong>50%</strong> en productos seleccionados de nuestra tienda.</p>
            
            <h4 class="text-xl font-bold mb-3 text-orange-300 mt-6">Categorías en Oferta:</h4>
            <ul class="list-disc list-inside space-y-2 mb-4">
                <li><strong>Teclados Mecánicos:</strong> Descuentos del 30% al 40%</li>
                <li><strong>Auriculares Gaming:</strong> Hasta 35% de descuento</li>
                <li><strong>Mouses Profesionales:</strong> Ofertas especiales del 25%</li>
                <li><strong>Accesorios:</strong> 2x1 en productos seleccionados</li>
            </ul>
            
            <h4 class="text-xl font-bold mb-3 text-orange-300 mt-6">Fechas Importantes:</h4>
            <p class="mb-4"><strong>Inicio:</strong> 15 de Diciembre 2025<br>
            <strong>Finalización:</strong> 31 de Diciembre 2025<br>
            <strong>Cyber Day Especial:</strong> 20-22 de Diciembre (descuentos extra del 10%)</p>
            
            <p class="mt-6 p-4 bg-orange-900/30 border-l-4 border-orange-500 rounded">
                <strong>¡No te lo pierdas!</strong> Las rebajas de verano son la oportunidad perfecta para renovar tu setup gaming con los mejores precios del mercado. Stock limitado en algunos productos.
            </p>
        `
    },
    {
        id: 2,
        title: 'Se Acercan Teclados Mecánicos Custom',
        description: 'Como parte de nuestra misión de ofrecerte lo mejor en tecnología y personalización, nos complace anunciar la llegada de nuestros nuevos teclados mecánicos custom. Estos teclados están diseñados para brindarte una experiencia de escritura y juego inigualable, con la posibilidad de personalizar cada aspecto según tus preferencias. Desde la elección de los interruptores hasta la iluminación RGB.',
        image: '/img/blog/1366_2000.jpg',
        date: 'Noviembre 2025',
        gradient: 'from-teal-600 to-cyan-600',
        fullContent: `
            <h3 class="text-2xl font-bold mb-4 text-teal-400">Personalización Total para tu Setup</h3>
            <p class="mb-4">Llegó el momento que tanto esperabas. A partir de noviembre, podrás crear tu teclado mecánico ideal con nuestro nuevo sistema de personalización completa.</p>
            
            <h4 class="text-xl font-bold mb-3 text-teal-300 mt-6">Opciones de Personalización:</h4>
            <ul class="list-disc list-inside space-y-2 mb-4">
                <li><strong>Switches:</strong> Cherry MX Red, Blue, Brown, Silent Red, Speed Silver</li>
                <li><strong>Keycaps:</strong> PBT Double-shot, ABS Shine-through, artesanales</li>
                <li><strong>Layouts:</strong> Full-size, TKL, 75%, 65%, 60%</li>
                <li><strong>Iluminación:</strong> RGB por tecla, efectos personalizables, 16.8 millones de colores</li>
                <li><strong>Materiales:</strong> Aluminio anodizado, plástico premium, placas de latón</li>
            </ul>
            
            <h4 class="text-xl font-bold mb-3 text-teal-300 mt-6">Características Premium:</h4>
            <p class="mb-4">Todos nuestros teclados custom incluyen:</p>
            <ul class="list-disc list-inside space-y-2 mb-4">
                <li>Hot-swap sockets (cambio de switches sin soldadura)</li>
                <li>Cable USB-C trenzado desmontable</li>
                <li>Software de configuración avanzado</li>
                <li>Foam de alta densidad para mejor acústica</li>
                <li>Estabilizadores lubricados de fábrica</li>
            </ul>
            
            <h4 class="text-xl font-bold mb-3 text-teal-300 mt-6">Precios y Disponibilidad:</h4>
            <p class="mb-4">Los precios varían según la configuración elegida, comenzando desde <strong>$45,000 CLP</strong> para configuraciones básicas hasta <strong>$150,000 CLP</strong> para builds premium con materiales de alta gama.</p>
            
            <p class="mt-6 p-4 bg-teal-900/30 border-l-4 border-teal-500 rounded">
                <strong>Lanzamiento oficial:</strong> 1 de Noviembre 2025. Regístrate en nuestra lista de espera para obtener un 15% de descuento en tu primer teclado custom.
            </p>
        `
    }
];

export default function BlogPage() {
    const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

    const openModal = (post: typeof blogPosts[0]) => {
        setSelectedPost(post);
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    };

    const closeModal = () => {
        setSelectedPost(null);
        document.body.style.overflow = 'unset'; // Restaurar scroll
    };
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <header className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-teal-400 bg-clip-text text-transparent">
                            Novedades Principales
                        </span>
                    </h1>
                    <p className="text-stone-400 text-xl md:text-2xl">
                        Mantente al día con las últimas noticias y ofertas
                    </p>
                </header>

                {/* Blog Posts */}
                <div className="space-y-12">
                    {blogPosts.map((post, index) => (
                        <article
                            key={post.id}
                            className={`animate-slide-up ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-stone-800 hover:border-orange-600 transition-all shadow-2xl group">
                                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'}`}>
                                    {/* Imagen */}
                                    <div className={`relative h-80 lg:h-auto overflow-hidden ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23374151" width="400" height="300"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                                            }}
                                        />

                                        {/* Badge de fecha */}
                                        <div className={`absolute top-6 left-6 bg-gradient-to-r ${post.gradient} text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg`}>
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm font-bold">{post.date}</span>
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                                        <h2 className="text-3xl md:text-4xl font-black text-stone-100 mb-6 group-hover:text-orange-400 transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-stone-300 text-lg leading-relaxed mb-8">
                                            {post.description}
                                        </p>

                                        {/* Botón funcional */}
                                        <button
                                            onClick={() => openModal(post)}
                                            className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 group"
                                        >
                                            <span>Leer Más</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Modal */}
                {selectedPost && (
                    <div 
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
                        onClick={closeModal}
                    >
                        <div 
                            className="bg-stone-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-stone-700 shadow-2xl animate-scale-in"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header del Modal */}
                            <div className="sticky top-0 bg-stone-900 border-b-2 border-stone-800 p-6 flex items-start justify-between z-10">
                                <div className="flex-1">
                                    <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${selectedPost.gradient} text-white px-4 py-2 rounded-full mb-4`}>
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm font-bold">{selectedPost.date}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-stone-100">
                                        {selectedPost.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="ml-4 bg-stone-800 hover:bg-stone-700 text-stone-300 p-3 rounded-xl transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Imagen destacada */}
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={selectedPost.image}
                                    alt={selectedPost.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
                            </div>

                            {/* Contenido del Modal */}
                            <div className="p-8 md:p-12">
                                <div 
                                    className="text-stone-300 text-lg leading-relaxed prose prose-invert prose-orange max-w-none"
                                    dangerouslySetInnerHTML={{ __html: selectedPost.fullContent }}
                                />
                            </div>

                            {/* Footer del Modal */}
                            <div className="border-t-2 border-stone-800 p-6 bg-stone-950/50">
                                <button
                                    onClick={closeModal}
                                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}