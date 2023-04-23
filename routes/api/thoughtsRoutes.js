const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    removeThought,
    updateThought,
} = require('../../controllers/thoughtsControllers');

router.route('/users/:userId/thoughts')
  .get(getThoughts)
  .post(createThought);

router.route('/users/:userId/thoughts/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought);

module.exports = router;

