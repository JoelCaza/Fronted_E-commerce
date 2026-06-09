import { useState, useEffect } from "react";
import { 
    Plus, 
    Edit, 
    Trash2, 
    Package, 
    Save, 
    X, 
    Loader2, 
    AlertCircle, 
    CheckCircle2,
    DollarSign,
    Layers,
    FileText,
    Activity,
    Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories } from "../services/categoryService";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../services/productService";
import "./AdminProductos.css";

export const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [mensaje, setMensaje] = useState({ text: "", type: "" });
    const [cargando, setCargando] = useState(true);

    const [form, setForm] = useState({
        categoria_id: "",
        nombre: "",
        precio: "",
        descripcion: "",
        stock: "",
        imagen: ""
    });

    const obtenerCategorias = async () => {
        try {
            const data = await getCategories();
            setCategorias(data);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        }
    };

    const obtenerProductos = async () => {
        try {
            setCargando(true);
            const data = await getProducts();
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        } finally {
            setCargando(false);
        }
    };

    const showMensaje = (text, type) => {
        setMensaje({ text, type });
        setTimeout(() => setMensaje({ text: "", type: "" }), 3000);
    };

    const handleCrearOEditar = async (e) => {
        e.preventDefault();
        
        const payload = {
            nombre: form.nombre,
            precio: parseFloat(form.precio),
            descripcion: form.descripcion,
            stock: parseInt(form.stock),
            imagen: form.imagen,
            categoria: {
                id: parseInt(form.categoria_id)
            }
        };

        try {
            if (editandoId) {
                await updateProduct(editandoId, payload);
                showMensaje("Producto actualizado", "success");
            } else {
                await createProduct(payload);
                showMensaje("Producto creado", "success");
            }
            
            resetForm();
            obtenerProductos();
        } catch (error) {
            showMensaje(error.data?.error || "Error en la solicitud", "error");
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
        
        try {
            await deleteProduct(id);
            showMensaje("Producto eliminado", "success");
            obtenerProductos();
        } catch (error) {
            showMensaje("Error al eliminar", "error");
        }
    };

    const handleEditClick = (prod) => {
        setEditandoId(prod.id);
        setForm({
            nombre: prod.nombre,
            precio: prod.precio,
            descripcion: prod.descripcion,
            stock: prod.stock,
            categoria_id: prod.categoria?.id || "",
            imagen: prod.imagen || ""
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setForm({
            categoria_id: "",
            nombre: "",
            precio: "",
            descripcion: "",
            stock: "",
            imagen: ""
        });
        setEditandoId(null);
    };

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        obtenerCategorias();
        obtenerProductos();
    }, []);

    return (
        <div className="admin-products-page">
            <div className="container">
                <header className="admin-header">
                    <h1 className="page-title">Panel de <span className="text-gradient">Productos</span></h1>
                    <p>Gestiona el inventario, precios y categorías de tu tienda.</p>
                </header>

                <div className="admin-products-grid">
                    {/* Form Section */}
                    <aside className="admin-form-section">
                        <div className="admin-form-card">
                            <h2>
                                {editandoId ? <Edit size={20} /> : <Plus size={20} />}
                                {editandoId ? "Editar Producto" : "Nuevo Producto"}
                            </h2>

                            <form onSubmit={handleCrearOEditar} className="form-fields">
                                <div className="form-group">
                                    <label>Categoría</label>
                                    <select name="categoria_id" value={form.categoria_id} onChange={onChange} required>
                                        <option value="">Selecciona...</option>
                                        {categorias.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Nombre</label>
                                    <div className="input-with-icon">
                                        <input type="text" name="nombre" placeholder="Ej: Auriculares Pro" value={form.nombre} onChange={onChange} required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Precio</label>
                                    <input type="number" step="0.01" name="precio" placeholder="0.00" value={form.precio} onChange={onChange} required />
                                </div>

                                <div className="form-group">
                                    <label>Stock</label>
                                    <input type="number" name="stock" placeholder="Cantidad" value={form.stock} onChange={onChange} required />
                                </div>

                                <div className="form-group">
                                    <label>URL Imagen</label>
                                    <input type="text" name="imagen" placeholder="https://..." value={form.imagen} onChange={onChange} />
                                </div>

                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea name="descripcion" placeholder="Detalles del producto..." value={form.descripcion} onChange={onChange} required />
                                </div>

                                <button type="submit" className="btn-primary btn-submit-admin">
                                    {editandoId ? <Save size={18} /> : <Plus size={18} />}
                                    {editandoId ? "Guardar Cambios" : "Crear Producto"}
                                </button>

                                {editandoId && (
                                    <button type="button" className="btn-cancel" onClick={resetForm}>
                                        <X size={16} /> Cancelar edición
                                    </button>
                                )}
                            </form>

                            <AnimatePresence>
                                {mensaje.text && (
                                    <motion.div 
                                        className={`alert ${mensaje.type}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {mensaje.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                        {mensaje.text}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </aside>

                    {/* Table Section */}
                    <main className="admin-list-section">
                        <div className="admin-table-container">
                            <div className="table-header">
                                <h3>Inventario Actual ({productos.length})</h3>
                                <button className="icon-btn" onClick={obtenerProductos} title="Refrescar">
                                    <Activity size={18} />
                                </button>
                            </div>

                            <div className="table-wrapper">
                                {cargando ? (
                                    <div className="admin-loading">
                                        <Loader2 className="spinner" size={32} />
                                        <p>Cargando inventario...</p>
                                    </div>
                                ) : productos.length === 0 ? (
                                    <div className="admin-empty">
                                        <Package size={48} />
                                        <p>No hay productos registrados.</p>
                                    </div>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Categoría</th>
                                                <th>Precio</th>
                                                <th>Stock</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productos.map(prod => (
                                                <tr key={prod.id}>
                                                    <td>
                                                        <div className="product-td-info">
                                                            <span className="product-td-name">{prod.nombre}</span>
                                                            <span className="product-td-id">ID: #{prod.id}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="cat-badge">{prod.categoria?.nombre || 'General'}</span>
                                                    </td>
                                                    <td>
                                                        <strong>${prod.precio.toFixed(2)}</strong>
                                                    </td>
                                                    <td>
                                                        <span className={`badge-stock ${prod.stock === 0 ? 'out' : prod.stock < 10 ? 'low' : 'ok'}`}>
                                                            {prod.stock === 0 ? 'Agotado' : `${prod.stock} u.`}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="table-actions">
                                                            <button className="action-btn edit" onClick={() => handleEditClick(prod)} title="Editar">
                                                                <Edit size={16} />
                                                            </button>
                                                            <button className="action-btn delete" onClick={() => handleEliminar(prod.id)} title="Eliminar">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};