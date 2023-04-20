import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './contexts/theme'
import {
  createBrowserRouter,
  RouterProvider,
  useParams
} from 'react-router-dom'
import './styles/globals.css'
import { Analytics } from '@vercel/analytics/react'

function RedirectPage() {
  const { id } = useParams()

  useEffect(() => {
    window.location.href = `${import.meta.env.VITE_API_URL}/r/${id}`
  }, [])

  return <></>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
    {
      path: "/:id",
      element: <RedirectPage />
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
      <Analytics />
    </>
  </React.StrictMode>
)
