const router = require("express").Router();

const {
  getAll,
  newUser,
  getOne,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Route to get all users or add new user
router.route("/").get(getAll).post(newUser);

// Route to get a single user, update a user or delete a user by ID
router.route("/:userId").get(getOne).put(updateUser).delete(deleteUser);

// route to add or delete a friend from user by ID
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);
module.exports = router;
