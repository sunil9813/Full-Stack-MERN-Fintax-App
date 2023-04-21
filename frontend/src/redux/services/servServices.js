import axios from "axios"
import { BACKEND_URL } from "./authServices"

const API_URL = `${BACKEND_URL}/service/`
const API_URL1 = `${BACKEND_URL}/service/service-id/`

const createService = async (formData) => {
  const response = await axios.post(API_URL, formData)
  return response.data
}

const getAllServices = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const getService = async (slug) => {
  const response = await axios.get(API_URL + slug)
  return response.data
}
const getServiceId = async (id) => {
  const response = await axios.get(API_URL1 + id)
  return response.data
}
const updateService = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData)
  return response.data
}

const deleteService = async (id) => {
  const res = await axios.delete(API_URL + id)
  return res.data
}
const serService = {
  createService,
  getAllServices,
  getService,
  updateService,
  getServiceId,
  deleteService,
}

export default serService
