const express = require("express")
const {
  getAllContacts,
  sendInquiry,
} = require("../controllers/contactController")
const router = express.Router()
const protect = require("../middleWare/authMiddleWare")

router.post("/", sendInquiry)
router.get("/", protect, getAllContacts)

module.exports = router
