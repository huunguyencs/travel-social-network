const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    type: String,
    province: { type: mongoose.Types.ObjectId, ref: 'provinces' },
    rateTotal: {
        type: Number,
        default: 0
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