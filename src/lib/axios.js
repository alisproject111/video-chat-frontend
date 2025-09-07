import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api"

console.log("[v0] API Base URL configured as:", BASE_URL)

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
