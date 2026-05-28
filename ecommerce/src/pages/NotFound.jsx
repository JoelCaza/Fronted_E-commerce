import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <div>
            <h1>NotFound</h1>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <Link to="/">Volver al inicio</Link>
        </div>
    );
}   
