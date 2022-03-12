const mongoose = require('mongoose');

const tourDateSchema = new mongoose.Schema({
    date: Date,
    description: String,
    locations: [
        {
            location: { type: mongoose.Types.ObjectId, ref: 'locations' },
            postId: [{ type: mongoose.Types.ObjectId, ref: 'posts' }],
            description: String,
            cost: Number,
            time: String
        }
    ]
}, {
    timestamps: true
})


module.exports = mongoose.model('tour_dates', tourDateSchema)