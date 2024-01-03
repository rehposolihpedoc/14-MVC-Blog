// require User model
const { User, Post, Comment } = require('../../models');
// set up Express router
const router = require('express').Router();
// load user auth middleware
const withAuth = require('../../utils/auth');


//create a new Post
router.post('/', withAuth, async (req, res) => {
  try {
    const postDataDB = await Post.create({
    title: req.body.title,
    post_content: req.body.post_contents,
    user_id: req.session.user_id,
    });
    res.status(200).json(postDataDB);
} catch (err) {
  res.status(400).json(err);
}
});


//Update Post
router.put('/:id', withAuth, async (req, res) => {
    try {
      const postDataDB = await Post.update({
        ...req.body,
        user_id: req.session.user_id,
      }, {
        where: {
          id: req.params.id,
        }
      });

      res.status(200).json(postDataDB);
    } catch (err) {
      res.status(400).json(err);
    }
});

//DELETE POST
router.delete('/:id', withAuth, async (req, res) => {
    try { 
        const postDataDB = await Post.destroy({
            where: {
                id: req.params.id }
            }) 
            if (!postDataDB) {
                res.status(404).json({ message: 'No post found with this id!' });
                return;
              }
              res.status(200).json(postDataDB);
            } catch (err) {
                res.status(500).json(err);
            }

        }
    );
            
   module.exports = router;     
        