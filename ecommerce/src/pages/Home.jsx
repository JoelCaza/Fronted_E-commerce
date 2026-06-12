import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, 
    Zap, 
    ShieldCheck, 
    Truck, 
    Sparkles,
    ChevronRight,
    ShoppingBag
} from 'lucide-react';
import '../styles/Home.css';
// Asegúrate de que la ruta de tu imagen sea correcta
import heroImage from '../assets/hero.png'; 

export const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            brand: "Honkai Impact 3rd", // Texto pequeño superior estilo marca/juego
            title: "v8.8 [Adrift in the\nSea of Data]",
            subtitle: "Descubre el nexo donde el arte cobra vida. La nueva versión ya está disponible.",
            image: heroImage,
            thumbnail: heroImage, 
            align: "left"
        },
        {
            id: 2,
            brand: "Genshin Impact",
            title: "Ediciones Limitadas\nDisponibles Ahora",
            subtitle: "Asegura tu pieza de historia. Figuras a escala ultra detalladas con disponibilidad limitada.",
            image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1920&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=300&auto=format&fit=crop",
            align: "left"
        },
        {
            id: 3,
            brand: "Zenless Zone Zero",
            title: "El Arte del Detalle\nEsculturas Maestras",
            subtitle: "Cada figura es una obra de arte pintada a mano, capturando la esencia pura de tus personajes.",
            image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1920&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=300&auto=format&fit=crop",
            align: "left"
        },
        {
            id: 4,
            brand: "Honkai: Star Rail",
            title: "Explora la Galaxia\nColección Astral",
            subtitle: "Viaja entre las estrellas con nuestras figuras exclusivas de la tripulación del Expreso Astral.",
            image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1920&auto=format&fit=crop",
            thumbnail: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=300&auto=format&fit=crop",
            align: "left"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const categories = [
        { name: "Figuras a Escala", image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1000&auto=format&fit=crop", count: "Premium Quality" },
        { name: "Nendoroids & Chibis", image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000&auto=format&fit=crop", count: "Colección Adorable" },
        { name: "Ediciones Limitadas", image: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1000&auto=format&fit=crop", count: "Rarezas & Exclusivas" }
    ];

    const news = [
        { id: 1, category: "Noticias", date: "12/06/2026", title: "Nueva expansión 'Ecos del Vacío' disponible ahora.", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=600&auto=format&fit=crop" },
        { id: 2, category: "Evento", date: "10/06/2026", title: "Participa en el sorteo de figuras edición limitada.", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=600&auto=format&fit=crop" },
        { id: 3, category: "Tienda", date: "08/06/2026", title: "Restock de la colección 'Stella Gold'.", image: "https://images.unsplash.com/photo-1613376023733-0d74332098c3?q=80&w=600&auto=format&fit=crop" }
    ];

    return (
        <div className="home-container">
            {/* HOYOVERSE STYLE HERO */}
            <section className="hero-carousel">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="slide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {/* Background Image */}
                        <div className="slide-bg-wrapper">
                            <img src={slides[currentSlide].image} alt="Background" className="slide-bg" />
                            <div className="slide-overlay-gradient"></div> 
                        </div>

                        {/* Content Box */}
                        <div className="container slide-content-container">
                            <motion.div 
                                className="slide-content"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            >
                                <div className="hero-brand-container">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Honkai_Impact_3rd_logo.svg/200px-Honkai_Impact_3rd_logo.svg.png" alt="Icon" className="hero-brand-icon" />
                                    <h3 className="hero-brand">
                                        {slides[currentSlide].brand}
                                    </h3>
                                </div>
                                <h1 className="hero-title">
                                    {slides[currentSlide].title.split('\n').map((line, i) => (
                                        <span key={i} className="title-line">{line}</span>
                                    ))}
                                    <span className="title-line highlight-text">Available Now!</span>
                                </h1>
                                
                                <div className="hero-actions">
                                    <Link to="/productos" className="btn-hoyo">
                                        Más
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Thumbnails Carousel Indicators */}
                <div className="hoyo-thumbnails-container">
                    <div className="hoyo-thumbnails">
                        {slides.map((slide, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setCurrentSlide(idx)}
                                className={`thumbnail-btn ${currentSlide === idx ? 'active' : ''}`}
                            >
                                <img src={slide.thumbnail} alt={`Slide ${idx + 1}`} />
                                {currentSlide === idx && (
                                    <motion.div 
                                        className="thumbnail-progress"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 6, ease: "linear" }}
                                        key={`progress-${currentSlide}`}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section className="home-news section-spacing">
                <div className="container">
                    <div className="section-header">
                        <h2>Últimas <span className="text-gradient">Noticias</span></h2>
                        <Link to="#" className="view-all">Ver más <ChevronRight size={16} /></Link>
                    </div>
                    <div className="news-grid">
                        {news.map((item, i) => (
                            <motion.div 
                                key={item.id} 
                                className="news-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="news-image">
                                    <img src={item.image} alt={item.title} />
                                    <div className="news-date-badge">{item.date}</div>
                                </div>
                                <div className="news-body">
                                    <span className="news-category">{item.category}</span>
                                    <h3>{item.title}</h3>
                                    <Link to="#" className="news-link">Leer más <ArrowRight size={14} /></Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories section-spacing">
                <div className="container">
                    <div className="section-header">
                        <h2>Explora <span className="text-gradient">Clasificaciones</span></h2>
                        <Link to="/categoria" className="view-all">Acceder a todo <ChevronRight size={16} /></Link>
                    </div>
                    
                    <div className="categories-grid">
                        {categories.map((cat, i) => (
                            <motion.div 
                                key={i} 
                                className="category-card"
                                whileHover={{ scale: 0.98 }}
                            >
                                <div className="category-card-inner">
                                    <img src={cat.image} alt={cat.name} />
                                    <div className="category-overlay">
                                        <h3>{cat.name}</h3>
                                        <p>{cat.count}</p>
                                        <button className="category-btn">Inspeccionar</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section-spacing">
                <div className="container">
                    <div className="cta-content">
                        <h2>¿Listo para expandir tu exhibición?</h2>
                        <p>Únete a nuestra base de datos de coleccionistas y obtén acceso prioritario a figuras de edición limitada y descuentos exclusivos.</p>
                        <Link to="/productos" className="btn-primary">Iniciar Misión</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};