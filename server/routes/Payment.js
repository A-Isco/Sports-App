const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const {
    chargePayment
}=require("../controllers/paymentController");

router.post("/",chargePayment);


module.exports=router;
