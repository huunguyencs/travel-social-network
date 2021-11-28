const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    description: String,
    name: {
        type: String,
        required: true
    },
    locationId: { type: mongoose.Types.ObjectId, ref: 'locations' },
    images: Array,
    time: Date,
    calendarType: Boolean
}, {
    timestamps: true
})


module.exports = mongoose.model('events', eventSchema)