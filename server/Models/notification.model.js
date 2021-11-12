const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema({
   user:{ type: mongoose.Types.ObjectId, ref: 'users'},
   content:{
       type: String,
       required: true
   },
   seen:{
       type: Boolean,
       default: false
   },
   url: String
},{
    timestamps: true
})


module.exports = mongoose.model('notifications', notifySchema )