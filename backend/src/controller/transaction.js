import { sql } from "../config/db.js"

export const createTransaction= async (req, res) => {
    try {
        const { user_id, title, category, amount } = req.body
        if (!user_id || !title || !category || amount == undefined) {
            return res.status(404).json({
                message: "All fields are required"
            })
        }
        const transactions = await sql`INSERT INTO transaction(
        user_id,title,category,amount
        )
        VALUES(${user_id},${title},${category},${amount})
        RETURNING *
        `


        console.log("transaction", transactions)
        res.status(201).json({
            message: "successfully created the amount",
            transaction: transactions
        })
    } catch (error) {
        console.log("error occured in the transaction route", error.message)
        res.status(501).json({
            message: "internal server error"
        })
    }
}



export const getTransaction= async (req, res) => {
    try {
        const { id } = req.params
        const result = await sql`
        SELECT * FROM transaction WHERE user_id=${id} ORDER BY created_at DESC
        `
        if (result.length <= 0) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.status(200).json({
            message: "successfully gottten user info",
            data: result
        })

    } catch (error) {
        console.log("error occured in the transaction route", error.message)
        res.status(501).json({
            message: "internal server error"
        })
    }
}

export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params
        if (isNaN(parseInt(id))) {
            return res.status(404).json({
                message: "not valid user id"
            })
        }
        const result = await sql`
        DELETE FROM transaction WHERE id=${id} RETURNING *
        `
        if (result.length <= 0) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.status(200).json({
            message: "user's transactions deleted sucessfully",
            data: result[0]
        })

    } catch (error) {
        console.log("error occured in the transaction route", error.message)
        res.status(501).json({
            message: "internal server error"
        })
    }
}

export const getSummary=async (req, res) => {
    try {
        const { id } = req.params
        // if (isNaN(parseInt(id))) {
        //     return res.status(404).json({
        //         message: "not valid user id"
        //     })
        // }
        const TotalAmount = await sql`
        SELECT COALESCE(SUM(amount),0) as totalamount FROM transaction WHERE user_id=${id}
        `
        const totalIncome=await sql`
        SELECT COALESCE(SUM(amount),0) as income  FROM transaction WHERE user_id=${id} AND amount>0
        `

        const totalExpences=await sql`
        SELECT COALESCE(SUM(amount),0) as  expences FROM transaction WHERE user_id=${id} AND amount<0
        `

        res.status(200).json({
            balance: TotalAmount[0].totalamount,
            income:totalIncome[0].income,
            expenses: totalExpences[0].expences
        })
    } catch (error) {
            console.log("error occured in the transaction route", error.message)
        res.status(501).json({
            message: "internal server error"
        }) 
    }
}