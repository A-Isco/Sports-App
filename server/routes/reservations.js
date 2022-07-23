const express=require('express')
const router=express.Router()

const {
    getReservations,
    createReservation,
    getReservedOpponent
   
  
  } = require("../controllers/ReservationController");
  router.route('/calender').get(getReservedOpponent)
router.route('/:placeId').get(getReservations)
router.route('/').post(createReservation)

module.exports=router