import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import FaqServices from "../services/faqService"
import { toast } from "react-toastify"

const initialState = {
  faq: null,
  faqs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const createFaq = createAsyncThunk("faq/create", async (formData, thunkAPI) => {
  try {
    return await FaqServices.createFaq(formData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const getAllFaqs = createAsyncThunk("faq/getAll", async (_, thunkAPI) => {
  try {
    return await FaqServices.getAllFaqs()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
export const deleteFaq = createAsyncThunk("faq/delete", async (id, thunkAPI) => {
  try {
    return await FaqServices.deleteFaq(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const FaqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("Store value")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFaq.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createFaq.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.faqs.push(action.payload)
        toast.success("Faq create successfully.")
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllFaqs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllFaqs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.faqs = action.payload
      })
      .addCase(getAllFaqs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(deleteFaq.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Faq Deleted Successfully")
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { CALC_STORE_VALUE } = FaqSlice.actions

export const selectIsLoading = (state) => state.faq.isLoading
export const selectFaq = (state) => state.faq.faq

export default FaqSlice.reducer
