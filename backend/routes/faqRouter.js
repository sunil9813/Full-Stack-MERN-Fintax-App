const express = require("express")
const protect = require("../middleWare/authMiddleWare")
const { upload } = require("../utils/fileUpload")
const { createFaq, getAllFaqs, deleteFaq } = require("../controllers/faqController")
const router = express.Router()

router.post("/", protect, upload.single("image"), createFaq)
router.get("/", getAllFaqs)
router.delete("/:id", protect, deleteFaq)

module.exports = router
