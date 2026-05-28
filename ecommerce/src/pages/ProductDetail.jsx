import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./ProductDetail.css";

const productos = [
    { id: 1, nombre: "laptop", precio: 1000, imagen: "https://placehold.net/9.png", descripcion: "Laptop de alto rendimiento ideal para trabajo y gaming. Procesador de última generación, pantalla Full HD y batería de larga duración.", OnSale: true, outStock: false, categoria: "Computación" },
    { id: 2, nombre: "mouse", precio: 200, imagen: "https://placehold.net/9.png", descripcion: "Mouse inalámbrico ergonómico con sensor de precisión y hasta 90 días de batería. Compatible con todos los sistemas.", OnSale: false, outStock: true, categoria: "Periféricos" },
    { id: 3, nombre: "teclado", precio: 300, imagen: "https://placehold.net/9.png", descripcion: "Teclado mecánico compacto con retroiluminación RGB personalizable y switches táctiles de respuesta rápida.", OnSale: false, outStock: false, categoria: "Periféricos" },
];

export const ProductDetail = () => {
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);
    const [activeThumb, setActiveThumb] = useState(0);

    const producto = productos.find((p) => p.id === Number(id));

    if (!producto) {
        return (
            <div className="detail-page">
                <div className="detail-not-found">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--c-text-muted)' }}>
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <h2>Producto no encontrado</h2>
                    <p>El producto que buscas no existe o fue eliminado.</p>
                    <Link to="/productos" className="btn-back">
                        ← Volver a productos
                    </Link>
                </div>
            </div>
        );
    }

    const originalPrice = producto.OnSale ? (producto.precio * 1.2).toFixed(0) : null;
    const savings = originalPrice ? (originalPrice - producto.precio).toFixed(0) : null;

    return (
        <div className="detail-page">

            {/* Breadcrumb */}
            <nav className="detail-breadcrumb">
                <Link to="/">Inicio</Link>
                <span className="detail-breadcrumb-sep">›</span>
                <Link to="/productos">Productos</Link>
                <span className="detail-breadcrumb-sep">›</span>
                <span className="detail-breadcrumb-current">{producto.nombre}</span>
            </nav>

            <div className="detail-layout">

                {/* ── IMAGE PANEL ── */}
                <div className="detail-image-panel">
                    <div className="detail-image-main">
                        <img src={producto.imagen} alt={producto.nombre} />
                        <div className="detail-img-badge">
                            {producto.OnSale && <span className="detail-badge detail-badge-sale">En Oferta</span>}
                            {producto.outStock && <span className="detail-badge detail-badge-stock">Agotado</span>}
                        </div>
                    </div>

                    {/* Thumbnail strip */}
                    <div className="detail-thumbs">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`detail-thumb ${activeThumb === i ? 'active' : ''}`}
                                onClick={() => setActiveThumb(i)}
                            >
                                <img src={producto.imagen} alt={`Vista ${i + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── INFO PANEL ── */}
                <div className="detail-info-panel">

                    <span className="detail-category">{producto.categoria}</span>
                    <h1 className="detail-title">{producto.nombre}</h1>

                    {/* Rating */}
                    <div className="detail-rating">
                        <div className="detail-stars">★★★★★</div>
                        <span className="detail-rating-count">4.9</span>
                        <div className="detail-rating-divider"></div>
                        <span className="detail-reviews">128 reseñas</span>
                    </div>

                    <div className="detail-divider"></div>

                    {/* Price */}
                    <div className="detail-price-block">
                        <div className="detail-price">
                            <span className="detail-price-currency">$</span>
                            {producto.precio.toLocaleString()}
                        </div>
                        {originalPrice && (
                            <>
                                <span className="detail-price-original">${Number(originalPrice).toLocaleString()}</span>
                                <span className="detail-price-save">Ahorras ${Number(savings).toLocaleString()}</span>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <p className="detail-description">{producto.descripcion}</p>

                    {/* Features */}
                    <div className="detail-features">
                        <div className="detail-feature">
                            <span className="detail-feature-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>
                            Garantía de 1 año incluida
                        </div>
                        <div className="detail-feature">
                            <span className="detail-feature-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>
                            Envío gratis a todo el país
                        </div>
                        <div className="detail-feature">
                            <span className="detail-feature-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>
                            30 días para devoluciones sin costo
                        </div>
                    </div>

                    <div className="detail-divider"></div>

                    {/* Quantity */}
                    {!producto.outStock && (
                        <div className="detail-qty-row">
                            <span className="detail-qty-label">Cantidad</span>
                            <div className="detail-qty-control">
                                <button className="detail-qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                                <span className="detail-qty-value">{qty}</span>
                                <button className="detail-qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="detail-cta">
                        <button className="btn-add-cart" disabled={producto.outStock}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            {producto.outStock ? 'Sin stock' : `Agregar ${qty > 1 ? `(${qty})` : ''} al carrito`}
                        </button>
                        <button
                            className="btn-wishlist"
                            onClick={() => setWishlisted(w => !w)}
                            title={wishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? '#f43f5e' : 'none'} stroke={wishlisted ? '#f43f5e' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>
                    </div>

                    {/* Shipping info */}
                    <div className="detail-shipping">
                        <div className="detail-ship-row">
                            <span className="detail-ship-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                            </span>
                            <span>Envío gratis en pedidos mayores a $500</span>
                        </div>
                        <div className="detail-ship-row">
                            <span className="detail-ship-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </span>
                            <span>Pago seguro con encriptación SSL</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
