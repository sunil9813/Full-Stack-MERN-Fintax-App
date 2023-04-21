import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import TeamServices from "../services/teamServices"

//createAsyncThunk => make to call http request
const initialState = {
  team: null,
  teams: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const createTeam = createAsyncThunk("teams/create", async (formData, thunkAPI) => {
  try {
    return await TeamServices.createTeam(formData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const getAllTeams = createAsyncThunk("teams/getAll", async (_, thunkAPI) => {
  try {
    return await TeamServices.getAllTeams()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const getTeam = createAsyncThunk("teams", async (slug, thunkAPI) => {
  try {
    return await TeamServices.getTeam(slug)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const getTeamId = createAsyncThunk("teams/id", async (id, thunkAPI) => {
  try {
    return await TeamServices.getTeamId(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const deleteTeam = createAsyncThunk("teams/delete", async (id, thunkAPI) => {
  try {
    return await TeamServices.deleteTeam(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const TeamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("Store value")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.teams.push(action.payload)
        toast.success("Team create successfully.")
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllTeams.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.teams = action.payload
      })
      .addCase(getAllTeams.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getTeam.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.team = action.payload
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getTeamId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTeamId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.team = action.payload
      })
      .addCase(getTeamId.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(deleteTeam.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Team Deleted Successfully")
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { CALC_STORE_VALUE } = TeamSlice.actions

export const selectIsLoading = (state) => state.team.isLoading
export const selectTeam = (state) => state.team.team

export default TeamSlice.reducer
