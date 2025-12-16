import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import ErrorPage from './pages/ErrorPage.jsx'
import Products from './pages/Products.jsx'
import Header from './layout/Header.jsx'
import ProductDetails from './pages/ProductDetails.jsx'

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
        path : "products/:id",
        Component : ProductDetails
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
