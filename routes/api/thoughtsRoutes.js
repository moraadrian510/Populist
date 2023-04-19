const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    removeThought,
} = require('../../controllers/thoughtsController');

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsId
router.route('/:thoughtsId').get(getSingleThought).delete(removeThought);

module.exports = router;