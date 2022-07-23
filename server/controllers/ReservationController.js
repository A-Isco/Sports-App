var  dra  =  require('date-range-array')
const dateLib = require('date-and-time')
const {Player} = require("../models/Player");
const Place = require("../models/Place");
const Hour = require("../models/Hour");
const Reservation = require("../models/Reservation");
require('dotenv').config();

const nodemailer = require('nodemailer');
const mongoose = require("mongoose");


// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:  'elmal3ab123@gmail.com', // TODO: your gmail account
        pass: 'pepjoranujfqrkkg' // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'elmal3ab123@gmail.com', // TODO: email sender
    to: 'Rehamnader0123@gmail.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!'
};

module.exports={
    
    async getReservations(req,res,next){
        var date_time = new Date();
        date_time.setDate(new Date().getDate() + 1)
        hours= await Hour.find({}) 
        const value = dateLib.addDays(date_time, 6);
        let date1=formDate(date_time)
        let date2=formDate(value)
        var  days = dra(date1,date2)
        let reservedOpponents=await Reservation.find({place:req.params.placeId,date :{ $in:days} }).populate('time')
        let opponents=[]
        days.forEach(day => {
            hours.forEach(hour => {
                let opponent={
                    place:req.params.placeId,
                    date: day,
                    time:hour
                }
                opponents.push(opponent)  
            });
        });
        reservedOpponents.forEach(reElement => {
            opponents.forEach(element => {
                if(reElement.date==element.date && reElement.time.id==element.time.id){
                    opponents.splice(opponents.indexOf(element), 1);
                }
            });
            
        });
        return res.json({'opponents':opponents},200);
    },

    async createReservation(req,res,next){
        console.log("kkkkkk",req.body.payment_token)
        try{
            let reservation=await Reservation.create({
                payment_token:req.body.payment_token.id,
                user:req.player_id.id,
                place:req.body.place,
                date: req.body.date,
                time:req.body.time,
    
            })
            let hours= await Hour.findById(req.body.time);
            console.log(hours)
            let mailOptions = {
                from: 'elmal3ab123@gmail.com', // TODO: email sender
                to:req.body.payment_token.email, // TODO: email receiver
                subject: 'sports booking',
                text: ` this email to confirm that you booked the ${req.body.placeName} with ${req.body.price} LE at  ${req.body.date}   ${ hours.from} to ${ hours.to} we wish you enjoy with your team 
                                                                           thanks
                                                                          Elmal3ab
                `
            };
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err)
                }

            });
            return res.json({ status: true, reservation },201);

        }catch (ex) {
            next(ex);
            return res.json({ status: false },400);
     }
     
    },

    async getReservedOpponent(req,res,next){
        console.log('kkkl')
        try{
            let reservedOpponents=await Reservation.find({user:req.player_id.id}).populate('time').populate('place')
            return res.json({'reservedOpponents':reservedOpponents},200);
        }catch (ex) {
            next(ex);
            return res.json({ status: false },400);
     }

    }



  
    

}
function formDate(date_time){
    let date = ("0" + date_time.getDate()).slice(-2);
    let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
    let year = date_time.getFullYear();
    return (year + "-" + month + "-" + date)

}