import express from "express"
import { createTransaction, deleteTransaction, getSummary, getTransaction } from "../controller/transaction.js"
const router = express.Router()


router.post("/", createTransaction)

router.get("/:id", getTransaction)

router.delete("/delete/:id", deleteTransaction)

router.get("/summary/:id", getSummary)

export default router