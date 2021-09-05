const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = ({
    author: { type: String, minLength: 1, required: true },
    title: { type: String, minLength: 1, required: true },
    text: { type: String, minLength: 1, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);