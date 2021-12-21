const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required,
        unique,
    },
    images: [{ type: String }],
    fullname: String,
    star: {
        type: Array,
        default: [0, 0, 0, 0, 0]
    },
    province: { type: mongoose.Types.ObjectId, ref: 'provinces' },
    position: {
        lon: Number,
        lat: Number
    },
    description: String
}, {
    timestamps: true
})


module.exports = mongoose.model('locations', locationSchema)