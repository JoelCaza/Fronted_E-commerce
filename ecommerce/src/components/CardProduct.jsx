import './CardProduct.css';

export const CardProduct = ({ nombre, precio, imagen }) => {
    return (
        <div className="card-product">
            {/* Usamos directamente 'imagen', 'nombre' y 'precio' sin la palabra 'producto.' */}
            <img src={imagen || "https://via.placeholder.com/150"} alt={nombre} className="card-product-image" />
            <div className="card-product-info">
                <h3 className="card-product-name">{nombre}</h3>
                <p className="card-product-price">${precio}</p>
            </div>
        </div>
    );
}