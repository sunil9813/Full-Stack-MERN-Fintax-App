import axios from "axios"
import { BACKEND_URL } from "./authServices"

const API_URL = `${BACKEND_URL}/faq/`

const createFaq = async (formData) => {
  const response = await axios.post(API_URL, formData)
  return response.data
}
const getAllFaqs = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const deleteFaq = async (id) => {
  const res = await axios.delete(API_URL + id)
  return res.data
}
const FaqServices = {
  createFaq,
  getAllFaqs,
  deleteFaq,
}

export default FaqServices
