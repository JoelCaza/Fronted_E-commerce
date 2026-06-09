import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Ghost, Home, ArrowLeft } from "lucide-react";
import "./NotFound.css";

export const NotFound = () => {
    return (
        <div className="notfound-page">
            <div className="bg-blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
            
            <div className="notfound-404">404</div>
            
            <motion.div 
                className="notfound-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="notfound-visual">
                    <Ghost size={64} strokeWidth={1.5} />
                </div>
                
                <h1>Página no encontrada</h1>
                <p>
                    Parece que te has aventurado en un rincón desconocido de nuestra tienda. 
                    El producto o la página que buscas no está aquí.
                </p>
                
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button 
                        onClick={() => window.history.back()} 
                        className="btn-secondary"
                    >
                        <ArrowLeft size={20} /> Volver atrás
                    </button>
                    <Link to="/" className="btn-primary">
                        <Home size={20} /> Ir al Inicio
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}