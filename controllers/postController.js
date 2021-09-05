const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

// Handle user new post
exports.new_post_post = [

    body('author', 'Author Must Not Be Empty').trim().isLength({ min: 1 }).escape(),
    body('title', 'Title Must Not Be Empty').trim().isLength({ min: 1 }).escape(),
    body('text', 'Text Must Not Be Empty').trim().isLength({ min: 1 }).escape(),

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