const express=require('express')
const router=express.Router()

const {
    getContacts,
    createContact,
  
  } = require("../controllers/chat");
router.route('/contacts/:id').get(getContacts)
router.route('/contacts').post(createContact)


// .post(taskController.createTask)
// router.route('/:id').get(taskController.getTask).patch(taskController.updateTask).delete(taskController.deleteTask)
//#MONGO_URI = mongodb+srv://dina:dina@sports.e3s3h.mongodb.net/?retryWrites=true&w=majority


module.exports=router