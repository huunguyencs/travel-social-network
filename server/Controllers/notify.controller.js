const Notifies = require('../Models/notify.model');


class  NotifyController{
    async createNotify(req,res){
        try{
            const { id, recipients, url, content, text, image } = req.body;
            const newNotify = new Notifies({
               id, user: req.user._id, recipients, url, content, text, image
            })
            await newNotify.save();

            res.json({
                success: true,
                message: "Create Notify successful",
                newNotify
            })

        }catch(err){
            console.log(err)
            res.status(500).json({ success: false, message: err.message })

        }
    }

    async deleteNotify(req,res){
        try {
            await Notifies.findOneAndDelete({ id: req.params.id });
            
            res.json({
                success: true, message: "Delete Notify success"
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    // lấy thông báo của 1 user(user._id)
    async getNotifies(req, res){
        try {
            const notifies = await Notifies.find({recipients: req.user._id}).sort('createAt')
            res.json({
                success: true, 
                message: "Get notifies success",
                notifies
            });
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
}

module.exports = new NotifyController;