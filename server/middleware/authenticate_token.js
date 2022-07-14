const jwt = require('jsonwebtoken')
require('dotenv').config({path: __dirname + '/.env'})
module.exports = (req,res,next)=>{
    const auth_header = req.headers['authorization']
    // console.log('auth header is');
    // console.log(auth_header);
    if(auth_header){
        
        
        token_arr = auth_header.split(' ')
        // console.log(token_arr);
        if(token_arr.length>1){
            token = auth_header.split(' ')[1]
        
        
        // jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,player_id)=>{
        //     if(err) {console.log(err); res.status(403).send('you are not authorized')}
        //     req.player_id=player_id
        //     next()
        // })
        try{
            let player_id = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            if (player_id){
                req.player_id = player_id
            }
            next()
        }catch(ex){
            console.log('from catch in middle ware');
            console.log(ex.message);
                res.status(400).send(ex.message)
        }
    }else{
        res.status(401).send('you sent a wrong request')
    }
    }
    else {
        res.status(401).send('you are not authorized you need to login')
    }
}
