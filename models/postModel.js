const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Provide post title"],
    },
    author: {
        type: String,
        required: [true, "Provide post's author name"],
    },
    category: {
        type: String,
        required: [true, 'Provide post category'],
    },
    tags: {
        type: [String],
        default: [],
        set: array => array === [""] ? [] : array
    },
    content: {
        type: String,
        required: [true, "Provide post content"],
    },
    cover_photo: {
        type: String,
        default: 'default.png',
        set: value => value === '' ? 'default.png' : value
    }
}, {
    timestamp: true,
    versionKey: false
});

postSchema.index({
    'title': "text",
    'author': "text",
    'content': "text",
    'tags': "text"
}, {
    weights: {
        'title': 20,
        'tags': 10,
        'author': 5,
        'content': 1
    }
});

const Post = mongoose.model('posts', postSchema);
Post.syncIndexes();

module.exports = Post;