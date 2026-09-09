import "dotenv/config"
import {neon} from "@neondatabase/serverless" 

export const sql =neon(process.env.DATABASE_URL)

export const  initDB = async () => {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transaction(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        created_at TIMESTAMP NOT NULL DEFAULT now()
        
        )
        `;
        console.log("successfully connecting to the data base")
    } catch (error) {
        console.log("error ocured in the initDB: ", error.message)
        process.exit(1)
    }
}