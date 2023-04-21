const express = require("express")
const router = express.Router()
const protect = require("../middleWare/authMiddleWare")
const {
  getAllInquiry,
  createInquiry,
} = require("../controllers/InquiryController")

router.post("/", createInquiry)
router.get("/", protect, getAllInquiry)

module.exports = router
