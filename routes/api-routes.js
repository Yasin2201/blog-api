const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

//POST user Sign-Up form
router.post('/sign-up', user_controller.sign_up_post)

//POST user sign-in 
router.post('/sign-in', user_controller.sign_in_post)

module.exports = router