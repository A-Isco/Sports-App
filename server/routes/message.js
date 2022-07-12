const express=require('express')
const router=express.Router()

const {
    getMessages,
    createMessage
    
  } = require("../controllers/messagesController");

  router.route('/:id').get(getMessages)
  router.route('').post(createMessage)
  module.exports=router