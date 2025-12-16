import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import ErrorPage from './pages/ErrorPage.jsx'
import Products from './pages/Products.jsx'
import Header from './layout/Header.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Cart from './pages/Cart.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    Component : Header,
    errorElement : <ErrorPage />,
    children : [
      {
        path : "/",
        Component : Products
      },
      {
        path : "cart",
        Component : Cart
      },
      {
        path : "products/:id",
        Component : ProductDetails
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
