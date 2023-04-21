const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/usersControllers');

// /api/users
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.delete(deleteUser)
.put(updateUser);

// /api/users/:userId/friends
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

// // /api/users/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId')
// .delete(removeFriend);


module.exports = router;