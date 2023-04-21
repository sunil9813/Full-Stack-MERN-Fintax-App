const mongoose = require("mongoose")

const teamSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    name: {
      type: String,
      require: [true, "Please add a name"],
      trime: true,
    },
    post: {
      type: String,
      required: [true, "Please add a post"],
      trime: true,
    },
    image: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
)
const team = mongoose.model("Team", teamSchema)
module.exports = team
