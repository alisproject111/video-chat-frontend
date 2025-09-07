"use client"

import { Link, useLocation } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react"
import ThemeSelector from "./ThemeSelector"
import useLogout from "../hooks/useLogout"
import toast from "react-hot-toast"

const Navbar = () => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const isChatPage = location.pathname?.startsWith("/chat")

  const { logoutMutation } = useLogout()

  const handleLogout = () => {
    logoutMutation()
    toast.success("Logged out successfully!")
  }

  return (
    <nav className="sticky top-0 z-50 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <ShipWheelIcon className="w-10 h-10 text-blue-600 dark:text-blue-400 transition-transform group-hover:rotate-12" />
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">
                  EchoMeet
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-4 ml-auto">
            {/* Notifications */}
            <Link to="/notifications" className="relative group">
              <div className="p-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-200 hover:scale-105">
                <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>
            </Link>

            {/* Theme Selector */}
            <ThemeSelector />

            {/* User Avatar */}
            <div className="relative group">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-500 transition-all duration-200">
                <img
                  src={authUser?.profilePic || "/placeholder.svg"}
                  alt="User Avatar"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-red-100/80 dark:hover:bg-red-900/20 transition-all duration-200 hover:scale-105 group"
            >
              <LogOutIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
