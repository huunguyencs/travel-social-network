const Posts = require('../Models/post.model')
const Comments = require('../Models/comment.model')
const TourDates = require('../Models/tourDate.model');
const Locations = require('../Models/location.model')

class PostController {
    //co hai loai post
    async createPost(req, res) {
        try {
            const { content, images, hashtags } = req.body

            const newPost = new Posts({
                userId: req.user._id, content, images, hashtags
            })
            await newPost.save()
            res.json({
                success: true,
                message: "Tạo bài viết thành công",
                newPost: {
                    ...newPost._doc,
                    userId: {
                        fullname: req.user.fullname,
                        _id: req.user._id,
                        avatar: req.user.avatar,
                        followers: req.user.followers
                    }
                }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async sharePost(req, res) {
        try {
            const { content, hashtags, shareId } = req.body;

            const newPost = new Posts({
                userId: req.user._id, content, hashtags, shareId
            })

            await newPost.save()

            const share = await Posts.findById(shareId).populate("userId", "username fullname avatar")

            res.json({
                success: true,
                message: 'Chia sẻ thành công!',
                newPost: {
                    ...newPost._doc,
                    userId: {
                        _id: req.user._id,
                        username: req.user.username,
                        fullname: req.user.fullname,
                        avatar: req.user.avatar
                    },
                    shareId: share
                }
            })
        }
        catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async createReview(req, res) {
        try {
            const { content, images, hashtags, locationId, rate, tourDateId, indexLocation } = req.body;
            let isPostReview = true;
            const newPost = new Posts({
                userId: req.user._id, content, images, hashtags, isPostReview, locationId, rate
            });
            await newPost.save();

            if (tourDateId) {
                await TourDates.findOneAndUpdate({ _id: tourDateId, locations: { $elemMatch: { _id: indexLocation } } }, {
                    $set: {
                        'locations.$.postId': newPost._doc._id
                    }
                }, { new: true, safe: true, upsert: true })
            }

            res.json({
                success: true,
                message: "Create review successful",
                newPost: {
                    ...newPost._doc,
                    userId: {
                        _id: req.user._id,
                        fullname: req.user.fullname,
                        avatar: req.user.avatar,
                        followers: req.user.followers
                    }
                }
            })

            if (rate) {
                switch (parseInt(rate)) {
                    case 1:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.0": 1 }
                        }, { new: true })
                        break;
                    case 2:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.1": 1 }
                        }, { new: true })
                        break;
                    case 3:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.2": 1 }
                        }, { new: true })
                        break;
                    case 4:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.3": 1 }
                        }, { new: true })
                        break;
                    case 5:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.4": 1 }
                        }, { new: true })
                        break;
                }
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async updatePost(req, res) {
        try {
            const { content, images, rate, hashtags, oldRate, locationId } = req.body;
            const post = await Posts.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, {
                content, images, rate, hashtags
            }, { new: true })
                .populate("userId likes", "username fullname avatar")
                .populate("locationId", "name fullname")
                .populate({
                    path: "shareId",
                    populate: {
                        path: "userId",
                        select: "username fullname avatar"
                    }
                })
                .populate({
                    path: "shareId",
                    populate: {
                        path: "locationId",
                        select: "name fullname"
                    }
                })
            res.json({ success: true, message: "update post successful", post })

            if (rate && parseInt(rate) !== parseInt(oldRate)) {
                switch (parseInt(oldRate)) {
                    case 1:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.0": -1 }
                        }, { new: true })
                        break;
                    case 2:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.1": -1 }
                        }, { new: true })
                        break;
                    case 3:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.2": -1 }
                        }, { new: true })
                        break;
                    case 4:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.3": -1 }
                        }, { new: true })
                        break;
                    case 5:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.4": -1 }
                        }, { new: true })
                        break;
                }

                switch (parseInt(rate)) {
                    case 1:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.0": 1 }
                        }, { new: true })
                        break;
                    case 2:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.1": 1 }
                        }, { new: true })
                        break;
                    case 3:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.2": 1 }
                        }, { new: true })
                        break;
                    case 4:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.3": 1 }
                        }, { new: true })
                        break;
                    case 5:
                        await Locations.findByIdAndUpdate(locationId, {
                            $inc: { "star.4": 1 }
                        }, { new: true })
                        break;
                }
            }

        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    //lấy pots của 1 user cụ thể (params.id)
    async getUserPost(req, res) {
        try {
            const { offset } = req.body;
            const posts = await Posts.find({ userId: req.params.id }).skip(offset).limit(5).sort("-createdAt")
                .populate("userId likes", "username fullname avatar")
                .populate("locationId", "name fullname")
                .populate({
                    path: "shareId",
                    populate: {
                        path: "userId",
                        select: "username fullname avatar"
                    }
                })
                .populate({
                    path: "shareId",
                    populate: {
                        path: "locationId",
                        select: "name fullname"
                    }
                })

            res.json({ success: true, message: "get user post successful", posts })

        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }


    //lấy nhiều post gắn lên trang feed theo người mình theo dõi  hoặc  group 
    async getPosts(req, res) {
        try {
            const posts = await Posts.find({}).limit(8)
                .populate("userId likes", "username fullname avatar")
                .populate("locationId", "name fullname")
                .populate({
                    path: "shareId",
                    populate: {
                        path: "userId",
                        select: "username fullname avatar"
                    }
                })
                .populate({
                    path: "shareId",
                    populate: {
                        path: "locationId",
                        select: "name fullname"
                    }
                })
                .sort({ "createdAt": -1 });
            res.json({
                posts,
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    // lấy thông tin 1 post theo params.id
    async getPost(req, res) {
        try {
            const post = await Posts.findById(req.params.id)
                .populate("userId likes", "username fullname avatar")
                .populate("locationId", "name fullname")
                .populate({
                    path: "shareId",
                    populate: {
                        path: "userId",
                        select: "username fullname avatar"
                    }
                })
                .populate({
                    path: "shareId",
                    populate: {
                        path: "locationId",
                        select: "name fullname"
                    }
                })
            if (post) {
                res.json({
                    success: true, message: "get info 1 post success", post
                });
            }
            else {
                res.status(404).json({ success: false, message: "Not found" })
            }

        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    //A(user._id) like post B(params.id)
    async likePost(req, res) {
        try {
            var post = await Posts.find({ _id: req.params.id, likes: req.user._id });
            if (post.length > 0) {
                return res.status(400).json({ success: false, message: "You liked this post." })
            }

            post = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $push: {
                    likes: req.user._id
                }
            }, { new: true }).populate("likes", "username fullname avatar")


            res.json({
                success: true, message: "like post success",
                likes: post.likes,
                post
            });


        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    //A(user._id) unlike post B(params.id)
    async unlikePost(req, res) {
        try {
            const post = await Posts.findByIdAndUpdate(req.params.id, {
                $pull: {
                    likes: req.user._id
                }
            }, { new: true }).populate("likes", "username fullname avatar")

            res.json({
                success: true, message: "unlike post success",
                likes: post.likes,
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async deletePost(req, res) {
        try {
            const post = await Posts.findById(req.params.id)
            await Posts.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
            if (post.comments) await Comments.deleteMany({ _id: { $in: post.comments } });

            if (post.rate) {
                switch (parseInt(post.rate)) {
                    case 1:
                        await Locations.findByIdAndUpdate(post.locationId, {
                            $inc: { "star.0": -1 }
                        }, { new: true })
                        break;
                    case 2:
                        await Locations.findByIdAndUpdate(post.locationId, {
                            $inc: { "star.1": -1 }
                        }, { new: true })
                        break;
                    case 3:
                        await Locations.findByIdAndUpdate(post.locationId, {
                            $inc: { "star.2": -1 }
                        }, { new: true })
                        break;
                    case 4:
                        await Locations.findByIdAndUpdate(post.locationId, {
                            $inc: { "star.3": -1 }
                        }, { new: true })
                        break;
                    case 5:
                        await Locations.findByIdAndUpdate(post.locationId, {
                            $inc: { "star.4": -1 }
                        }, { new: true })
                        break;
                }
            }

            res.json({
                success: true, message: "Delete post success"
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async search(req, res) {
        try {
            var { q, offset } = req.query;
            offset = offset || 0;
            var posts = await Posts.find({ $text: { $search: q } }, { score: { $meta: "textScore" } })
                .sort({ score: { $meta: "textScore" } })
                .skip(offset * 10)
                .limit(10)
                .populate("userId", "avatar fullname");
            posts = posts.map((item) => ({
                _id: item._id,
                fullname: `Bài viết của ${item.userId.fullname}`,
                link: `/post/${item._id}`,
                description: item.content,
                image: item.userId.avatar
            }))
            res.json({ success: true, results: posts, query: q })
        } catch (err) {
            res.status(500).json({ success: false, message: err.message })
        }
    }

}

module.exports = new PostController;