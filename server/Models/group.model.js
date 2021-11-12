const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
   groupName:{
       type:String,
       required: true
   },
   isPublic:{
       type: Boolean,
       default: true
   },
   members:[{ type: mongoose.Types.ObjectId, ref: 'users'}],
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