const mongoose = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: Type.ObjectId,
    default: new Type.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: [280, "Can't exceed 280 characters."],
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdDate) => {
      dayjs(createdDate).format("MMM DD, YYYY. hh:mm a");
    },
  },
});

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "Can't be empty."],
      maxlength: [200, "Can't exceed 200 characters."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdDate) => {
        dayjs(createdDate).format("MMM DD, YYYY. hh:mm a");
      },
    },
    username: { type: String, required: true, ref: "user" },
    reactions: {
      type: reactionSchema.Type.ObjectId,
      ref: "reaction",
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount", function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
