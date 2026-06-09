import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ContextCart } from "../context/ContextCart";
import { 
    ShoppingBag, 
    User, 
    Menu, 
    X, 
    Sun, 
    Moon, 
    Settings, 
    Package, 
    MessageSquare,
    ChevronRight,
    Globe,
    Send,
    Camera
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BotWidget } from "../components/BotWidget";
import "./MainLayout.css";

export const MainLayout = () => {
    const { carrito } = useContext(ContextCart);
    const cartCount = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') !== 'light';
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', isDark ? '' : 'light');
        localStorage.setItem('theme', theme);
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    // Close menu on navigation
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <div className="layout-container">
            <nav className="navbar">
                <div className="container navbar-inner">
                    <Link to="/" className="navbar-brand">
                        <span>ECO</span>
                        <span className="text-gradient">STORE</span>
                    </Link>

                    <div className="navbar-links-desktop">
                        <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Inicio</Link>
                        <Link className={`nav-link ${location.pathname === '/productos' ? 'active' : ''}`} to="/productos">Colección</Link>
                        <Link className={`nav-link ${location.pathname === '/categoria' ? 'active' : ''}`} to="/categoria">Categorías</Link>
                        <Link className="nav-link" to="/adminProductos">Panel</Link>
                    </div>

                    <div className="navbar-actions">
                        <button className="icon-btn theme-toggle" onClick={toggleTheme}>
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        
                        <Link className="nav-cart-btn" to="/carrito">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </Link>

                        <button className="icon-btn mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="mobile-menu-links">
                            <Link to="/">Inicio</Link>
                            <Link to="/productos">Colección</Link>
                            <Link to="/categoria">Categorías</Link>
                            <Link to="/mispedidos">Mis Pedidos</Link>
                            <Link to="/adminProductos">Administración</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="main-content">
                <Outlet />
            </main>

            <BotWidget />

            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <Link to="/" className="navbar-brand">
                                <span>ECO</span>
                                <span className="text-gradient">STORE</span>
                            </Link>
                            <p className="footer-desc">
                                Definiendo el futuro del comercio digital con elegancia y sostenibilidad.
                            </p>
                            <div className="footer-socials">
                                <a href="#" className="social-link"><Send size={20} /></a>
                                <a href="#" className="social-link"><Camera size={20} /></a>
                                <a href="#" className="social-link"><Globe size={20} /></a>
                            </div>
                        </div>

                        <div className="footer-nav">
                            <h4>Tienda</h4>
                            <Link to="/productos">Todos los productos</Link>
                            <Link to="/categoria">Categorías</Link>
                            <Link to="/productos?novedades=true">Novedades</Link>
                        </div>

                        <div className="footer-nav">
                            <h4>Cuenta</h4>
                            <Link to="/login">Iniciar Sesión</Link>
                            <Link to="/mispedidos">Mis Pedidos</Link>
                            <Link to="/carrito">Mi Carrito</Link>
                        </div>

                        <div className="footer-newsletter">
                            <h4>Suscríbete</h4>
                            <p>Recibe ofertas exclusivas y novedades.</p>
                            <div className="newsletter-form">
                                <input type="email" placeholder="tu@email.com" />
                                <button className="btn-send"><ChevronRight size={20} /></button>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2026 ECOSTORE. Todos los derechos reservados.</p>
                        <div className="footer-legal">
                            <a href="#">Privacidad</a>
                            <a href="#">Términos</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
