const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    removeThought,
    updateThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtsControllers');

// api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// api/thoughts/:thoughtsId
router.route('/:thoughtsId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought);

  // api/thoughtsId/reactions
  router.route('/:thoughtsId/reactions')
  .post(createReaction);
  
  router.route('/:thoughtsId/reactions/:reactionsId')
  .delete(deleteReaction);

module.exports = router;




