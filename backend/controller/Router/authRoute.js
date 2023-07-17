const {postRegister,postLogin,postAvatar,getAllUsers} =require('../authController')
const router=require('express').Router();
const {validateUser}=require('../middleware/authMiddleware')
router.route('/register')
    .post(postRegister)
router.route('/')
    .get(validateUser)
router.route('/login')
    .post(postLogin)
router.route('/avatar')
    .post(postAvatar)
router.route('/users')
    .get(getAllUsers)
module.exports=router;
