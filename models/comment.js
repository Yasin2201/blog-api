const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = ({
    postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    username: { type: String, minLength: 1, required: true },
    text: { type: String, minLength: 1, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);