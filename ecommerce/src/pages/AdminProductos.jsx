import { useState,useEffect } from "react"


export const AdminProductos = () =>{
    const [productos,setProductos] = useState([]);
    const [categorias,setCategorias] = useState([]);
    const [editandoId,setEditandoId] = useState(null);
    const [mensaje,setMensaje] = useState("");

const [form,setForm] = useState({
    categoria_id:"",
    nombre:"",
    precio:"",
    descripcion:"",
    stock:""
});

     const obtenerCategorias = async () => {
         try {
             const res = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/categorias`);
             const data = await res.json();

             if (res.ok) {

                 setCategorias(data);
                 console.log("Categorias:", data)
             }
         } catch (error) {
             console.error("Error al cargar categorías:", error);
             setMensaje("Error al conectar con el servidor.");
         } 
     };
     const obtenerProductos = async () => {
         try {
             const response = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/productos`);
             const data = await response.json();
             setProductos(data);
             console.log("Productos obtenidos:", data);
         }
         catch (error) {
             console.error("Error al obtener los productos:", error);
         }
     };
     const handleCrear = async (e) => {
        e.preventDefault();
        setMensaje("");

        const metodo = e.target.dataset.action === "crear" ? "POST" : "PUT";
        const url = editandoId
        ? `${import.meta.env.VITE_PUBLIC_URL}/productos/${editandoId}`
        : `${import.meta.env.VITE_PUBLIC_URL}/productos`;
        const token = localStorage.getItem("token");

        const payload = {
            nombre: form.nombre,
            precio: parseFloat(form.precio),
            descripcion: form.descripcion,
            stock: parseInt(form.stock),
            categoria:{
                id: parseInt(form.categoria_id)
            }
        };
        try {
            const res = await fetch(url, {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if(res.ok){
                setMensaje(editandoId ? "Producto editado exitosamente" : "Producto creado exitosamente");
                setForm({
                    categoria_id:"",
                    nombre:"",
                    precio:"",
                    descripcion:"",
                    stock:""
                });
                setEditandoId(null);
                obtenerProductos();
            } else {
                const data = await res.json();
                setMensaje("Error: " + (data.error || "No se pudo procesar la solicitud."));
            }
        }catch (error) {
            console.error("Error al crear/editar:", error);
            setMensaje("Error de conexión al crear/editar.");
        }
    };
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }


        useEffect(() => {
            obtenerCategorias();
            obtenerProductos();
        },[]);

    return(
        <div>
            Gestion de Productos
            {mensaje && <p>{mensaje}</p>}
            
            <form onSubmit={handleCrear} data-action={editandoId ? "editar" : "crear"}>
                <select name="categoria_id" value={form.categoria_id} onChange={onChange} required>
                <option value="">-------Selecione una Categoria</option>
                {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}

            </select>
            <input type="text" name="nombre" placeholder="Nombre del producto" value={form.nombre} onChange={onChange} required />
            <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={onChange} required />
            <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={onChange} required />
            <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={onChange} required />
            <button type="submit">{editandoId ? "Guardar Cambios" : "Crear Producto"}</button>
            </form>

            <h2>Productos Existentes</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(prod => (
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.nombre}</td>
                            <td>${prod.precio}</td>
                            <td>{prod.categoria?.nombre || 'Sin categoría'}</td>
                            <td>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  
    )
}