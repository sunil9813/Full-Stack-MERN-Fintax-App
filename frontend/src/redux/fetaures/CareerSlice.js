import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import CareerServices from "../services/careerService"
import { toast } from "react-toastify"
//createAsyncThunk => make to call http request
const initialState = {
  career: null,
  careers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const createCareer = createAsyncThunk("career/create", async (formData, thunkAPI) => {
  try {
    return await CareerServices.createCareer(formData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const getAllCareers = createAsyncThunk("career/getAll", async (_, thunkAPI) => {
  try {
    return await CareerServices.getAllCareers()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const getCareerId = createAsyncThunk("career/id", async (id, thunkAPI) => {
  try {
    return await CareerServices.getCareerId(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const deleteCareer = createAsyncThunk("career/delete", async (id, thunkAPI) => {
  try {
    return await CareerServices.deleteCareer(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const CareerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("Store value")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCareer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCareer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.careers.push(action.payload)
        toast.success("Career create successfully.")
      })
      .addCase(createCareer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllCareers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCareers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.careers = action.payload
      })
      .addCase(getAllCareers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getCareerId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCareerId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.career = action.payload
      })
      .addCase(getCareerId.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(deleteCareer.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCareer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Career Deleted Successfully")
      })
      .addCase(deleteCareer.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { CALC_STORE_VALUE } = CareerSlice.actions

export const selectIsLoading = (state) => state.blog.isLoading
export const selectBlog = (state) => state.blog.blog

export default CareerSlice.reducer
