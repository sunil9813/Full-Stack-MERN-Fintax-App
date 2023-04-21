const asyncHandler = require("express-async-handler")
const About = require("../models/AboutModel")
const cloudinary = require("cloudinary").v2
const { fileSizeFormatter } = require("../utils/fileUpload")

const createAbout = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  const userId = req.user.id

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

  // Create About
  const about = await About.create({
    user: userId,
    title,
    description,
    image: fileData,
  })

  res.status(201).json({
    success: true,
    data: about,
  })
})

const getAllAbouts = asyncHandler(async (req, res) => {
  const about = await About.find().sort("-createdAt")
  res.status(200).json(about)
})

const getAboutById = asyncHandler(async (req, res) => {
  const about = await About.findById(req.params.id)
  if (!about) {
    res.status(404)
    throw new Error("About not found")
  }
  if (about.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("About not authorized")
  }
  res.status(200).json(about)
})

const deleteAbout = asyncHandler(async (req, res) => {
  const about = await About.findById(req.params.id)

  if (!about) {
    res.status(404)
    throw new Error("About not found")
  }
  if (about.user?.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  await about.remove()
  res.status(200).json({ message: "About deleted." })
})

const updateAbout = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  const { id } = req.params

  const about = await About.findById(id)

  if (!about) {
    res.status(404)
    throw new Error("About not found")
  }
  if (about.user.toString() !== req.user.id) {
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

  const updatedAbout = await About.findByIdAndUpdate(
    { _id: id },
    {
      title,
      description,
      image: Object.keys(fileData).length === 0 ? About?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json(updatedAbout)
})

module.exports = {
  createAbout,
  getAllAbouts,
  deleteAbout,
  updateAbout,
  getAboutById,
}
