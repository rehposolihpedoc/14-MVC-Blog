// require User model
const { User, Post, Comment } = require('../../models');
// set up Express router
const router = require('express').Router();
const sequelize = require("../../config/connection");
const withAuth = require('../../utils/auth');

// FIND ALL POSTS
router.get('/', withAuth, async (req, res) => {
    try {
        const dashboardDB = await Post.findAll({
            where: {user_id: req.session.user_id,},
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
        // Turn off meta data and find all with .map()
        const posts = dashboardDB.map((post) => post.get({ plain: true }));
        res.render("dashboard", { posts, loggedIn: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// EDIT POSTS
router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const dashboardDB = await Post.findOne({
            where: {id: req.params.id,},
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
             if (!dashboardDB) {
                res.status(404).json({ message: "No post found with this id" });
        return;
             }
             // serialize the data
             const post = dbPostData.get({ plain: true });

             // pass data to template
             res.render('edit-posts', {post, loggedIn: true});

} catch (err) {
    console.log(err);
    res.status(500).json(err);
}
});

module.exports = router;