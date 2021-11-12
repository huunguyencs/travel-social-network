const Tours = require('../Models/tour.model')

class TourController {
    async createTour(req, res){
        try{

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    async updateTour(req, res){
        try{

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

   
    async likeTour(req, res){
        try{

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    async unlikeTour(req, res){
        try{

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    async deleteTour(req, res){
        try{

        }catch(err){
            console.log(err)
            res.status(500).json({success: false, message: err.message})
        }
    }

    
}

module.exports = new CommentController;