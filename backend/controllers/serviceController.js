const asyncHandler = require("express-async-handler")
const Service = require("../models/ServiceModel")
const cloudinary = require("cloudinary").v2
const slugify = require("slugify")
const { fileSizeFormatter } = require("../utils/fileUpload")

const createService = asyncHandler(async (req, res) => {
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

  // Create Service
  const service = await Service.create({
    user: userId,
    title,
    slug: slug,
    description,
    image: fileData,
  })

  res.status(201).json({
    success: true,
    data: service,
  })
})
// get all Services
const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort("-createdAt")
  res.status(200).json(services)
})

const getService = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug })
  if (!Service) {
    res.status(404)
    throw new Error("Service Post not found")
  }
  res.status(200).json(service)
})

const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)
  if (!service) {
    res.status(404)
    throw new Error("Service Post not found")
  }
  if (service.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  res.status(200).json(service)
})

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)

  if (!service) {
    res.status(404)
    throw new Error("Service not found")
  }
  if (service.user?.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  await service.remove()
  res.status(200).json({ message: "Service deleted." })
})

// update product
const updateService = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  const { id } = req.params

  const service = await Service.findById(id)

  if (!service) {
    res.status(404)
    throw new Error("Service not found")
  }
  if (service.user.toString() !== req.user.id) {
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

  const updatedService = await Service.findByIdAndUpdate(
    { _id: id },
    {
      title,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json(updatedService)
})

module.exports = {
  createService,
  getAllServices,
  getService,
  deleteService,
  updateService,
  getServiceById,
}
