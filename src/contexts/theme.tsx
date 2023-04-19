import { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextData {
  darkMode: boolean
  toggleColorMode: () => void
}

const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme') ?? 'light'
    setDarkMode(theme === 'dark')
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  function toggleColorMode() {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleColorMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
