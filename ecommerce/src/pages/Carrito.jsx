import { useContext,useState } from "react";
import { ContextCart } from "../context/ContextCart";



export const Carrito = () => {
    const {carrito,eliminarDelCarrito,vaciarCarrito} = useContext(ContextCart);
    const {mensaje,setMensaje} =useState("");

    const total = carrito.reduce((acc, item) => acc +(item.precio * item.cantidad),0);

    const handleRealizarPedido = async () => {
        const rawToken = localStorage.getItem("token");
        const token = rawToken ? rawToken.replace(/['"]+/g, '') : null;

        if(!token){
            console.log("Debes iniciar sesion");
            return;
        }

        const payload = carrito.map((item) => ({
            productoId: item.producto_id,
            cantidad: item.cantidad
        }));

         try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/pedidos/checkout`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            
            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}. Falló la petición.`);
            } 

            const data = await res.json();
            console.log("Pedido Creado Exitosamente", data);
            vaciarCarrito();

        } catch (error) {
            console.log("Error al procesar el pedido:", error);
        }
    };

    return(
        <div>
            <h2>Carrito de Compras</h2>

            {carrito.length === 0 ? (
                <p>El carrito esta vacio</p>
            ) : (
                <div>
                    <ul>
                    {carrito.map((item) => (
                        <li key={item.producto_id}>
                            {item.nombre} - ${item.precio} x {item.cantidad} = ${item.precio * item.cantidad}

                            <button 
                            onClick={() => eliminarDelCarrito(item.producto_id)}
                            >
                                Quitar

                            </button>
                        </li>
                    ))}
                    </ul>
                    <h3>Total: ${total.toFixed(2)}</h3>

                    <button
                    onClick={handleRealizarPedido}
                    >
                        Finalizar la Compra
                    </button>
                </div>



            )}




        </div>

    )


} 