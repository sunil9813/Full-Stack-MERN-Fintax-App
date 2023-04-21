const asyncHandler = require("express-async-handler")
const Inquiry = require("../models/InquiryModel")

const createInquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body

  if (!name || !email || !phone || !message) {
    res.status(400)
    throw new Error("Please fill in all fields")
  }

  const inquiry = await Inquiry.create({
    name,
    email,
    phone,
    message,
  })
  console.log(inquiry)

  res.status(201).json({
    success: true,
    data: inquiry,
  })
})
const getAllInquiry = asyncHandler(async (req, res) => {
  const contacts = await Inquiry.find().sort("-createdAt")
  res.status(200).json(contacts)
})

module.exports = {
  createInquiry,
  getAllInquiry,
}
