
const asyncHandler = require('express-async-handler')
const contact = require('../models/contactmodel')
const { default: mongoose } = require('mongoose')
const getcontact = asyncHandler(async (req, res) => {
    const contacts = await contact.find({user_id : req.user.id})
    res.status(200).json({ contacts })
})

const postcontact = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(404)
        throw new Error("all details are require")
    }
    const Contact = new contact({
        _id: new mongoose.Types.ObjectId(),
        email, name, phone,user_id : req.user.id
    })
    Contact.save().then((result) => {
        res.status(201).json(result)
    })
})


const getcontactwithid = asyncHandler(async (req, res) => {
    const contacts = await contact.findById(req.params.id);
    if (!contacts) {
        res.status(404);
        throw new Error('contact not found')
    }

    res.status(200).json(contacts)
}
)
const updatecontact = asyncHandler(async (req, res) => {
    const contacts = await contact.findById(req.params.id);
    if (!contacts) {
        res.status(404);
        throw new Error('contact not found')
    }
        contact.updateOne(
        {_id : req.params.id},
        {$set:{
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
        }}.then((updatedcontact)=>{
            res.status(201).json(updatedcontact)
        }).catch((err)=>console.log(err))
    )
}
)
const deletecontact = asyncHandler(async (req, res) => {
    contact.deleteOne({_id : req.params.id}).then((deleted)=>{
        res.status(200).json(deleted)
    })
})
module.exports = { getcontact, postcontact, getcontactwithid, updatecontact, deletecontact }