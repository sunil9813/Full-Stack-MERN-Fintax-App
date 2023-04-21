const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/BlogRoute")
const serviceRoute = require("./routes/serviceRoute")
const teamRoute = require("./routes/TeamRoute")
const aboutRoute = require("./routes/aboutRoute")
const careerRoute = require("./routes/careerRoute")
const faqRoute = require("./routes/faqRouter")
const contactRoute = require("./routes/contactRoute")
const inquiryRoute = require("./routes/InquiryRoute")
const errorHandler = require("./middleWare/errorMiddleWare")

const cookieParser = require("cookie-parser")
const path = require("path")

const app = express()

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())

app.use(
  cors({
    origin: ["http://localhost:3000", "https://fintax_analytica.app"],
    credentials: true,
  })
)

const PORT = process.env.PORT || 5000

//connect to mongoose
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })

//Routes Middleware
app.use("/api", userRoute)
app.use("/api/blog", blogRoute)
app.use("/api/service", serviceRoute)
app.use("/api/team", teamRoute)
app.use("/api/about", aboutRoute)
app.use("/api/career", careerRoute)
app.use("/api/faq", faqRoute)
app.use("/api/inquiry", inquiryRoute)
app.use("/api/contactus", contactRoute)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
// Erro Middleware
app.use(errorHandler)

// Routes
app.get("/", (req, res) => {
  res.send("Home Pages")
})
