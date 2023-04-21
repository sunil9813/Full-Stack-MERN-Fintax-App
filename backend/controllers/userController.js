const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}
/*
{
	"name":"fintax",
	"email":"fintax@gmail.com",
	"password":"fintaxt123@"
}
*/

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please fill in all required fileds")
  }

  if (password.length < 8) {
    res.status(400)
    throw new Error("Password must be upto 8 characters")
  }

  const userExits = await User.findOne({ email })
  if (userExits) {
    res.status(400)
    throw new Error("Email is already exit")
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  const token = generateToken(user._id)
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  })

  if (user) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(201).json({ _id, name, email, photo, phone, bio, token })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error("Please add Email and Password")
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error("User not found, Please signUp")
  }

  const passwordIsCorrrect = await bcrypt.compare(password, user.password)

  const token = generateToken(user._id)
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  })

  if (user && passwordIsCorrrect) {
    const { _id, name, email, photo, phone, bio } = user
    res.status(201).json({ _id, name, email, photo, phone, bio, token })
  } else {
    res.status(400)
    throw new Error("Invalid email or password")
  }
})

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json(false)
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET)
  if (verified) {
    return res.json(true)
  }
  return res.json(false)
})

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  })
  return res.status(200).json({ message: "Successfully Logged Out" })
})
module.exports = {
  registerUser,
  loginUser,
  loginStatus,
  logoutUser,
}
