import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './contexts/theme'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useParams
} from 'react-router-dom'
import './styles/globals.css'

function RedirectPage() {
  const { id } = useParams()

  useEffect(() => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/link/${id}`
  }, [])

  return <></>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ":id",
        element: <RedirectPage />
      }
    ]
  }
], {
  basename: '/reducely/'
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
