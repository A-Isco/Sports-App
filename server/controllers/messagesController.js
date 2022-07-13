const Chat = require("../models/Chat");
const Player = require("../models/Player");
const Message = require("../models/Message");
module.exports={
    async  getMessages(req,res,next){
        let messages= await Message.find({chat:req.params.id}) 
        return res.json(messages);
    },
    
    async createMessage(req,res,next){
        try {
            const message= await Message.create({message:req.body.message,from:req.player_id.id,to:req.body.to,chat:req.body.chat});
            return res.json({ status: true, message },201);
      } catch (ex) {
             next(ex);
             return res.json({ status: false },400);
      }

    }

}