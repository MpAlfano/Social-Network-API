const router = require("express").Router();

const {
  getAll,
  newThought,
  getOne,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// route to get all thoughts and post new thought
router.route("/").get(getAll).post(newThought);

// route to get a single thought, update single thought, or delete single thought
router
  .route("/:thoughtId")
  .get(getOne)
  .put(updateThought)
  .delete(deleteThought);

// route to add reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction);

// route to delete reaction from a though based on ID
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
module.exports = router;
