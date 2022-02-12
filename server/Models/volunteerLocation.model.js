const mongoose = require('mongoose');

const volunteerLocationSchema = new mongoose.Schema({
    users: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    timeStart: { type: mongoose.Types.ObjectId, ref: 'volunteer_dates' },
    maxUsers: Number,
    description: String,
    activities: [{ type: String }],
    ageUser: String,
    images: [{type:String}],
    location: { type: mongoose.Types.ObjectId, ref: 'locations' }
}, {
    timestamps: true
})


module.exports = mongoose.model('volunteer_locations', volunteerLocationSchema)