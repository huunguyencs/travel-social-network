const Posts = require('../Models/post.model')
const Comments = require('../Models/comment.model')

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
                message: "Create post successful",
                newPost: {
                    ...newPost._doc,
                    userId: {
                        fullname: req.user.fullname,
                        _id: req.user._id,
                        avatar: req.user.avatar
                    }
                }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }


    async updatePost(req, res) {
        try {
            const { content, images, start, cost, isPublic, locationId } = req.body
            const post = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                content, images, start, cost, isPublic, locationId
            }, { new: true })
            res.json({ success: true, message: "update post successful", post })

        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    //lấy pots của 1 user cụ thể (params.id)
    async getUserPost(req, res) {
        try {
            const posts = await Posts.find({ userId: req.params.id }).sort("-createdAt")
                .populate("userId likes", "username email fullname avatar")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "-password"
                    }
                });

            res.json({ success: true, message: "get user post successful", posts })

        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }


    //lấy nhiều post gắn lên trang feed theo người mình theo dõi  hoặc  group 
    async getPosts(req, res) {
        try {
            const posts = await Posts.find({})
                .populate("userId likes", "username email fullname avatar")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "-password"
                    }
                });
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
                .populate("userId likes", "username email fullname avatar")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "-password"
                    },
                })
            res.json({
                success: true, message: "get info 1 post success", post
            });
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
            }, { new: true })


            res.json({
                success: true, message: "like post success",
                likes: post.likes,
            });


        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    //A(user._id) unlike post B(params.id)
    async unlikePost(req, res) {
        try {
            const post = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $pull: {
                    likes: req.user._id
                }
            }, { new: true })

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
            const post = await Posts.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
            if (post.comments != null) await Comments.deleteMany({ _id: { $in: post.comments } });

            res.json({
                success: true, message: "Delete post success"
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }


}

module.exports = new PostController;