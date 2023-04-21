import axios from "axios"
import { toast } from "react-toastify"

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/register`, userData, {
      withCredentials: true,
    })
    if (response.statusText === "OK") {
      toast.success("User Register successfully")
    }
    return response.data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
  }
}

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/login`, userData, {
      withCredentials: true,
    })
    if (response.statusText === "OK") {
      toast.success("Login successfully asasas")
    }
    return response.data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
  }
}

export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/logout`, {
      withCredentials: true,
    })
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
  }
}

export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/loggedin`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
  }
}
