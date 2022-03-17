const { Thought, User } = require("../models");

module.exports = {
  getAll(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
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
};
