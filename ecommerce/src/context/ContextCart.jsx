import { createContext, useState } from "react";

export const ContextCart = createContext();

export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => {
            const existe = prev.find((item) => item.producto_id === producto.id);
            if (existe) {
                return prev.map((item) =>
                    item.producto_id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [...prev, {
                producto_id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1
            }];
        });
    };

    const quitarUno = (producto_id) => {
        setCarrito((prev) => {
            const existe = prev.find((item) => item.producto_id === producto_id);
            if (existe && existe.cantidad > 1) {
                return prev.map((item) =>
                    item.producto_id === producto_id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                );
            }
            return prev.filter(item => item.producto_id !== producto_id);
        });
    };

    const eliminarDelCarrito = (producto_id) => {
        setCarrito(carrito.filter(item => item.producto_id !== producto_id));
    }

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <ContextCart.Provider value={{ carrito, agregarAlCarrito, quitarUno, eliminarDelCarrito, vaciarCarrito }}>
            {children}
        </ContextCart.Provider>
    );
}