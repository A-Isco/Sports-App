const express=require('express')
const router=express.Router()

const {
    getReservations,
    createReservation
   
  
  } = require("../controllers/ReservationController");
router.route('/:placeId').get(getReservations)
router.route('/').post(createReservation)
module.exports=router