import { Producto } from '@/context/CartContext';

export const productos: Producto[] = [
  {
    nombre: "CA-9011379",
    precio: 10000,
    categoria: "Auriculares",
    img: "/img/productos/CA-9011379-WW_01.avif",
    img2: "/img/productos/CA-9011379-WW_13.avif",
    img3: "/img/productos/s-l400.jpg",
    descripcion: "Auriculares gaming de alta calidad con micrófono integrado y sonido envolvente. Perfectos para largas sesiones de juego."
  },
  {
    nombre: "G213",
    precio: 15000,
    categoria: "Teclados",
    img: "/img/productos/g213-gallery-1-nb.webp",
    img2: "/img/productos/marcaslogitech29logkg213-negro1jpeg_0.webp",
    img3: "/img/productos/g213prodigygamingkeyboard20(2).webp",
    descripcion: "Teclado gamer retroiluminado con teclas resistentes y rápidas. Ideal para mejorar tu rendimiento en cada partida."
  },
  {
    nombre: "G513",
    precio: 12500,
    categoria: "Teclados",
    img: "/img/productos/g513-carbon-gallery-2.webp",
    img2: "/img/productos/g513-carbon-gallery-2.webp",
    img3: "/img/productos/g513-carbon-gallery-2.webp",
    descripcion: "Teclado mecánico premium con switches de alta precisión y reposamuñecas ergonómico. Rendimiento y comodidad en uno."
  },
  {
    nombre: "G915",
    precio: 18000,
    categoria: "Teclados",
    img: "/img/productos/g915-x-wireless-mechanical-gaming-keyboard-gallery-1-us.webp",
    img2: "/img/productos/g915-x-wireless-mechanical-gaming-keyboard-gallery-1-us.webp",
    img3: "/img/productos/g915-x-wireless-mechanical-gaming-keyboard-gallery-1-us.webp",
    descripcion: "Teclado inalámbrico de perfil bajo con iluminación RGB y batería de larga duración. Estilo y rendimiento profesional."
  },
  {
    nombre: "K65",
    precio: 9500,
    categoria: "Teclados",
    img: "/img/productos/K65_PLUS_WIRELESS_01.avif",
    img2: "/img/productos/K65_PLUS_WIRELESS_01.avif",
    img3: "/img/productos/K65_PLUS_WIRELESS_01.avif",
    descripcion: "Teclado compacto mecánico con retroiluminación brillante. Portátil y perfecto para gamers que necesitan movilidad."
  },
  {
    nombre: "M75",
    precio: 20000,
    categoria: "Mouses",
    img: "/img/productos/M75_AIR_LIGHT_GRAY_01.avif",
    img2: "/img/productos/M75_AIR_LIGHT_GRAY_01.avif",
    img3: "/img/productos/M75_AIR_LIGHT_GRAY_01.avif",
    descripcion: "Mouse gamer de última generación con sensor de alta precisión y diseño ergonómico. Control absoluto en cada movimiento."
  },
  {
    nombre: "MAKR75",
    precio: 14000,
    categoria: "Teclados",
    img: "/img/productos/makr75-front.avif",
    img2: "/img/productos/makr75-front.avif",
    img3: "/img/productos/makr75-front.avif",
    descripcion: "Teclado mecánico personalizable con diseño compacto. Ideal para quienes buscan estilo, comodidad y velocidad."
  },
  {
    nombre: "VIRTUOSO_MAX",
    precio: 11500,
    categoria: "Auriculares",
    img: "/img/productos/VIRTUOSO_MAX_WIRELESS_CRBN_01.avif",
    img2: "/img/productos/VIRTUOSO_MAX_WIRELESS_CRBN_01.avif",
    img3: "/img/productos/VIRTUOSO_MAX_WIRELESS_CRBN_01.avif",
    descripcion: "Auriculares inalámbricos premium con sonido de alta fidelidad y micrófono desmontable. Experiencia inmersiva total."
  },
  {
    nombre: "M4Xy",
    precio: 20500,
    categoria: "Teclados",
    img: "/img/productos/pro-x-tkl-rapid-black-gallery-1-us.webp",
    img2: "/img/productos/pro-x-tkl-rapid-black-gallery-1-us.webp",
    img3: "/img/productos/pro-x-tkl-rapid-black-gallery-1-us.webp",
    descripcion: "Teclado mecánico versátil con retroiluminación RGB y diseño robusto. Rendimiento confiable para trabajo y gaming."
  },
  {
    nombre: "M454",
    precio: 30500,
    categoria: "Mouses",
    img: "/img/productos/SCIMITAR_ELITE_SE_BLK-YLO_01.avif",
    img2: "/img/productos/SCIMITAR_ELITE_SE_BLK-YLO_01.avif",
    img3: "/img/productos/SCIMITAR_ELITE_SE_BLK-YLO_01.avif",
    descripcion: "Mouse gamer con múltiples botones programables, sensor de alta precisión y diseño ergonómico. Hecho para los más competitivos."
  },
  {
    nombre: "G34",
    precio: 41500,
    categoria: "Teclados",
    img: "/img/productos/pro-x-tkl-rapid-black-gallery-1-us.webp",
    img2: "/img/productos/pro-x-tkl-rapid-black-gallery-1-us.webp",
    img3: "/img/productos/pro-x-tkl-rapid-black-gallery-1-us.webp",
    descripcion: "Teclado premium con switches de respuesta rápida, retroiluminación personalizable y construcción duradera. Rendimiento profesional."
  },
  {
    nombre: "K99",
    precio: 25500,
    categoria: "Teclados",
    img: "/img/productos/g513-carbon-gallery-2.webp",
    img2: "/img/productos/g513-carbon-gallery-2.webp",
    img3: "/img/productos/g513-carbon-gallery-2.webp",
    descripcion: "Teclado económico con diseño compacto y funcional. Ideal para quienes buscan practicidad a bajo costo."
  }
];

// Obtener categorías únicas
export const categorias = Array.from(new Set(productos.map(p => p.categoria))).sort();