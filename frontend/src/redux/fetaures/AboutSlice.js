import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AboutServices from "../services/aboutServices"
import { toast } from "react-toastify"
//createAsyncThunk => make to call http request
const initialState = {
  about: null,
  abouts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

//create new blog
export const createAbout = createAsyncThunk("about/create", async (formData, thunkAPI) => {
  try {
    return await AboutServices.createAbout(formData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//get all blogs
export const getAllAbouts = createAsyncThunk("about/getAll", async (_, thunkAPI) => {
  try {
    return await AboutServices.getAllAbouts()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const getAboutId = createAsyncThunk("about/id", async (id, thunkAPI) => {
  try {
    return await AboutServices.getAboutId(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//update blog
export const updateAbout = createAsyncThunk("about/update", async ({ id, formData }, thunkAPI) => {
  try {
    return await AboutServices.updateAbout(id, formData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteAbout = createAsyncThunk("about/delete", async (id, thunkAPI) => {
  try {
    return await AboutServices.deleteAbout(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const AboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("Store value")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAbout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAbout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.abouts.push(action.payload)
        toast.success("About create successfully.")
      })
      .addCase(createAbout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllAbouts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllAbouts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.abouts = action.payload
      })
      .addCase(getAllAbouts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAboutId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAboutId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.about = action.payload
      })
      .addCase(getAboutId.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(updateAbout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("About updated successfully")
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(deleteAbout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAbout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("About Deleted Successfully")
      })
      .addCase(deleteAbout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { CALC_STORE_VALUE } = AboutSlice.actions

export const selectIsLoading = (state) => state.about.isLoading
export const selectAbout = (state) => state.about.about

export default AboutSlice.reducer
