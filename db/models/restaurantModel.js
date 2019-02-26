const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    ownerName: {
        type: mongoose.Types.ObjectId, 
        ref: 'Chef',
        required: true
    },
    imgUrl: {
        type: String,
    },
    imgUrlThumbnail: {
        type: String,
    },
    createdDate: {
        type: Number,
    },
    times: {
        type:
        {
            start: {
                type: Number,
            },
            end: {
                type: Number,
            }
        },
    },
    popularity: {
        type: Number,
    },
    imgUrlDetails: {
        type: String,
    },
    imgUrlThumbnailDetails: {
        type: String,
    },
    status: {
        type: String,
    },
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Restaurant', restaurantSchema)