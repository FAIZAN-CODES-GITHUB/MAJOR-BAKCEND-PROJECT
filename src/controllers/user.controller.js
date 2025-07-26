//Controller ek function ya file hoti hai jo request (client se aayi) ko handle karti hai aur response bhejti hai.
// Basically, controller ka kaam hai:

// Request se data lena (params, query, body).

// Business logic chalana (database se fetch/update karna, calculations, etc).

// Response bhejna client ko (JSON, HTML, error, etc).

import { asyncHandler } from "../utils/asyncHandler.js";



const registerUser = asyncHandler( async( req ,res) =>{
    res.status(200).json({
        message : "ok"
    })
})


export  {registerUser}
