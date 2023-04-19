const router = require('express').router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addThought,
    removeThought
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/thoughts
router.route('/:userId/thoughts').post(addThought);

// api/users/:userId/thoughts/:thoughtsId
router.route('/:userId/thoughts/:thoughtsId').delete(removeThought);

module.exports = router;