const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

// Create new comment
exports.new_comment = [

    body('username', 'Username Must Not Be Empty').trim().isLength({ min: 1 }).escape(),
    body('text', 'Text Must Not Be Empty').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {
        //Errors from req if any
        const errors = validationResult(req);

        const { username, text } = req.body;
        const comment = new Comment({
            postID: req.params.postid,
            username,
            text
        });

        if (!errors.isEmpty()) {
            //re-render form if any errors
            res.json({ errors: errors.array() })
            return
        } else {
            //save post to database
            comment.save(function (err) {
                if (err) { return next(err) }
                res.json({ message: "Comment Saved Successfully" })
            });
        };
    }
];