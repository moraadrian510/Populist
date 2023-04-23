const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    removeThought,
    updateThought,
} = require('../../controllers/thoughtsControllers');

router.route('/:userId')
  .get(getThoughts)
  .post(createThought);

router.route('/users/:userId/thoughts/:thoughtsId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought);

module.exports = router;




