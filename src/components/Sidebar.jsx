"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon, MenuIcon, XIcon } from "lucide-react"

const Sidebar = () => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const currentPath = location.pathname
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { path: "/", icon: HomeIcon, label: "Home" },
    { path: "/friends", icon: UsersIcon, label: "Friends" },
    { path: "/notifications", icon: BellIcon, label: "Notifications" },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border border-gray-200/20 dark:border-gray-700/20"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <XIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <MenuIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/20 dark:border-gray-700/20 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200/20 dark:border-gray-700/20">
            <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
              <div className="relative">
                <ShipWheelIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                EchoMeet
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  currentPath === path
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    currentPath === path ? "text-white" : ""
                  }`}
                />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200/20 dark:border-gray-700/20">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/20">
                  <img
                    src={authUser?.profilePic || "/placeholder.svg"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white truncate">{authUser?.fullName}</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Online
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}

export default Sidebar
