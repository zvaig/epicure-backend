const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
},
    {
        versionKey: false
    })

module.exports = mongoose.model('auth', authSchema)