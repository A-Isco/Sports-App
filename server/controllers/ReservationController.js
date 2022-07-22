var  dra  =  require('date-range-array')
const dateLib = require('date-and-time')
const {Player} = require("../models/Player");
const Place = require("../models/Place");
const Hour = require("../models/Hour");
const Reservation = require("../models/Reservation");
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
        console.log(req.body.payment_token)
        try{
            let reservation=await Reservation.create({
                payment_token:req.body.payment_token,
                user:req.player_id.id,
                place:req.body.place,
                date: req.body.date,
                time:req.body.time,
    
            })
            return res.json({ status: true, reservation },201);
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