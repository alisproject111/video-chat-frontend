"use client"

import { PaletteIcon, SunIcon, MoonIcon, MonitorIcon } from "lucide-react"
import { useState, useEffect } from "react"

const ThemeSelector = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system"
    }
    return "system"
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement

    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    localStorage.setItem("theme", theme)
  }, [theme])

  const themes = [
    { name: "light", label: "Light", icon: SunIcon },
    { name: "dark", label: "Dark", icon: MoonIcon },
    { name: "system", label: "System", icon: MonitorIcon },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105"
      >
        <PaletteIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-12 z-20 w-48 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 p-2">
            {themes.map(({ name, label, icon: Icon }) => (
              <button
                key={name}
                onClick={() => {
                  setTheme(name)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  theme === name
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ThemeSelector
