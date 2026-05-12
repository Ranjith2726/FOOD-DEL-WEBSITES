import express from "express"
import cors from "cors"
import dotenv from "dotenv"

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

// TEST API

app.get("/", (req, res) => {

    res.send("API Working")

})

// SERVER

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {

    console.log(
        `Server Started on PORT ${PORT}`
    )

    console.log(
        "Razorpay Key:",
        process.env.RAZORPAY_KEY_ID
    )

})