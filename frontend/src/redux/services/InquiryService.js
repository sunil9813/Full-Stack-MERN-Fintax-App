import axios from "axios"
import { BACKEND_URL } from "./authServices"

const API_URL = `${BACKEND_URL}/contactus/`

const createInquiry = async (formData) => {
  const response = await axios.post(API_URL, formData)
  return response.data
}
const getAllInquiry = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const inquiryServices = {
  createInquiry,
  getAllInquiry,
}

export default inquiryServices
