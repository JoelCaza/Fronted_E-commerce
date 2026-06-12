import { CardProduct } from "../components/CardProduct.jsx";
import '../styles/Products.css';
import { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "../services/productService";

export const Products = () => {
    const [busqueda, setBusqueda] = useState('');
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [categoriaActiva, setCategoriaActiva] = useState('Todas');

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const data = await getProducts();
                setProductos(data);
                setCargando(false);
            }
            catch (error) {
                console.error("Error al obtener los productos:", error);
                setCargando(false);
            }
        };
        obtenerProductos();
    }, []);

    const categorias = ['Todas', ...new Set(productos.map(p => 
        (p.categoria && typeof p.categoria === 'object') ? p.categoria.nombre : (p.categoria || 'Varios')
    ))];

    const productosFiltrados = productos.filter(producto => {
        const matchesSearch = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const categoryName = (producto.categoria && typeof producto.categoria === 'object') ? producto.categoria.nombre : (producto.categoria || 'Varios');
        const matchesCategory = categoriaActiva === 'Todas' || categoryName === categoriaActiva;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="products-page">
            <header className="products-header">
                <div className="container">
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="page-title"
                    >
                        Nuestra <span className="text-gradient">Colección</span>
                    </motion.h1>
                    <p className="page-subtitle">Explora {productos.length} productos exclusivos diseñados para ti.</p>
                </div>
            </header>

            <div className="container">
                <div className="filters-bar">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <div className="category-filters">
                        {categorias.map(cat => (
                            <button 
                                key={cat}
                                className={`filter-chip ${categoriaActiva === cat ? 'active' : ''}`}
                                onClick={() => setCategoriaActiva(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <button className="icon-btn-text">
                        <SlidersHorizontal size={18} />
                        <span>Filtros</span>
                    </button>
                </div>

                {cargando ? (
                    <div className="loading-state">
                        <Loader2 className="spinner" size={48} />
                        <p>Cargando colección...</p>
                    </div>
                ) : (
                    <motion.div 
                        className="products-grid"
                        layout
                    >
                        <AnimatePresence mode="popLayout">
                            {productosFiltrados.map((producto) => (
                                <CardProduct key={producto.id} producto={producto} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {!cargando && productosFiltrados.length === 0 && (
                    <div className="empty-state">
                        <h3>No se encontraron productos</h3>
                        <p>Intenta ajustar tu búsqueda o filtros.</p>
                        <button className="btn-secondary" onClick={() => {setBusqueda(''); setCategoriaActiva('Todas');}}>
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
