const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'users' },
    description: String,
    position: [Number], //lng, lat
    type: String,
    positionStr: String,
    state: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('helps', helpSchema)