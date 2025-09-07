"use client"

import { VideoIcon } from "lucide-react"

function CallButton({ handleVideoCall }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto flex justify-end">
        <button
          onClick={handleVideoCall}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg group"
        >
          <VideoIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Start Video Call
        </button>
      </div>
    </div>
  )
}

export default CallButton
