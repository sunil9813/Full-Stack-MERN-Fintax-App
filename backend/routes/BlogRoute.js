const express = require("express")
const {
  createBlog,
  getAllBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
} = require("../controllers/blogController")
const protect = require("../middleWare/authMiddleWare")
const { upload } = require("../utils/fileUpload")
const router = express.Router()

router.post("/", protect, upload.single("image"), createBlog)
router.get("/", getAllBlogs)
router.get("/:slug", getBlog)
router.get("/blog-id/:id", protect, getBlogById)
router.delete("/:id", protect, deleteBlog)
router.patch("/:id", protect, upload.single("image"), updateBlog)

module.exports = router
