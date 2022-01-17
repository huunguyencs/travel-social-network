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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/huunguyencs/image/upload/v1638075935/default-avatar_fxfl6s.png'
    },
    background: {
        type: String,
        default: 'https://res.cloudinary.com/huunguyencs/image/upload/v1638075905/background_wwpwxy.jpg'
    },
    phone: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        default: 'male'
    },
    birthday: Date,
    confirmAccount: {
        state: { type: Boolean, default: false },
        confirmId: { type: mongoose.Types.ObjectId, ref: 'confirms' }
    },
    hobbies: [{ type: String }],
    address: {
        type: String,
        default: ''
    },
    followings: [{ type: mongoose.Types.ObjectId, ref: 'users' }], // nguoi minh theo doi
    followers: [{ type: mongoose.Types.ObjectId, ref: 'users' }],  //nguoi khac theo doi minh
    // contract: { type: mongoose.Types.ObjectId, ref: 'contracts' }
    tourSaved: [{ type: mongoose.Types.ObjectId, ref: 'tours' }]
}, {
    timestamps: true
})

module.exports = mongoose.model("users", userSchema);