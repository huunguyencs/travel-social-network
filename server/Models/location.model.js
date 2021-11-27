const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    images: [{ type: String }],
    name: {
        type: String,
        required: true
    },
    // posts: [{ type: mongoose.Types.ObjectId, ref: 'posts' }],
    star: {
        type: Array,
        default: [0, 0, 0, 0, 0]
    },
    province: { type: mongoose.Types.ObjectId, ref: 'provinces' },
    disease: Object,
    position: {
        longitude: String,
        latitude: String
    },
    weather: Object,
    information: String
}, {
    timestamps: true
})


module.exports = mongoose.model('locations', locationSchema)