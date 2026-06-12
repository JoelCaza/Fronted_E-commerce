import { useState } from 'react'
import './styles/App.css'
import { CardProduct } from './components/CardProduct.jsx'
import { MainLayout } from './layouts/MainLayout.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from "./pages/Home.jsx"
import { Products } from './pages/Products.jsx'
import { Login } from './pages/Login.jsx'
import { Categoria } from './pages/Categoria.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { ProductDetail } from './pages/ProductDetail.jsx'
import { Carrito } from './pages/Carrito.jsx'
import { CartProvider } from './context/ContextCart.jsx'
import { AdminProductos } from './pages/AdminProductos.jsx'
import { MisPedidos } from './pages/MisPedidos.jsx'

function App() {

  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="productos" element={<Products />} />
          <Route path="productos/:id" element={<ProductDetail />} />
          <Route path='categoria' element={<Categoria />} />
          <Route path='carrito' element={<Carrito />}/>
          <Route path='adminProductos' element={<AdminProductos />}/>
          <Route path='mispedidos' element={<MisPedidos />}/>
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App
