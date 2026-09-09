import ratelimiter from "../config/upstash.js"

const accesslimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimiter.limit("my_rate_limit")
        if (!success) {
            return res.status(429).json({
                message: "reached limited request numbers"
            })
        }
        next()
    } catch (error) {
        console.log("error occured in reatelimiter file: ", error.message)
        res.status(500).json({
            messasge: "internel server error"
        })
    }

}

export default accesslimiter