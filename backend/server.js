import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

import connectDB from "./config/db.js"

import orderRouter from "./routes/orderRoute.js"
import userRouter from "./routes/userRoute.js"

const app = express()

// MIDDLEWARE

app.use(express.json())
app.use(cors())

// DATABASE CONNECTION

connectDB()

// API ROUTES

app.use("/api/order", orderRouter)
app.use("/api/user", userRouter)

// FRONTEND MOUNT

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "public")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

// SERVER

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`)
})