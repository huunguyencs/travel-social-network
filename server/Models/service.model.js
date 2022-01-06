const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: String,
    cooperator: { type: mongoose.Types.ObjectId, ref: 'users' },
    description: String,
    type: String, // di chuyen, nha hang, khach san, 
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
    cost: Number,
    discount: {
        description: String,
        cost: Number
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('services', serviceSchema)