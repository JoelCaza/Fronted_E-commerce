import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <h2>Bienvenido a la tienda online</h2>
            <p>Explora nuestros productos y encuentra lo que necesitas</p>

            <img style={{ width: "100px", height: "100px" }} src="https://placehold.net/9.png" alt=""

            />
            <button
                style={{
                    width: "100px",
                    height: "50px",
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "5px"
                }}><Link to="/productos">Ver productos</Link></button>
        </div>

    )
}