const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    information: String,
    image: { type: String },
    weatherName: String,
    position: {
        lon: Number,
        lat: Number
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('provinces', provinceSchema)