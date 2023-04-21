import axios from "axios"
import { BACKEND_URL } from "./authServices"
const API_URL = `${BACKEND_URL}/career/`
const API_URL1 = `${BACKEND_URL}/career/career-id/`

const createCareer = async (formData) => {
  const response = await axios.post(API_URL, formData)
  return response.data
}
const getAllCareers = async () => {
  const response = await axios.get(API_URL)
  return response.data
}
const getCareerId = async (id) => {
  const response = await axios.get(API_URL1 + id)
  return response.data
}

const deleteCareer = async (id) => {
  const res = await axios.delete(API_URL + id)
  return res.data
}
const CareerServices = {
  createCareer,
  getAllCareers,
  getCareerId,
  deleteCareer,
}

export default CareerServices
