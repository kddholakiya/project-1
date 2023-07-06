const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validatetoken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_KEY,(err,data)=>{
            if (err) {
                res.status(401)
                throw new Error('user is unauthorized')
            }
            req.user = data.users;
            next()
        })
        if (!token) {
            res.status(401)
            throw new Error('token is unauthorized or expired')
        }
    }
})
module.exports = validatetoken