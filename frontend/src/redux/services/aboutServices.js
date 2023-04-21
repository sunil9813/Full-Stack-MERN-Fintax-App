import axios from "axios"
import { BACKEND_URL } from "./authServices"

const API_URL = `${BACKEND_URL}/about/`
const API_URL1 = `${BACKEND_URL}/about/about-id/`

const createAbout = async (formData) => {
  const response = await axios.post(API_URL, formData)
  return response.data
}
const getAllAbouts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
const getAboutId = async (id) => {
  const response = await axios.get(API_URL1 + id)
  return response.data
}
const updateAbout = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData)
  return response.data
}
const deleteAbout = async (id) => {
  const res = await axios.delete(API_URL + id)
  return res.data
}
const AboutServices = {
  createAbout,
  getAllAbouts,
  updateAbout,
  getAboutId,
  deleteAbout,
}

export default AboutServices
