const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    content: String,
    tour: [{ type: mongoose.Types.ObjectId, ref: 'tour_dates' }],
    name: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    joinIds: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    likes: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'users' },
    hashtags: Array,
    image: {
        type: String,
        default: ''
    },
    shareId: { type: mongoose.Types.ObjectId, ref: 'tours' }
}, {
    timestamps: true
})


module.exports = mongoose.model('tours', tourSchema)