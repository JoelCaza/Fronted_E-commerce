import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { 
    ChevronLeft, 
    Star, 
    Truck, 
    ShieldCheck, 
    RotateCcw, 
    ShoppingCart, 
    Heart, 
    Plus, 
    Minus,
    Share2,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ContextCart } from "../context/ContextCart";
import { getProductById } from "../services/productService";
import "./ProductDetail.css";

export const ProductDetail = () => {
    const { id } = useParams();
    const { agregarAlCarrito } = useContext(ContextCart);
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [qty, setQty] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                const data = await getProductById(id);
                setProducto(data);
                setCargando(false);
            }
            catch (error) {
                console.error("Error al obtener el producto:", error);
                setCargando(false);
            }
        };
        obtenerProducto();
    }, [id]);

    const handleAddToCart = () => {
        if (producto) {
            for (let i = 0; i < qty; i++) {
                agregarAlCarrito(producto);
            }
        }
    };

    if (cargando) {
        return (
            <div className="loading-container">
                <Loader2 className="spinner" size={48} />
                <p>Cargando detalles...</p>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="container">
                <div className="error-state">
                    <h2>Producto no encontrado</h2>
                    <p>Lo sentimos, no pudimos encontrar el producto que buscas.</p>
                    <Link to="/productos" className="btn-secondary">Volver a la colección</Link>
                </div>
            </div>
        );
    }

    const { nombre, precio, imagen, descripcion, stock, categoria } = producto;

    return (
        <div className="product-detail-page">
            <div className="container">
                <nav className="detail-nav">
                    <Link to="/productos" className="back-link">
                        <ChevronLeft size={20} /> Volver a Colección
                    </Link>
                </nav>

                <div className="detail-grid">
                    {/* Visuals */}
                    <motion.div 
                        className="detail-visuals"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="main-image-wrapper">
                            <motion.img 
                                key={activeImage}
                                src={imagen || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"} 
                                alt={nombre}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                            />
                            {stock < 5 && stock > 0 && (
                                <span className="detail-badge-floating">Últimas Unidades</span>
                            )}
                        </div>
                        
                        <div className="thumbnail-grid">
                            {[0, 1, 2].map(i => (
                                <button 
                                    key={i} 
                                    className={`thumb-btn ${activeImage === i ? 'active' : ''}`}
                                    onClick={() => setActiveImage(i)}
                                >
                                    <img src={imagen} alt={`${nombre} view ${i}`} />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div 
                        className="detail-info"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="info-header">
                            <span className="info-category">
                                {(categoria && typeof categoria === 'object') ? categoria.nombre : (categoria || 'Premium Collection')}
                            </span>
                            <div className="info-actions">
                                <button className="icon-btn"><Share2 size={18} /></button>
                                <button 
                                    className={`icon-btn ${wishlisted ? 'active' : ''}`}
                                    onClick={() => setWishlisted(!wishlisted)}
                                >
                                    <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
                                </button>
                            </div>
                        </div>

                        <h1 className="info-title">{nombre}</h1>
                        
                        <div className="info-rating">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />)}
                            </div>
                            <span className="rating-text">4.8 (120 reseñas)</span>
                        </div>

                        <div className="info-price">${precio}</div>
                        
                        <p className="info-description">{descripcion}</p>

                        <div className="detail-divider"></div>

                        {stock > 0 ? (
                            <div className="purchase-options">
                                <div className="qty-selector">
                                    <button onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={18} /></button>
                                    <span>{qty}</span>
                                    <button onClick={() => setQty(q => Math.min(stock, q + 1))}><Plus size={18} /></button>
                                </div>
                                <button className="btn-primary flex-1" onClick={handleAddToCart}>
                                    <ShoppingCart size={20} /> Añadir al Carrito
                                </button>
                            </div>
                        ) : (
                            <button className="btn-primary disabled w-full" disabled>Agotado temporalmente</button>
                        )}

                        <div className="info-benefits">
                            <div className="benefit-item">
                                <Truck size={20} />
                                <div>
                                    <p className="benefit-title">Envío Express Gratis</p>
                                    <p className="benefit-desc">Entrega en 2-3 días hábiles.</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <ShieldCheck size={20} />
                                <div>
                                    <p className="benefit-title">Garantía Asegurada</p>
                                    <p className="benefit-desc">12 meses de cobertura total.</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <RotateCcw size={20} />
                                <div>
                                    <p className="benefit-title">Devoluciones Fáciles</p>
                                    <p className="benefit-desc">30 días para cambios sin costo.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
