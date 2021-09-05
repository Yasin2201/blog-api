const express = require('express');
const router = express.Router();
const passport = require("passport");
const user_controller = require('../controllers/userController');
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

//POST user Sign-Up form - /api/sign-up
router.post('/sign-up', user_controller.sign_up_post)

//POST user sign-in - /api/sign-in
router.post('/sign-in', user_controller.sign_in_post)

//GET user logout - /api/sign-out
router.get('/sign-out', user_controller.sign_out_get)

//GET all posts from db - /api/posts
router.get('/posts', post_controller.get_all_posts)

//GET a single post from db - /api/posts/:id
router.get('/posts/:id', post_controller.get_single_post)

//POST secured new-post route - /api/new-post
router.post('/posts',
    passport.authenticate('jwt', { session: false }),
    post_controller.new_post
);

//DELETE secured delete-post route - /api/delete-post/:id
router.delete('/posts/:id',
    passport.authenticate('jwt', { session: false }),
    post_controller.delete_post
);

//UPDATE secured update-post route - /api/update-post/:id
router.put('/posts/:id',
    passport.authenticate('jwt', { session: false }),
    post_controller.update_post
);

//GET specific posts comments from db - /api/posts
router.get("/posts/:postid/comments", comment_controller.get_posts_comments)

//POST comment - api/posts/:postid/comments
router.post("/posts/:postid/comments", comment_controller.new_comment);

//DELETE secured delete-comment route - /api/delete-post/:postid/comments/:commentid
router.delete('/posts/:postid/comments/:commentid',
    passport.authenticate('jwt', { session: false }),
    comment_controller.delete_comment
);


module.exports = router