import { useState, useEffect } from "react";
import { 
    Package, 
    Calendar, 
    CreditCard, 
    ChevronRight, 
    Loader2, 
    ShoppingBag,
    CheckCircle2,
    Clock,
    AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getMisPedidos } from "../services/orderService";
import { getImageUrl } from "../services/api";
import '../styles/MisPedidos.css';

export const MisPedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerPedidos = async () => {
        try {
            const data = await getMisPedidos();
            setPedidos(data);
        } catch (error) {
            console.error("Error al cargar Pedidos:", error);
            // It could be unauthorized, handle gracefully if needed
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerPedidos();
    }, []);

    if (cargando) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <Loader2 className="spinner" size={48} />
                <p>Cargando tu historial de pedidos...</p>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="container">
                <header className="admin-header">
                    <h1 className="page-title">Mis <span className="text-gradient">Pedidos</span></h1>
                    <p>Revisa el estado de tus compras y descarga tus facturas.</p>
                </header>

                {pedidos.length === 0 ? (
                    <motion.div 
                        className="orders-empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="orders-empty-icon">
                            <ShoppingBag size={40} />
                        </div>
                        <h2>Aún no tienes pedidos</h2>
                        <p>Cuando realices una compra, aparecerá aquí para que puedas rastrearla.</p>
                        <Link to="/productos" className="btn-primary">Empezar a comprar</Link>
                    </motion.div>
                ) : (
                    <div className="orders-list">
                        {pedidos.map((pedido, index) => (
                            <motion.div 
                                key={pedido.id}
                                className="order-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="order-header">
                                    <div className="order-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Pedido</span>
                                            <span className="meta-value">#{pedido.id}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Fecha</span>
                                            <span className="meta-value">
                                                {new Date(pedido.fecha_creacion || Date.now()).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Total</span>
                                            <span className="meta-value">${pedido.total?.toFixed(2) || "0.00"}</span>
                                        </div>
                                    </div>
                                    
                                    <div className={`order-status ${pedido.estado === 'completado' ? 'status-completed' : 'status-pending'}`}>
                                        {pedido.estado === 'completado' ? (
                                            <><CheckCircle2 size={14} style={{ marginRight: 6 }} /> Entregado</>
                                        ) : (
                                            <><Clock size={14} style={{ marginRight: 6 }} /> En proceso</>
                                        )}
                                    </div>
                                </div>

                                <div className="order-body">
                                    <div className="order-items">
                                        {pedido.detalles?.map((item) => (
                                            <div key={item.id} className="order-item-row">
                                                <div className="order-item-info">
                                                    <img 
                                                        src={getImageUrl(item.producto?.imagen)} 
                                                        alt={item.producto?.nombre} 
                                                        className="order-item-img"
                                                    />
                                                    <div className="order-item-details">
                                                        <h4>{item.producto?.nombre}</h4>
                                                        <p>Cantidad: {item.cantidad}</p>
                                                    </div>
                                                </div>
                                                <span className="order-item-price">${(item.precio * item.cantidad).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="order-footer">
                                    <button className="btn-secondary" style={{ fontSize: '13px', padding: '8px 16px' }}>
                                        Ayuda con el pedido
                                    </button>
                                    <button className="btn-primary" style={{ fontSize: '13px', padding: '8px 16px' }}>
                                        Ver Detalles
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}