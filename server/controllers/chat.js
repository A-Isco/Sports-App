const Chat = require("../models/Chat");
const Player = require("../models/Player");
module.exports={
   async  getContacts(req,res,next){
            id=req.player_id
            let tabs=[]
            let player;
            try {
                const chats= await Chat.find({$or:[{user1:id}, {user2:id}]});
                for(let i=0 ;i<chats.length;i++){
                    if(chats[i].user1==id){
                        player= await Player.findOne({_id:chats[i].user2})
                        tabs.push({'player':player,'chat':chats[i]._id})
                    }else{
                         player= await Player.findOne({_id:chats[i].user1})
                         tabs.push({'player':player,'chat':chats[i]._id})
                    }   
                }
                 return res.json({'tabs':tabs,'id':id});
          } catch (ex) {
                 next(ex);
          }
     },

     async createContact(req,res,next){
        try {
            const chat= await Chat.create({user1:req.body.player1,user2:req.body.player2});
            return res.json({ status: true, chat },201);
      } catch (ex) {
             next(ex);
             return res.json({ status: false },505);
      }

     }
}