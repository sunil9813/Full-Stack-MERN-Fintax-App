const express = require("express")
const protect = require("../middleWare/authMiddleWare")
const { upload } = require("../utils/fileUpload")
const {
  createService,
  getAllServices,
  getService,
  getServiceById,
  deleteService,
  updateService,
} = require("../controllers/serviceController")
const router = express.Router()

router.post("/", protect, upload.single("image"), createService)
router.get("/", getAllServices)
router.get("/:slug", getService)
router.get("/service-id/:id", protect, getServiceById)
router.delete("/:id", protect, deleteService)
router.patch("/:id", protect, upload.single("image"), updateService)

module.exports = router
