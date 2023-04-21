const mongoose = require("mongoose")

const inquirySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
      trime: true,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      trime: true,
    },
    phone: {
      type: String,
      required: [true, "Please add a phone"],
      trime: true,
    },
    message: {
      type: String,
      required: [true, "Please add a message"],
      trime: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 2592000000,
    },
  },
  { timestamps: true }
)
const inquiry = mongoose.model("Inquiry", inquirySchema)
module.exports = inquiry
