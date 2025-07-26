    import { v2 as cloudinary } from "cloudinary";
    import { response } from "express";
    import fs from "fs"
    
    //config file taking from env
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME,

        api_key: process.env.CLOUDINARY_API_KEY,

        api_secret: process.env.CLOUDINARY_API_SECRET
    });


 //Now uploading file through cloudinary
    const uploadOnCloudinary = async (localFilePath) =>{
        try {
            if(!localFilePath) return null;
          //uploading file on cloudinary
           const response = await cloudinary.uploader.upload(localFilePath , {
                resource_type : "auto"
            })
            //file uploaded successfully
            console.log("File is upload on Cloudinary" , response.url);
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath) //remove locally removed temporary files if upload gets failed
            return null;
        }
    }
export  {uploadOnCloudinary}