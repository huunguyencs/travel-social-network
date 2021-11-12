const mongoose = require('mongoose');


// có ba loại: post, postreivew, postservice
const postSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    content: String,
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comments' }],
    isPublic: Boolean,
    likes: [{type: mongoose.Types.ObjectId, ref: 'users' }],
    postImages: Array,
    // isPortReview: Boolean,
    postType:{
        type: String,
        default: 'post'
    },
    start: Number,
    timeStart: Date,
    cost: Number,
    provinceId: {type: mongoose.Types.ObjectId, ref: 'provinces'},
    hashtags: Array,
    taggedIds: Array
},{
    timestamps: true
})


module.exports = mongoose.model('posts', postSchema)