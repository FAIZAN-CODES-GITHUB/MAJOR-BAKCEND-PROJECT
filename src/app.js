import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))


//Configuration for data with some options


app.use(express.json({limit :"16kb"})) // for JSON
app.use(express.urlencoded({extended : true , limit :"16kb"})) // for url
app.use(express.static("public")) //for file/folder used for storing
app.use(cookieParser()) // For reading and apliying CRUD operations in our website for cookies 


//Importing Routes
import userRouter from "./routes/user.routes.js"



//routes declaration -- > it will pass control to the register 
// user help us to define it only one time use it ahead

app.use("/api/v1/users" , userRouter)


export {app};