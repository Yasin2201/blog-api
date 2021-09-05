const express = require('express');
const router = express.Router();
const passport = require("passport");
const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');

//POST user Sign-Up form - /api/sign-up
router.post('/sign-up', user_controller.sign_up_post)

//POST user sign-in - /api/sign-in
router.post('/sign-in', user_controller.sign_in_post)

//GET user logout - /api/sign-out
router.get('/sign-out', user_controller.sign_out_get)

//POST secured new-post route - /api/new-post
router.post('/new-post',
    passport.authenticate('jwt', { session: false }),
    post_controller.new_post
);

//DELETE secured delete-post route - /api/delete-post/:id
router.delete('/delete-post/:id',
    passport.authenticate('jwt', { session: false }),
    post_controller.delete_post
);

//UPDATE secured update-post route - /api/update-post/:id
router.put('/update-post/:id',
    passport.authenticate('jwt', { session: false }),
    post_controller.update_post
);


module.exports = router