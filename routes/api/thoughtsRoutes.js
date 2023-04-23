const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    removeThought,
    updateThought,
} = require('../../controllers/thoughtsControllers');

// api/thoughts/:userId
router.route('/:userId')
  .get(getThoughts)
  .post(createThought);

// api/thoughts/:userId/:thoughtsId
router.route('/:userId/:thoughtsId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought);

module.exports = router;




