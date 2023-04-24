const router = require('express').Router();
const  {
    createReaction,
    deletReaction
} = require('../../controllers/reactionControllers');

// api/thoughts/:thoughtId/reactions
router.route('api/thoughts/:thoughtId/reactions')
.post(createReaction)
.delete(deletReaction)


module.exports = router;