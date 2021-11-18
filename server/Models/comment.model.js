const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentType:{ 
       type: String
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    content:{
        type:String, 
        required:true
    },
    userId:{ type: mongoose.Types.ObjectId, ref: 'users' },
    postId: {type: mongoose.Types.ObjectId, ref: 'posts'},
    tourId: { type: mongoose.Types.ObjectId, ref: 'tours' },
    activityId: { type: mongoose.Types.ObjectId, ref: 'activities' }
},{
    timestamps: true
})


module.exports = mongoose.model('comments', commentSchema)