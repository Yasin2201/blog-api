const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

//GET all comments relating to specific post
exports.get_posts_comments = function (req, res, next) {
    Comment.find()
        .sort({ date: -1 })
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
exports.delete_comment = async function (req, res, next) {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentid);
        if (!comment) {
            return res
                .status(404)
                .json({ err: `comment with not found` });
        }
        res
            .status(200)
            .json({ msg: `comment deleted sucessfuly` });
    } catch (err) {
        next(err);
    }
};