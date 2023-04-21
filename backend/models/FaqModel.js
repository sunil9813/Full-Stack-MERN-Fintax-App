const mongoose = require("mongoose")

const faqSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      require: [true, "Please add a title"],
      trime: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trime: true,
    },
  },
  { timestamps: true }
)
const faq = mongoose.model("Faq", faqSchema)
module.exports = faq
