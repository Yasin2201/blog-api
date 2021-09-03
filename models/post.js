const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = ({
    username: { type: String, minLength: 1, required: true },
    title: { type: String, minLength: 1, required: true },
    text: { type: String, minLength: 1, required: true },
    date: { type: Date, default: Date.now },
    status: { type: Boolean, published: false }
});

module.exports = mongoose.model("Post", PostSchema);