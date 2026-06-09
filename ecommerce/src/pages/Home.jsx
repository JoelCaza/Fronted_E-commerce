import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    ArrowRight, 
    Zap, 
    ShieldCheck, 
    Truck, 
    Globe, 
    Sparkles,
    ChevronRight,
    ShoppingBag
} from 'lucide-react';
import './Home.css';
import heroImage from '../assets/hero.png';

export const Home = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const benefits = [
        { icon: <Truck size={24} />, title: "Envío Global", desc: "Entrega express en más de 50 países con rastreo en tiempo real." },
        { icon: <ShieldCheck size={24} />, title: "Pago Seguro", desc: "Transacciones encriptadas y protección total al comprador." },
        { icon: <Zap size={24} />, title: "Soporte 24/7", desc: "Nuestro equipo está siempre listo para ayudarte." },
        { icon: <Sparkles size={24} />, title: "Calidad Premium", desc: "Productos seleccionados bajo los más altos estándares." }
    ];

    const categories = [
        { name: "Tecnología", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop", count: "120+ productos" },
        { name: "Moda", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop", count: "85+ productos" },
        { name: "Hogar", image: "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=1000&auto=format&fit=crop", count: "60+ productos" }
    ];

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-grid">
                    <motion.div 
                        className="hero-content"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        <motion.span variants={fadeIn} className="hero-badge">
                            <Sparkles size={14} /> Nueva Colección 2026
                        </motion.span>
                        <motion.h1 variants={fadeIn} className="hero-title">
                            Eleva tu <span className="text-gradient">Estilo Digital</span>
                        </motion.h1>
                        <motion.p variants={fadeIn} className="hero-subtitle">
                            Descubre una selección curada de productos premium que combinan diseño minimalista con funcionalidad excepcional.
                        </motion.p>
                        <motion.div variants={fadeIn} className="hero-actions">
                            <Link to="/productos" className="btn-primary">
                                Explorar Colección <ArrowRight size={20} />
                            </Link>
                            <Link to="/categoria" className="btn-secondary">
                                Ver Categorías
                            </Link>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="hero-image-wrapper">
                            <img src={heroImage} alt="Featured Product" className="hero-image" />
                            <div className="hero-glow"></div>
                        </div>
                        
                        {/* Floating elements for visual interest */}
                        <motion.div 
                            className="floating-card"
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="floating-icon"><ShoppingBag size={20} /></div>
                            <div>
                                <p className="label">Vendido hoy</p>
                                <p className="value">+1.2k</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits">
                <div className="container">
                    <div className="benefits-grid">
                        {benefits.map((benefit, i) => (
                            <motion.div 
                                key={i} 
                                className="benefit-card"
                                whileHover={{ y: -5 }}
                            >
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories">
                <div className="container">
                    <div className="section-header">
                        <h2>Categorías <span className="text-gradient">Destacadas</span></h2>
                        <Link to="/categoria" className="view-all">Ver todas <ChevronRight size={16} /></Link>
                    </div>
                    
                    <div className="categories-grid">
                        {categories.map((cat, i) => (
                            <motion.div 
                                key={i} 
                                className="category-card"
                                whileHover={{ scale: 0.98 }}
                            >
                                <img src={cat.image} alt={cat.name} />
                                <div className="category-overlay">
                                    <h3>{cat.name}</h3>
                                    <p>{cat.count}</p>
                                    <button className="category-btn">Explorar</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>¿Listo para transformar tu experiencia?</h2>
                        <p>Únete a nuestra comunidad de más de 50,000 clientes satisfechos.</p>
                        <Link to="/productos" className="btn-white">Empezar Ahora</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
