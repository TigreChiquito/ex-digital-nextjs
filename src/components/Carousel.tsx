'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

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
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
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
                        // Fallback: Gradiente con ícono si la imagen falla
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
                            <div className="text-white text-center">
                                <div className="text-6xl mb-4">🎮</div>
                                <p className="text-xl">Imagen no disponible</p>
                            </div>
                        </div>
                    )}

                    {/* Overlay oscuro para mejor legibilidad del texto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                    {/* Texto */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl animate-fade-in">
                            {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl lg:text-2xl max-w-3xl drop-shadow-xl animate-fade-in">
                            {slide.description}
                        </p>
                    </div>
                </div>
            ))}

            {/* Botón Anterior */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 md:p-4 rounded-full transition-all duration-300 z-20 hover:scale-110"
                aria-label="Anterior"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Botón Siguiente */}
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white p-3 md:p-4 rounded-full transition-all duration-300 z-20 hover:scale-110"
                aria-label="Siguiente"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                                ? 'w-8 h-3 bg-white'
                                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}