

export const CardProduct = ({ producto }) => {
    return (
        <div key={producto.id}>
            <h2 style={{ color: "black", fontSize: "24px", fontWeight: "bold" }}>{producto.nombre}</h2>
            <p style={{ fontSize: "18px", color: "blue", fontWeight: "bold" }}>{producto.precio.toFixed(2)}</p>
            <img style={{ width: "100%", height: "auto", borderRadius: "20%" }} src={producto.imagen} alt={producto.nombre} />
            <p style={{ fontSize: "18px", color: "black", fontWeight: "bold" }}>{producto.descripcion}</p>
            <p style={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>{producto.OnSale}</p>
            <p style={{ fontSize: "18px", color: "green", fontWeight: "bold" }}>{producto.outStock}</p>

            {producto.OnSale && <p>En oferta</p>}
            {producto.outStock && <p>Agotado</p>}
        </div>
    )
}