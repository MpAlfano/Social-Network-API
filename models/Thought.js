const { Schema, Types, model } = require("mongoose");
const dayjs = require("dayjs");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: new Types.ObjectId(),
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
      get: (createdVal) =>
        dayjs(createdVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "Can't be empty."],
      maxlength: [200, "Can't exceed 200 characters."],
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      get: (createdVal) =>
        dayjs(createdVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: { type: String, required: true, ref: "user" },
    reactions: [reactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount", function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
