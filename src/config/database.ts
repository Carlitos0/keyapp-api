import mongoose from "mongoose"
import { env } from "./environment"
import { NextFunction } from "express"
import { CustomError } from "../helpers/CustomError"

const connect = async () => {
    try {
        const db = await mongoose.connect(`mongodb+srv://${env.MONGODB_USER}:${env.MONGODB_PASSWORD}@${env.MONGODB_CLUSTER}/${env.MONGODB_NAME}`)
        console.log(`Connect to database ${db.connection.name}`)
    } catch (error) {
        const err = new CustomError(error.message, 500)
        throw err
    }
}

export default connect;