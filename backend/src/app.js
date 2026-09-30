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
        "https://ai-interview-prep-chi-ecru.vercel.app"
    ],
    credentials: true
}));

app.use("/api/auth",router)
app.use("/api/interview",interviewRouter)



module.exports = app

