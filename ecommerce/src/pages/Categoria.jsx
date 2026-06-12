import { useState, useEffect } from "react";
import { 
    Tag, 
    Plus, 
    Trash2, 
    Loader2, 
    AlertCircle, 
    CheckCircle2,
    Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories, createCategory, deleteCategory } from "../services/categoryService";
import '../styles/Categoria.css';

export const Categoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState("");
    const [mensaje, setMensaje] = useState({ text: "", type: "" });
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState("");

    const obtenerCategorias = async () => {
        try {
            const data = await getCategories();
            setCategorias(data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
            showMensaje("Error al conectar con el servidor", "error");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const showMensaje = (text, type) => {
        setMensaje({ text, type });
        setTimeout(() => setMensaje({ text: "", type: "" }), 3000);
    };

    const handleCrear = async (e) => {
        e.preventDefault();
        try {
            await createCategory(nuevaCategoria);
            showMensaje("Categoría creada exitosamente", "success");
            setNuevaCategoria("");
            obtenerCategorias();
        } catch (error) {
            showMensaje(error.data?.error || "Error al crear la categoría", "error");
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) return;
        try {
            await deleteCategory(id);
            showMensaje("Categoría eliminada", "success");
            obtenerCategorias();
        } catch (error) {
            showMensaje(error.data?.error || "Error al eliminar", "error");
        }
    };

    const categoriasFiltradas = categorias.filter(c => 
        c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="container narrow">
                <header className="admin-header">
                    <h1 className="page-title">Gestión de <span className="text-gradient">Categorías</span></h1>
                    <p>Organiza tu inventario creando y gestionando categorías personalizadas.</p>
                </header>

                <section className="admin-card">
                    <h3><Plus size={18} /> Agregar Nueva Categoría</h3>
                    <form onSubmit={handleCrear} className="admin-form">
                        <div className="input-group">
                            <Tag className="input-icon" size={18} />
                            <input
                                type="text"
                                placeholder="Ej: Electrónica, Moda, Hogar..."
                                value={nuevaCategoria}
                                onChange={(e) => setNuevaCategoria(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">
                            Guardar Categoría
                        </button>
                    </form>
                    
                    <AnimatePresence>
                        {mensaje.text && (
                            <motion.div 
                                className={`alert ${mensaje.type}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {mensaje.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                {mensaje.text}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                <section className="list-section">
                    <div className="list-header">
                        <h3>Categorías Existentes ({categorias.length})</h3>
                        <div className="search-mini">
                            <Search size={14} />
                            <input 
                                type="text" 
                                placeholder="Buscar..." 
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                    </div>

                    {cargando ? (
                        <div className="loading-state">
                            <Loader2 className="spinner" size={32} />
                            <p>Cargando categorías...</p>
                        </div>
                    ) : (
                        <div className="category-list">
                            <AnimatePresence>
                                {categoriasFiltradas.map((cat) => (
                                    <motion.div 
                                        key={cat.id} 
                                        className="category-item"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                    >
                                        <div className="cat-info">
                                            <span className="cat-dot"></span>
                                            <strong>{cat.nombre}</strong>
                                            {cat.activa !== false && <span className="cat-badge">Activa</span>}
                                        </div>
                                        <button 
                                            className="cat-delete"
                                            onClick={() => handleEliminar(cat.id)}
                                            title="Eliminar"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            
                            {categoriasFiltradas.length === 0 && !cargando && (
                                <div className="empty-mini">
                                    <p>No se encontraron categorías.</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};
