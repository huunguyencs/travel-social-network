const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId:{ type: mongoose.Types.ObjectId, ref: 'posts'},
    likes: [{ type: mongoose.Types.ObjectId, ref: 'users' }],
    content:{
        type:String, 
        required:true
    },
    userId:{ type: mongoose.Types.ObjectId, ref: 'users' },
    // fullname: String,
    // avatarUser:{
    //     type:String,
    //     default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    // }
},{
    timestamps: true
})


module.exports = mongoose.model('comments', commentSchema)