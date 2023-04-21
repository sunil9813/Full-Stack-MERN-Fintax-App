const express = require("express")
const router = express.Router()
const { registerUser, loginUser, loginStatus, logoutUser } = require("../controllers/userController")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/loggedin", loginStatus)
router.get("/logout", logoutUser)

module.exports = router
