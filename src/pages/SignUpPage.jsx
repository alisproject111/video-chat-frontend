"use client"

import { useState } from "react"
import { ShipWheelIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { Link } from "react-router"
import useSignUp from "../hooks/useSignUp"
import toast from "react-hot-toast"

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    agree: false,
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const { isPending, error, signupMutation } = useSignUp()

  const validate = () => {
    const newErrors = {}

    if (!signupData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (signupData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters"
    }

    if (!signupData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Enter a valid email address"
    }

    if (!signupData.password) {
      newErrors.password = "Password is required"
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!signupData.agree) {
      newErrors.agree = "You must agree to terms & privacy policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = (e) => {
    e.preventDefault()
    if (validate()) {
      signupMutation(signupData, {
        onSuccess: () => {
          toast.success("Account created successfully! Welcome to EchoMeet.")
        },
        onError: () => {
          toast.error("Signup failed. Please try again.")
        },
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* LEFT FORM SECTION */}
            <div className="flex-1 p-8 lg:p-12">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <ShipWheelIcon className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  EchoMeet
                </span>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-800 dark:text-red-400 text-sm">
                    {error.response?.data?.message || "Signup failed"}
                  </p>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h2>
                <p className="text-gray-600 dark:text-gray-400">Join EchoMeet and start your language adventure!</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.fullName
                        ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@gmail.com"
                    className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email
                        ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 pr-12 bg-white/50 dark:bg-gray-800/50 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.password
                          ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={signupData.agree}
                    onChange={(e) => setSignupData({ ...signupData, agree: e.target.checked })}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="agree" className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{" "}
                    <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      terms of service
                    </span>{" "}
                    and{" "}
                    <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      privacy policy
                    </span>
                  </label>
                </div>
                {errors.agree && <p className="text-sm text-red-600 dark:text-red-400">{errors.agree}</p>}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Sign in link */}
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* RIGHT IMAGE SECTION */}
            <div className="flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mb-8">
                  <img src="/src/images/i.png" alt="Illustration" className="w-64 h-64 mx-auto object-contain" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Connect with language partners</h2>
                <p className="text-blue-100 text-lg">
                  Practice conversations, make friends, and improve your skills together with learners worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
