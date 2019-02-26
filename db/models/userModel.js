const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
   
    normal_auth: {
        type: mongoose.Types.ObjectId,
        ref: 'auth',
        required: true
    },
    // status: {
    //     type: Number,
    //     required: true
    // },
}, 
{
    versionKey: false
})

module.exports = mongoose.model('user', userSchema)