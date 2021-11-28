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
        lng: String,
        lat: String
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('provinces', provinceSchema)