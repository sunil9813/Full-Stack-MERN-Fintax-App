import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import blogServices from "../services/BlogServices"
import { toast } from "react-toastify"
//createAsyncThunk => make to call http request
const initialState = {
  blog: null,
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

//create new blog
export const createBlog = createAsyncThunk("blogs/create", async (formData, thunkAPI) => {
  try {
    return await blogServices.createBlog(formData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//get all blogs
export const getAllBlogs = createAsyncThunk("blogs/getAll", async (_, thunkAPI) => {
  try {
    return await blogServices.getAllBlogs()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//get blog
export const getBlog = createAsyncThunk("blog", async (slug, thunkAPI) => {
  try {
    return await blogServices.getBlog(slug)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//get blog
export const getBlogId = createAsyncThunk("blog/id", async (id, thunkAPI) => {
  try {
    return await blogServices.getBlogId(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})
//update blog
export const updateBlog = createAsyncThunk("blog/update", async ({ id, formData }, thunkAPI) => {
  try {
    return await blogServices.updateBlog(id, formData)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    toast.error(message)
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteBlog = createAsyncThunk("blog/delete", async (id, thunkAPI) => {
  try {
    return await blogServices.deleteBlog(id)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

const BlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("Store value")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.blogs.push(action.payload)
        toast.success("Blog create successfully.")
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.blogs = action.payload
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.blog = action.payload
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getBlogId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogId.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.blog = action.payload
      })
      .addCase(getBlogId.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Blog updated successfully")
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Blog Deleted Successfully")
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { CALC_STORE_VALUE } = BlogSlice.actions

export const selectIsLoading = (state) => state.blog.isLoading
export const selectBlog = (state) => state.blog.blog

export default BlogSlice.reducer
