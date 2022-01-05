const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fullname: String,
    description: String,
    type: String,
    province: [{ type: mongoose.Types.ObjectId, ref: 'provinces' }],
    star: {
        type: [Number],
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
    ],
    serviceItem: [{ type: mongoose.Types.ObjectId, ref: 'serviceItem' }]
}, {
    timestamps: true
})


module.exports = mongoose.model('services', serviceSchema)