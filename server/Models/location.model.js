const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    images: [{ type: String }],
    fullname: String,
    star: {
        type: [Number],
        default: [0, 0, 0, 0, 0]
    },
    province: { type: mongoose.Types.ObjectId, ref: 'provinces' },
    position: {
        lon: Number,
        lat: Number
    },
    information: String
}, {
    timestamps: true
})


module.exports = mongoose.model('locations', locationSchema)