const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    content: String,
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
    isPublic:{ 
        type:Boolean,
        default: true
    },
    likes: [{type: mongoose.Types.ObjectId, ref: 'users' }],
    images: Array,
    isPostReview: {
        type: Boolean,
        default: false
    },
    start: Number,
    cost: Number,
    locationId: {type: mongoose.Types.ObjectId, ref: 'locations'},
    hashtags: [{type:String}],
    taggedIds: [{type: mongoose.Types.ObjectId, ref: 'users' }]
},{
    timestamps: true
})


module.exports = mongoose.model('posts', postSchema)