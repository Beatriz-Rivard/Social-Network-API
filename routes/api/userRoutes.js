const router = require('express').Router();

// Schema to create a user model
const { getUser, getSingleUser, createUser, updateUser,deleteUser, addFriend,deleteFriend
} = require('../../controllers/userController');


router.route('/').get(getUser).post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);


module.exports = router;
