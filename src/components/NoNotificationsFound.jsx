import { BellIcon } from "lucide-react"

function NoNotificationsFound() {
  return (
    <div className="text-center py-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200/20 dark:border-gray-700/20 shadow-lg">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
        <BellIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No notifications yet</h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        When you receive friend requests or messages, they'll appear here.
      </p>
    </div>
  )
}

export default NoNotificationsFound
