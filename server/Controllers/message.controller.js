const Messages = require('../Models/message.model');
const Conversations = require('../Models/conversation.model');

class MessageController {
    async createMessage(req, res) {
        try {
            const { sender, recipient, text } = req.body;
            if (!recipient || !text.trim()) return;


            const newConversation = await Conversations.findOneAndUpdate({
                $or: [
                    { members: [sender, recipient] },
                    { members: [recipient, sender] }
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

    //get conversations of 1 user
    async getConversations(req, res) {
        try {
            const conversations = await Conversations.find({ members: req.user._id }).sort('-updatedAt')
                .populate('members', 'avatar username fullname role')

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

    // get messages of the conversation
    async getMessages(req, res) {
        try {
            const messages = await Messages.find({
                $or: [
                    { sender: req.user._id, recipient: req.params.id },
                    { sender: req.params.id, recipient: req.user._id }
                ]
            }).sort('-createAt')

            res.json({
                success: true,
                message: "Get messages successful",
                messages
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }
    async deleteConversation(req, res) {
        try {
            const newConversation = await Conversations.findOneAndDelete({
                $or: [
                    {members: [req.user._id, req.params.id]},
                    {members: [req.params.id, req.user._id]}
                ]
            })
            await Messages.deleteMany({conversation: newConversation._id})
            
            res.json({
                success: true,
                message: "Delete conversation successful"
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({ success: false, message: err.message })
        }
    }

}
module.exports = new MessageController;