const Post = require('../models/post');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

//GET all posts
exports.get_all_posts = function (req, res, next) {
    Post.find()
        .sort({ date: -1 })
        .exec(function (err, all_posts) {
            if (err) { return next(err) }
            res.json({ all_posts })
        })
}

//GET a single post
exports.get_single_post = function (req, res, next) {
    Post.findById(req.params.id)
        .exec(function (err, found_post) {
            if (err) { return next(err) }
            res.json({ found_post })
        })
}

// Handle user new post
exports.new_post = [

    body('author', 'Author Must Not Be Empty').trim().isLength({ min: 1 }),
    body('title', 'Title Must Not Be Empty').trim().isLength({ min: 1 }),
    body('text', 'Text Must Not Be Empty').trim().isLength({ min: 1 }),

    (req, res, next) => {
        //Errors from req if any
        const errors = validationResult(req);

        const { author, title, text } = req.body;
        const post = new Post({
            author,
            title,
            text
        });

        if (!errors.isEmpty()) {
            //re-render form if any errors
            res.json({ errors: errors.array() })
            return
        } else {
            //save post to database
            post.save(function (err) {
                if (err) { return next(err) }
                res.json({ message: "Post Saved Successfully" })
            });
        };
    }
];

//Update post
exports.update_post = [

    body('author', 'Author Must Not Be Empty').trim().isLength({ min: 1 }),
    body('title', 'Title Must Not Be Empty').trim().isLength({ min: 1 }),
    body('text', 'Text Must Not Be Empty').trim().isLength({ min: 1 }),

    (req, res, next) => {
        //Errors from req if any
        const errors = validationResult(req);

        const { author, title, text } = req.body;
        const post = new Post({
            _id: req.params.id,
            author,
            title,
            text
        });

        if (!errors.isEmpty()) {
            //re-render form if any errors
            res.json({ errors: errors.array() })
            return
        } else {
            // successful redirect to update category detail page
            Post.findByIdAndUpdate(req.params.id, post, {}, function (err) {
                if (err) { return next(err) }
                res.json({
                    message: "Post Updated",
                    post
                });
            });
        };
    }
];

//Delete post and all comments linked to post
exports.delete_post = function (req, res, next) {
    Post.findByIdAndRemove(req.params.id, function deletePost(err) {
        if (err) { return next(err) }
        res.json({
            message: "Successfully Deleted Post",
        });
    });
    Comment.deleteMany({ 'postID': req.params.id }, function (err) {
        if (err) { return next(err) }
    });
};