import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeState {
  theme: Theme
}

type ThemeAction = { type: "TOGGLE" }

interface ThemeContextType extends ThemeState {
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const STORAGE_KEY = "actortrackr-theme"

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === "dark" || stored === "light") return stored
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark"
  return "light"
}

function reducer(state: ThemeState, _action: ThemeAction): ThemeState {
  return { theme: state.theme === "light" ? "dark" : "light" }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { theme: getInitialTheme() })

  useEffect(() => {
    const html = document.documentElement
    html.setAttribute("data-theme", state.theme)
    localStorage.setItem(STORAGE_KEY, state.theme)
  }, [state.theme])

  const toggleTheme = () => dispatch({ type: "TOGGLE" })

  return (
    <ThemeContext.Provider value={{ ...state, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
