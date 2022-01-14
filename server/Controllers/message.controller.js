const Messages = require('../Models/message.model');
const Conversations = require('../Models/conversation.model');

class MessageController{
    async createMessage(req, res) {
        try {
            const { sender, recipient, text } = req.body;
            if(!recipient || !text.trim()) return;


            const newConversation = await Conversations.findOneAndUpdate({
                $or: [
                    {members: [sender, recipient]},
                    {members: [recipient, sender]}
                ]
            }, {
                members: [sender, recipient],
                text
            }, { new: true, upsert: true })

            const newMessage = new Messages({
                conversation: newConversation._id,
                sender, 
                recipient, 
                text
            })

            await newMessage.save()

            res.json({
                success: true,
                message: "Create message successful",
                newMessage: {
                    ...newMessage._doc,
                }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

    async getConversations(req, res) {
        try {
            const conversations = await Conversations.find({members:req.user._id}).sort('-updatedAt')
            .populate('members', 'avatar username fullname')

            res.json({
                success: true,
                message: "Get conversations successful",
                conversations
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

}
module.exports = new MessageController;
