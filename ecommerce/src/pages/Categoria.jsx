    import { useState, useEffect } from "react";

    export const Categoria = () => {
        // Estados
        const [categorias, setCategorias] = useState([]);
        const [nuevaCategoria, setNuevaCategoria] = useState("");
        const [mensaje, setMensaje] = useState("");
        const [cargando, setCargando] = useState(true);

        // 1. Función para OBTENER las categorías (GET)
        const obtenerCategorias = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/categorias`);
                const data = await res.json();
                
                if (res.ok) {
                   
                    setCategorias(data);
                }
            } catch (error) {
                console.error("Error al cargar categorías:", error);
                setMensaje("Error al conectar con el servidor.");
            } finally {
                setCargando(false);
            }
        };

        // Ejecutar al montar el componente
        useEffect(() => {
            obtenerCategorias();
        }, []);

        // 2. Función para CREAR una categoría (POST)
        const handleCrear = async (e) => {
            e.preventDefault();
            setMensaje("");

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/categorias`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Si protegiste esta ruta en el backend, descomenta la siguiente línea:
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ nombre: nuevaCategoria })
                });

                const data = await res.json();

                if (res.ok) {
                    setMensaje("✅ Categoría creada exitosamente");
                    setNuevaCategoria(""); // Limpiar el input
                    obtenerCategorias(); // Volver a pedir la lista para que se actualice la pantalla
                } else {
                    setMensaje("❌ Error: " + data.error);
                }
            } catch (error) {
                console.error("Error al crear:", error);
                setMensaje("❌ Error de conexión al crear.");
            }
        };

        // 3. Función para ELIMINAR una categoría (DELETE)
        const handleEliminar = async (id) => {
            if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) return;

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/categorias/eliminarCategoria/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    setMensaje("✅ Categoría eliminada");
                    obtenerCategorias(); // Refrescar la lista
                } else {
                    setMensaje("❌ Error: " + data.error);
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        };

        return (
            <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
                <h1 style={{ textAlign: "center" }}>Gestión de Categorías 🏷️</h1>

                {/* Formulario para agregar categoría */}
                <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "20px" }}>
                    <h3>Agregar Nueva</h3>
                    <form onSubmit={handleCrear} style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="text"
                            placeholder="Nombre de la categoría..."
                            value={nuevaCategoria}
                            onChange={(e) => setNuevaCategoria(e.target.value)}
                            required
                            style={{ flex: 1, padding: "8px" }}
                        />
                        <button type="submit" style={{ padding: "8px 15px", backgroundColor: "#10b981", color: "white", border: "none", cursor: "pointer", borderRadius: "4px" }}>
                            Guardar
                        </button>
                    </form>
                    {mensaje && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{mensaje}</p>}
                </div>

                {/* Lista de categorías */}
                <h3>Lista de Categorías</h3>
                {cargando ? (
                    <p>Cargando categorías...</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {categorias.map((cat) => (
                            <li key={cat.id} style={{ 
                                display: "flex", 
                                justifyContent: "space-between", 
                                alignItems: "center",
                                padding: "10px", 
                                borderBottom: "1px solid #eee" 
                            }}>
                                <span>
                                    <strong>{cat.nombre}</strong> 
                                    {/* Mostramos si está activa o no (si tu BD tiene el campo) */}
                                    <span style={{ fontSize: "12px", color: "gray", marginLeft: "10px" }}>
                                        {cat.activa !== undefined ? (cat.activa ? "(Activa)" : "(Inactiva)") : ""}
                                    </span>
                                </span>
                                
                                <button 
                                    onClick={() => handleEliminar(cat.id)}
                                    style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };