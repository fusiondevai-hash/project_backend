import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import User from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse  } from "../utils/ApiResponse.js";



const registerUser= asyncHandler(async(req,res)=>{

    //get user details i.e username etc
    //validate .. check if any field is empty which should not
    //check if user already exists  : checking email or username
    //check for image; //
    // upload on cloudinary
    //create user object because to store in db: 
    //remove paswrd and refresh Token field in response
    //check for user creation
    //return res

     const {username,email,fullName,password}=req.body
     console.log(email,username)

     if([username,email,fullName,password].some((field)=>
        field?.trim()==="")){
            throw new ApiError(400, "Fields are required")
        }

    const existedUser= await User.findOne({      //imported USer to check if User already exists. Since this User can directly communicate with MongoDB
        $or:[{username},{email}]
    })
    console.log(existedUser)
    
    if (existedUser){
        throw new ApiError(409,"User already existed")
    }
    const avatarLocalpath=req.files?.avatar[0]?.path;
    const coverLocalpath=req.files?.coverImage[0]?.path;
    
    //console.log(avatarLocalpath)
    //console.log("/n this is the path of cover Image",coverLocalpath)

    if(!avatarLocalpath){ //check for Image
        throw new ApiError(400,"Need avatar Imagepath")
    }

    const avatar= await uploadOnCloudinary(avatarLocalpath)
    const cover= await uploadOnCloudinary(coverLocalpath)
    if(!avatar){
        throw new ApiError(400,"Need avatar Image")
    }
    console.log("cover Image after cloudinary  ",cover)


    const user=await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:cover?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser=await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong registering user")
    }

    return res.status(200).json(
        new ApiResponse(201, createdUser,"User registered successfully")
    )
})

export {registerUser}