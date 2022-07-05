const express=require('express')
const router=express.Router()
let  chatController =require('../controllers/chat')

router.route('/').get(chatController.test)
// .post(taskController.createTask)
// router.route('/:id').get(taskController.getTask).patch(taskController.updateTask).delete(taskController.deleteTask)


module.exports=router