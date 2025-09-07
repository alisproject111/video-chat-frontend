import { UsersIcon } from "lucide-react"

const NoFriendsFound = () => {
  return (
    <div className="text-center py-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200/20 dark:border-gray-700/20 shadow-lg">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
        <UsersIcon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No friends yet</h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        Connect with language partners below to start practicing together!
      </p>
    </div>
  )
}

export default NoFriendsFound
