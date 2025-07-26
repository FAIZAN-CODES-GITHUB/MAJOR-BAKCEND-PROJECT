//Making a middlware for uploading a file through multer


import multer from "multer";
//This tells multer where and how to save uploaded files on your computer/server.
const storage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null ,"./public/temp")
    },
    filename : function (req, file , cb){
        cb(null , file.originalname)
    }
})

export const upload = multer ({
    storage,
})


