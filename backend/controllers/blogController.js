const asyncHandler = require("express-async-handler")
const Blog = require("../models/BlogModel")
const cloudinary = require("cloudinary").v2
const slugify = require("slugify")
const { fileSizeFormatter } = require("../utils/fileUpload")

const createBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  const userId = req.user.id

  const slug = slugify(req.body.title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
  })
  if (!title || !description) {
    res.status(400)
    throw new Error("Please fill in all fields")
  }

  // Handle Image upload
  let fileData = {}
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Fintax-Analytica",
        resource_type: "image",
      })
    } catch (error) {
      res.status(500)
      throw new Error("Image could not be uploaded")
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    }
  }

  // Create blog
  const blog = await Blog.create({
    user: userId,
    title,
    slug: slug,
    description,
    image: fileData,
  })

  res.status(201).json({
    success: true,
    data: blog,
  })
})

// get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort("-createdAt")
  res.status(200).json(blogs)
})

const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
  if (!blog) {
    res.status(404)
    throw new Error("Blog not found")
  }
  res.status(200).json(blog)
})

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    res.status(404)
    throw new Error("Blog not found")
  }
  if (blog.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Blog not authorized")
  }
  res.status(200).json(blog)
})

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    res.status(404)
    throw new Error("Blog not found")
  }
  if (blog.user?.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  await blog.remove()
  res.status(200).json({ message: "Blog deleted." })
})

const updateBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  const { id } = req.params

  const blog = await Blog.findById(id)

  if (!blog) {
    res.status(404)
    throw new Error("Blog not found")
  }
  if (blog.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  let fileData = {}
  if (req.file) {
    let uploadedFile
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Fintax-Analytica",
        resource_type: "image",
      })
    } catch (error) {
      res.status(500)
      throw new Error("Image colud not be uploaded")
    }
    //step 1 :
    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    { _id: id },
    {
      title,
      description,
      image: Object.keys(fileData).length === 0 ? blog?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json(updatedBlog)
})

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
}
