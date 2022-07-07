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


module.exports=router