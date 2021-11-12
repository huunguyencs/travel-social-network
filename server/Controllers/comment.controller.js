const Comments = require('../Models/comment.model')

class CommentController {
    async createComment(req, res){
        try{
            const { postId, content, tag, reply, postUserId } = req.body;

            const newComment = new Comments({
                user: req.user._id, content, tag, reply, postUserId, postId
            })
        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    async updateComment(req, res){
        try{

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

   
    async likeComment(req, res){
        try{

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    async unlikeComment(req, res){
        try{

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    async deleteComment(req, res){
        try{

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    
}

module.exports = new CommentController;