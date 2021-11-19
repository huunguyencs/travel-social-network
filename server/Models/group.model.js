const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    members:[{ type: mongoose.Types.ObjectId, ref: 'users'}],
    groupName:{
       type:String,
       required: true
   },
   isPublic:{
       type: Boolean,
       default: true
   },
   description:{
       type:String,
       required: true
   },
   manager: {type: mongoose.Types.ObjectId, ref: 'users'},
   posts:[{ type: mongoose.Types.ObjectId, ref: 'posts'}]
},{
    timestamps: true
})


module.exports = mongoose.model('groups', groupSchema )