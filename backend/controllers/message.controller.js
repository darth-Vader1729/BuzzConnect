import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const getMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const {id: userToChatId} = req.params;  // user with whom you'd like to chat
        const senderId = req.user._id;
        
        let conversation = await Conversation.findOne({
            participants : {$all : [senderId, userToChatId]}
        }).populate("messages"); // populate each message one by one

        if(!conversation) {
            // res.status(200).json([]);
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages); // Ensure only one response is sent


    } catch (error) {
        console.log("Error in getMessage controller :", error.message);
        res.status(500).json({message : "Internal Server Error"})
    }
};

export const sendMessage = async (req, res) => {
    // console.log("message sent", req.params.id);
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;
    
        let conversation = await Conversation.findOne({
            participants : {$all : [senderId, receiverId]},
        })
    
        if(!conversation) {
            conversation = await Conversation.create ({
                participants : [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // SOCKET IO FUNCTIONALITY FOR REAL TIME STATUS
        // saving message to DB

        // await conversation.save(); // first this will be done and dusted
        // await newMessage.save(); // then only, this will start
        // this will be done in parallel, hence lesser Time
        await Promise.all([conversation.save(), newMessage.save()])

        res.status(201).json(newMessage);
    
    } catch (error) {
        console.log("Error in sendMessage controller :", error.message);
        res.status(500).json({message : "Internal Server Error"})
    }

}
