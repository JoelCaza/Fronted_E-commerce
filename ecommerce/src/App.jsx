import { useState } from 'react'
import './App.css'
import { CardProduct } from './components/CardProduct.jsx'
import { MainLayout } from './layouts/MainLayout.jsx'


function App() {
  const productos = [
    { id: 1, nombre: "laptop", precio: 1000, imagen: "https://placehold.net/9.png", descripcion: "Es una laptop", OnSale: true, outStock: false },
    { id: 2, nombre: "mouse", precio: 200, imagen: "https://placehold.net/9.png", descripcion: "Es un mouse", OnSale: false, outStock: true },
    { id: 3, nombre: "teclado", precio: 300, imagen: "https://placehold.net/9.png", descripcion: "Es un teclado", OnSale: false, outStock: false },
  ]

  return (
    <>
      <h1>Productos</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {productos.map(producto => (
          <CardProduct key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  )
}

export default App
