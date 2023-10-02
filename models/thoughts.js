const { Schema, model } = require("mongoose");

//schema for reactions
const reactionSchema = new Schema({
  createdAt: { type: Date, defualt: Date.now },
  reactionBody: String,
  username: String,
});
// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//virtual that sets the raction count property
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  })
  // Setter to set the reaction count
  .set(function (v) {
    this.set(v);
  });

// Format the date as an ISO string
thoughtSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.createdAt = ret.createdAt.toLocaleString();
    return ret;
  },
});

// Initialize our Thought model
const Thoughts = model("thoughts", thoughtSchema);

module.exports = Thoughts;
