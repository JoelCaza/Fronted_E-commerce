import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useContext } from 'react';
import { ContextCart } from '../context/ContextCart';
import { Link, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../services/api';
import '../styles/CardProduct.css';

export const CardProduct = ({ producto }) => {
    const { agregarAlCarrito } = useContext(ContextCart);
    const { id, nombre, precio, imagen, descripcion, stock, categoria } = producto;
    const navigate = useNavigate();

    const handleAgregar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        agregarAlCarrito(producto);
    };

    const handleNavigate = (e) => {
        // Solo navega si no se hizo click en un botón de acción
        if (!e.defaultPrevented) {
            navigate(`/productos/${id}`);
        }
    };

    return (
        <motion.div 
            className="product-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
        >
            <div 
                className="card-image-link" 
                onClick={handleNavigate} 
                style={{ cursor: 'pointer', display: 'block' }}
                role="button"
                tabIndex={0}
            >
                <div className="image-container">
                    <img 
                        src={getImageUrl(imagen)} 
                        alt={nombre} 
                        loading="lazy"
                    />
                    
                    <div className="card-badges">
                        {stock === 0 ? (
                            <span className="badge badge-out">Agotado</span>
                        ) : stock < 5 ? (
                            <span className="badge badge-low">¡Últimas {stock}!</span>
                        ) : null}
                    </div>

                    <div className="card-overlay">
                        <motion.button 
                            className="overlay-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleAgregar}
                            disabled={stock === 0}
                            title="Agregar al carrito"
                        >
                            <ShoppingCart size={20} />
                        </motion.button>
                        <Link 
                            to={`/productos/${id}`} 
                            className="overlay-btn" 
                            title="Ver detalles"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Eye size={20} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="card-info">
                <div className="card-meta">
                    <span className="card-category">{(categoria && typeof categoria === 'object') ? categoria.nombre : (categoria || 'Colección Premium')}</span>
                    <div className="card-rating">
                        <Star size={12} fill="currentColor" />
                        <span>4.9</span>
                    </div>
                </div>
                
                <h3 className="card-title">{nombre}</h3>
                <p className="card-description">
                    {descripcion?.length > 60 ? `${descripcion.substring(0, 60)}...` : descripcion}
                </p>
                
                <div className="card-footer">
                    <span className="card-price">${precio}</span>
                    <button 
                        className={`add-btn ${stock === 0 ? 'disabled' : ''}`}
                        onClick={handleAgregar}
                        disabled={stock === 0}
                    >
                        {stock === 0 ? 'Sin Stock' : 'Añadir'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
