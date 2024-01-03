const router = require('express').Router();

// Route files
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = requre('./commentRoutes');

// routes with express router
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

//export router
module.exports = router;