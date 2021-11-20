const Users = require('../Models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class UserController {
    async register(req, res) {
        try {
            const { fullname, username, email, phone, password } = req.body;

            // khong can
            //simple validation
            // console.log(req.body);
            if (!username || !password || !fullname || !email) {
                return res.status(400).json({ success: false, message: "Missing field" })
            }

            const user_name = await Users.findOne({ username })
            if (user_name) return res.status(400).json({ success: false, message: "This user name already exists." })

            const user_email = await Users.findOne({ email })
            if (user_email) return res.status(400).json({ success: false, message: "This email already exists" })

            // khong can
            if (password.length < 6)
                return res.status(400).json({ success: false, message: "Password must be at least 6 characters." })

            const passwordHash = await bcrypt.hash(password, 12)

            const userNew = new Users({
                fullname, username, email, password: passwordHash, phone
            })


            //Return Token
            const accessToken = jwt.sign({ id: userNew._id }, process.env.ACCESS_TOKEN_SECRET || "abcdefghiklmn")

            //Cookie
            // const refresh_token = createRefreshToken({ id: newUser._id })

            // res.cookie('refreshtoken', refresh_token, {
            //     httpOnly: true,
            //     path: '/api/refresh_token',
            //     maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            // })

            await userNew.save();

            res.json({
                success: true,
                message: "register successful!",
                accessToken
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            //simple validation
            if (!password || !email) {
                return res.status(400).json({ success: false, message: "Missing field password or email" })
            }

            const user = await Users.findOne({ email }).populate("followers followings", "username avatar fullname followers followings")
            if (!user) return res.status(400).json({ success: false, message: "email incorrect" })
            const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid) return res.status(400).json({ success: false, message: "password incorrect" })

            //all Good
            //Return Token
            const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "abcdefghiklmn")
            //trả về dữ liệu user khi login thành công

            const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET")

            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                // path: '/user/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            })

            res.json({
                success: true,
                message: "login successful!",
                accessToken,
                user: {
                    ...user._doc,
                    password: ''
                }
            })

        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async refreshToken(req, res) {
        try {
            const refresh_token = req.cookies.refreshtoken;
            if (!refresh_token) return res.status(400).json({ message: "No token 1" });

            jwt.verify(refresh_token, "REFRESH_TOKEN_SECRET", async (err, result) => {
                if (err) return res.status(400).json({ message: "No token 2" });

                const user = await Users.findById(result.id).select("-password").populate("followers followings", "username avatar fullname followers followings")
                if (!user) return res.status(400).json("No token 3");

                const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "abcdefghiklmn")

                res.json({
                    success: true,
                    message: "successful!",
                    accessToken,
                    user: {
                        ...user._doc,
                        password: ''
                    }
                })
            })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('refreshtoken', { path: '/' })
            return res.json({ success: true, message: "logout successful!" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async changeAvatar(req, res) {
        try {
            const { avatar } = req.body
            await Users.findByIdAndUpdate(req.user._id, {
                avatar
            })
            res.json({ success: true, message: "Update avatar successful" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    async changeBackground(req, res) {
        try {
            const { background } = req.body;
            await Users.findByIdAndUpdate(req.user._id, {
                background
            })
            res.json({ success: true, message: "Update background successful" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    async editProfile(req, res) {
        try {
            const { fullname, phone, address, birthday, hobbies, gender } = req.body
            await Users.findByIdAndUpdate(req.user._id, {
                fullname, phone, address, birthday, hobbies, gender
            })
            res.json({ success: true, message: "Update profile successful" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getUser(req, res) {
        try {
            const user = await Users.findById(req.params.id)
                .populate("followers followings", "-password")
            if (!user) return res.status(400).json({ success: false, massage: "User does not exist." })
            res.json({ success: true, user })

        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    // A(user._id) follow B(params.id)
    async follow(req, res) {
        try {

            const user = await Users.find({ _id: req.params.id, followers: req.user._id })
            if (user.length > 0) {
                return res.status(400).json({ success: false, message: "You follwed this user." });
            }
            //cập nhập ds follower ở B
            await Users.findOneAndUpdate({ _id: req.params.id }, {
                $push: { followers: req.user._id }
            }, { new: true })

            //cập nhập ds following ở A
            await Users.findOneAndUpdate({ _id: req.user._id }, {
                $push: { followings: req.params.id }
            }, { new: true })

            res.json({ success: true, message: "follow successful" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }

    }
    // A(user._id) unfollow B(params.id)
    async unfollow(req, res) {
        try {
            // cập nhập ds ở B
            await Users.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { followers: req.user._id }
            }, { new: true })

            //cập nhập ds ở A
            await Users.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { followings: req.params.id }
            }, { new: true })

            res.json({ success: true, message: "unfollow successful" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }

    }

    async searchUsers(req, res) {
        try {
            // console.log("====", req.query.fullname)
            // res.json("ok")
            const users = await Users.find({ fullname: { $regex: req.query.fullname } })
                .limit(10).select("fullname avatar");

            res.json({ success: true, users })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
}

module.exports = new UserController
