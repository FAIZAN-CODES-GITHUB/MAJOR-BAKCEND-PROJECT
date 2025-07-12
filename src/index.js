//require('dotenv').config({path:'./env'}) ---->>> dot env traditional approach
import connectDB from "./db/index.js";
import dotenv from "dotenv";

//This if used by experimental scripts in package.json
dotenv.config({
    path:'./env'
})

connectDB()