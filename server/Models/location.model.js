const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    images: [{ type: String }],
    name: {
        type: String,
        required: true
    },
    starTotal: Double,
    star: {
        type: Array,
        default: [0, 0, 0, 0, 0]
    },
    province: { type: mongoose.Types.ObjectId, ref: 'provinces' },
    position: {
        lng: String,
        lat: String
    },
    information: String,
    weatherName: String
}, {
    timestamps: true
})


module.exports = mongoose.model('locations', locationSchema)