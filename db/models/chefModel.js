const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    description: {
        type: String,
    },
    imgUrl: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
    },
},
{
    versionKey: false
})

module.exports = mongoose.model('Chef', chefSchema)