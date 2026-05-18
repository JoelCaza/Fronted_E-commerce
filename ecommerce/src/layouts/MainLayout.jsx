import { Outlet, Link } from "react-router-dom";

export const MainLayout = () => {
    return (
        <div>
            <nav style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "20px",
                backgroundColor: "#ccc",
                borderBottom: "1px solid #ddd",
            }}>
                <h3 className="text-xl font-bold">Tienda Online</h3>
                <Link to="/">Inicio</Link>
                <Link to="/productos">Productos</Link>
                <Link to="/carrito">Carrito</Link>
            </nav>

            <main>
                <Outlet />
            </main>

        </div>
    );
};

export default MainLayout;