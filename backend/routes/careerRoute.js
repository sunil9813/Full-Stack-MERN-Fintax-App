const express = require("express")
const protect = require("../middleWare/authMiddleWare")
const { upload } = require("../utils/fileUpload")
const {
  createCareer,
  getAllCareers,
  getCareerById,
  deleteCareer,
  getCareer,
} = require("../controllers/CareerController")
const router = express.Router()

router.post("/", protect, upload.single("image"), createCareer)
router.get("/", getAllCareers)
router.get("/career-id/:id", protect, getCareerById)
router.delete("/:id", protect, deleteCareer)
router.get("/:slug", getCareer)

module.exports = router
