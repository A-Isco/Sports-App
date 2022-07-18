const jwt = require('jsonwebtoken')
require('dotenv').config({path: __dirname + '/.env'})
module.exports = (req,res,next)=>{
    const auth_header = req.headers['authorization']
    if(auth_header){
        
        
        token_arr = auth_header.split(' ')
        if(token_arr.length>1){
            token = auth_header.split(' ')[1]
        
        try{
            let player_id = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            if (player_id){
                console.log('from middle ware');
                req.player_id = player_id
                console.log('req.player_id is ');
                console.log( req.player_id);
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
