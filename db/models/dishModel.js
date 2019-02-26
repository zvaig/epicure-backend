const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({

    restaurant: {
        type: mongoose.Types.ObjectId, ref: 'Restaurant',
        required: true
    },
    name: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    imageUrlThumbnail: {
        type: String,
    },
    description: {
        type: String,
    },
    iconUrl: {
        type: String,
    },
    price: {
        type: Number,
    },
    dishType: {
        type: String,
    },
    status: {
        type: String,
    },
}, 
{
    versionKey: false
})

module.exports = mongoose.model('dish', dishSchema)