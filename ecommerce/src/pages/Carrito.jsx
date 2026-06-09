import { useContext, useState } from "react";
import { ContextCart } from "../context/ContextCart";
import { 
    Trash2, 
    ShoppingBag, 
    ArrowRight, 
    CreditCard, 
    ChevronLeft,
    Plus,
    Minus,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { checkout } from "../services/orderService";
import "./Carrito.css";

export const Carrito = () => {
    const { carrito, eliminarDelCarrito, vaciarCarrito, agregarAlCarrito, quitarUno } = useContext(ContextCart);
    const [cargando, setCargando] = useState(false);
    const [completado, setCompletado] = useState(false);

    const total = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
    const envio = total > 500 ? 0 : 25;

    const handleRealizarPedido = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión para finalizar la compra");
            return;
        }

        setCargando(true);
        const payload = carrito.map((item) => ({
            productoId: item.id || item.producto_id,
            cantidad: item.cantidad || 1
        }));

        try {
            await checkout(payload);

            setTimeout(() => {
                setCargando(false);
                setCompletado(true);
                vaciarCarrito();
            }, 1500);

        } catch (error) {
            console.error("Error al procesar el pedido:", error);
            setCargando(false);
            alert("Hubo un error al procesar tu pedido. Por favor intenta de nuevo.");
        }
    };

    if (completado) {
        return (
            <div className="container">
                <motion.div 
                    className="success-container"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <CheckCircle2 size={80} className="success-icon" />
                    <h1>¡Pedido Realizado!</h1>
                    <p>Gracias por tu compra. Te hemos enviado un correo con los detalles de tu pedido.</p>
                    <Link to="/mispedidos" className="btn-primary">Ver Mis Pedidos</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <header className="cart-header">
                    <h1 className="page-title">Tu <span className="text-gradient">Carrito</span></h1>
                    <Link to="/productos" className="back-link">
                        <ChevronLeft size={20} /> Continuar comprando
                    </Link>
                </header>

                {carrito.length === 0 ? (
                    <div className="empty-cart">
                        <ShoppingBag size={64} className="empty-icon" />
                        <h2>Tu carrito está vacío</h2>
                        <p>¿Aún no has encontrado nada que te guste? Explora nuestra colección.</p>
                        <Link to="/productos" className="btn-primary">Explorar Productos</Link>
                    </div>
                ) : (
                    <div className="cart-layout">
                        {/* List */}
                        <div className="cart-items">
                            <AnimatePresence>
                                {carrito.map((item) => (
                                    <motion.div 
                                        key={item.id || item.producto_id} 
                                        className="cart-item"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        layout
                                    >
                                        <div className="item-image">
                                            <img src={item.imagen || "https://via.placeholder.com/150"} alt={item.nombre} />
                                        </div>
                                        <div className="item-details">
                                            <div className="item-info">
                                                <h3>{item.nombre}</h3>
                                                <p className="item-category">Premium Product</p>
                                            </div>
                                            <div className="item-pricing">
                                                <span className="price">${item.precio}</span>
                                                <div className="qty-picker">
                                                    <button onClick={() => quitarUno(item.producto_id)}><Minus size={14} /></button>
                                                    <span>{item.cantidad || 1}</span>
                                                    <button onClick={() => agregarAlCarrito({ id: item.producto_id, nombre: item.nombre, precio: item.precio, imagen: item.imagen })}><Plus size={14} /></button>
                                                </div>
                                                <span className="subtotal">${(item.precio * (item.cantidad || 1)).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => eliminarDelCarrito(item.id || item.producto_id)}
                                            title="Eliminar producto"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            
                            <button className="btn-clear" onClick={vaciarCarrito}>
                                <Trash2 size={16} /> Vaciar Carrito
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="cart-summary">
                            <div className="summary-card">
                                <h3>Resumen del Pedido</h3>
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Envío</span>
                                    <span>{envio === 0 ? 'GRATIS' : `$${envio.toFixed(2)}`}</span>
                                </div>
                                <div className="summary-divider"></div>
                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>${(total + envio).toFixed(2)}</span>
                                </div>

                                <button 
                                    className="btn-primary checkout-btn" 
                                    onClick={handleRealizarPedido}
                                    disabled={cargando}
                                >
                                    {cargando ? <Loader2 className="spinner" size={20} /> : (
                                        <>Finalizar Compra <ArrowRight size={20} /></>
                                    )}
                                </button>

                                <div className="secure-payment">
                                    <CreditCard size={16} /> Pago 100% seguro y encriptado
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
