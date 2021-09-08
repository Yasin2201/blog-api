const express = require('express');
const router = express.Router();
const passport = require("passport");
const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

//POST user Sign-Up form - /cms/sign-up
router.post('/sign-up', user_controller.sign_up_post)

//POST user sign-in - /cms/sign-in
router.post('/sign-in', user_controller.sign_in_post)

//GET user logout - /cms/sign-out
router.get('/sign-out', user_controller.sign_out_get)

//GET secured all posts from db - /cms/posts
router.get('/posts',
    passport.authenticate('jwt', { session: false }),
    post_controller.get_all_posts
);

//POST secured new-post route - /cms/new-post
router.post('/posts',
    passport.authenticate('jwt', { session: false }),
    post_controller.new_post
);

//GET secured single post from db - /cms/posts/:id
router.get('/posts/:id',
    passport.authenticate('jwt', { session: false }),
    post_controller.get_single_post
);

//GET secured all comments for post from db - /cms/posts/:id
router.get('/posts/:postid/comments',
    passport.authenticate('jwt', { session: false }),
    comment_controller.get_posts_comments
);

//DELETE secured delete-post route - /cms/delete-post/:id
router.delete('/posts/:id',
    passport.authenticate('jwt', { session: false }),
    post_controller.delete_post
);

//UPDATE secured update-post route - /cms/update-post/:id
router.put('/posts/:id',
    passport.authenticate('jwt', { session: false }),
    post_controller.update_post
);

//DELETE secured delete-comment route - /cms/delete-post/:postid/comments/:commentid
router.delete('/posts/:postid/comments/:commentid',
    comment_controller.delete_comment
);


module.exports = router