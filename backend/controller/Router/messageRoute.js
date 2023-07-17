const {sendMsg,recieveMsg}=require('../messageController');
const router=require('express').Router();
router.route('/send')
    .post(sendMsg)
router.route('/recieve')
    .post(recieveMsg)
module.exports=router;