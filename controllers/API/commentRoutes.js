const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
     const commentDataDB = await Comment.findAll({
        include: [{ model: User}, { model: Post}]
     });
     res.status(200);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
}); 

// CREATE COMMENTS
router.post('/', withAuth, async (req, res) => {
    try {
        const commentDataDB = await Comment.create({
            comment: req.body.comment,
            user_id: req.body.user_id,
        });
        if (!commentDataDB) {
            res.status(404).json({ message: 'No comment found with this provided id!' });
            return;
          }
     res.json(commentDataDB)
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// DELETE COMMENTS
router.delete('/:id', withAuth, async (req, res) => {
    try {  
        const commentDataDB = await Comment.destroy({
            where: {
                
            }
        })