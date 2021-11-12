const Posts = require('../Models/post.model')

class PostController {

    ///
    async createPost(req, res){
        try{
            const  {content, images, postType, start, timeStart, cost} = req.body

            const newPost = new Posts({
                userId: req.user._id, content, postImages:images, isPortReview, start, timeStart, cost
            })
             await newPost.save()
             res.json({
                 success:true,
                 message:"create post successful",
                 newPost: {
                    ...newPost._doc,
                    userId: req.user
                }
             })
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    
    async updatePost(req, res){
        try{
            const  {content, images, isPortReview, start, timeStart, cost} = req.body
            const post = await Posts.findOneAndUpdate({ _id: req.params.id }, {
                content, postImages:images, isPortReview, start, timeStart, cost
            })
            res.json({success:true, message:"update post successful", post})

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }
    //lấy pots của 1 user cụ thể (params.id)
    async getUserPost(req, res){
        try{
            const posts = await Posts.find({ user: req.params.id }).sort("-createdAt")

            res.json({success:true, message:"get user post successful", posts})

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }


    //lấy nhiều post gắn lên trang feed theo người mình theo dõi  hoặc  group 
    async getPosts(req, res){
        try{

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }
    
    // lấy thông tin 1 post theo id
    async getPost(req, res){
        try{
            const post = await Posts.findById(req.params.id)
                .populate("userId likes", "username email fullname avatar followers")
                .populate({
                    path: "comments",
                    populate: {
                        path: "userId likes",
                        select: "-password"
                    },
                })
            res.json({
                success:true, message:"get info 1 post success"
            });
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    //A(user._id) like post B(params.id)
    async likePost(req, res){
        try{
            const post = await Posts.find({ _id: req.params.id, likes: req.user._id });
            if (post.length > 0) {
                return res.status(400).json({success:false, message: "You liked this post." })
            }

            await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $push: {
                    likes: req.user._id
                }
            })

            res.json({
                success:true, message:"like post success"
            });


        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }
    //A(user._id) unlike post B(params.id)
    async unlikePost(req, res){
        try{
            await Posts.findOneAndUpdate({ _id: req.params.id }, {
                $pull: {
                    likes: req.user._id
                }
            })

            res.json({
                success:true, message:"like post success"
            });
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    async deletePost(req, res){
        try{
            const post = await Posts.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

            await Comments.deleteMany({ _id: { $in: post.comments } });

            res.json({
                success:true, message:"delete post success"
            });
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    
}

module.exports = new PostController;