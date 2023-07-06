const mongoose = require('mongoose')
 const userschema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username : {
        type : String,
        require : [true , 'please enter username']
    },
    email :{
        type : String,
        require : [true,'please enter user email'],
        unique : [true , 'email address already taken']
    },
    password : {
        type : String,
        require : [true,'please enter password']
    }
 },{
    timeStamp : true
 }
 )
 module.exports = mongoose.model('User', userschema)