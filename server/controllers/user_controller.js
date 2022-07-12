const Player = require('../models/Player.js')
const jwt = require('jsonwebtoken')
const { json } = require('body-parser')
// import user_validation from '../user_validations'
const player_validation  = require('../Validations/player_validations')
require('dotenv').config({path: __dirname + '/.env'})

module.exports = {

    get_all_players:(req,res,next)=>{
        let limit= parseInt(req.query.limit || '')
        Player.find({}).limit(limit).then(player=>{res.status(200).send(player)}).catch(next)
        
    },
    create_player:(req,res,next)=>{
        Player.find({"email":req.body.email}).then((player)=>{
        if (player != '')
                res.status(400).send('email already exists')
                
       
       
            
            
            else{
                let player_body =   player_validation.validate(req.body,{aboutEarly:false})
                if(player_body.error){
                    let str = ''
                    player_body.error.details.map(element=>{
                        str+=element.message+'\n'
                    })
                    res.status(400).send(str);
                }else{

                
                Player.create(player_body.value).then(us=>
                    {
                        id = {"id":us._id}
                        const token = jwt.sign(id,process.env.ACCESS_TOKEN_SECRET)
                    res.status(200).send(token,)
                    })
                .catch(next)
                
                //api to refresh token .....
                //validation joi and yup
                }
            }
        })
    
    },
    get_player:(req,res,next)=>{
        _id= req.params.id
        Player.findById({_id}).then(player=>res.status(200).send(player)).catch(next)
    },
    login:(req,res,next)=>{
        // res.status(200).send(req.body.user_name).catch(next)
        // res.send(req.body.password)
        Player.find({"email":req.body.email,"password":req.body.password}).then(player=>{
            if(player !='')
            {
                id = {"id":player._id}
                const token = jwt.sign(id,process.env.ACCESS_TOKEN_SECRET)  
                    //{expiresIn: 100}
                res.status(200).send(token)
            } 
            else {
                res.status(400).send('wrong playername or password')
                
            }
            
        })
        .catch(next)
    },
    refresh_token:(req,res,next)=>{
        const auth_header = req.headers['authorization']
        console.log('auth header is');
        console.log(auth_header);
        if(auth_header){
            
            
            token_arr = auth_header.split(' ')
            console.log(token_arr);
            if(token_arr.length>1){
                token = auth_header.split(' ')[1]
            
    
            // console.log('from authenticate  '+process.env.ACCESS_TOKEN_SECRET);
            
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,player)=>{
                if(err) {res.status(403).send('you are not authorized')}
                req.player=player

                res.status(200).send(player)
            })
        }else{
            res.status(401).send('you sent a wrong request')
        }
        }
        else {
            res.status(401).send('you are not authorized you need to login')
        }
    },


}
