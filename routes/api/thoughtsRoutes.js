const router = require('express').router();
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