const mongoose = require("mongoose");
const { Timestamp } = require("mongodb");

const contactschema = mongoose.Schema({

    user_id :{
        type : mongoose.Schema.Types.ObjectId,
        required :true,
        ref :"User"
    } ,
    name :{
        type : String,
        required : [true,'please add the contact name' ]
    },
    email :{
        type:String,
        required : [true,'please add the email' ]
    },
    phone :{
        type:String,
        required : [true,'please add the email' ]
    }
},
{Timestamp: true}
)
module.exports = mongoose.model('contact',contactschema )