'use client';

import { Calendar, ArrowRight } from 'lucide-react';

const blogPosts = [
    {
        id: 1,
        title: 'Se Acercan Las Rebajas De Verano',
        description: '¡El verano ya está a la vuelta de la esquina y con él llegan las mejores ofertas! Prepárate para disfrutar de descuentos imperdibles en productos seleccionados que harán de tu temporada veraniega una experiencia única. Muy pronto podrás aprovechar promociones exclusivas en nuestra tienda online.',
        image: '/img/blog/20210820013113.jpg',
        date: 'Diciembre 2025',
        gradient: 'from-orange-600 to-yellow-600'
    },
    {
        id: 2,
        title: 'Se Acercan Teclados Mecánicos Custom',
        description: 'Como parte de nuestra misión de ofrecerte lo mejor en tecnología y personalización, nos complace anunciar la llegada de nuestros nuevos teclados mecánicos custom. Estos teclados están diseñados para brindarte una experiencia de escritura y juego inigualable, con la posibilidad de personalizar cada aspecto según tus preferencias. Desde la elección de los interruptores hasta la iluminación RGB.',
        image: '/img/blog/1366_2000.jpg',
        date: 'Noviembre 2025',
        gradient: 'from-teal-600 to-cyan-600'
    }
];

export default function BlogPage() {
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

                                        {/* Botón deshabilitado temporalmente */}
                                        <div className="flex items-center space-x-3">
                                            <button
                                                disabled
                                                className="bg-stone-800 text-stone-500 px-6 py-3 rounded-xl font-bold cursor-not-allowed opacity-50 flex items-center space-x-2"
                                            >
                                                <span>Más Información</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                            <span className="text-stone-600 text-sm italic">Próximamente</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}