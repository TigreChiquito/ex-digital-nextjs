'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Producto } from '@/context/CartContext';
import { productos as productosIniciales } from '@/data/productos';
import { 
    Package, 
    Plus, 
    Edit, 
    Trash2, 
    Save, 
    X, 
    Search,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Tag,
    Image as ImageIcon,
    AlertCircle
} from 'lucide-react';

interface ProductoExtendido extends Producto {
    stock?: number;
}

export default function AdminPage() {
    const router = useRouter();
    const { estaLogueado, esAdmin, isLoaded } = useAuth();
    const [cargando, setCargando] = useState(true);
    const [productos, setProductos] = useState<ProductoExtendido[]>([]);
    const [busqueda, setBusqueda] = useState('');
    const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoActual, setProductoActual] = useState<ProductoExtendido | null>(null);
    const [notification, setNotification] = useState<{ tipo: 'success' | 'error', mensaje: string } | null>(null);

    // Formulario de producto
    const [formData, setFormData] = useState<ProductoExtendido>({
        nombre: '',
        precio: 0,
        categoria: 'Teclados',
        img: '',
        img2: '',
        img3: '',
        descripcion: '',
        stock: 0,
        oferta: {
            activa: false,
            precioOriginal: 0,
            descuento: 0,
            fechaInicio: '',
            fechaFin: '',
            etiqueta: ''
        }
    });

    // Verificar autenticación y cargar productos
    useEffect(() => {
        // Esperar a que el contexto esté completamente cargado
        if (!isLoaded) {
            return;
        }

        if (!estaLogueado()) {
            console.log('❌ No está logueado, redirigiendo a login');
            router.push('/login');
            return;
        }

        if (!esAdmin()) {
            // Si está logueado pero no es admin, mostrar mensaje y redirigir
            console.log('❌ No es admin, redirigiendo a home');
            alert('No tienes permisos de administrador. Contacta al administrador del sistema.');
            router.push('/');
            return;
        }

        console.log('✅ Usuario admin verificado, cargando productos');
        setCargando(false);

        // Cargar productos desde localStorage o usar datos iniciales
        const productosGuardados = localStorage.getItem('productosAdmin');
        if (productosGuardados) {
            setProductos(JSON.parse(productosGuardados));
        } else {
            // Agregar stock a productos iniciales
            const productosConStock = productosIniciales.map(p => ({
                ...p,
                stock: Math.floor(Math.random() * 50) + 10 // Stock aleatorio entre 10-60
            }));
            setProductos(productosConStock);
            localStorage.setItem('productosAdmin', JSON.stringify(productosConStock));
        }
    }, [isLoaded, estaLogueado, esAdmin, router]);

    // Guardar productos en localStorage
    const guardarProductos = (nuevosProductos: ProductoExtendido[]) => {
        setProductos(nuevosProductos);
        localStorage.setItem('productosAdmin', JSON.stringify(nuevosProductos));
    };

    // Mostrar notificación
    const mostrarNotificacion = (tipo: 'success' | 'error', mensaje: string) => {
        setNotification({ tipo, mensaje });
        setTimeout(() => setNotification(null), 3000);
    };

    // Abrir modal para agregar producto
    const abrirModalAgregar = () => {
        setModoEdicion(false);
        setFormData({
            nombre: '',
            precio: 0,
            categoria: 'Teclados',
            img: '',
            img2: '',
            img3: '',
            descripcion: '',
            stock: 0,
            oferta: {
                activa: false,
                precioOriginal: 0,
                descuento: 0,
                fechaInicio: '',
                fechaFin: '',
                etiqueta: ''
            }
        });
        setModalAbierto(true);
    };

    // Abrir modal para editar producto
    const abrirModalEditar = (producto: ProductoExtendido) => {
        setModoEdicion(true);
        setProductoActual(producto);
        setFormData({ ...producto });
        setModalAbierto(true);
    };

    // Cerrar modal
    const cerrarModal = () => {
        setModalAbierto(false);
        setProductoActual(null);
    };

    // Guardar producto (agregar o editar)
    const guardarProducto = () => {
        if (!formData.nombre || !formData.precio || !formData.img) {
            mostrarNotificacion('error', 'Por favor completa todos los campos obligatorios');
            return;
        }

        if (modoEdicion && productoActual) {
            // Editar producto existente
            const nuevosProductos = productos.map(p =>
                p.nombre === productoActual.nombre ? formData : p
            );
            guardarProductos(nuevosProductos);
            mostrarNotificacion('success', 'Producto actualizado correctamente');
        } else {
            // Agregar nuevo producto
            const productoExiste = productos.find(p => p.nombre === formData.nombre);
            if (productoExiste) {
                mostrarNotificacion('error', 'Ya existe un producto con ese nombre');
                return;
            }
            guardarProductos([...productos, formData]);
            mostrarNotificacion('success', 'Producto agregado correctamente');
        }

        cerrarModal();
    };

    // Eliminar producto
    const eliminarProducto = (nombre: string) => {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            const nuevosProductos = productos.filter(p => p.nombre !== nombre);
            guardarProductos(nuevosProductos);
            mostrarNotificacion('success', 'Producto eliminado correctamente');
        }
    };

    // Ajustar stock
    const ajustarStock = (nombre: string, cambio: number) => {
        const nuevosProductos = productos.map(p => {
            if (p.nombre === nombre) {
                const nuevoStock = (p.stock || 0) + cambio;
                return { ...p, stock: Math.max(0, nuevoStock) };
            }
            return p;
        });
        guardarProductos(nuevosProductos);
        mostrarNotificacion('success', `Stock ${cambio > 0 ? 'aumentado' : 'disminuido'} correctamente`);
    };

    // Filtrar productos
    const productosFiltrados = productos.filter(p => {
        const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            p.categoria.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro;
        return coincideBusqueda && coincideCategoria;
    });

    // Obtener categorías únicas
    const categorias = ['Todas', ...Array.from(new Set(productos.map(p => p.categoria)))];

    // Estadísticas
    const totalProductos = productos.length;
    const totalStock = productos.reduce((sum, p) => sum + (p.stock || 0), 0);
    const productosEnOferta = productos.filter(p => p.oferta?.activa).length;

    // Mostrar pantalla de carga mientras verifica permisos
    if (cargando) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Verificando permisos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 pt-24 pb-12 px-4">
            {/* Notificación */}
            {notification && (
                <div className={`fixed top-24 right-4 ${
                    notification.tipo === 'success' 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                        : 'bg-gradient-to-r from-red-600 to-rose-600'
                } text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slide-up flex items-center space-x-3 border ${
                    notification.tipo === 'success' ? 'border-green-500' : 'border-red-500'
                }`}>
                    <AlertCircle className="w-6 h-6" />
                    <p className="font-semibold">{notification.mensaje}</p>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center space-x-3">
                        <Package className="w-10 h-10 text-orange-500" />
                        <span>Panel de Administración</span>
                    </h1>
                    <p className="text-stone-400 text-lg">Gestiona tu inventario de productos</p>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-3xl p-6 shadow-xl border-2 border-teal-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-teal-100 text-sm mb-1">Total Productos</p>
                                <p className="text-white text-3xl font-bold">{totalProductos}</p>
                            </div>
                            <Package className="w-12 h-12 text-teal-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-3xl p-6 shadow-xl border-2 border-orange-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm mb-1">Stock Total</p>
                                <p className="text-white text-3xl font-bold">{totalStock}</p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-orange-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-3xl p-6 shadow-xl border-2 border-pink-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-pink-100 text-sm mb-1">En Oferta</p>
                                <p className="text-white text-3xl font-bold">{productosEnOferta}</p>
                            </div>
                            <Tag className="w-12 h-12 text-pink-200" />
                        </div>
                    </div>
                </div>

                {/* Barra de acciones */}
                <div className="bg-stone-800/50 backdrop-blur-md rounded-3xl p-6 mb-8 border-2 border-stone-700">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Buscador */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-full bg-stone-900/80 border-2 border-stone-700 rounded-2xl px-12 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                            />
                        </div>

                        {/* Filtro de categoría */}
                        <select
                            value={categoriaFiltro}
                            onChange={(e) => setCategoriaFiltro(e.target.value)}
                            className="bg-stone-900/80 border-2 border-stone-700 rounded-2xl px-6 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        >
                            {categorias.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        {/* Botón agregar */}
                        <button
                            onClick={abrirModalAgregar}
                            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-6 py-3 rounded-2xl font-semibold flex items-center space-x-2 transition-all shadow-lg hover:shadow-teal-500/50"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Agregar Producto</span>
                        </button>
                    </div>
                </div>

                {/* Tabla de productos */}
                <div className="bg-stone-800/50 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-stone-700">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-stone-900/80 border-b-2 border-stone-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-stone-300 font-semibold">Producto</th>
                                    <th className="px-6 py-4 text-left text-stone-300 font-semibold">Categoría</th>
                                    <th className="px-6 py-4 text-left text-stone-300 font-semibold">Precio</th>
                                    <th className="px-6 py-4 text-left text-stone-300 font-semibold">Stock</th>
                                    <th className="px-6 py-4 text-left text-stone-300 font-semibold">Oferta</th>
                                    <th className="px-6 py-4 text-center text-stone-300 font-semibold">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosFiltrados.map((producto, index) => (
                                    <tr
                                        key={producto.nombre}
                                        className="border-b border-stone-700 hover:bg-stone-900/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={producto.img}
                                                    alt={producto.nombre}
                                                    className="w-16 h-16 object-cover rounded-xl bg-stone-700"
                                                />
                                                <div>
                                                    <p className="text-white font-semibold">{producto.nombre}</p>
                                                    <p className="text-stone-400 text-sm">{producto.descripcion.substring(0, 40)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full text-sm font-medium border border-orange-600/30">
                                                {producto.categoria}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-1">
                                                <DollarSign className="w-4 h-4 text-teal-400" />
                                                <span className="text-white font-semibold">
                                                    {producto.precio.toLocaleString('es-CL')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => ajustarStock(producto.nombre, -1)}
                                                    className="bg-red-600 hover:bg-red-500 text-white p-1.5 rounded-lg transition-colors"
                                                    disabled={(producto.stock || 0) === 0}
                                                >
                                                    <TrendingDown className="w-4 h-4" />
                                                </button>
                                                <span className={`text-white font-semibold min-w-[3rem] text-center ${
                                                    (producto.stock || 0) < 10 ? 'text-red-400' : ''
                                                }`}>
                                                    {producto.stock || 0}
                                                </span>
                                                <button
                                                    onClick={() => ajustarStock(producto.nombre, 1)}
                                                    className="bg-green-600 hover:bg-green-500 text-white p-1.5 rounded-lg transition-colors"
                                                >
                                                    <TrendingUp className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {producto.oferta?.activa ? (
                                                <span className="bg-pink-600/20 text-pink-400 px-3 py-1 rounded-full text-sm font-medium border border-pink-600/30 flex items-center space-x-1 w-fit">
                                                    <Tag className="w-3 h-3" />
                                                    <span>-{producto.oferta.descuento}%</span>
                                                </span>
                                            ) : (
                                                <span className="text-stone-500 text-sm">Sin oferta</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    onClick={() => abrirModalEditar(producto)}
                                                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => eliminarProducto(producto.nombre)}
                                                    className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-xl transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {productosFiltrados.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-stone-600 mx-auto mb-4" />
                            <p className="text-stone-400 text-lg">No se encontraron productos</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de agregar/editar producto */}
            {modalAbierto && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-stone-900 rounded-3xl max-w-4xl w-full border-2 border-stone-700 shadow-2xl my-8">
                        {/* Header del modal */}
                        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 rounded-t-3xl flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                                {modoEdicion ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                <span>{modoEdicion ? 'Editar Producto' : 'Agregar Nuevo Producto'}</span>
                            </h2>
                            <button
                                onClick={cerrarModal}
                                className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nombre */}
                                <div>
                                    <label className="block text-stone-300 font-semibold mb-2">Nombre *</label>
                                    <input
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                        placeholder="Ej: G915 TKL"
                                        disabled={modoEdicion}
                                    />
                                </div>

                                {/* Precio */}
                                <div>
                                    <label className="block text-stone-300 font-semibold mb-2">Precio *</label>
                                    <input
                                        type="number"
                                        value={formData.precio}
                                        onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
                                        className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                        placeholder="15000"
                                    />
                                </div>

                                {/* Categoría */}
                                <div>
                                    <label className="block text-stone-300 font-semibold mb-2">Categoría *</label>
                                    <select
                                        value={formData.categoria}
                                        onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                        className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                    >
                                        <option value="Teclados">Teclados</option>
                                        <option value="Mouses">Mouses</option>
                                        <option value="Auriculares">Auriculares</option>
                                    </select>
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-stone-300 font-semibold mb-2">Stock</label>
                                    <input
                                        type="number"
                                        value={formData.stock || 0}
                                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                        className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                        placeholder="50"
                                    />
                                </div>

                                {/* Imagen principal */}
                                <div className="md:col-span-2">
                                    <label className="text-stone-300 font-semibold mb-2 flex items-center space-x-2">
                                        <ImageIcon className="w-4 h-4" />
                                        <span>Imagen Principal *</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.img}
                                        onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                                        className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                        placeholder="/img/productos/producto.avif"
                                    />
                                </div>

                                {/* Imagen 2 */}
                                <div>
                                    <label className="block text-stone-300 font-semibold mb-2">Imagen 2</label>
                                    <input
                                        type="text"
                                        value={formData.img2 || ''}
                                        onChange={(e) => setFormData({ ...formData, img2: e.target.value })}
                                        className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                        placeholder="/img/productos/producto2.avif"
                                    />
                                </div>

                                {/* Imagen 3 */}
                                <div>
                                    <label className="block text-stone-300 font-semibold mb-2">Imagen 3</label>
                                    <input
                                        type="text"
                                        value={formData.img3 || ''}
                                        onChange={(e) => setFormData({ ...formData, img3: e.target.value })}
                                        className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                        placeholder="/img/productos/producto3.avif"
                                    />
                                </div>

                                {/* Descripción */}
                                <div className="md:col-span-2">
                                    <label className="block text-stone-300 font-semibold mb-2">Descripción</label>
                                    <textarea
                                        value={formData.descripcion}
                                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                        className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 min-h-[100px]"
                                        placeholder="Descripción del producto..."
                                    />
                                </div>

                                {/* Sección de oferta */}
                                <div className="md:col-span-2 border-t-2 border-stone-700 pt-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <input
                                            type="checkbox"
                                            id="oferta-activa"
                                            checked={formData.oferta?.activa || false}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                oferta: {
                                                    ...formData.oferta!,
                                                    activa: e.target.checked
                                                }
                                            })}
                                            className="w-5 h-5 rounded accent-orange-500"
                                        />
                                        <label htmlFor="oferta-activa" className="text-stone-300 font-semibold">
                                            Producto en oferta
                                        </label>
                                    </div>

                                    {formData.oferta?.activa && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-stone-400 text-sm mb-2">Precio Original</label>
                                                <input
                                                    type="number"
                                                    value={formData.oferta.precioOriginal}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        oferta: {
                                                            ...formData.oferta!,
                                                            precioOriginal: Number(e.target.value)
                                                        }
                                                    })}
                                                    className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-stone-400 text-sm mb-2">Descuento (%)</label>
                                                <input
                                                    type="number"
                                                    value={formData.oferta.descuento}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        oferta: {
                                                            ...formData.oferta!,
                                                            descuento: Number(e.target.value)
                                                        }
                                                    })}
                                                    className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-stone-400 text-sm mb-2">Fecha Inicio</label>
                                                <input
                                                    type="date"
                                                    value={formData.oferta.fechaInicio}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        oferta: {
                                                            ...formData.oferta!,
                                                            fechaInicio: e.target.value
                                                        }
                                                    })}
                                                    className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-stone-400 text-sm mb-2">Fecha Fin</label>
                                                <input
                                                    type="date"
                                                    value={formData.oferta.fechaFin}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        oferta: {
                                                            ...formData.oferta!,
                                                            fechaFin: e.target.value
                                                        }
                                                    })}
                                                    className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-stone-400 text-sm mb-2">Etiqueta</label>
                                                <input
                                                    type="text"
                                                    value={formData.oferta.etiqueta || ''}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        oferta: {
                                                            ...formData.oferta!,
                                                            etiqueta: e.target.value
                                                        }
                                                    })}
                                                    className="w-full bg-stone-800 border-2 border-stone-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-orange-500"
                                                    placeholder="Ej: Oferta de Primavera"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer del modal */}
                        <div className="p-6 border-t-2 border-stone-700 flex justify-end space-x-4">
                            <button
                                onClick={cerrarModal}
                                className="bg-stone-700 hover:bg-stone-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={guardarProducto}
                                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all shadow-lg"
                            >
                                <Save className="w-5 h-5" />
                                <span>{modoEdicion ? 'Guardar Cambios' : 'Agregar Producto'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
