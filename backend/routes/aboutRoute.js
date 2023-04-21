const express = require("express")
const protect = require("../middleWare/authMiddleWare")
const { upload } = require("../utils/fileUpload")
const { createAbout, getAllAbouts, getAboutById, deleteAbout, updateAbout } = require("../controllers/aboutController")
const router = express.Router()

router.post("/", protect, upload.single("image"), createAbout)
router.get("/", getAllAbouts)
router.get("/about-id/:id", protect, getAboutById)
router.delete("/:id", protect, deleteAbout)
router.patch("/:id", protect, upload.single("image"), updateAbout)

module.exports = router
