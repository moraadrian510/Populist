const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');
// const reactionRoutes = require('./reactionRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);
// router.use('/reactions', reactionRoutes);


module.exports = router;
