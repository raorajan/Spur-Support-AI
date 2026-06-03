import axios from "axios";

// Standardizing API calls to the backend running on localhost:8000
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
