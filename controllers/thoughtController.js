const Thought = require("../models/Thought");
const User = require("../models/Thought");

module.exports = {
  getAll(req, res) {
    Thought.find()
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getOne(req, res) {
    Thought.findOne()
      .select("-_v")
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "Not thoughts with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  newThought() {
    Thought.create(req.body).then((dbThoughtData) =>
      !dbThoughtData
        ? res.status(404).json({ message: "Failed to create thought." })
        : User.updateOne(
            { _id: req.body.userId },
            { $addToSet: { thoughts: dbThoughtData._id } },
            { new: true }
          )
            .then((dbUserData) =>
              !dbUserData
                ? res.status(400).json({ message: "No user with this ID" })
                : res.json(dbUserData)
            )
            .catch((err) => res.status(500).json(err))
    );
  },
};
