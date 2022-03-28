const Users = require('../Models/user.model');
const Tours = require('../Models/tour.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;
const Confirms = require('../Models/confirm.model');
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

            res.created({
                success: true,
                message: "Đăng ký thành công!",
                // accessToken
            })
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({ email }).populate("followers followings", "username avatar fullname followings")
                .populate({
                    path: "confirmAccount",
                    populate: {
                        path: "confirmId",
                        select: "cmnd cmndFront cmndBack cmndFace state"
                    }
                })
            if (!user) return res.status(400).json({ success: false, message: "Email không đúng!" })
            const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid) return res.status(400).json({ success: false, message: "Mật khẩu không đúng!" })

            //all Good
            //Return Token
            const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
            //trả về dữ liệu user khi login thành công

            const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET)

            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                // path: '/user/refresh_token',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30days
            })

            res.success({
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
            res.error(err);
        }
    }

    async refreshToken(req, res) {
        try {
            const refresh_token = req.cookies.refreshtoken;
            if (!refresh_token) return res.status(400).json({ message: "No token" });

            jwt.verify(refresh_token, "REFRESH_TOKEN_SECRET", async (err, result) => {
                if (err) return res.status(400).json({ message: "No token" });

                const user = await Users.findById(result.id).select("-password").populate("followers followings", "username avatar fullname followings")
                    .populate({
                        path: "confirmAccount",
                        populate: {
                            path: "confirmId",
                            select: "cmnd cmndFront cmndBack cmndFace state"
                        }
                    })
                if (!user) return res.status(400).json("No token");

                const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)

                res.success({
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
            res.error(err);
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('refreshtoken', { path: '/' })
            return res.success({ success: true, message: "Đăng xuất thành công!" })
        } catch (err) {
            console.log(err)
            res.error(err);
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
                res.success({ success: true, message: "Cập nhật mật khẩu thành công!" })
            }
            else {
                res.status(400).json({ success: false, message: "Sai mật khẩu cũ!" })
            }
        }
        catch (err) {
            res.error(err);
        }
    }

    async changeAvatar(req, res) {
        try {
            const { avatar } = req.body
            await Users.findByIdAndUpdate(req.user._id, {
                avatar
            })
            res.success({ success: true, message: "Cập nhật ảnh đại diện thành công!" })
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }
    async changeBackground(req, res) {
        try {
            const { background } = req.body;
            await Users.findByIdAndUpdate(req.user._id, {
                background
            })
            res.success({ success: true, message: "Cập nhật ảnh bìa thành công!" })
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }
    async editProfile(req, res) {
        try {
            const { username, fullname, email, phone, birthday, gender } = req.body;

            const user = await Users.findById(req.user._id);

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

            res.success({ success: true, message: "Cập nhật thông tin tài khoản thành công!", newUser })
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    async getUser(req, res) {
        try {
            if (ObjectId.isValid(req.params.id)) {
                const user = await Users.findById(req.params.id)
                    .populate("followers followings", "username fullname avatar followings followers")
                    .populate({
                        path: "confirmAccount",
                        populate: {
                            path: "confirmId",
                            select: "cmnd cmndFront cmndBack cmndFace state"
                        }
                    })
                if (!user) return res.status(404).json({ success: false, massage: "Người dùng không tồn tại" })
                res.success({ success: true, user })
            }
            else {
                res.status(404).json({ success: false, massage: "Người dùng không tồn tại" })
            }


        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    // A(user._id) follow B(params.id)
    async follow(req, res) {
        try {

            const user = await Users.findOne({ _id: req.params.id, followers: req.user._id })
            if (user) {
                return res.status(400).json({ success: false, message: "Bạn đã theo dõi người dùng này!" });
            }
            //cập nhập ds follower ở B
            const followers = await Users.findOneAndUpdate({ _id: req.params.id }, {
                $push: { followers: req.user._id }
            }, { new: true }).populate("followers", "username fullname avatar followings followers")

            //cập nhập ds following ở A
            const followings = await Users.findByIdAndUpdate(req.user._id, {
                $push: { followings: req.params.id }
            }, { new: true }).populate("followings", "username fullname avatar followings followers")

            res.success({
                success: true,
                message: "Theo dõi thành công!",
                followers: followers.followers,
                followings: followings.followings
            })
        } catch (err) {
            console.log(err)
            res.error(err);
        }

    }
    // A(user._id) unfollow B(params.id)
    async unfollow(req, res) {
        try {
            // cập nhập ds ở B
            const followers = await Users.findByIdAndUpdate(req.params.id, {
                $pull: { followers: req.user._id }
            }, { new: true }).populate("followers", "username fullname avatar followings followers")

            //cập nhập ds ở A
            const followings = await Users.findByIdAndUpdate(req.user._id, {
                $pull: { followings: req.params.id }
            }, { new: true }).populate("followings", "username fullname avatar followings followers")

            res.success({
                success: true,
                message: "Hủy theo dõi thành công!",
                followers: followers.followers,
                followings: followings.followings
            })
        } catch (err) {
            console.log(err)
            res.error(err);
        }

    }

    async searchUsers(req, res) {
        try {
            // console.log("====", req.query.fullname)
            // res.json("ok")
            const users = await Users.find({ fullname: { $regex: req.query.fullname } })
                .limit(10).select("fullname avatar");

            res.success({ success: true, users })
        } catch (err) {
            console.log(err)
            res.error(err);
        }
    }

    async saveTour(req, res) {
        try {

            const { tour } = req.body;

            const user = await Users.findByIdAndUpdate(req.user._id, {
                $addToSet: { tourSaved: tour }
            }, { new: true })

            res.success({ success: true, message: "Lưu tour thành công", tourSaved: user.tourSaved })
        }
        catch (err) {
            res.error(err);
        }
    }

    async unsaveTour(req, res) {
        try {
            const { tour } = req.body;
            const user = await Users.findByIdAndUpdate(req.user._id, {
                $pop: { tourSaved: tour }
            }, { new: true })

            res.success({ success: true, message: 'Loại khỏi danh sách thành công', tourSaved: user.tourSaved })
        } catch (err) {
            res.error(err);
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

                res.success({ success: true, message: `Lấy top ${limit} recommend`, recommend })
            }
            else {
                sorted = sorted.slice(0, 50)
                var recommend = await Users.find({
                    _id: {
                        $in: sorted
                    }
                }, "username fullname avatar")

                res.success({ success: true, message: `Lấy max 50 recommend`, recommend })
            }


        }
        catch (err) {
            console.log(err);
            res.error(err);
        }
    }

    async getAll(req, res) {
        try {
            const users = await Users.find({}).select("username fullname email role avatar confirmAccount createdAt confirmAccount")
                .populate({
                    path: "confirmAccount",
                    populate: {
                        path: "confirmId",
                        select: "state"
                    }
                });
            res.success({ success: true, message: "Lấy toàn bộ user thành công", users })
        } catch (err) {
            console.log(err);
            res.error(err);
        }
    }
    async confirmAccount(req, res) {
        try {
            const { cmnd, cmndFront, cmndBack, cmndFace } = req.body
            const newConfirm = new Confirms({
                cmnd, cmndFront, cmndBack, cmndFace
            })
            await newConfirm.save()
            const confirm = {
                state: false,
                confirmId: newConfirm._id
            }
            const newUser = await Users.findByIdAndUpdate(req.user._id, {
                confirmAccount: confirm
            }, { new: true })
            res.success({ success: true, newUser })
        } catch (err) {
            console.log(err)
            res.error(err);
        }

    }


    async getTourSaved(req, res) {
        try {
            const tourSaved = req.user.tourSaved.map(item => item.toString());
            const tours = await Tours.find({
                _id: {
                    $in: tourSaved
                }
            })
                .populate("userId joinIds likes", "username fullname avatar")
                .populate("tour", "date")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "username fullname avatar"
                    }
                });
            res.success({ success: true, message: "Lấy tour đã lưu thành công", tours })
        }
        catch (err) {
            res.error(err);
        }
    }

    async search(req, res) {
        try {
            var { q, offset } = req.query;
            offset = offset || 0;
            var users = await Users.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } })
                .skip(offset * 10)
                .limit(10)
            users = users.map((item) => ({
                _id: item._id,
                fullname: item.fullname,
                link: `/u/${item._id}`,
                description: '',
                image: item.avatar
            }))
            res.success({ success: true, results: users, query: q })
        } catch (err) {
            res.error(err);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await Users.findByIdAndDelete(id);
            res.deleted('Xóa user thành công')
        }
        catch (err) {
            res.error(err);
        }
    }

    async updateStatus(req, res) {
        try {

        } catch (err) {

        }
    }

    async getUserByArray(req, res) {
        try {
            const { users } = req.body;
            const listUser = Users.find({
                _id: {
                    $in: users
                }
            }).select("fullname avatar")

            res.success({
                success: true,
                message: "Lấy danh sách người dùng thành công",
                listUser
            })
        }
        catch (err) {
            res.error(err)
        }
    }
}

module.exports = new UserController
