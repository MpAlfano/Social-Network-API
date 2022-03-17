const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getAll(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get one thought by ID
  getOne(req, res) {
    Thought.findOne()
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "Not thoughts with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Creating a new thought
  newThought(req, res) {
    Thought.create(req.body).then((dbThoughtData) =>
      !dbThoughtData
        ? res.status(404).json({ message: "Failed to create thought." })
        : User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: dbThoughtData._id } },
            { new: true }
          )
            .select("-__v")
            .then((dbUserData) =>
              !dbUserData
                ? res.status(400).json({ message: "No user with this ID" })
                : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err))
    );
  },
  // Updating though by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought found with this ID." })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Deleting thought by ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .select("-__v")
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(400).json({
              message: "Failed to find a thought with that ID",
            })
          : User.findOneAndUpdate(
              { username: dbThoughtData.username },
              { $pull: { thoughts: req.params.thoughtId } }
            )
              .then(() => res.json({ message: "Thought deleted!" }))
              .catch((err) => res.status(500).json(err))
      );
  },
  // Adding reaction by thought ID
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $addToSet: {
          reactions: {
            username: req.body.username,
            reactionBody: req.body.reactionBody,
          },
        },
      },
      { new: true, runValidators: true }
    )
      .select("-__v")
      .then((dbReactionData) =>
        !dbReactionData
          ? res
              .status(400)
              .json({ message: "Failed to find a thought with that ID" })
          : res.json(dbReactionData)
      );
  },
  // Deleting reaction fron thought by ID with reaction ID
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((dbReactionData) =>
        !dbReactionData
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json({ message: "Reaction deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
