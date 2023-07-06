const express = require('express')
const { route } = require('./contactroutes')
const {registerUser,loginUser,currentUser} = require('../controller/usercontrol')
const validatetoken = require('../middleware/tokenvalidation')
const router =  express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/current',validatetoken, currentUser)
module.exports = router