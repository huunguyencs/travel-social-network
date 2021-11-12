const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    background:{
        type:String,
        default: 'https://res.cloudinary.com/dxnfxl89q/image/upload/v1625327484/Toho/close-up-opened-umbrella-mockup_53876-98796_nj3un5.jpg'
    }, 
    phone:{
        type: String,
    },
    role:{
        type: Number,
        default: 0
    },
    gender:{
        type:String,
        default: 'male'
    },
    brithday: Date,
    comfirmCooperator: {
        type:Boolean,
        default: false
    },
    hobbies: Array,
    address: {
        type: String,
        default: ''
    },
    followings:[{ type: mongoose.Types.ObjectId, ref: 'users'}], // nguoi minh theo doi
    followers:[{type: mongoose.Types.ObjectId, ref: 'users'}]  //nguoi khac theo doi minh
},{
    timestamps: true
})

module.exports = mongoose.model("users", userSchema);