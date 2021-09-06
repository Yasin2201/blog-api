const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');
const comment_controller = require('../controllers/commentController');

//GET all posts from db - /api/posts
router.get('/posts', post_controller.get_all_posts)

//GET a single post from db - /api/posts/:id
router.get('/posts/:id', post_controller.get_single_post)

//GET specific posts comments from db - /api/posts
router.get("/posts/:postid/comments", comment_controller.get_posts_comments)

//POST comment - api/posts/:postid/comments
router.post("/posts/:postid/comments", comment_controller.new_comment);

module.exports = router