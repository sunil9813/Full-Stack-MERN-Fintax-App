const mongoose = require("mongoose")

const careerSchema = mongoose.Schema(
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
    slug: {
      type: String,
      unique: true,
    },
    salary: {
      type: String,
      require: [true, "Please add a salary"],
      trime: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trime: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
)
const career = mongoose.model("Career", careerSchema)
module.exports = career
