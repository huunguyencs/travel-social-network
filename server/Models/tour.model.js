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
    taggedIds: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    likeIds: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'users' },
    hashtags: Array,
    image: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('tours', tourSchema)