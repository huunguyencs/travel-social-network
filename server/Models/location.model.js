const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    images: [{ type: String }],
    name: {
        type: String,
        required: true
    },
    star: {
        type: Array,
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