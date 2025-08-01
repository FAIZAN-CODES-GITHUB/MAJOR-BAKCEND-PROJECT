//Controller ek function ya file hoti hai jo request (client se aayi) ko handle karti hai aur response bhejti hai.
// Basically, controller ka kaam hai:

// Request se data lena (params, query, body).

// Business logic chalana (database se fetch/update karna, calculations, etc).

// Response bhejna client ko (JSON, HTML, error, etc).

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

//We have to use generate refreh token and access to many time so we create the method

const generateAccessAndRefreshToken = async(userId)  =>{
  try {
  const user =  await User.findById(userId)
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()
 
   user.refreshToken = refreshToken;
   await user.save({validateBeforeSave : false})

   return {accessToken , refreshToken}

  } catch (error) {
    throw new ApiError( 500 , "Something Went Wrong While Generating refresh and access token")
  }
}

//Register User 
const registerUser = asyncHandler( async( req ,res) =>{
//Steps For register User -->  get user details --- validation- Field Should not Empty --- 
// check if user already Exist  : username, email ---  check for uplodation of Image and avatar of user from user 
// upload them to cloudinary , again check for successfull uplodation
//creater user  object - create entry in DB
// remove password and refresh token field from response
// check for user creation
// Ane un the Send/return res

const {fullName , email , username , password } = req.body
//Checking Nothing is Empty OR All the fields are filled
  if ( 
    [fullName , email , username, password]. some((field) =>
     field?.trim() === "" )
  ) {
   throw new ApiError(400 , "All fields are Required")
  }

  //Checking If USer Already present or not
  const existedUser = await User.findOne({
    $or : [{username} , {email}]
  })
   if ( existedUser){
    throw new ApiError(409 , "User With email or Username Already Exist" )
   }

   //Taking avatar(file) thorugh Multer
    const avatarLocalPath = req.files?.avatar[0]?.path;

    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if( req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
      coverImageLocalPath = req.files.coverImage[0].path
    }


    if( !avatarLocalPath){
      throw new ApiError(400 , " Avatar file is Required")
    }

    //Uplaoding it to Cloudinary

   const avatar =  await uploadOnCloudinary(avatarLocalPath)
   const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null;

   if(!avatar){
    throw new ApiError(409 , " Avatar and Required")
   }


   //Databse Entry of New Object(userl)
  const user =  await User.create({
    fullName, 
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()
   })
   

   //removed password and refresh token field
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" 
   )

   //Checking for User Creation
   if( !createdUser){
    throw new ApiError(500 , "Something Went Wrong WHile registring User")
   }


   // returning response

   return res.status(201).json(
    new ApiResponse(200 , createdUser , "User Registered Succefully")
   )


})


//Login USer 
const loginUser = asyncHandler ( async ( req, res) =>{
   //Steps For register User -->
   // req body -> data
   // login username OR email Based
   // Find the user 
   // if EMail or Username is found then check password
   // access to user and generate refresh token
   //sned cookie
   //response (login successful)

   const {email, username , password} = req.body
  // We can find the user on the basis of email as wee username here (by both)
   if (!email || !username){
    throw new ApiError(400, "Email or Username is required")
   }
    
 const user =  await  User.findOne({
     $or : [{username}, {email}]
   })

   if (!user){
    throw new ApiError(404 , " User does not exist")
   }
  // if user found the for password 
  const isPasswordValid = await user.isPasswordCorrect(password)
   if (!isPasswordValid){
    throw new ApiError(401 , " Invalid User Credentials")
   }
  //taking access and refresh token
  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInuser = User.findById(user._id).select("-password -refreshToken")
  
   //Sending it in cookies
   const options = {
    httpOnly : true,
    secure : true
   }
   return res.status(200).cookie("accessToken" , accessToken , options)
   .cookie("refreshToken" , refreshToken , options )
   .json(
    new ApiResponse(
      200,{
        user : loggedInuser , accessToken, refreshToken
      },
      "User Logged In SuccesfUlly"
    )
   )
})


//Logout User

const logoutUser = asyncHandler(async(req, res)=>{
  User.findById
})

export  {registerUser , loginUser}
