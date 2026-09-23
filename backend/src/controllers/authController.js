const  jwt = require ( "jsonwebtoken")
const  userModel = require ( "../models/userModel");
const   bcrypt = require ( "bcryptjs")
const blacklistModel = require("../models/blacklistModel")

//register controller


async function registerUser(req ,res) {

     const {username ,email ,password} = req.body

    if (!username ||  !email || !password){
        return res.status(400).json({
            message:"Username , email or password is required"
        })
    }

    const isUserExists =await  userModel.findOne({
        $or: [{username} , {email}]
    })

    if(isUserExists){
        return res.status(400).json({
            message: "user already exists with email or username"
        })
    }

    const hash =  await bcrypt.hash(password , 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token =  jwt.sign({
        id:user._id,
        username: user.username
    },
process.env.JWT_SECRET,{
    expiresIn: "1d"
})

res.cookie("token",token)

res.status(201).json({
    message:"USer created successfully ",
    user :{
        id: user._id,
        username: user.username,
        email: user.email
    }
})    
}


// login controller

async function loginUser(req , res) {

    const { email ,password} = req.body


    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message: "invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password , user.password)


       if(!isPasswordValid){
        return res.status(400).json({
            message: "invalid email or password"
        })
    }


    const token =  jwt.sign({
        id:user._id,
        username: user.username
    },
process.env.JWT_SECRET,{
    expiresIn: "1d"
})

res.cookie("token",token)

res.status(200).json({
    message:"User logged in successfully ",
    user :{
        id: user._id,
        username: user.username,
        email: user.email
    }
})    
}

// logout controller
async function logoutUser (req , res){

    const token = req.cookies.token

    if(token){
        await blacklistModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json({
        message:"user logout successfully"
    })
}

async function getmeController(req ,res) {

    const user = await userModel.findById(
        req.user.id
    )

     if (!user) {
        return res.status(401).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id: user._id,
            email:user.email,
            username: user.username
        }
    })


    
}

module.exports = {registerUser , loginUser, logoutUser, getmeController}