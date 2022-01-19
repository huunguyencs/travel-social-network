const Comments = require('../Models/comment.model')
const Posts = require('../Models/post.model')
const Tours = require('../Models/tour.model')
// const Activities = require('../Models/activity.model')

class CommentController {
    async createComment(req, res) {
        try {
            const { commentType, content, postId, tourId } = req.body;

            const newComment = new Comments({
                userId: req.user._id, content, commentType
            })

            await newComment.save()

            switch (commentType) {
                case "post":
                    const post = await Posts.findById(postId);
                    if (!post) {
                        return res.status(400).json({ success: false, message: "This post is not exist." })
                    }

                    await Posts.findOneAndUpdate({ _id: postId }, {
                        $push: {
                            comments: newComment._id
                        }
                    });
                    break;

                case "tour":
                    const tour = await Tours.findById(tourId);
                    if (!tour) {
                        return res.status(400).json({ success: false, message: "This tour is not exist." })
                    }

                    await Tours.findOneAndUpdate({ _id: tourId }, {
                        $push: {
                            comments: newComment._id
                        }
                    })
                    break;

                // case "activity":
                //     const activity = await Activities.findById(activityId);
                //     if (!tour) {
                //         return res.status(400).json({success:false, message: "This activity is not exist." })
                //     }

                //     await Tours.findOneAndUpdate({ _id: activityId }, {
                //         $push: {
                //             comments: newComment._id
                //         }
                //     })
                //     break;
            }
            res.json({ success: true, message: "Create comment successful", newComment })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async updateComment(req, res) {
        try {
            const { content } = req.body;
            const comment = await Comments.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { content }, { new: true })
                .populate("userId", "avatar fullname username");

            res.json({ success: true, message: "Update comment successful", comment })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    // A(req.user._id) like comment B(params.id)
    async likeComment(req, res) {
        try {
            const comment = await Comments.findOne({ _id: req.params.id, likes: req.user._id });

            if (comment && comment.length > 0) {
                return res.status(400).json({ success: false, message: "You liked this comment." })
            }

            const newComment = await Comments.findOneAndUpdate({ _id: req.params.id }, {
                $push: {
                    likes: req.user._id
                }
            }, { new: true }).populate("userId", "avatar fullname username");
            res.json({ success: true, message: "Like comment", newComment })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    // A(req.user._id) unlike comment B(params.id)
    async unlikeComment(req, res) {
        try {
            const newComment = await Comments.findOneAndUpdate({ _id: req.params.id }, {
                $pull: {
                    likes: req.user._id
                }
            }, { new: true }).populate("userId", "avatar fullname username");
            res.json({ success: true, message: "Unlike comment", newComment })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    // A(req.user._id) delete comment B(params.id)
    async deleteComment(req, res) {
        try {
            const comment = await Comments.findOneAndDelete({
                _id: req.params.id, userId: req.user._id
            })

            const { postId } = req.query;

            switch (comment.commentType) {
                case "post":
                    await Posts.findOneAndUpdate({ _id: postId }, {
                        $pull: { comments: req.params.id }
                    })
                    break;

                case "tour":
                    await Tours.findOneAndUpdate({ _id: postId }, {
                        $pull: { comments: req.params.id }
                    })
                    break;
                // case "activity":
                //     await Activities.findOneAndUpdate({ _id: comment.activityId }, {
                //         $pull: { comments: req.params.id }
                //     })
                //     break;
            }
            res.json({ success: true, message: "Delete comment" })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }


}

module.exports = new CommentController;