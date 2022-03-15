const router = require("express").Router();

const {
  getAll,
  newThought,
  getOne,
} = require("../../controllers/thoughtController");

router.route("/").get(getAll).post(newThought);

router.route("/:thoughtId").get(getOne);
//   .put(updatethought)
//   .delete(deletethought);

module.exports = router;
