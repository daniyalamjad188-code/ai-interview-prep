const cookieParser = require("cookie-parser")
const express = require("express")
const router = require("./routes/authRoutes")
const app = express()
const cors = require("cors")
const interviewRouter = require("./routes/interviewRoutes")

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ai-interview-prep-dt9uxbclo-daniyalamjad188-codes-projects.vercel.app"
    ],
    credentials: true
}));

app.use("/api/auth",router)
app.use("/api/interview",interviewRouter)



module.exports = app

