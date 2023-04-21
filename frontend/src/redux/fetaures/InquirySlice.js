import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import inquiryServices from "../services/InquiryService"
import { toast } from "react-toastify"
const initialState = {
  inquiry: null,
  inquirys: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const createInquiry = createAsyncThunk("inquiry/create", async (formData, thunkAPI) => {
  try {
    return await inquiryServices.createInquiry(formData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const getAllInquiry = createAsyncThunk("inquiry/getAll", async (_, thunkAPI) => {
  try {
    return await inquiryServices.getAllInquiry()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

const InquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("Store value")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInquiry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createInquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.inquirys.push(action.payload)
        toast.success("Inquiry send successfully.")
      })
      .addCase(createInquiry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllInquiry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllInquiry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.inquirys = action.payload
      })
      .addCase(getAllInquiry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { CALC_STORE_VALUE } = InquirySlice.actions

export const selectIsLoading = (state) => state.inquiry.isLoading
export const selectInquiry = (state) => state.inquiry.inquiry

export default InquirySlice.reducer
