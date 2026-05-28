import { CardProduct } from "../components/CardProduct.jsx";
import { ContextCart } from "../context/ContextCart.jsx";
import "./Products.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export const Products = () => {
    const [busqueda, setBusqueda] = useState('');
    const {agregarAlCarrito} = useContext(ContextCart);
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/productos`);
                const data = await response.json();
                setProductos(data);
                console.log("Productos obtenidos:", data);
                setCargando(false);
            }
            catch (error) {
                console.error("Error al obtener los productos:", error);
                setCargando(false);
            }
        };
        obtenerProductos();
    }, []);




 return (
        <div className="products-container">
            <h1 className="products-title">Productos</h1>
            <p className="products-subtitle">Explora nuestra colección exclusiva</p>

            <div className="products-search-wrapper">
                <span className="products-search-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
                <input
                    className="products-search"
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            <div className="products-grid">
                {productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda.toLowerCase()))
                    .map(producto => (
                        <Link to={`/product/${producto.id}`} key={producto.id} className="products-link">
                            
                            {/* Integramos el HTML de la tarjeta directamente aquí */}
                            <div className="card-product">
                                <img 
                                    src={producto.imagen || "https://via.placeholder7.com/150"} 
                                    alt={producto.nombre} 
                                    className="card-product-image" 
                                />
                                <div className="card-product-info">
                                    <h3 className="card-product-name">{producto.nombre}</h3>
                                    <p className="card-product-price">${producto.precio}</p>
                                    <p className="card-product-description">{producto.descripcion}</p>
                                    <h3 className="card-product-category">{producto.stock}</h3>
                                    <button
                                    onClick={() => agregarAlCarrito(producto)}
                                    disabled = {producto.stock === 0}
                                    >
                                        {producto.stock === 0 ? "Agotado" : "Agregar al carrito"}

                                    </button>
                                </div>
                            </div>
                            
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};