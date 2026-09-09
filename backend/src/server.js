import dotenv from "dotenv"
import express, { json } from "express"
const app = express()
dotenv.config()
const PORT = process.env.PORT || 5001
import { initDB } from "./config/db.js"
import accesslimiter from "./middleware/rateLimiter.js"
import transactionRoute from "./routes/transaction.routes.js"
import job from "./config/corn.js"

 if (process.env.NODE_ENV === "production") {
        job.start();
    }

app.use(express.json())
// app.use(accesslimiter)





app.get("/", (req, res) => {
    console.log("in / route")
    res.send("working well")
})

app.use("/api/transaction",transactionRoute)




initDB().then((value) => {
    app.listen(PORT, () => {
        console.log("running on port: ", PORT)
    })
})