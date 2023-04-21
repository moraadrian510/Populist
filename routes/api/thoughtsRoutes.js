const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    removeThought,
} = require('../../controllers/thoughtsControllers');

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought).delete(removeThought);
//update

module.exports = router;

//use this path for thoughts

// /api/users/:userId/thoughts
// router.route('/:userId/thoughts')
// .post(addThought);

// api/users/:userId/thoughts/:thoughtsId
// router.route('/:userId/thoughts/:thoughtsId').delete(removeThought);//add to thoughts list