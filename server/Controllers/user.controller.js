const Users = require('../Models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

class UserController {
    async register(req, res) {
        try {
            const { fullname, username, email, phone, password } = req.body;

            const user_name = await Users.findOne({ username })
            if (user_name) return res.status(400).json({ success: false, message: "Username đã tồn tại! Vui lòng chọn tên khác." })

            const user_email = await Users.findOne({ email })
            if (user_email) return res.status(400).json({ success: false, message: "Email này đã tồn tại!" })

            const passwordHash = await bcrypt.hash(password, 12)

            const userNew = new Users({
                fullname, username, email, password: passwordHash, phone
            })


            //Return Token
            // const accessToken = jwt.sign({ id: userNew._id }, process.env.ACCESS_TOKEN_SECRET || "abcdefghiklmn")

            await userNew.save();

            res.json({
                success: true,
                message: "Đăng ký thành công!",
                // accessToken
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({ email }).populate("followers followings", "username avatar fullname followings")
            if (!user) return res.status(400).json({ success: false, message: "Email không đúng!" })
            const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid) return res.status(400).json({ success: false, message: "Mật khẩu không đúng!" })

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
                message: "Đăng nhập thành công!",
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
            if (!refresh_token) return res.status(400).json({ message: "No token" });

            jwt.verify(refresh_token, "REFRESH_TOKEN_SECRET", async (err, result) => {
                if (err) return res.status(400).json({ message: "No token" });

                const user = await Users.findById(result.id).select("-password").populate("followers followings", "username avatar fullname followings")
                if (!user) return res.status(400).json("No token");

                const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET || "abcdefghiklmn")

                res.json({
                    success: true,
                    message: "Thành công!",
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
            return res.json({ success: true, message: "Đăng xuất thành công!" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = await Users.findById(req.user._id);
            if (!user) {
                res.status(404).json({ success: false, message: "Không tìm thấy user!" })
            }
            const passwordValid = await bcrypt.compare(oldPassword, user.password)
            if (passwordValid) {
                const passwordHash = await bcrypt.hash(newPassword, 12);
                await Users.findByIdAndUpdate(user._id, {
                    password: passwordHash
                })
                res.json({ success: true, message: "Cập nhật mật khẩu thành công!" })
            }
            else {
                res.status(400).json({ success: false, message: "Sai mật khẩu cũ!" })
            }
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async changeAvatar(req, res) {
        try {
            const { avatar } = req.body
            await Users.findByIdAndUpdate(req.user._id, {
                avatar
            })
            res.json({ success: true, message: "Cập nhật ảnh đại diện thành công!" })
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
            res.json({ success: true, message: "Cập nhật ảnh bìa thành công!" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    async editProfile(req, res) {
        try {
            const { username, fullname, email, phone, birthday, gender } = req.body;

            const user = await Users.findById(req.user.id);

            if (user.username !== username) {
                const findUsername = await Users.find({ username: username });
                if (findUsername) {
                    res.status(400).json({ success: false, message: "Tên tài khoản đã tồn tại!" })
                    return;
                }
            }
            if (user.email !== email) {
                const findEmail = await Users.find({ email: email });
                if (findEmail) {
                    res.status(400).json({ success: false, message: "Email đã tồn tại" })
                    return;
                }
            }

            const newUser = await Users.findByIdAndUpdate(req.user._id, {
                username, fullname, email, phone, birthday, gender
            }, { new: true })

            res.json({ success: true, message: "Cập nhật thông tin tài khoản thành công!", newUser })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getUser(req, res) {
        try {
            const { role } = req.query;
            if (ObjectId.isValid(req.params.id)) {
                var user;
                if (parseInt(role) === 1) {
                    user = await Users.findOne({ _id: req.params.id, role: 1 })
                        .populate("followers followings", "username fullname avatar followings followers")
                }
                else {
                    user = await Users.findOne({ _id: req.params.id, role: { $ne: 1 } })
                        .populate("followers followings", "username fullname avatar followings followers")
                }

                if (!user) return res.status(404).json({ success: false, massage: "Người dùng không tồn tại" })
                res.json({ success: true, user })
            }
            else {
                res.status(404).json({ success: false, massage: "Người dùng không tồn tại" })
            }


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
                return res.status(400).json({ success: false, message: "Bạn đã theo dõi người dùng này!" });
            }
            //cập nhập ds follower ở B
            const followers = await Users.findOneAndUpdate({ _id: req.params.id }, {
                $push: { followers: req.user._id }
            }, { new: true }).populate("followers", "username fullname avatar followings followers")

            //cập nhập ds following ở A
            const followings = await Users.findOneAndUpdate({ _id: req.user._id }, {
                $push: { followings: req.params.id }
            }, { new: true }).populate("followings", "username fullname avatar followings followers")

            res.json({
                success: true,
                message: "Theo dõi thành công!",
                followers: followers.followers,
                followings: followings.followings
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }

    }
    // A(user._id) unfollow B(params.id)
    async unfollow(req, res) {
        try {
            // cập nhập ds ở B
            const followers = await Users.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { followers: req.user._id }
            }, { new: true }).populate("followers", "username fullname avatar followings followers")

            //cập nhập ds ở A
            const followings = await Users.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { followings: req.params.id }
            }, { new: true }).populate("followings", "username fullname avatar followings followers")

            res.json({
                success: true,
                message: "Hủy theo dõi thành công!",
                followers: followers.followers,
                followings: followings.followings
            })
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

    async saveTour(req, res) {
        try {

            const { tour } = req.body;

            const user = await Users.findByIdAndUpdate(req.user._id, {
                $addToSet: { tourSaved: tour }
            }, { new: true })

            res.json({ success: true, message: "Lưu tour thành công", tourSaved: user.tourSaved })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getFriendRecommend(req, res) {
        try {

            const { limit } = req.query;
            var user = await Users.findById(req.user._id, "followings")
                .populate("followings", "followings")

            const followeds = [...user.followings.map(item => item._id.toString()), user._id.toString()]

            if (user) {
                var rawArrFriend = [];
                for (var f of user.followings) {
                    // console.log(f);
                    rawArrFriend = [...rawArrFriend, ...f.followings.map(item => item.toString())]
                }
            }

            // console.log(rawArrFriend);

            rawArrFriend = rawArrFriend.filter(item => !followeds.includes(item))

            var counts = rawArrFriend.reduce(function (map, id) {
                map[id] = (map[id] || 0) + 1;
                return map;
            }, {});

            var sorted = Object.keys(counts).sort(function (a, b) {
                return counts[b] - counts[a];
            });

            if (limit) {
                sorted = sorted.slice(0, limit)
                var recommend = await Users.find({
                    _id: {
                        $in: sorted
                    }
                }, "username fullname avatar")

                res.json({ success: true, message: `Lấy top ${limit} recommend`, recommend })
            }
            else {
                sorted = sorted.slice(0, 50)
                var recommend = await Users.find({
                    _id: {
                        $in: sorted
                    }
                }, "username fullname avatar")

                res.json({ success: true, message: `Lấy max 50 recommend`, recommend })
            }


        }
        catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: err.massage })
        }
    }
}

module.exports = new UserController
