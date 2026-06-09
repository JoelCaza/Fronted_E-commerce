import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useContext } from 'react';
import { ContextCart } from '../context/ContextCart';
import { Link } from 'react-router-dom';
import './CardProduct.css';

export const CardProduct = ({ producto }) => {
    const { agregarAlCarrito } = useContext(ContextCart);
    const { id, nombre, precio, imagen, descripcion, stock } = producto;

    const handleAgregar = (e) => {
        e.preventDefault();
        e.stopPropagation();
        agregarAlCarrito(producto);
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
            <Link to={`/productos/${id}`} className="card-image-link">
                <div className="image-container">
                    <img 
                        src={imagen || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"} 
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
                        <Link to={`/productos/${id}`} className="overlay-btn" title="Ver detalles">
                            <Eye size={20} />
                        </Link>
                    </div>
                </div>
            </Link>

            <div className="card-info">
                <div className="card-meta">
                    <span className="card-category">Premium</span>
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
