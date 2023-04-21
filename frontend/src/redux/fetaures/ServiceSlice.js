import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import serService from "../services/servServices"
import { toast } from "react-toastify"
//createAsyncThunk => make to call http request
const initialState = {
  service: null,
  services: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

//create new blog
export const createService = createAsyncThunk("service/create", async (formData, thunkAPI) => {
  try {
    return await serService.createService(formData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//get all blogs
export const getAllServices = createAsyncThunk("service/getAll", async (_, thunkAPI) => {
  try {
    return await serService.getAllServices()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//get blog
export const getService = createAsyncThunk("service", async (slug, thunkAPI) => {
  try {
    return await serService.getService(slug)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//get blog
export const getServiceId = createAsyncThunk("service/id", async (id, thunkAPI) => {
  try {
    return await serService.getServiceId(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//update blog
export const updateService = createAsyncThunk("service/update", async ({ id, formData }, thunkAPI) => {
  try {
    return await serService.updateService(id, formData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteService = createAsyncThunk("service/delete", async (id, thunkAPI) => {
  try {
    return await serService.deleteService(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const ServiceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("Store value")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.services.push(action.payload)
        toast.success("Service create successfully.")
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllServices.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.services = action.payload
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.service = action.payload
      })
      .addCase(getService.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getServiceId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getServiceId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.service = action.payload
      })
      .addCase(getServiceId.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(updateService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Service updated successfully")
      })
      .addCase(updateService.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(deleteService.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Service Deleted Successfully")
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { CALC_STORE_VALUE } = ServiceSlice.actions

export const selectIsLoading = (state) => state.service.isLoading
export const selectService = (state) => state.service.service

export default ServiceSlice.reducer
