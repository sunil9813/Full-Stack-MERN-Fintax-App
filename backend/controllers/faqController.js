const asyncHandler = require("express-async-handler")
const Faq = require("../models/FaqModel")

const createFaq = asyncHandler(async (req, res) => {
  const { title, description } = req.body
  const userId = req.user.id

  if (!title || !description) {
    res.status(400)
    throw new Error("Please fill in all fields")
  }

  const faq = await Faq.create({
    user: userId,
    title,
    description,
  })

  res.status(201).json({
    success: true,
    data: faq,
  })
})

const getAllFaqs = asyncHandler(async (req, res) => {
  const faq = await Faq.find().sort("-createdAt")
  res.status(200).json(faq)
})

const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id)

  if (!faq) {
    res.status(404)
    throw new Error("Faq not found")
  }
  if (faq.user?.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }
  await faq.remove()
  res.status(200).json({ message: "Faq deleted." })
})

module.exports = {
  createFaq,
  getAllFaqs,
  deleteFaq,
}
