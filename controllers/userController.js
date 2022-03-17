const { User, Thought } = require("../models");

module.exports = {
  //Get all users
  getAll(req, res) {
    User.find()
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get one user
  getOne(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Create user
  newUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  //Update user by ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No user found with that ID." })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Deleting a user by ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this ID." })
          : res.json({ message: "User has been deleted." })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Adding friend to user by ID of the friend user ID
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .select("-__v")
      .then((dbUserData) =>
        !dbUserData
          ? res
              .status(400)
              .json({ message: "Failed to add friend to user with that ID" })
          : res.json(dbUserData)
      );
  },
  // Deleting friend from User by ID
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .select("-__v")
      .then((dbUserData) =>
        !dbUserData
          ? res.status(400).json({
              message: "Failed to remove friend from user with that ID",
            })
          : res.json(dbUserData)
      );
  },
};
