const asyncHandler = require("express-async-handler")
const Career = require("../models/CareerModel")
const cloudinary = require("cloudinary").v2
const { fileSizeFormatter } = require("../utils/fileUpload")

const createCareer = asyncHandler(async (req, res) => {
  const { title, salary, description } = req.body
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

  // Create Career
  const career = await Career.create({
    user: userId,
    title,
    slug: slug,
    salary,
    description,
    image: fileData,
  })

  res.status(201).json({
    success: true,
    data: career,
  })
})

const getAllCareers = asyncHandler(async (req, res) => {
  const career = await Career.find().sort("-createdAt")
  res.status(200).json(career)
})
const getCareer = asyncHandler(async (req, res) => {
  const careers = await Career.findOne({ slug: req.params.slug })
  if (!careers) {
    res.status(404)
    throw new Error("Career not found")
  }
  res.status(200).json(careers)
})

const getCareerById = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id)
  if (!career) {
    res.status(404)
    throw new Error("Career not found")
  }
  if (career.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Career not authorized")
  }
  res.status(200).json(career)
})

const deleteCareer = asyncHandler(async (req, res) => {
  const career = await Career.findById(req.params.id)

  if (!career) {
    res.status(404)
    throw new Error("Career not found")
  }
  if (career.user?.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  await career.remove()
  res.status(200).json({ message: "Career deleted." })
})

module.exports = {
  createCareer,
  getAllCareers,
  deleteCareer,
  getCareerById,
  getCareer,
}
