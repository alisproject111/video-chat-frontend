"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from "../lib/api"
import { Link } from "react-router"
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon, LoaderIcon } from "lucide-react"
import { capitialize } from "../lib/utils"
import FriendCard, { getLanguageFlag } from "../components/FriendCard"
import NoFriendsFound from "../components/NoFriendsFound"
import toast from "react-hot-toast"

const HomePage = () => {
  const queryClient = useQueryClient()
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set())

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  })

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  })

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] })
      toast.success("Friend request sent!")
    },
    onError: () => {
      toast.error("Failed to send friend request")
    },
  })

  useEffect(() => {
    const outgoingIds = new Set()
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id)
      })
      setOutgoingRequestsIds(outgoingIds)
    }
  }, [outgoingFriendReqs])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* FRIENDS SECTION */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Your Friends
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Connect and chat with your language partners</p>
            </div>
            <Link
              to="/notifications"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg group"
            >
              <UsersIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Friend Requests
            </Link>
          </div>

          {loadingFriends ? (
            <div className="flex justify-center py-12">
              <div className="flex items-center gap-3">
                <LoaderIcon className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-gray-600 dark:text-gray-400">Loading friends...</span>
              </div>
            </div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </div>

        {/* RECOMMENDATIONS */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Meet New Learners
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Discover perfect language exchange partners</p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <div className="flex items-center gap-3">
                <LoaderIcon className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-gray-600 dark:text-gray-400">Finding recommendations...</span>
              </div>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="text-center py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200/20 dark:border-gray-700/20">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No recommendations available</h3>
              <p className="text-gray-600 dark:text-gray-400">Check back later for new partners!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id)

                return (
                  <div
                    key={user._id}
                    className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      {/* User header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-500 transition-all duration-300">
                            <img
                              src={user.profilePic || "/placeholder.svg"}
                              alt={user.fullName}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                              <MapPinIcon className="w-3 h-3" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Language badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitialize(user.nativeLanguage)}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {/* Bio */}
                      {user.bio && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{user.bio}</p>
                      )}

                      {/* Action button */}
                      <button
                        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-xl transition-all duration-200 ${
                          hasRequestBeenSent
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-105 hover:shadow-lg"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="w-4 h-4" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="w-4 h-4" />
                            {isPending ? "Sending..." : "Send Friend Request"}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HomePage
