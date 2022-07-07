const Chat = require("../models/chat");
const Player = require("../models/player");
const Message = require("../models/message");
module.exports={
    async  getMessages(req,res,next){
        let messages= await Message.find({chat:req.params.id}) 
        console.log(messages)   
        return res.json(messages);
    },
    
    async createMessage(req,res,next){
        try {
            const message= await Message.create({message:req.body.message,from:req.body.from,to:req.body.to,chat:req.body.chat});
            return res.json({ status: true, message },201);
      } catch (ex) {
             next(ex);
             return res.json({ status: false },400);
      }

    }

}