const Player = require('../models/Player.js')

module.exports = (req,res,next)=>{

    Player.find({"_id":req.player_id.id}).then((player)=>{

        if(player[0]){
            if(player[0].isAdmin){

                next()
            }else{
                res.status(400).send("only admin can access ")
            }
            
           
        }else{
            res.status(401).send("something went wrong")
        }
    }).catch((err)=>{
        
        res.status(401).send(err.message)
    })
        
    
}