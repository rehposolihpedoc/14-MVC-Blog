const { Comment } = require('../models');

const commentData =

[
    {
     "comment": "Awesome!",
     "user_id": 2
    },
    {
     "comment": "Not great!",
     "user_id": 3

    },
    {
     "comment": "Typos!",
     "user_id": 1
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;