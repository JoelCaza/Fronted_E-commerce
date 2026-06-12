import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { sendMessage } from "../services/chatService";
import '../styles/BotWidget.css';

export const BotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pregunta, setPregunta] = useState("");
    const [mensajes, setMensajes] = useState([
        { 
            text: "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy con tu compra?", 
            sender: "bot", 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [mensajes, isLoading, isOpen]);

    const MandarPregunta = async (e) => {
        if (e) e.preventDefault();
        if (!pregunta.trim() || isLoading) return;

        const userMessage = {
            text: pregunta,
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMensajes(prev => [...prev, userMessage]);
        setPregunta("");
        setIsLoading(true);

        try {
            const data = await sendMessage(pregunta);
            
            const botMessage = {
                text: data.respuesta,
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMensajes(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error al enviar la pregunta:', error);
            setMensajes(prev => [...prev, {
                text: "Lo siento, hubo un problema de conexión. Por favor, inténtalo de nuevo.",
                sender: "bot",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            MandarPregunta(e);
        }
    };

    return (
        <div className="bot-widget-container">
            {/* FAB Button */}
            <motion.button 
                className={`bot-fab ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Abrir asistente de chat"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
                {!isOpen && <span className="bot-fab-pulse"></span>}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="bot-widget-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        role="dialog"
                        aria-label="Ventana de chat del asistente virtual"
                    >
                        <header className="bot-widget-header">
                            <div className="bot-header-info">
                                <h3><Sparkles size={16} /> Asistente Inteligente</h3>
                                <p>Soporte en línea</p>
                            </div>
                            <button className="bot-close-btn" onClick={() => setIsOpen(false)} aria-label="Cerrar chat">
                                <X size={18} />
                            </button>
                        </header>

                        <div className="bot-widget-messages">
                            {mensajes.map((msg, index) => (
                                <div key={index} className={`bot-msg-wrapper ${msg.sender}`}>
                                    <div className="bot-msg-bubble">
                                        {msg.text}
                                    </div>
                                    <span className="bot-msg-time">{msg.timestamp}</span>
                                </div>
                            ))}
                            
                            {isLoading && (
                                <div className="bot-msg-wrapper bot">
                                    <div className="bot-msg-bubble typing">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="bot-widget-input-area" onSubmit={MandarPregunta}>
                            <input
                                type="text"
                                className="bot-widget-input"
                                value={pregunta}
                                onChange={(e) => setPregunta(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Escribe tu consulta..."
                                disabled={isLoading}
                                aria-label="Campo de entrada de mensaje"
                            />
                            <button 
                                type="submit" 
                                className="bot-widget-send"
                                disabled={!pregunta.trim() || isLoading}
                                aria-label="Enviar mensaje"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};