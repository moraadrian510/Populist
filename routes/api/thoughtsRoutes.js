const router = require('express').router();
const {
    getThoughts,
    getSingleThought,
    removeThought,
    addThought,
} = require('../../controllers/thoughtsController');
