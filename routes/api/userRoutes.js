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

router.route("/").get(getAll).post(newUser);

router.route("/:userId").get(getOne).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);
module.exports = router;
