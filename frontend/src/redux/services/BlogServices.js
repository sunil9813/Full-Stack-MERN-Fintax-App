import axios from "axios"
import { BACKEND_URL } from "./authServices"

const API_URL = `${BACKEND_URL}/blog/`
const API_URL1 = `${BACKEND_URL}/blog/blog-id/`

const createBlog = async (formData) => {
  const response = await axios.post(API_URL, formData)
  return response.data
}

const getAllBlogs = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const getBlog = async (slug) => {
  const response = await axios.get(API_URL + slug)
  return response.data
}
const getBlogId = async (id) => {
  const response = await axios.get(API_URL1 + id)
  return response.data
}
const updateBlog = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData)
  return response.data
}

const deleteBlog = async (id) => {
  const res = await axios.delete(API_URL + id)
  return res.data
}
const blogServices = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  getBlogId,
  deleteBlog,
}

export default blogServices
