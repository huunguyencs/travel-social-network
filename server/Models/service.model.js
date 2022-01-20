const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cooperator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    description: String,
    type: {
        type: String,
        required: true
    }, // di chuyen, nha hang, khach san, 
    province: { type: mongoose.Types.ObjectId, ref: 'provinces' },
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
    images: [{ type: String }],
    discount: { type: String }
}, {
    timestamps: true
})


module.exports = mongoose.model('services', serviceSchema)