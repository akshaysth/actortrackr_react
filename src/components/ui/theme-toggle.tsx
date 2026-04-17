import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { useTheme } from "@/context/ThemeContext"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
    </Button>
  )
}
