import mongoose from "mongoose"

import { DB_NAME } from "../constants.js"

const connectDB= async()=>{
    try{
    const uri = process.env.MONGODB_URI.replace("/?", `/${DB_NAME}?`)
    const connectionInstance = await mongoose.connect(uri)
    //const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`MongoDB connected: ${connectionInstance.connection.host}`)
}
catch(error){
    console.error(`Error is : ${error.message}`)
    process.exit(1)
}


}

export default connectDB