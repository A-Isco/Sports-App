const Player = require('../models/Player.js')
const jwt = require('jsonwebtoken')
const { json } = require('body-parser')
// import user_validation from '../user_validations'
const player_validation  = require('../Validations/player_validations')
const bcrypt = require("bcrypt")
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
                    const my_sports=req.body.sports;
                    const sports_arr=my_sports.split(',');
                    var ageDifMs = (Date.now() - new Date(req.body.birth_date).getTime());
                    var ageDate = new Date(ageDifMs); // miliseconds from epoch
                    var age= Math.abs(ageDate.getUTCFullYear() - 1970);

                bcrypt.hash(player_body.value['password'], 10, function(err, hash) {
                        player_body.value['password']=hash
                    player_obj={
                        name: req.body.name,
                        email: req.body.email,
                        password: player_body.value['password'],
                        gender: req.body.gender,
                        birth_date: req.body.birth_date,
                        region: req.body.region,
                        sports: sports_arr,
                        img:req.file.path,
                        age:age
                    }
                        Player.create(player_obj).then(us=>
                            {
                                id = {"id":us._id}
                                const token = jwt.sign(id,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
                                const refresh_token = jwt.sign(id,process.env.REFRESH_TOKEN_SECRET)
                                let obj = {
                                    token : token,
                                    refresh_token:refresh_token
                                }
                                res.status(200).send(obj)
                            })
                        .catch(next)

                });



                }
            }
        })

    },
    get_player:(req,res,next)=>{
        _id= req.params.id
        Player.findById({_id}).then(player=>res.status(200).send(player)).catch(next)
    },
    login:(req,res,next)=>{

        console.log(req.body);
        Player.find({"email":req.body.email}).then(player=>{
            if(player !='')
            {
                bcrypt.compare(req.body.password, player[0].password, function(err, result) {
                    if (result) {
                        console.log("player[0]._id=")
                        console.log(player[0]._id)
                        id = {"id":player[0]._id}
                        const token = jwt.sign(id,process.env.ACCESS_TOKEN_SECRET,{expiresIn: 120})
                        const refresh_token = jwt.sign(id,process.env.REFRESH_TOKEN_SECRET)

                        let obj = {
                            token : token,
                            refresh_token:refresh_token
                        }

                        res.status(200).send(obj)
                   }
                   else res.status(400).send('email and password dont match')



                });

            }

            else res.status(400).send('you entered a wrong email')

        })
        .catch(next)
    },



    refresh_token:(req,res,next)=>{
        console.log('from refresh token');
            let id
           token =  req.body.token
           refresh_token = req.body.refresh_token
            try{
            let token_id = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
                console.log(token_id);
                id={"id":token_id.id}
                }catch(ex){
                    console.log('from catch exception is');

                    if (ex.message === 'jwt expired'){
                        console.log('if condition works');
                        try{
                            let refresh_id = jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET)
                            console.log(refresh_id.id);
                            id={"id":refresh_id.id}

                        }catch(exception){
                            console.log('from refresh token catch');
                            res.status(400).send(exception.message)
                        }
                    }else{
                        res.status(400).send(ex.message)
                    }
                }
                console.log('after catch');
                if(id != null){
                    console.log(id);
                    token = jwt.sign(id,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'})
                    refresh_token = jwt.sign(id,process.env.REFRESH_TOKEN_SECRET)
                    obj = {
                        token:token,
                        refresh_token:refresh_token
                    }
                    res.status(200).send(obj)
                }

    },


}
