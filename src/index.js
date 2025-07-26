//require('dotenv').config({path:'./env'}) ---->>> dot env traditional approach
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

//This if used by experimental scripts in package.json
dotenv.config({
    path:'./env'
})

// const app = express();

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is listening on port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection Failed !!" , err);
    
})