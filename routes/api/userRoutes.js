const router = require("express").Router();

const {
  getAll,
  newUser,
  getOne,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

router.route("/").get(getAll).post(newUser);

router.route("/:userId").get(getOne).put(updateUser).delete(deleteUser);

module.exports = router;
