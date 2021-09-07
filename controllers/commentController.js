const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

//GET all comments relating to specific post
exports.get_posts_comments = function (req, res, next) {
    Comment.find()
        .exec(function (err, all_comments) {
            let posts_comments = all_comments.filter(comment => comment.postID.toString() === req.params.postid)
            if (err) { return next(err) }
            res.json({ posts_comments })
        })
}

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

//Delete comment
exports.delete_comment = function (req, res, next) {
    Comment.findByIdAndDelete(req.params.commentid, function deleteComment(err) {
        if (err) { return next(err) }
        res.json({
            message: "Successfully Deleted Comment",
        });
    });
};