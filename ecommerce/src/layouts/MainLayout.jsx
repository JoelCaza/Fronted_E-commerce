import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MainLayout.css";

export const MainLayout = () => {
    const [isDark, setIsDark] = useState(() => {
        // Persist preference in localStorage
        return localStorage.getItem('theme') !== 'light';
    });

    useEffect(() => {
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', isDark ? '' : 'light');
        localStorage.setItem('theme', theme);
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <div className="layout-container">
            <nav className="navbar">
                <Link to="/" className="navbar-brand">
                    Tienda<span className="navbar-brand-dot"></span>
                </Link>

                <div className="navbar-links">
                    <Link className="nav-link" to="/">Inicio</Link>
                    <Link className="nav-link" to="/productos">Productos</Link>
                    <Link className="nav-link" to="/categoria">Categorias</Link>
                    <Link className="nav-link" to="/adminProductos">Crud Productos</Link>

                </div>

                <div className="navbar-actions">
                    {/* Theme toggle */}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                        title={isDark ? 'Modo claro' : 'Modo oscuro'}
                    >
                        <span className="theme-toggle-track">
                            <span className="theme-toggle-thumb"></span>
                        </span>
                        <span className="theme-toggle-icon">
                            {isDark ? (
                                /* Moon */
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            ) : (
                                /* Sun */
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            )}
                        </span>
                    </button>

                    <Link className="nav-cart-btn" to="/carrito">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Carrito
                    </Link>
                </div>
            </nav>

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;