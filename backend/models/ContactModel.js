const mongoose = require("mongoose")

const contactSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please add a name"],
      trime: true,
    },
    phoneNo: {
      type: String,
      required: [true, "Please add a phone number"],
      trime: true,
    },
    emailAddress: {
      type: String,
      required: [true, "Please add a email"],
      trime: true,
    },
    description: {
      type: String,
      required: [true, "Please add a email"],
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
const contact = mongoose.model("Contact", contactSchema)
module.exports = contact
