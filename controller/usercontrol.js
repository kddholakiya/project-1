const asyncHandler = require('express-async-handler')
const User = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  mongoose  = require('mongoose')
// routes /api/user/register
// @ public access
const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error('All fields are require')
    }
    const useravailable = await User.findOne({email})
    if(useravailable){
        res.status(400)
        throw new Error('user already registered please try to login')
    }

    const hashedpassword = bcrypt.hashSync(password,12)
    const userdata = new User({
        _id : new mongoose.Types.ObjectId(),
        username,
        email,
        password : hashedpassword
    })
    userdata.save().then((data)=>{
    if (data) {
        res.status(201).json({id : data.id , email :data.email})
    }else{
        res.status(400).json('user data is not valid')
    }})
})
// routes /api/user/login
// @ public access
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body
    if (!email || !password) {
        throw new Error("please enter all details")
    }
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password,user.password))) {
        const token = jwt.sign({
            users : {
                username: user.username,
                email : user.email,
                id : user.id
            }
        },
        process.env.JWT_KEY,
        {expiresIn : '3h'}
        )
        res.status(200).json({token})
    }else{
        res.status(401).json('please enter valid details for login')
    }
})
// routes /api/user/current
// @ private access
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user)
})
module.exports = {registerUser , loginUser , currentUser}