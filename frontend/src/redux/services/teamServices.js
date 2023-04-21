import axios from "axios"
import { BACKEND_URL } from "./authServices"

const API_URL = `${BACKEND_URL}/team/`
const API_URL1 = `${BACKEND_URL}/team/team-id/`

const createTeam = async (formData) => {
  const response = await axios.post(API_URL, formData)
  return response.data
}

const getAllTeams = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const getTeam = async (slug) => {
  const response = await axios.get(API_URL + slug)
  return response.data
}
const getTeamId = async (id) => {
  const response = await axios.get(API_URL1 + id)
  return response.data
}

const deleteTeam = async (id) => {
  const res = await axios.delete(API_URL + id)
  return res.data
}
const TeamServices = {
  createTeam,
  getAllTeams,
  getTeam,
  getTeamId,
  deleteTeam,
}

export default TeamServices
