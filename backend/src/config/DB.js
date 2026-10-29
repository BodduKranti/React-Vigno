import mongoose from 'mongoose'
import { ENV } from './ENV.js'

export const dbConnect = async () => {
    try {
        await mongoose.connect(ENV.MONGODB_URI)
        console.log(`DB Connected`)
    } catch (error) {
        console.log(`The Mongo DB Givene error`)
    }
}