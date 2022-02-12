const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: { type: mongoose.Types.ObjectId, ref: 'users' },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
    descriptions: [{ type: String }],
    date: [{ type: mongoose.Types.ObjectId, ref: 'volunteer_dates' }],
    location: [{ type: mongoose.Types.ObjectId, ref: 'volunteer_locations' }],
    image: String,
    cost: Number,
}, {
    timestamps: true
})


module.exports = mongoose.model('volunteers', volunteerSchema)