const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required,
        unique
    },
    fullname: String,
    description: String,
    price: Number,
    type: String,
    province: { type: mongoose.Types.ObjectId, ref: 'provinces' },
    star: {
        type: Array,
        default: [0, 0, 0, 0, 0]
    },
    rate: [
        {
            userId: { type: mongoose.Types.ObjectId, ref: 'users' },
            rate: Number,
            content: String
        }
    ],
    images: [
        { type: String }
    ]

}, {
    timestamps: true
})


module.exports = mongoose.model('services', serviceSchema)