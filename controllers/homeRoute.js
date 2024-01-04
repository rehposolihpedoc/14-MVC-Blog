//BASE URL EXPRESS ROUTES

const router = require('express').Router();
const { Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');
const { post } = require('./API');

//GET HOMEPAGE POSTS
router.get('/', async (req, res) => {
    console.log('***************************');
try {
    const postData = await Post.findAll({
        attributes: ["id", "title", "post_content", "created_at"],
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment",
                        "user_id",
                    ],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
                {
                    model: User,
                    attributes: ["username"],
                },
            ],
    });
    const posts = postData.map((post) => post.get({ plain: true}));

    res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
    });
} catch (err) {
res.status(500).json(err);
}
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });

        const post = postData.get({ plain: true });
      
        let matched;
        if (req.session.user_id == post.user_id) {
            matched = true;
        }
        
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in, 
            matched

        });
    } catch (err) {
        res.status(500).json(err);
    }
    }
);

router.get('/login', async (req, res) => {
 try {
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }
    res.render('login', {
        username: req.session.logged_in, 
    })
 } catch (err) {
    res.status(500).json(err);
 }

});

module.exports = router;
