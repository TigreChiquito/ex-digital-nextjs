'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface Slide {
    img: string;
    title: string;
    description: string;
}

const slides: Slide[] = [
    {
        img: '/img/carrucel/Scimitar-VSD_Image1-1200x675.webp',
        title: 'Descubre Lo Nuevo de Corsair',
        description: 'Nuevos productos para llevar tu equipo al siguiente nivel.'
    },
    {
        img: '/img/carrucel/VENGEANCE_7000_AIR_SERIES_PR_01.png',
        title: 'Ideales para acompañar tu estilo de juego',
        description: 'Rendimiento y estilo en cada partida.'
    },
    {
        img: '/img/carrucel/RED1_Launch_hero1_dt_2000x1125_v2-1200x675.webp',
        title: 'Productos con un diseño único y atractivo',
        description: 'Para todo dispositivo, desde pc a consolas, solo para ti.'
    }
];

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleImageError = (index: number) => {
        setImageError(prev => ({ ...prev, [index]: true }));
    };

    return (
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden shadow-2xl">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {!imageError[index] ? (
                        <img
                            src={slide.img}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(index)}
                        />
                    ) : (
                        // Fallback con gradiente oscuro cálido
                        <div className="w-full h-full bg-gradient-to-br from-stone-900 via-orange-900 to-teal-900 flex items-center justify-center">
                            <div className="text-center animate-fade-in">
                                <div className="text-8xl mb-8 animate-float glow-warm">🎮</div>
                                <p className="text-3xl font-bold text-orange-400 glow-warm">Gaming Periféricos</p>
                            </div>
                        </div>
                    )}

                    {/* Overlay oscuro con gradiente cálido */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/60 to-transparent"></div>

                    {/* Contenido */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-10">
                        <div className="max-w-5xl animate-fade-in">
                            {/* Badge premium con glow */}
                            <div className="inline-flex items-center space-x-2 bg-stone-900/60 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-bold mb-8 border border-orange-600/50 glow-orange">
                                <Sparkles className="w-4 h-4 text-orange-400" />
                                <span className="text-orange-400">Productos Premium</span>
                            </div>

                            {/* Título con glow */}
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight glow-warm">
                                <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-teal-400 bg-clip-text text-transparent">
                                    {slide.title}
                                </span>
                            </h2>

                            {/* Descripción */}
                            <p className="text-xl md:text-3xl lg:text-4xl mb-10 text-stone-300 font-medium">
                                {slide.description}
                            </p>

                            {/* Botón CTA */}
                            <button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl hover:shadow-orange-600/50 hover:scale-105 border border-orange-500/50">
                                Ver Productos
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Botón Anterior */}
            <button
                onClick={prevSlide}
                className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 bg-stone-900/60 backdrop-blur-md hover:bg-stone-800/80 text-orange-400 p-4 rounded-2xl transition-all duration-300 z-20 hover:scale-110 border-2 border-stone-700 hover:border-orange-600 shadow-xl"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Botón Siguiente */}
            <button
                onClick={nextSlide}
                className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 bg-stone-900/60 backdrop-blur-md hover:bg-stone-800/80 text-orange-400 p-4 rounded-2xl transition-all duration-300 z-20 hover:scale-110 border-2 border-stone-700 hover:border-orange-600 shadow-xl"
                aria-label="Siguiente"
            >
                <ChevronRight className="w-7 h-7" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                                ? 'w-12 h-3 bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg glow-orange'
                                : 'w-3 h-3 bg-stone-600 hover:bg-stone-500 border border-stone-500'
                            }`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}