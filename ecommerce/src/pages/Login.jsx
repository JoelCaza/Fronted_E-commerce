import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_PUBLIC_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token",data.token);
                setLoading(true);
                console.log("Login Existoso");
                setTimeout(() => {
                    navigate("/");
                },2000);
            }
            else{
                console.log("Error en el login",data.error);
            }
        }catch(error){
            console.log("Error al inciar sesion",error);
        }
        
    };

    return (
        <div className="login-page">

            {/* ══ LEFT: Cinematic panel ══ */}
            <div className="login-cinematic">
                <div className="login-cinematic-bg"></div>
                <div className="login-cinematic-vignette"></div>
                <div className="login-cinematic-strip"></div>

                <div className="login-cinematic-content">

                    {/* Stats */}
                    <div className="login-stats">
                        <div className="login-stat">
                            <span className="login-stat-number">12K+</span>
                            <span className="login-stat-label">Productos</span>
                        </div>
                        <div className="login-stat">
                            <span className="login-stat-number">98%</span>
                            <span className="login-stat-label">Satisfacción</span>
                        </div>
                        <div className="login-stat">
                            <span className="login-stat-number">4.9★</span>
                            <span className="login-stat-label">Valoración</span>
                        </div>
                    </div>

                    <p className="login-brand">Tienda · Colección 2025</p>

                    <h1 className="login-headline">
                        Estilo que<br />
                        <em>define</em> quién<br />
                        eres.
                    </h1>

                    <p className="login-tagline">
                        Descubre piezas exclusivas curadas para cada momento de tu vida. Moda que habla por ti.
                    </p>

                    <div className="login-bottom-row">
                        <div className="login-dots">
                            <div className="login-dot active"></div>
                            <div className="login-dot"></div>
                            <div className="login-dot"></div>
                        </div>
                        <div className="login-badge">
                            <div className="login-badge-dot"></div>
                            Envíos en 24h
                        </div>
                    </div>

                </div>
            </div>

            {/* ══ RIGHT: Form panel ══ */}
            <div className="login-panel">
                <div className="login-form-inner">

                    <p className="login-form-eyebrow">Acceso exclusivo</p>
                    <h2 className="login-form-title">Inicia sesión</h2>
                    <p className="login-form-subtitle">Bienvenido de vuelta a tu tienda.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label className="field-label" htmlFor="email">Correo electrónico</label>
                            <div className="field-box">
                                <span className="field-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </span>
                                <input
                                    id="email"
                                    className="field-input"
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <label className="field-label" htmlFor="password">Contraseña</label>
                            <div className="field-box">
                                <span className="field-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </span>
                                <input
                                    id="password"
                                    className="field-input"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <a href="#" className="link-subtle">¿Olvidaste tu contraseña?</a>
                        </div>

                        <button type="submit">Iniciar Sesion</button>
                        
                    </form>

                    <div className="form-divider">
                        <hr /><span>¿Primera vez aquí?</span><hr />
                    </div>

                    <p className="form-register">
                        <a href="#">Crear cuenta gratis →</a>
                    </p>

                </div>
            </div>

        </div>
    );
};