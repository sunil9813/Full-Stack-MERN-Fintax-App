const asyncHandler = require("express-async-handler")
const Team = require("../models/TeamModel")
const cloudinary = require("cloudinary").v2
const { fileSizeFormatter } = require("../utils/fileUpload")

const createTeam = asyncHandler(async (req, res) => {
  const { name, post } = req.body
  const userId = req.user.id

  if (!name || !post) {
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

  // Create Team
  const team = await Team.create({
    user: userId,
    name,
    post,
    image: fileData,
  })

  res.status(201).json({
    success: true,
    data: team,
  })
})

// get all Teams
const getAllTeams = asyncHandler(async (req, res) => {
  const team = await Team.find().sort("-createdAt")
  res.status(200).json(team)
})

const getTeam = asyncHandler(async (req, res) => {
  const team = await Team.findOne({ slug: req.params.slug })
  if (!team) {
    res.status(404)
    throw new Error("Team not found")
  }
  res.status(200).json(team)
})

const getTeamById = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id)
  if (!team) {
    res.status(404)
    throw new Error("Team not found")
  }
  if (team.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("Team not authorized")
  }
  res.status(200).json(team)
})

const deleteTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id)

  if (!team) {
    res.status(404)
    throw new Error("Team not found")
  }
  if (team.user?.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  await team.remove()
  res.status(200).json({ message: "Team deleted." })
})

// update product
const updateTeam = asyncHandler(async (req, res) => {
  const { name, post } = req.body
  const { id } = req.params

  const team = await Team.findById(id)

  if (!team) {
    res.status(404)
    throw new Error("Team not found")
  }
  if (team.user.toString() !== req.user.id) {
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

  const updatedTeam = await Team.findByIdAndUpdate(
    { _id: id },
    {
      name,
      post,
      image: Object.keys(fileData).length === 0 ? blog?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  )
  res.status(200).json(updatedTeam)
})

module.exports = {
  createTeam,
  getAllTeams,
  getTeam,
  deleteTeam,
  updateTeam,
  getTeamById,
}
