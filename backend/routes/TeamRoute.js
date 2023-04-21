const express = require("express")
const {
  createTeam,
  getAllTeams,
  getTeam,
  deleteTeam,
  updateTeam,
  getTeamById,
} = require("../controllers/teamController")
const protect = require("../middleWare/authMiddleWare")
const { upload } = require("../utils/fileUpload")
const router = express.Router()

router.post("/", protect, upload.single("image"), createTeam)
router.get("/", getAllTeams)
router.get("/:slug", getTeam)
router.get("/team-id/:id", protect, getTeamById)
router.delete("/:id", protect, deleteTeam)
router.patch("/:id", protect, upload.single("image"), updateTeam)

module.exports = router
