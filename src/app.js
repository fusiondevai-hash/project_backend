import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
));
app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({extended:true,limit:"20kb"}));  //these are all steps before data. preparation of data
app.use(express.static("public"));
app.use(cookieParser());

export default app; // there is other way also to export app which is export {app}