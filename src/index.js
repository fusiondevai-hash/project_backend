import dotenv from "dotenv";

import mongoose from "mongoose";
import connectDB from "./db/db.js";
import {app} from "./app.js";

dotenv.config({Path:"./.env"});

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
 
}).catch((error)=>{
    console.error(`Error is : ${error.message}`)
    process.exit(1)
})

